import { server } from '../../mockServer';
import { getElementsErrorHandler, getElementsResponseHandler } from '../__mocks__/getElementsHandlers';
import { getElements } from '../getElements';
import { GetElementsRequest } from '../apiTypes';
import { ApiError } from '../../apiError';

describe('getElements Endpoint', () => {
  it('WHEN getElements is called THEN return correct response', async () => {
    // GIVEN
    server.use(getElementsResponseHandler);
    const request: GetElementsRequest = {
      size: 10,
      startIndex: 0,
    };

    // WHEN
    const result = await getElements(request);

    // THEN
    // TODO: check if correct url (correct params)
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
      })
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
