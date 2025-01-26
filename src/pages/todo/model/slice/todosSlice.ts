import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeTheme, TypeTodosSchema } from '../types/todosTypes.ts';

const initialState: TypeTodosSchema = {
  todo: {
    todo: [],
    text: undefined,
    id: undefined,
  },
  error: undefined,
  fetchTodoStatus: 'idle',
  fetchDeleteStatus: 'idle',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  selectors: {
    selectorIdle: (state) => state.fetchTodoStatus === 'idle',
    selectorTodos: (state) => state.todo.todo,
    selectorThemeName: (state) => state.todo.text,
  },
  reducers: {
    todoStorePending: (state: TypeTodosSchema) => {
      state.fetchTodoStatus = 'pending';
    },
    todoStoreSuccess: (
      state: TypeTodosSchema,
      action: PayloadAction<{ theme: TypeTheme }>,
    ) => {
      state.todo = action.payload.theme;
      state.fetchTodoStatus = 'success';
      state.fetchTodoStatus = 'idle';
    },
    todoStoreError: (state: TypeTodosSchema, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.fetchTodoStatus = 'failure';
    },
    todoDeletePending: (state: TypeTodosSchema) => {
      state.fetchDeleteStatus = 'pending';
    },
    todoDeleteSuccess: (
      state: TypeTodosSchema,
      action: PayloadAction<{ todoId: number }>,
    ) => {
      const id = action.payload.todoId;

      delete state.todo.todo[id];
      state.fetchDeleteStatus = 'success';
    },
    todoDeleteError: (state: TypeTodosSchema) => {
      state.fetchDeleteStatus = 'failure';
    },
    todoChecked: (state: TypeTodosSchema, action: PayloadAction<{todoId: number}>) => {
      const todoId = action.payload.todoId
      state.todo.todo.filter((todo) => {
        if (todo.id === todoId) {
          return todo.checked = !todo.checked
        }
        return todo;
      })
    },
  },
});

export const {
  reducer: todosReducer,
  selectors: todosSelectors,
  actions: todosActions,
} = todosSlice;
