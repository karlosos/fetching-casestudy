import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { createElement, deleteElement, getElements } from '../../api';
import { ApiError } from '../../api/apiError';
import type { GetElementsResponse, CreateElementRequest } from '../../api/apiTypes';
import { deleteElementEnded, deleteElementStarted } from './slice';

export const rtkQueryFnApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  reducerPath: 'elementsApiQueryFn',
  tagTypes: ['Elements'],
  endpoints: (build) => ({
    getElements: build.query<GetElementsResponse, void>({
      queryFn: async () => {
        try {
          const data = await getElements({ startIndex: 0, size: 50 });
          return { data };
        } catch (err) {
          return buildQueryError(err);
        }
      },
    }),
    deleteElement: build.mutation<void, string>({
      queryFn: async (elementId, { dispatch }) => {
        try {
          await deleteElement({ elementId: elementId });
          return { data: undefined };
        } catch (err) {
          return buildQueryError(err);
        }
      },
      async onQueryStarted(elementId, { dispatch, queryFulfilled }) {
        dispatch(deleteElementStarted(elementId));
        try {
          await queryFulfilled;
          dispatch(
            rtkQueryFnApi.util.updateQueryData('getElements', undefined, (draft) => {
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
      queryFn: async (element, { dispatch }) => {
        try {
          await createElement(element);
          return { data: undefined };
        } catch (err) {
          return buildQueryError(err);
        }
      },
      invalidatesTags: ['Elements'],
    }),
  }),
});

const buildQueryError = (err: unknown) => {
  const error = err as ApiError;
  return {
    error: {
      error: error.message,
      status: 'CUSTOM_ERROR',
    } as FetchBaseQueryError,
  };
};

export const { useGetElementsQuery, useDeleteElementMutation, useCreateElementMutation } = rtkQueryFnApi;
