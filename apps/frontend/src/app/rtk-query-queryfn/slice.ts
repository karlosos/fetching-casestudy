import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ElementsState {
  elementIdsBeingDeleted: { [elementId: string]: boolean };
}

const initialState: ElementsState = {
  elementIdsBeingDeleted: {},
};

export const elementsRtkQueryFnSlice = createSlice({
  name: 'elementsRtkQueryFn',
  initialState,
  reducers: {
    // deleting
    deleteElementStarted: (state, action: PayloadAction<string>) => {
      state.elementIdsBeingDeleted[action.payload] = true;
    },
    deleteElementEnded: (state, action: PayloadAction<string>) => {
      state.elementIdsBeingDeleted[action.payload] = false;
    },
  },
});

export const { deleteElementStarted, deleteElementEnded } = elementsRtkQueryFnSlice.actions;

export const elementsRtkQueryFnReducer = elementsRtkQueryFnSlice.reducer;
