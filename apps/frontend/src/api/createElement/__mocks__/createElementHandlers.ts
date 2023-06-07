import { rest } from 'msw';
import { ErrorResponse } from '../../apiError';
import { createApiUrl } from '../../createApi';
import { elementsMock } from '../../getElements/__mocks__/getElementsHandlers';
import { shouldThrowError, simulateDelay } from '../../mockUtils';
import { CREATE_ELEMENT_URL } from '../createElementApi';

import { CreateElementRequestApi, CreateElementResponseApi } from '../serverApiTypes';

let currentId = 1000;

export const createElementBrowserMockHandler = rest.post<
  CreateElementRequestApi,
  any,
  CreateElementResponseApi | ErrorResponse
>(createApiUrl(CREATE_ELEMENT_URL), async (req, res, ctx) => {
  await simulateDelay(500, 1000);
  if (shouldThrowError({probability: 0.2})) {
    return res(
      ctx.status(429),
      ctx.json({
        errorMessage: 'Error message from the backend',
        internalErrCode: 89392,
      })
    );
  }

  const { dn, deviceType, options } = await req.json();

  currentId = currentId + 1;
  const newElement: CreateElementResponseApi = {
    id: currentId.toString(),
    dn: dn,
    deviceType: deviceType,
    options: {
      ip: options.ip,
      latitude: options.latitude,
      longitude: options.longitude,
    },
  };
  elementsMock.push(newElement);

  return res(ctx.status(200), ctx.json(newElement));
});

export const createElementResponseHandler = rest.post<
  CreateElementRequestApi,
  any,
  CreateElementResponseApi | ErrorResponse
>(createApiUrl(CREATE_ELEMENT_URL), async (req, res, ctx) => {
  const { dn, deviceType, options } = await req.json();

  const response: CreateElementResponseApi = {
    id: '1000',
    dn: dn,
    deviceType: deviceType,
    options: {
      ip: options.ip,
      latitude: options.latitude,
      longitude: options.longitude,
    },
  };
  return res(ctx.status(200), ctx.json(response));
});

export const createElementErrorHandler = rest.post(createApiUrl(CREATE_ELEMENT_URL), (_req, res, ctx) => {
  return res.once(
    ctx.status(500),
    ctx.json({
      errorMessage: 'Database problem',
    })
  );
});
