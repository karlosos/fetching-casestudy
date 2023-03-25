import axios, { AxiosInstance } from 'axios';

export const GATEWAY_URL = 'http://localhost:3333';
export const SERVICE_URL = '/api';
export const TOKEN = 'jsdghfiuhg49732bcsfdi32ty9gvydsi8g9723g';

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: GATEWAY_URL + SERVICE_URL,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ContentType: 'application/json',
    },
  });

  return api;
};

export const createApiUrl = (requestUrl: string) => {
  return GATEWAY_URL + SERVICE_URL + requestUrl;
};
