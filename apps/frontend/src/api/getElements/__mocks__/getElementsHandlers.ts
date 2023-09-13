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
    if (shouldThrowError({probability: 0.2})) {
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

export const elementsMock = [
  {
    id: '1',
    dn: '125342.T-MOBILE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '2',
    dn: 'BTS-ALFA.T-MOBILE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '3',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '4',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '5',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '6',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '7',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '8',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '9',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '10',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '11',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '12',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '13',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '14',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '15',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '17',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '18',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '19',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '20',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: '21',
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
];
