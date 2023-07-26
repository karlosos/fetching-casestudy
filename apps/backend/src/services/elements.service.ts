import { z } from 'zod';
import { elementsRepository } from '../models/elements.model';

export const Element = z.object({
  id: z.number(),
  dn: z.string(),
  deviceType: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  ip: z.string(),
});
export type Element = z.infer<typeof Element>;

const PageInfo = z.object({
  totalPages: z.number(),
  totalElements: z.number(),
  numberOfElements: z.number(),
  page: z.number(),
  limit: z.number(),
});
type PageInfo = z.infer<typeof PageInfo>;

export const GetElements = z.object({
  elements: z.array(Element),
  pageInfo: PageInfo,
});
type GetElements = z.infer<typeof GetElements>;

export const getElements = (): GetElements => {
  const elements = elementsRepository.getAllElements();
  return {
    elements: elements.map((element) => ({
      id: element.id,
      dn: element.dn,
      deviceType: element.deviceType,
      latitude: element.latitude,
      longitude: element.longitude,
      ip: element.ip,
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

export const ElementNoId = Element.omit({id: true});
type ElementNoId = z.infer<typeof ElementNoId>;

export const createElement = (newElement: ElementNoId) => {
  const element = elementsRepository.insertElement(newElement);
  return element;
};

export const deleteElement = (id: number) => {
  elementsRepository.deleteElement(id);
};
