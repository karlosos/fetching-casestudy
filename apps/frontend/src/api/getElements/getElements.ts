import { AxiosError } from 'axios';
import { throwApiError } from '../apiError';
import { GetElementsRequest, GetElementsResponse } from './apiTypes';
import { getElementsApi } from './getElementsApi';
import { mapRequest, mapResponse } from './mappers';

export const getElements = async (request: GetElementsRequest): Promise<GetElementsResponse> => {
  const mappedRequest = mapRequest(request);
  console.log('>> getElements request', request, 'mapped request', mappedRequest);

  try {
    const responseApi = await getElementsApi(mappedRequest);
    const response = mapResponse(responseApi);
    console.log('>> getElements reponse api', responseApi, 'mapped response', response);
    return response;
  } catch (e) {
    const error = e as AxiosError<any>;
    console.log('>> getElements error', error);
    return throwApiError(error);
  }
};
