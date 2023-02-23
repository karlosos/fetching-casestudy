import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getElements } from '../../api';
import { ApiError } from '../../api/apiError';
import { ElementData, GetElementsRequest, GetElementsResponse } from '../../api/apiTypes';
import { AppThunk } from '../store';

interface ElementsState {
  elements: ElementData[] | null;
  totalElements: number | null;
  fetchingElementsStatus: 'idle' | 'ongoing' | 'success' | 'failed';
  fetchingElementsError: ApiError | null,
}

const initialState: ElementsState = {
  elements: null,
  totalElements: null,
  fetchingElementsStatus: 'idle',
  fetchingElementsError: null,
};

export const elementsThunkFetchSlice = createSlice({
  name: 'elementsThunkFetch',
  initialState,
  reducers: {
    fetchingElementsStarted: (state) => {
      state.fetchingElementsStatus = 'ongoing';
      state.fetchingElementsError = null;
    },
    fetchingElementsSuccess: (state, action: PayloadAction<GetElementsResponse>) => {
      state.totalElements = action.payload.totalElements;
      state.elements = action.payload.elements;
      state.fetchingElementsStatus = 'success';
    },
    fetchingElementsFailure: (state, action: PayloadAction<ApiError>) => {
      state.fetchingElementsError = action.payload;
      state.fetchingElementsStatus = 'failed';
    },
  },
});

const { fetchingElementsStarted, fetchingElementsSuccess, fetchingElementsFailure } = elementsThunkFetchSlice.actions;

export const elementsThunkFetchingReducer = elementsThunkFetchSlice.reducer;

/* Thunks */
// TODO: move types to something like ApiTypes
// I should not be able to access api types here
export const fetchElementsThunk =
  (request: GetElementsRequest): AppThunk =>
  async (dispatch, getState) => {
    if (getState().elementsThunkFetching.fetchingElementsStatus === 'ongoing') {
      return;
    }

    dispatch(fetchingElementsStarted());
    try {
      // TODO: create single entry point for calling api endpoints
      const data = await getElements(request);
      dispatch(fetchingElementsSuccess(data));
    } catch (e: any) {
      const error = e as ApiError;
      dispatch(fetchingElementsFailure(error));
    }
  };
