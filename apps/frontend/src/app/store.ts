import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { elementsCreateAsyncThunkFetchingReducer } from './createAsyncThunk/slice'
import { elementsThunkFetchingReducer } from './thunk-based/slice'
import { rtkQueryApi } from './rtk-query/api'

export const store = configureStore({
  reducer: {
    elementsThunkFetching: elementsThunkFetchingReducer,
    elementsCreateAsyncThunkFetching: elementsCreateAsyncThunkFetchingReducer,
    [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
  },
  middleware: (gDM) => gDM().concat(rtkQueryApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ExtraArgumentsType = any, ReturnThunkActionType = void> = ThunkAction<
  ReturnThunkActionType,
  RootState,
  ExtraArgumentsType,
  Action<string>
>;