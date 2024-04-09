import { createHttpError, withMeta } from 'express-zod-api';
import { z } from 'zod';
import { taggedEndpointsFactory } from '../factories';
import { methodProviderMiddleware } from '../middlewares';
import {
  createElement,
  GetElements,
  getElements,
  ElementNoId,
  Element,
  deleteElement,
} from '../services/elements.service';
import { safe } from '../utils';

export const getElementsEndpoint = taggedEndpointsFactory.addMiddleware(methodProviderMiddleware).build({
  method: 'get',
  tag: 'elements',
  shortDescription: 'Retrieves all elements.',
  description: 'Example elements retrieval endpoint.',
  input: withMeta(
    z.object({
      page: z.number().optional(),
      limit: z.number().optional(),
    }),
  ).example({
    page: 1,
    limit: 50,
  }),
  output: withMeta(GetElements).example({
    elements: [
      {
        id: 1,
        dn: '125342.T-MOBILE.COM',
        deviceType: 'eNodeB',
        latitude: '123421.312312',
        longitude: '12313421.123123',
        ip: '129.120.120.0',
      },
      {
        id: 2,
        dn: 'BTS-ALFA.T-MOBILE.COM',
        deviceType: 'eNodeB',
        latitude: '123421.312312',
        longitude: '12313421.123123',
        ip: '129.120.120.0',
      },
    ],
    pageInfo: {
      totalPages: 1,
      totalElements: 2,
      numberOfElements: 2,
      page: 1,
      limit: 50,
    },
  }),
  handler: async ({ input, options: { method }, logger }) => {
    logger.debug(`Requested method ${method}, input: ${input}`);

    if (input.page && input.page > 1) throw createHttpError(404, 'Page not found');

    return getElements();
  },
});

export const createElementEndpoint = taggedEndpointsFactory.addMiddleware(methodProviderMiddleware).build({
  method: 'post',
  tag: 'elements',
  shortDescription: 'Create element.',
  input: withMeta(ElementNoId).example({
    dn: '125342.T-MOBILE.COM',
    deviceType: 'eNodeB',
    ip: '129.120.120.2',
    latitude: '123421.312312',
    longitude: '12313421.123123',
  }),
  output: withMeta(Element).example({
    id: 1,
    dn: '125342.T-MOBILE.COM',
    deviceType: 'eNodeB',
    ip: '129.120.120.2',
    latitude: '123421.312312',
    longitude: '12313421.123123',
  }),
  handler: async ({ input, options: { method }, logger }) => {
    logger.debug(`Requested method ${method}, input: ${input}`);

    try {
      const newElement = await createElement({
        deviceType: input.deviceType,
        dn: input.dn,
        ip: input.ip,
        latitude: input.latitude,
        longitude: input.longitude,
      });

      return {
        deviceType: newElement.deviceType,
        dn: newElement.dn,
        id: newElement.id,
        ip: newElement.ip,
        latitude: newElement.latitude,
        longitude: newElement.longitude,
      };
    } catch (e) {
      throw createHttpError(500, 'Something bad happened on the server');
    }
  },
});

// TODO: fix swagger for this endpoint
export const deleteElementEndpoint = taggedEndpointsFactory.addMiddleware(methodProviderMiddleware).build({
  method: 'delete',
  tag: 'elements',
  shortDescription: 'Delete element by its ID.',
  input: withMeta(
    z.object({
      id: z
        .string()
        .trim()
        .regex(/\d+/)
        .transform((id) => parseInt(id, 10))
        .describe('a numeric string containing the id of the user'),
    }),
  ).example({
    id: '12',
  }),
  output: withMeta(z.object({})),
  handler: async ({ input, options: { method }, logger }) => {
    logger.debug(`Requested method ${method}, input: ${input}`);

    const result = safe(() => deleteElement(input.id));
    if (result.ok) {
      return {};
    } else {
      console.error(result.data);
      throw createHttpError(500, 'Not implemented yet!');
    }
  },
});
