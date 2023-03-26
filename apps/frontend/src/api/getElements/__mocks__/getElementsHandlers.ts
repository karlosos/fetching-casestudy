import { rest } from 'msw';
import { ErrorResponse } from '../../apiError';
import { createApiUrl } from '../../createApi';
import { shouldThrowError, simulateDelay } from '../../mockUtils';
import { GET_ELEMENTS_URL } from '../getElementsApi';

import { GetElementsResponseApi } from '../serverApiTypes';

export const getElementsBrowserMockHandler = rest.get<any, any, GetElementsResponseApi | ErrorResponse>(
  createApiUrl(GET_ELEMENTS_URL),
  async (req, res, ctx) => {
    await simulateDelay(500, 1000);
    if (shouldThrowError()) {
      return res(
        ctx.status(429),
        ctx.json({
          errorMessage: 'Error message from the backend',
          internalErrCode: 89392,
        })
      );
    }

    const limit = req.url.searchParams.get('limit');
    const page = req.url.searchParams.get('page');
    const elements = elementsMock;

    const response: GetElementsResponseApi = {
      elements: elements,
      pageInfo: {
        limit: parseInt(limit!),
        page: parseInt(page!),
        numberOfElements: elements.length,
        totalElements: elements.length,
        totalPages: 1,
      },
    };
    return res(ctx.status(200), ctx.json(response));
  }
);

export const getElementsResponseHandler = rest.get<any, any, GetElementsResponseApi>(
  createApiUrl(GET_ELEMENTS_URL),
  async (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit');
    const page = req.url.searchParams.get('page');
    const elements = elementsMock;

    const response: GetElementsResponseApi = {
      elements: elements,
      pageInfo: {
        limit: parseInt(limit!),
        page: parseInt(page!),
        numberOfElements: elements.length,
        totalElements: elements.length,
        totalPages: 1,
      },
    };
    return res(ctx.status(200), ctx.json(response));
  }
);

export const getElementsErrorHandler = rest.get(createApiUrl(GET_ELEMENTS_URL), (_req, res, ctx) => {
  return res.once(
    ctx.status(500),
    ctx.json({
      errorMessage: 'Database problem',
    })
  );
});

const elementsMock = [
  {
    dn: '125342.T-MOBILE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    dn: 'BTS-ALFA.T-MOBILE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
];
