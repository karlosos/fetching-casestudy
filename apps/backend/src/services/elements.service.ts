import { z } from 'zod';

const Element = z.object({
  id: z.number(),
  dn: z.string(),
  deviceType: z.string(),
  options: z.object({
    latitude: z.string(),
    longitude: z.string(),
    ip: z.string(),
  }),
});

const PageInfo = z.object({
  totalPages: z.number(),
  totalElements: z.number(),
  numberOfElements: z.number(),
  page: z.number(),
  limit: z.number(),
});

export const GetElements = z.object({
  elements: z.array(Element),
  pageInfo: PageInfo,
});

let elements = [
  {
    id: 1,
    dn: '125342.T-MOBILE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: 2,
    dn: 'BTS-ALFA.T-MOBILE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: 3,
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
  {
    id: 4,
    dn: 'BTS-123.FROM.BACKEND',
    deviceType: 'eNodeB',
    options: {
      latitude: '123421.312312',
      longitude: '12313421.123123',
      ip: '129.120.120.0',
    },
  },
];

export const getElements = () => {
  return GetElements.parse({
    elements: elements,
    pageInfo: {
      totalPages: 1,
      totalElements: elements.length,
      numberOfElements: elements.length,
      page: 1,
      limit: 50,
    },
  });
};

export const createElement = () => {
  return undefined;
};

export const deleteElement = (id: number) => {
  elements = elements.filter((element) => element.id !== id);
};
