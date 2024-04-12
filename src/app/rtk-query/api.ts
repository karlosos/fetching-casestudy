// This file would probably be declared in `/api` dir.
// I don't like that this is closely integrated with rtk.

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GetElementsResponse, CreateElementRequest } from '../../api/apiTypes';
import { GATEWAY_URL, SERVICE_URL } from '../../api/createApi';
import { mapRequest } from '../../api/createElement/mappers';
import { mapResponse } from '../../api/getElements/mappers';
import { GetElementsResponseApi } from '../../api/getElements/serverApiTypes';
import { deleteElementEnded, deleteElementStarted } from './slice';

// This variable could be named as a
// ccsApi, [service]Api when having multiple services
// when having one api then just `api`
//
// Should have defined `jwt` for token too as this one is
// not using axios module.
export const rtkQueryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: GATEWAY_URL + SERVICE_URL }),
  reducerPath: 'elementsApi',
  tagTypes: ['Elements'],
  endpoints: (build) => ({
    getElements: build.query<GetElementsResponse, void>({
      query: () => 'v1/elements',
      providesTags: ['Elements'],
      transformResponse: (data) => mapResponse(data as GetElementsResponseApi),
    }),
    deleteElement: build.mutation<void, string>({
      query: (elementId) => ({
        url: `v1/elements/${elementId}`,
        method: 'DELETE',
      }),
      async onQueryStarted(elementId, { dispatch, queryFulfilled }) {
        dispatch(deleteElementStarted(elementId));
        try {
          await queryFulfilled;
          dispatch(
            rtkQueryApi.util.updateQueryData('getElements', undefined, (draft) => {
              draft.elements = draft.elements.filter((element) => element.id !== elementId);
            }),
          );
          dispatch(deleteElementEnded(elementId));
        } catch {
          dispatch(deleteElementEnded(elementId));
        }
      },
    }),
    createElement: build.mutation<void, CreateElementRequest>({
      query: (element) => ({
        url: `v1/elements`,
        method: 'POST',
        body: mapRequest(element),
      }),
      invalidatesTags: ['Elements'],
    }),
  }),
});

export const { useGetElementsQuery, useDeleteElementMutation, useCreateElementMutation } = rtkQueryApi;
