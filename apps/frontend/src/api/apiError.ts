import { AxiosError } from 'axios';

export class ApiError extends Error {
  name = 'ApiError';
  message = '';
  errorCode: number | string = 0;
  rootCause?: string;
  statusCode = 0;

  constructor({
    message,
    errorCode = 0,
    statusCode = 0,
    rootCause,
    name,
  }: {
    message: string;
    errorCode: number | string;
    statusCode: number;
    rootCause?: string;
    name?: string;
  }) {
    super();
    this.message = message;
    this.errorCode = errorCode;
    this.rootCause = rootCause;
    this.statusCode = statusCode;

    if (name) {
      this.name = name;
    }
  }
}

// Because redux doesn't like to have non-serializable data
export type ApiErrorSerialized = {
  message: string;
  errorCode: number | string;
  rootCause?: string;
  statusCode: number;
}

export const serializeApiError = (error: ApiError) => {
  const apiErrorSerialized: ApiErrorSerialized = {
    message: error.message,
    errorCode: error.errorCode,
    rootCause: error.rootCause,
    statusCode: error.statusCode,
  }
  return apiErrorSerialized; 
}

export const throwApiError = (error: AxiosError<any>) => {
  const statusCode = error.response?.status || 500;
  const errorCode = error.response?.data?.internalErrCode || 500;
  const message = error.response?.data?.errorMessage || 'Error: Internal Server Error.';

  throw new ApiError({ message, errorCode, statusCode });
};

export type ErrorResponse = {
  internalErrCode?: number,
  errorMessage?: string,
}