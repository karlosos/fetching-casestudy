/* eslint-disable no-console */
import fs from 'fs';
import { Documentation } from 'express-zod-api';
import { zodConfig } from '../configs';
import { routing } from '../routes';

console.log('✍️  Generating docs...');
// Check this for docs: https://github.com/RobinTail/express-zod-api/tree/master#creating-a-documentation
fs.writeFileSync(
  'apps/backend/docs/api.yaml',
  new Documentation({
    routing, // the same routing and config that you use to start the server
    config: zodConfig,
    version: '0.1',
    title: 'Fetching Casestudy Backend',
    serverUrl: 'http://localhost:8090',
    composition: 'inline', // optional, or "components" for keeping schemas in a separate dedicated section using refs
  }).getSpecAsYaml(),
  'utf-8'
);
console.log('✅ OpenAPI API Docs generated at ./docs/api.yaml');
