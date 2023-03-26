import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getElements as getElementsApi, deleteElement as deleteElementApi } from '../../api';
import { ApiError, ApiErrorSerialized, serializeApiError } from '../../api/apiError';
import { ElementData, GetElementsRequest, GetElementsResponse } from '../../api/apiTypes';
import { AppThunk } from '../store';

interface ElementsState {
  elements: ElementData[] | undefined;
  totalElements: number | undefined;
  elementIdsBeingDeleted: { [elementId: string]: boolean };
  fetchingElementsStatus: 'idle' | 'ongoing' | 'success' | 'failed';
  fetchingElementsError: ApiErrorSerialized | undefined;
}

const initialState: ElementsState = {
  elements: undefined,
  totalElements: undefined,
  elementIdsBeingDeleted: {},
  fetchingElementsStatus: 'idle',
  fetchingElementsError: undefined,
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
  },
});

const { fetchingElementsStarted, fetchingElementsSuccess, fetchingElementsFailure, deleteElementStarted, deleteElementSuccess, deleteElementFailure } = elementsThunkFetchSlice.actions;

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
