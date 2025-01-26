import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { themesReducer } from 'src/pages/theme';
import { apiThemes } from 'src/pages/theme/model/api/apiThemes.ts';
import { apiTodos } from 'src/pages/todo/model/api/apiTodos.ts';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { UnknownAction } from 'redux';
import {
  todosReducer,
  todosSlice,
} from 'src/pages/todo/model/slice/todosSlice.ts';
import { themesSlice } from 'src/pages/theme/model/slice/themesSlice';

export const extraArgument = {
  apiThemes: apiThemes,
  apiTodos: apiTodos,
};

export const store = configureStore({
  reducer: combineReducers({
    [themesSlice.name]: themesReducer,
    [todosSlice.name]: todosReducer,
  }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArgument,
      },
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<typeof store>();
