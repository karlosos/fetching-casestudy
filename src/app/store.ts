import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { elementsWithCreateAsyncThunksReducer } from './createAsyncThunk/slice';
import { elementsWithThunksReducer } from './thunk-based/slice';
import { rtkQueryApi } from './rtk-query/api';
import { rtkQueryFnApi } from './rtk-query-queryfn/api';
import { elementsRtkQueryReducer } from './rtk-query/slice';
import { elementsRtkQueryFnReducer } from './rtk-query-queryfn/slice';

export const store = configureStore({
  reducer: {
    elementsWithThunks: elementsWithThunksReducer,
    elementsWithCreateAsyncThunk: elementsWithCreateAsyncThunksReducer,
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
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
