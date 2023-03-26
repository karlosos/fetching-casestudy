import { DeviceType, ElementData, GetElementsRequest, GetElementsResponse } from './apiTypes';
import { ElementDataApi, GetElementsRequestApi, GetElementsResponseApi } from './serverApiTypes';

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
    elements: response.elements.map((elementDataApi) => mapElement(elementDataApi)),
    totalElements: response.pageInfo.totalElements,
  };
};

const mapElement = (elementDataApi: ElementDataApi): ElementData => {
  return {
    id: elementDataApi.id,
    dn: elementDataApi.dn,
    deviceType: elementDataApi.deviceType as DeviceType,
    ip: elementDataApi.options.ip,
    latitude: elementDataApi.options.latitude,
    longitude: elementDataApi.options.longitude,
  };
};
