import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getElements as getElementsApi,
  deleteElement as deleteElementApi,
  createElement as createElementApi,
} from '../../api';
import { ApiError, ApiErrorSerialized, serializeApiError } from '../../api/apiError';
import { CreateElementRequest, Element, GetElementsRequest, GetElementsResponse } from '../../api/apiTypes';
import { AppThunk } from '../store';
import { RequestStatus } from '../types';

interface ElementsState {
  elements: Element[] | undefined;
  totalElements: number | undefined;
  elementIdsBeingDeleted: { [elementId: string]: boolean };
  fetchingElementsStatus: RequestStatus;
  creatingElementStatus: RequestStatus;
  fetchingElementsError: ApiErrorSerialized | undefined;
}

const initialState: ElementsState = {
  elements: undefined,
  totalElements: undefined,
  elementIdsBeingDeleted: {},
  fetchingElementsStatus: RequestStatus.Idle,
  fetchingElementsError: undefined,
  creatingElementStatus: RequestStatus.Idle,
};

export const elementsThunkFetchSlice = createSlice({
  name: 'elementsThunkFetch',
  initialState,
  reducers: {
    // fetching
    fetchingElementsStarted: (state) => {
      state.fetchingElementsStatus = RequestStatus.Ongoing;
      state.fetchingElementsError = undefined;
    },
    fetchingElementsSuccess: (state, action: PayloadAction<GetElementsResponse>) => {
      state.totalElements = action.payload.totalElements;
      state.elements = action.payload.elements;
      state.fetchingElementsStatus = RequestStatus.Success;
    },
    fetchingElementsFailure: (state, action: PayloadAction<ApiErrorSerialized>) => {
      state.fetchingElementsError = action.payload;
      state.fetchingElementsStatus = RequestStatus.Failed;
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
      state.creatingElementStatus = RequestStatus.Ongoing;
    },
    createElementSuccess: (state) => {
      state.creatingElementStatus = RequestStatus.Success;
    },
    createElementFailed: (state) => {
      state.creatingElementStatus = RequestStatus.Failed;
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
    if (getState().elementsThunkFetching.fetchingElementsStatus === RequestStatus.Ongoing) {
      return;
    }

    dispatch(fetchingElementsStarted());
    try {
      // TODO: create single entry point for calling api endpoints
      const data = await getElementsApi(request);
      dispatch(fetchingElementsSuccess(data));
    } catch (e) {
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

type ReturnThunkApi = Promise<{ status: RequestStatus; error?: string }>;

export const createElement =
  (element: CreateElementRequest): AppThunk<CreateElementRequest, ReturnThunkApi> =>
  async (dispatch, getState): ReturnThunkApi => {
    if (getState().elementsThunkFetching.creatingElementStatus === RequestStatus.Ongoing) {
      return { status: RequestStatus.Ongoing };
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
        status: RequestStatus.Success,
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
        status: RequestStatus.Failed,
        error: error.message,
      };
    }
  };
