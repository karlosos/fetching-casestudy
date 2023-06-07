import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getElements as getElementsApi,
  deleteElement as deleteElementApi,
  createElement as createElementApi,
} from '../../api';
import { ApiError, ApiErrorSerialized, serializeApiError } from '../../api/apiError';
import { CreateElementRequest, Element, GetElementsRequest, GetElementsResponse } from '../../api/apiTypes';
import { AppThunk } from '../store';

type ApiStatus = 'idle' | 'ongoing' | 'success' | 'failed';

interface ElementsState {
  elements: Element[] | undefined;
  totalElements: number | undefined;
  elementIdsBeingDeleted: { [elementId: string]: boolean };
  fetchingElementsStatus: ApiStatus;
  creatingElementStatus: ApiStatus;
  fetchingElementsError: ApiErrorSerialized | undefined;
}

const initialState: ElementsState = {
  elements: undefined,
  totalElements: undefined,
  elementIdsBeingDeleted: {},
  fetchingElementsStatus: 'idle',
  fetchingElementsError: undefined,
  creatingElementStatus: 'idle',
};

export const elementsThunkFetchSlice = createSlice({
  name: 'elementsThunkFetch',
  initialState,
  reducers: {
    // fetching
    fetchingElementsStarted: (state) => {
      state.fetchingElementsStatus = 'ongoing';
      state.fetchingElementsError = undefined;
    },
    fetchingElementsSuccess: (state, action: PayloadAction<GetElementsResponse>) => {
      state.totalElements = action.payload.totalElements;
      state.elements = action.payload.elements;
      state.fetchingElementsStatus = 'success';
    },
    fetchingElementsFailure: (state, action: PayloadAction<ApiErrorSerialized>) => {
      state.fetchingElementsError = action.payload;
      state.fetchingElementsStatus = 'failed';
      state.elements = undefined;
    },
    // deleting
    deleteElementStarted: (state, action: PayloadAction<string>) => {
      state.elementIdsBeingDeleted[action.payload] = true;
    },
    deleteElementSuccess: (state, action: PayloadAction<string>) => {
      state.elements = state.elements?.filter((element) => element.id !== action.payload);
      state.elementIdsBeingDeleted[action.payload] = false;
    },
    deleteElementFailure: (state, action: PayloadAction<string>) => {
      state.elementIdsBeingDeleted[action.payload] = false;
    },
    // creating
    createElementStarted: (state) => {
      state.creatingElementStatus = 'ongoing';
    },
    createElementSuccess: (state) => {
      state.creatingElementStatus = 'success';
    },
    createElementFailed: (state) => {
      state.creatingElementStatus = 'failed';
    },
  },
});

const {
  fetchingElementsStarted,
  fetchingElementsSuccess,
  fetchingElementsFailure,
  deleteElementStarted,
  deleteElementSuccess,
  deleteElementFailure,
  createElementStarted,
  createElementSuccess,
  createElementFailed,
} = elementsThunkFetchSlice.actions;

export const elementsThunkFetchingReducer = elementsThunkFetchSlice.reducer;

/* Thunks */
// TODO: move types to something like ApiTypes
// I should not be able to access api types here
export const fetchElements =
  (request: GetElementsRequest): AppThunk =>
  async (dispatch, getState) => {
    if (getState().elementsThunkFetching.fetchingElementsStatus === 'ongoing') {
      return;
    }

    dispatch(fetchingElementsStarted());
    try {
      // TODO: create single entry point for calling api endpoints
      const data = await getElementsApi(request);
      dispatch(fetchingElementsSuccess(data));
    } catch (e: any) {
      const error = e as ApiError;
      dispatch(fetchingElementsFailure(serializeApiError(error)));
    }
  };

export const deleteElement =
  (elementId: string): AppThunk =>
  async (dispatch, getState) => {
    const elementIdsBeingDeleted = getState().elementsThunkFetching.elementIdsBeingDeleted;

    if (elementIdsBeingDeleted[elementId] === true) {
      return;
    }

    dispatch(deleteElementStarted(elementId));
    try {
      await deleteElementApi({ elementId: elementId });
      dispatch(deleteElementSuccess(elementId));
    } catch (e) {
      dispatch(deleteElementFailure(elementId));
    }
  };

type ReturnThunkApi = Promise<{ status: ApiStatus; error?: string }>;

export const createElement =
  (element: CreateElementRequest): AppThunk<any, ReturnThunkApi> =>
  async (dispatch, getState): ReturnThunkApi => {
    if (getState().elementsThunkFetching.creatingElementStatus === 'ongoing') {
      return { status: 'ongoing' };
    }

    dispatch(createElementStarted());
    try {
      await createElementApi(element);
      dispatch(createElementSuccess());
      dispatch(
        fetchElements({
          size: 50,
          startIndex: 0,
        })
      );

      return {
        status: 'success',
      };
    } catch (e) {
      const error = e as ApiError;

      dispatch(createElementFailed());
      dispatch(
        fetchElements({
          size: 50,
          startIndex: 0,
        })
      );
      return {
        status: 'failed',
        error: error.message,
      };
    }
  };
