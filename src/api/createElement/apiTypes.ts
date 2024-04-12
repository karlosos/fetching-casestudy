import { Element } from "../apiTypes";

export type CreateElementRequest = Omit<Element, 'id'>;

export type CreateElementResponse = Element;