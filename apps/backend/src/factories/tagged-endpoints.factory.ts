import { EndpointsFactory, defaultResultHandler } from 'express-zod-api';
import { zodConfig } from '../configs';

export const taggedEndpointsFactory = new EndpointsFactory({
  resultHandler: defaultResultHandler,
  config: zodConfig,
});
