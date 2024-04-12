import { AxiosError } from 'axios';
import { throwApiError } from '../apiError';
import { GetElementsRequest, GetElementsResponse } from './apiTypes';
import { getElementsApi } from './getElementsApi';
import { mapRequest, mapResponse } from './mappers';

export const getElements = async (request: GetElementsRequest): Promise<GetElementsResponse> => {
  const mappedRequest = mapRequest(request);

  try {
    const responseApi = await getElementsApi(mappedRequest);
    const response = mapResponse(responseApi);
    return response;
  } catch (e) {
    const error = e as AxiosError<any>;
    return throwApiError(error);
  }
};
