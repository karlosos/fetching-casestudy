import { createHttpError, ez, withMeta } from 'express-zod-api';
import { z } from 'zod';
import { taggedEndpointsFactory } from '../factories';
import { methodProviderMiddleware } from '../middlewares';
import { exampleWithRandomThrow } from '../services';
import { GetElements, getElements } from '../services/elements.service';
import { safeAsync, safe } from '../utils';

export const getElementsEndpoint = taggedEndpointsFactory.addMiddleware(methodProviderMiddleware).build({
  method: 'get',
  tag: 'elements',
  shortDescription: 'Retrieves all elements.',
  description: 'Example elements retrieval endpoint.',
  input: withMeta(
    z.object({
      page: z.string().transform((value) => parseInt(value)),
      limit: z.string().transform((value) => parseInt(value)),
    })
  ).example({
    page: '1',
    limit: '50',
  }),
  output: withMeta(GetElements).example({
    elements: [
      {
        id: 1,
        dn: '125342.T-MOBILE.COM',
        deviceType: 'eNodeB',
        options: {
          latitude: '123421.312312',
          longitude: '12313421.123123',
          ip: '129.120.120.0',
        },
      },
      {
        id: 2,
        dn: 'BTS-ALFA.T-MOBILE.COM',
        deviceType: 'eNodeB',
        options: {
          latitude: '123421.312312',
          longitude: '12313421.123123',
          ip: '129.120.120.0',
        },
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
  handler: async ({ input: { page, limit }, options: { method }, logger }) => {
    logger.debug(`Requested page: ${page}, limig: ${limit}, method: ${method}`);

    if (page > 1) throw createHttpError(404, 'Page not found');

    return getElements();
  },
});

export const createElementEndpoint = taggedEndpointsFactory.addMiddleware(methodProviderMiddleware).build({
  method: 'post',
  tag: 'elements',
  shortDescription: 'Create element.',
  input: withMeta(
    z.object({
      name: z.string().min(1),
    })
  ).example({
    name: 'John Doe',
  }),
  output: withMeta(
    z.object({
      id: z.number(),
      name: z.string(),
      createdAt: ez.dateOut(),
    })
  ).example({
    id: 1,
    name: 'John Doe',
    createdAt: new Date('2021-12-31'),
  }),
  handler: async ({ input: { name }, options: { method }, logger }) => {
    logger.debug(`Requested method ${method}, Name to set: ${name}`);

    throw createHttpError(500, 'Not implemented yet!');
  },
});

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
      name: z.string().min(1),
    })
  ).example({
    id: '12',
    name: 'John Doe',
  }),
  output: withMeta(
    z.object({
      name: z.string(),
      createdAt: ez.dateOut(),
    })
  ).example({
    name: 'John Doe',
    createdAt: new Date('2021-12-31'),
  }),
  handler: async ({ input: { id, name }, options: { method }, logger }) => {
    logger.debug(`Requested id: ${id}, method ${method}, Name to set: ${name}`);

    if (id > 100) throw createHttpError(404, 'User not found');

    throw createHttpError(500, 'Not implemented yet!');
  },
});
