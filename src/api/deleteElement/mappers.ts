import { DeleteElementRequest } from './apiTypes';
import { DeleteElementRequestApi } from './serverApiTypes';

export const mapRequest = (request: DeleteElementRequest): DeleteElementRequestApi => {
  return {
    elementId: request.elementId,
  };
};
