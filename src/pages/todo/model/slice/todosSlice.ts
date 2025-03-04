import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeTodo, TypeTodosId, TypeTodosSchema } from '../types/todosTypes.ts';
import { fetchTodos } from 'src/pages/todo/model/services/fetchTodos.ts';

const initialState: TypeTodosSchema = {
  entities: {},
  todosId: [],
  selectTodosTheme: [],
  error: undefined,
  addTodoError: undefined,
  themeName: undefined,
  fetchTodoStatus: 'idle',
  fetchDeleteStatus: 'idle',
  fetchAddTodoStatus: 'idle',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  selectors: {
    selectorIdle: (state) => state.fetchTodoStatus === 'idle',
    selectorLoading: (state) => state.fetchTodoStatus === 'pending',
    selectorTodos: createSelector(
      (state: TypeTodosSchema) => state.entities,
      (state: TypeTodosSchema) => state.todosId,
      (entities, ids) =>
        ids
          .map((id) => entities[id])
          .filter((todo): todo is TypeTodo => !!todo),
    ),
    selectorAddTodoStatus: (state) => state.fetchAddTodoStatus,
  },
  reducers: {
    todoDeletePending: (state: TypeTodosSchema) => {
      state.fetchDeleteStatus = 'pending';
    },
    todoDeleteSuccess: (
      state: TypeTodosSchema,
      action: PayloadAction<{ todoId: number }>,
    ) => {
      const { todoId } = action.payload;

      delete state.entities[todoId];

      state.todosId = state.todosId.filter((id) => id !== todoId);
      state.fetchDeleteStatus = 'success';
    },
    todoDeleteError: (state: TypeTodosSchema) => {
      state.fetchDeleteStatus = 'failure';
    },
    todoChecked: (
      state: TypeTodosSchema,
      action: PayloadAction<{ todoId: number }>,
    ) => {
      const todoId = action.payload.todoId;

      let prevChecked = state.entities[todoId].checked;
      state.entities[todoId].checked = !prevChecked;
    },
    addTodoPending: (state: TypeTodosSchema) => {
      state.fetchAddTodoStatus = 'pending';
    },
    addTodoSuccess: (
      state: TypeTodosSchema,
      action: PayloadAction<TypeTodo>,
    ): TypeTodosSchema => {
      const { id } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: action.payload,
        },
        fetchAddTodoStatus: 'success',
      };
    },
    addTodoError: (state: TypeTodosSchema, action: PayloadAction<string>) => {
      state.addTodoError = action.payload;
      state.fetchAddTodoStatus = 'failure';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.fetchTodoStatus = 'pending';
      })
      .addCase(
        fetchTodos.fulfilled,
        (state, action: PayloadAction<TypeTodo[]>) => {
          const todo = action.payload;

          state.entities = todo.reduce(
            (acc, el) => {
              acc[el.id] = el;
              return acc;
            },
            {} as Record<TypeTodosId, TypeTodo>,
          );
          state.todosId = todo.map((el) => el.id);
        },
      )
      .addCase(fetchTodos.rejected, (state) => {
        state.fetchTodoStatus = 'failure';
      });
  },
});

export const {
  reducer: todosReducer,
  selectors: todosSelectors,
  actions: todosActions,
} = todosSlice;
