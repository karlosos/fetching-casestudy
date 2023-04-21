import { AxiosResponse } from 'axios';
import { createApi } from '../createApi';
import { CreateElementRequestApi, CreateElementResponseApi } from './serverApiTypes';

export const CREATE_ELEMENT_URL = '/v1/elements';

export const createElementApi = async (request: CreateElementRequestApi): Promise<CreateElementResponseApi> => {
  const response = await createApi().request<CreateElementRequestApi, AxiosResponse<CreateElementResponseApi>>({
    url: `/v1/elements`,
    method: 'POST',
    data: request,
  });

  return response.data;
};
