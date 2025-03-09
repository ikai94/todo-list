import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { themesReducer } from 'src/pages/theme';
import { apiThemes } from 'src/pages/theme/model/api/apiThemes.ts';
import { apiTodos } from 'src/pages/todo/model/api/apiTodos.ts';
import {
  todosReducer,
  todosSlice,
} from 'src/pages/todo/model/slice/todosSlice.ts';
import { themesSlice } from 'src/pages/theme/model/slice/themesSlice';
import { baseApi } from 'src/shared/api/baseApi';

export const extraArgument = {
  apiThemes: apiThemes,
  apiTodos: apiTodos,
};

export const store = configureStore({
  reducer: combineReducers({
    [themesSlice.name]: themesReducer,
    [todosSlice.name]: todosReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArgument,
      },
    }).concat(baseApi.middleware),
});
