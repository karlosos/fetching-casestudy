import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { elementsThunkFetchingReducer } from './thunk-based/slice'

export const store = configureStore({
  reducer: {
    elementsThunkFetching: elementsThunkFetchingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ExtraArgumentsType = any, ReturnThunkActionType = void> = ThunkAction<
  ReturnThunkActionType,
  RootState,
  ExtraArgumentsType,
  Action<string>
>;