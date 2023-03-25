// This file would probably be declared in `/api` dir.
// I don't like that this is closely integrated with rtk.

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GetElementsResponse } from '../../api/apiTypes';
import { GATEWAY_URL, SERVICE_URL } from '../../api/createApi';

// This variable could be named as a 
// ccsApi, [service]Api when having multiple services
// when having one api then just `api`
export const rtkQueryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: GATEWAY_URL + SERVICE_URL }),
  reducerPath: 'elementsApi',
  endpoints: (build) => ({
    getElements: build.query<GetElementsResponse, void>({
        query: () => 'v1/elements'
    })
  }),
});

export const { useGetElementsQuery } = rtkQueryApi