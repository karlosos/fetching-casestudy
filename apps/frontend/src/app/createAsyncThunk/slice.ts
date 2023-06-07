import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getElements as getElementsApi, deleteElement as deleteElementApi, createElement as createElementApi } from '../../api';
import { ApiError, ApiErrorSerialized, serializeApiError } from '../../api/apiError';
import { CreateElementRequest, Element, GetElementsRequest } from '../../api/apiTypes';
import { AppDispatch, RootState } from '../store';

type RequestState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

interface ElementsState {
  elements: (Element & { isDeleting?: boolean })[] | undefined;
  totalElements: number | undefined;
  // instead of having different data with deleting status I could
  // change elements state to accept `isDeleting` field like:
  // elements: (Element & { isDeleting?: boolean })[] | undefined;
  elementIdsBeingDeleted: { [elementId: string]: boolean };
  fetchingElementsStatus: RequestState;
  fetchingElementsError: ApiErrorSerialized | undefined;
  creatingElementStatus: RequestState;
}

const initialState: ElementsState = {
  elements: undefined,
  totalElements: undefined,
  elementIdsBeingDeleted: {},
  fetchingElementsStatus: 'idle',
  fetchingElementsError: undefined,
  creatingElementStatus: 'idle',
};

export const elementsCreateAsyncThunkFetchSlice = createSlice({
  name: 'elementsCreateAsyncThunkFetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching
    builder.addCase(fetchElements.pending, (state) => {
      state.fetchingElementsStatus = 'pending';
    });
    builder.addCase(fetchElements.fulfilled, (state, action) => {
      state.fetchingElementsStatus = 'fulfilled';
      const { elements, totalElements } = action.payload;
      state.elements = elements;
      state.totalElements = totalElements;
      state.fetchingElementsError = undefined;
    });
    builder.addCase(fetchElements.rejected, (state, action) => {
      state.fetchingElementsStatus = 'rejected';
      state.fetchingElementsError = action.payload;
    });
    // Deleting
    builder.addCase(deleteElement.pending, (state, action) => {
      const elementId = action.meta.arg;
      state.elementIdsBeingDeleted[elementId] = true;
    });
    builder.addCase(deleteElement.fulfilled, (state, action) => {
      const elementId = action.payload;
      state.elements = state.elements?.filter((element) => element.id !== elementId);
      state.elementIdsBeingDeleted[elementId] = false;
    });
    builder.addCase(deleteElement.rejected, (state, action) => {
      // TODO: why payload can be undefined?
      if (action.payload?.elementId) {
        state.elementIdsBeingDeleted[action.payload.elementId] = false;
      }
    });
    // Creating 
    builder.addCase(createElement.pending, (state) => {
      state.creatingElementStatus = 'pending';
    });
    builder.addCase(createElement.fulfilled, (state) => {
      state.creatingElementStatus = 'fulfilled';
    });
    builder.addCase(createElement.rejected, (state) => {
      state.creatingElementStatus = 'rejected';
    });
  },
});

export const elementsCreateAsyncThunkFetchingReducer = elementsCreateAsyncThunkFetchSlice.reducer;

/* Thunks */
// This would probably be defined in global store file like `hooks.ts`
const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: ApiErrorSerialized;
}>();

// docs: https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchElements = createAppAsyncThunk(
  'fetchElements',
  async (request: GetElementsRequest, { rejectWithValue }) => {
    try {
      const data = await getElementsApi(request);
      return data;
    } catch (err) {
      const error = err as ApiError;
      return rejectWithValue(serializeApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const fetchingElementsStatus = getState().elementsCreateAsyncThunkFetching.fetchingElementsStatus;
      if (fetchingElementsStatus === 'pending') {
        return false;
      }
    },
  }
);

export const deleteElement = createAppAsyncThunk<
  string, // the type with which deleteElement.fullfiled will be called
  string, // the type of request to the thunk
  { dispatch: AppDispatch; state: RootState; rejectValue: { elementId: string; error: ApiErrorSerialized } }
>(
  'deleteElement',
  async (elementId, { rejectWithValue }) => {
    try {
      await deleteElementApi({ elementId: elementId });
      return elementId;
    } catch (err) {
      const error = err as ApiError;
      return rejectWithValue({ elementId: elementId, error: serializeApiError(error) });
    }
  },
  {
    condition: (elementId, { getState }) => {
      const elementIdsBeingDeleted = getState().elementsCreateAsyncThunkFetching.elementIdsBeingDeleted;
      if (elementIdsBeingDeleted[elementId] === true) {
        return false;
      }
    },
  }
);

export const createElement = createAppAsyncThunk(
  'createElement',
  async (request: CreateElementRequest, { rejectWithValue }) => {
    try {
      await createElementApi(request);
    } catch (err) {
      const error = err as ApiError;
      return rejectWithValue(serializeApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const creatingElementStatus = getState().elementsCreateAsyncThunkFetching.creatingElementStatus;
      if (creatingElementStatus === 'pending') {
        return false;
      }
    },
  }
);
