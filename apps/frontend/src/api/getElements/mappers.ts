import { DeviceType, Element, GetElementsRequest, GetElementsResponse } from './apiTypes';
import { ElementApi, GetElementsRequestApi, GetElementsResponseApi } from './serverApiTypes';

export const mapRequest = (request: GetElementsRequest): GetElementsRequestApi => {
  return {
    limit: request.size,
    page: calculatePage(request.size, request.startIndex),
  };
};

const calculatePage = (size: number, startIndex: number) => {
  return Math.floor(((startIndex || 0) + 0.1) / size);
};

export const mapResponse = (response: GetElementsResponseApi): GetElementsResponse => {
  return {
    elements: response.elements.map((elementApi) => mapElementApiToElement(elementApi)),
    totalElements: response.pageInfo.totalElements,
  };
};

export const mapElementApiToElement = (elementApi: ElementApi): Element => {
  return {
    id: elementApi.id,
    dn: elementApi.dn,
    deviceType: elementApi.deviceType as DeviceType,
    ip: elementApi.options.ip,
    latitude: elementApi.options.latitude,
    longitude: elementApi.options.longitude,
  };
};
