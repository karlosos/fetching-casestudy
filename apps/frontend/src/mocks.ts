import { setupWorker } from 'msw';
import { handlers } from './api/handlers';

// eslint-disable-next-line prefer-const
let browserMocksEnabled = false;

// Uncomment to enable browser mocks
browserMocksEnabled = true;

if (browserMocksEnabled) {
  const worker = setupWorker(...handlers);
  worker.start();
}
