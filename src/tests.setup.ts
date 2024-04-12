import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './api/mocks/mockServer';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
