import { z } from 'zod';
import { getAllElements } from '../models/elements.model';

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
type GetElements = z.infer<typeof GetElements>;


export const getElements = (): GetElements => {
  const elements = getAllElements();
  return {
    elements: elements.map((element) => ({
      id: element.id,
      dn: element.dn,
      deviceType: element.deviceType,
      options: {
        latitude: element.latitude,
        longitude: element.longitude,
        ip: element.ip,
      },
    })),
    pageInfo: {
      totalPages: 1,
      totalElements: elements.length,
      numberOfElements: elements.length,
      page: 1,
      limit: 50,
    },
  };
};

export const createElement = () => {
  return undefined;
};

export const deleteElement = (id: number) => {
  return undefined;
};
