import { createHttpError, ez, withMeta } from 'express-zod-api';
import { z } from 'zod';
import { taggedEndpointsFactory } from '../factories';
import { methodProviderMiddleware } from '../middlewares';
import { insertElement } from '../models/elements.model';
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
      page: z
        .number()
        .nullable(),
      limit: z
        .number()
        .nullable(),
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
  input: withMeta(
    z.object({
      dn: z.string(),
      deviceType: z.string(),
      options: z.object({
        latitude: z.string(),
        longitude: z.string(),
        ip: z.string(),
      }),
    }),
  ).example({
    dn: '125342.T-MOBILE.COM',
    deviceType: 'eNodeB',
    options: { ip: '129.120.120.2', latitude: '123421.312312', longitude: '12313421.123123' },
  }),
  output: withMeta(
    z.object({
      id: z.number(),
      dn: z.string(),
      deviceType: z.string(),
      options: z.object({
        latitude: z.string(),
        longitude: z.string(),
        ip: z.string(),
      }),
      // createdAt: ez.dateOut(),
    }),
  ).example({
    id: 1,
    dn: '125342.T-MOBILE.COM',
    deviceType: 'eNodeB',
    options: { ip: '129.120.120.2', latitude: '123421.312312', longitude: '12313421.123123' },
  }),
  handler: async ({ input, options: { method }, logger }) => {
    logger.debug(`Requested method ${method}, input: ${input}`);

    try {
      const newElement = await insertElement({
        deviceType: input.deviceType,
        dn: input.dn,
        ip: input.options.ip,
        latitude: input.options.latitude,
        longitude: input.options.longitude,
      });

      return {
        deviceType: newElement.deviceType,
        dn: newElement.dn,
        id: newElement.id,
        options: {
          ip: newElement.ip,
          latitude: newElement.latitude,
          longitude: newElement.longitude,
        },
      };
    } catch (e) {
      throw createHttpError(500, 'Something bad happened on the server');
    }
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
    }),
  ).example({
    id: '12',
    name: 'John Doe',
  }),
  output: withMeta(
    z.object({
      name: z.string(),
      createdAt: ez.dateOut(),
    }),
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
