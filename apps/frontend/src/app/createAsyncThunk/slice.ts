import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getElements } from '../../api';
import { ApiError, ApiErrorSerialized, serializeApiError } from '../../api/apiError';
import { ElementData, GetElementsRequest } from '../../api/apiTypes';
import { AppDispatch, RootState } from '../store';

type RequestState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

interface ElementsState {
  elements: ElementData[] | undefined;
  totalElements: number | undefined;
  fetchingElementsStatus: RequestState;
  fetchingElementsError: ApiErrorSerialized | undefined;
}

const initialState: ElementsState = {
  elements: undefined,
  totalElements: undefined,
  fetchingElementsStatus: 'idle',
  fetchingElementsError: undefined,
};

export const elementsCreateAsyncThunkFetchSlice = createSlice({
  name: 'elementsCreateAsyncThunkFetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchElements.pending, (state) => {
      state.fetchingElementsStatus = 'pending';
    });
    builder.addCase(fetchElements.fulfilled, (state, action) => {
      state.fetchingElementsStatus = 'fulfilled';
      const { elements, totalElements } = action.payload;
      state.elements = elements;
      state.totalElements = totalElements;
    });
    builder.addCase(fetchElements.rejected, (state, action) => {
      state.fetchingElementsStatus = 'rejected';
      state.fetchingElementsError = action.payload;
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
      const data = await getElements(request);
      return data;
    } catch (err) {
      const error = err as ApiError;
      return rejectWithValue(serializeApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const { fetchingElementsStatus } = getState().elementsCreateAsyncThunkFetching;
      if (fetchingElementsStatus === 'pending') {
        return false;
      }
    },
  }
);
