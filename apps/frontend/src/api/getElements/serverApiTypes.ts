export type GetElementsRequestApi = {
  limit?: number;
  page?: number;
};

export type GetElementsResponseApi = {
  elements: ElementDataApi[];
  pageInfo: PageInfo;
};

export type ElementDataApi = {
  id: string;
  dn: string;
  deviceType: string;
  options: {
    latitude: string;
    longitude: string;
    ip: string;
  };
};

export type PageInfo = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  page: number;
  limit: number;
};
