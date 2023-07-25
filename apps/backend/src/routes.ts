import { DependsOnMethod, Routing, ServeStatic } from 'express-zod-api';
import { join } from 'node:path';
import { createElementEndpoint, deleteElementEndpoint, getElementsEndpoint } from './controllers/elements.endpoints';

export const routing: Routing = {
  public: new ServeStatic(join(__dirname, 'assets'), {
    dotfiles: 'deny',
    index: false,
    redirect: false,
  }),
  api: {
    v1: {
      elements: {
        '': new DependsOnMethod({
          get: getElementsEndpoint,
          post: createElementEndpoint,
        }),
        ':id': new DependsOnMethod({
          delete: deleteElementEndpoint,
        }),
      },
    },
  },
};
