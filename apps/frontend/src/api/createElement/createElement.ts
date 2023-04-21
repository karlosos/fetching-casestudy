import { AxiosError } from 'axios';
import { throwApiError } from '../apiError';
import { CreateElementRequest, CreateElementResponse } from './apiTypes';
import { createElementApi } from './createElementApi';
import { mapRequest, mapResponse } from './mappers';

export const createElement = async (request: CreateElementRequest): Promise<CreateElementResponse> => {
  const mappedRequest = mapRequest(request);

  try {
    const response = await createElementApi(mappedRequest);
    const mappedResponse = mapResponse(response);
    return mappedResponse;
  } catch (e) {
    const error = e as AxiosError<any>;
    return throwApiError(error);
  }
};
