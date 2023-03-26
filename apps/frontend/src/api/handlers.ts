import { deleteElementBrowserMockHandler } from "./deleteElement/__mocks__/deleteElementHandlers";
import { getElementsBrowserMockHandler } from "./getElements/__mocks__/getElementsHandlers";

export const handlers = [
    getElementsBrowserMockHandler,
    deleteElementBrowserMockHandler,
]