import { server, waitForRequest } from '../../mocks/mockServer';
import { deleteElementServerErrorHandler, deleteElementResponseHandler, deleteElementNotFoundResponseHandler } from '../__mocks__/deleteElementHandlers';
import { deleteElement } from '../deleteElement';
import { DeleteElementRequest } from '../apiTypes';
import { ApiError } from '../../apiError';
import { createApiUrl } from '../../createApi';
import { DELETE_ELEMENT_URL } from '../deleteElementApi';

describe('deleteElement Endpoint', () => {
  it('WHEN deleteElement is called THEN return correct response', async () => {
    // GIVEN
    server.use(deleteElementResponseHandler);
    const pendingRequest = waitForRequest('DELETE', createApiUrl(DELETE_ELEMENT_URL));
    const request: DeleteElementRequest = {
      elementId: '1',
    };

    // WHEN
    await deleteElement(request);
    const apiRequest = await pendingRequest;

    // THEN
    const calledApiUrl = apiRequest.url.toString().split('/api')[1];
    expect(calledApiUrl).toEqual(`/v1/elements/1`);
  });

  it('SHOULD return ApiError WHEN 4xx error on calling deleteElement', async () => {
    // GIVEN
    server.use(deleteElementNotFoundResponseHandler);
    const request: DeleteElementRequest = {
      elementId: '1',
    };

    // WHEN
    const result = deleteElement(request);

    // THEN
    await expect(result).rejects.toEqual(
      new ApiError({
        name: 'ApiError',
        message: 'Error: Internal Server Error.',
        errorCode: 0,
        statusCode: 404,
      })
    );
  });

  it('SHOULD return ApiError WHEN 5xx error on calling deleteElement', async () => {
    // GIVEN
    server.use(deleteElementServerErrorHandler);
    const request: DeleteElementRequest = {
      elementId: '1',
    };

    // WHEN
    const result = deleteElement(request);

    // THEN
    await expect(result).rejects.toEqual(
      new ApiError({
        name: 'ApiError',
        message: 'Database problem',
        errorCode: 0,
        statusCode: 500,
      })
    );
  });
});
