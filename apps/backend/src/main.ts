import { createServer } from 'express-zod-api';
import { zodConfig } from './configs';
import { routing } from './routes';

/**
 * https://www.npmjs.com/package/express-zod-api
 * https://github.com/TheNaubit/Minimal-Express-Zod-Api-Boilerplate/tree/main
 */

createServer(zodConfig, routing);
console.log(`Listening at http://localhost:${zodConfig.server.listen.toString()}/api`);
