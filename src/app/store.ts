import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { elementsCreateAsyncThunkFetchingReducer } from './createAsyncThunk/slice';
import { elementsThunkFetchingReducer } from './thunk-based/slice';
import { rtkQueryApi } from './rtk-query/api';
import { rtkQueryFnApi } from './rtk-query-queryfn/api';
import { elementsRtkQueryReducer } from './rtk-query/slice';
import { elementsRtkQueryFnReducer } from './rtk-query-queryfn/slice';

// TODO: change reducer names. We are not only fetching but doing other actions too
export const store = configureStore({
  reducer: {
    elementsThunkFetching: elementsThunkFetchingReducer,
    elementsCreateAsyncThunkFetching: elementsCreateAsyncThunkFetchingReducer,
    [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
    elementsRtkQuery: elementsRtkQueryReducer,
    [rtkQueryFnApi.reducerPath]: rtkQueryFnApi.reducer,
    elementsRtkQueryFn: elementsRtkQueryFnReducer,
  },
  middleware: (gDM) => gDM().concat(rtkQueryApi.middleware, rtkQueryFnApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppThunk<ExtraArgumentsType = any, ReturnThunkActionType = void> = ThunkAction<
  ReturnThunkActionType,
  RootState,
  ExtraArgumentsType,
  Action<string>
>;
