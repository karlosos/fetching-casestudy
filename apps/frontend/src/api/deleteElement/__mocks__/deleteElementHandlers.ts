import { rest } from 'msw';
import { createApiUrl } from '../../createApi';
import { shouldThrowError, simulateDelay } from '../../mockUtils';
import { DELETE_ELEMENT_URL } from '../deleteElementApi';
import { elementsMock } from '../../getElements/__mocks__/getElementsHandlers';

export const deleteElementBrowserMockHandler = rest.delete(
  createApiUrl(DELETE_ELEMENT_URL),
  async (req, res, ctx) => {
    await simulateDelay(3000, 4000);
    if (shouldThrowError()) {
      return res(
        ctx.status(429),
        ctx.json({
          errorMessage: 'Error message from the backend',
          internalErrCode: 89392,
        })
      );
    }

    const { elementId } = req.params

    // find given element and remove it from memory
    const idx = elementsMock.findIndex((element) => element.id === elementId);
    if (idx >= 0) {
        elementsMock.splice(idx, 1);
        return res(ctx.status(204));
    }

    return res(ctx.status(404));
  }
);

export const deleteElementResponseHandler = rest.delete(
  createApiUrl(DELETE_ELEMENT_URL),
  async (req, res, ctx) => {
    return res(ctx.status(204));
  }
);

export const deleteElementNotFoundResponseHandler = rest.delete(
  createApiUrl(DELETE_ELEMENT_URL),
  async (req, res, ctx) => {
    return res(ctx.status(404));
  }
);

export const deleteElementServerErrorHandler = rest.delete(createApiUrl(DELETE_ELEMENT_URL), (_req, res, ctx) => {
  return res.once(
    ctx.status(500),
    ctx.json({
      errorMessage: 'Database problem',
    })
  );
});
