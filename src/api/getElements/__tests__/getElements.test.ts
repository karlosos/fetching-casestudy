import { server, waitForRequest } from '../../mocks/mockServer';
import { getElementsErrorHandler, getElementsResponseHandler } from '../__mocks__/getElementsHandlers';
import { getElements } from '../getElements';
import { GetElementsRequest } from '../apiTypes';
import { ApiError } from '../../apiError';
import { GET_ELEMENTS_URL } from '../getElementsApi';
import { createApiUrl } from '../../createApi';

describe('getElements Endpoint', () => {
  it('WHEN getElements is called THEN return correct response', async () => {
    // GIVEN
    server.use(getElementsResponseHandler);
    const pendingRequest = waitForRequest('GET', createApiUrl(GET_ELEMENTS_URL));
    const request: GetElementsRequest = {
      size: 10,
      startIndex: 0,
    };

    // WHEN
    const result = await getElements(request);
    const apiRequest = await pendingRequest;

    // THEN
    expect(apiRequest.url.toString()).toEqual('http://localhost:3333/api/v1/elements?limit=10&page=0');
    expect(result).toEqual(expectedResponse);
  });

  it('SHOULD return ApiError WHEN 5xx error on calling getElements', async () => {
    // GIVEN
    server.use(getElementsErrorHandler);
    const request: GetElementsRequest = {
      size: 10,
      startIndex: 0,
    };

    // WHEN
    const result = getElements(request);

    // THEN
    await expect(result).rejects.toEqual(
      new ApiError({
        name: 'ApiError',
        message: 'Database problem',
        errorCode: 0,
        statusCode: 500,
      }),
    );
  });
});

const expectedResponse = {
  elements: [
    {
      id: '1',
      deviceType: 'eNodeB',
      dn: '125342.T-MOBILE.COM',
      ip: '129.120.120.0',
      latitude: '123421.312312',
      longitude: '12313421.123123',
    },
    {
      id: '2',
      deviceType: 'eNodeB',
      dn: 'BTS-ALFA.T-MOBILE.COM',
      ip: '129.120.120.0',
      latitude: '123421.312312',
      longitude: '12313421.123123',
    },
    {
      id: '3',
      deviceType: 'eNodeB',
      dn: 'BTS-123.ORANGE.COM',
      ip: '129.120.120.0',
      latitude: '123421.312312',
      longitude: '12313421.123123',
    },
  ],
  totalElements: 3,
};
