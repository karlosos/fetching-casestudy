import { AxiosError } from 'axios';
import { throwApiError } from '../apiError';
import { DeleteElementRequest } from './apiTypes';
import { deleteElementApi } from './deleteElementApi';
import { mapRequest } from './mappers';

export const deleteElement = async (request: DeleteElementRequest): Promise<void> => {
  const mappedRequest = mapRequest(request);

  try {
    await deleteElementApi(mappedRequest);
  } catch (e) {
    const error = e as AxiosError<any>;
    return throwApiError(error);
  }
};
