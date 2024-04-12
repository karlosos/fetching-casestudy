import { setupWorker } from 'msw';
import { handlers } from '../handlers';

export const setupMocks = () => {
  const worker = setupWorker(...handlers);
  worker.start();
};
