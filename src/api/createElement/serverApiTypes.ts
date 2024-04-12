import { ElementApi } from '../getElements/serverApiTypes';

export type CreateElementRequestApi = Omit<ElementApi, 'id'>;
export type CreateElementResponseApi = ElementApi;
