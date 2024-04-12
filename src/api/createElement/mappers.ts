import { mapElementApiToElement } from '../getElements/mappers';
import { CreateElementRequest, CreateElementResponse } from './apiTypes';
import { CreateElementRequestApi, CreateElementResponseApi } from './serverApiTypes';

export const mapRequest = (request: CreateElementRequest): CreateElementRequestApi => {
  return {
    deviceType: request.deviceType,
    dn: request.dn,
    options: {
      ip: request.ip,
      latitude: request.latitude,
      longitude: request.longitude,
    },
  };
};

export const mapResponse = (response: CreateElementResponseApi): CreateElementResponse => {
  return mapElementApiToElement(response);
};
