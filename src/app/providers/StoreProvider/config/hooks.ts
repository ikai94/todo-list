import {
  extraArgument,
  store,
} from 'src/app/providers/StoreProvider/config/store.ts';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;
export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
};
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();