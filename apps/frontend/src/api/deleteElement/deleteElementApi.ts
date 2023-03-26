import { AxiosResponse } from 'axios';
import { createApi } from '../createApi';
import { DeleteElementRequestApi } from './serverApiTypes';

export const DELETE_ELEMENT_URL = '/v1/elements/:elementId';

export const deleteElementApi = async (request: DeleteElementRequestApi): Promise<void> => {
  const response = await createApi().request<DeleteElementRequestApi, AxiosResponse<void>>({
    url: `/v1/elements/${request.elementId}`,
    method: 'DELETE',
  });

  return response.data;
};
