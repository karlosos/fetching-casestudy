import { server, waitForRequest } from '../../mocks/mockServer';
import { createElementErrorHandler, createElementResponseHandler } from '../__mocks__/createElementHandlers';
import { createElement } from '../createElement';
import { CreateElementRequest } from '../apiTypes';
import { ApiError } from '../../apiError';
import { DeviceType } from '../../apiTypes';
import { createApiUrl } from '../../createApi';
import { CREATE_ELEMENT_URL } from '../createElementApi';

describe('createElement Endpoint', () => {
  it('WHEN createElement is called THEN return correct response', async () => {
    // GIVEN
    server.use(createElementResponseHandler);
    const pendingRequest = waitForRequest('POST', createApiUrl(CREATE_ELEMENT_URL));
    const request: CreateElementRequest = {
      dn: '125342.T-MOBILE.COM',
      deviceType: DeviceType.eNodeB,
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.2',
    };

    // WHEN
    const result = await createElement(request);
    const apiRequest = await pendingRequest;
    const mappedRequest = await apiRequest.json();

    // THEN
    expect(mappedRequest).toStrictEqual({
      deviceType: 'eNodeB',
      dn: '125342.T-MOBILE.COM',
      options: { ip: '129.120.120.2', latitude: '123421.312312', longitude: '12313421.123123' },
    });
    expect(result).toEqual(expectedResponse);
  });

  it('SHOULD return ApiError WHEN 5xx error on calling createElement', async () => {
    // GIVEN
    server.use(createElementErrorHandler);
    const request: CreateElementRequest = {
      dn: '125342.T-MOBILE.COM',
      deviceType: DeviceType.eNodeB,
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.2',
    };

    // WHEN
    const result = createElement(request);

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
  id: '1000',
  deviceType: 'eNodeB',
  dn: '125342.T-MOBILE.COM',
  ip: '129.120.120.2',
  latitude: '123421.312312',
  longitude: '12313421.123123',
};
