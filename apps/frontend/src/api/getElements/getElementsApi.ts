import { AxiosResponse } from 'axios';
import { createApi } from '../createApi';
import { GetElementsRequestApi, GetElementsResponseApi } from './serverApiTypes';

export const getElementsApi = async (request: GetElementsRequestApi): Promise<GetElementsResponseApi> => {
  const response = await createApi().request<GetElementsRequestApi, AxiosResponse<GetElementsResponseApi>>({
    url: '/v1/elements',
    method: 'GET',
    params: { ...request },
  });

  return response.data;
};
