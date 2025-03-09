import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeTodo, TypeTodosId, TypeTodosSchema } from '../types/todosTypes.ts';
import { fetchTodos } from 'src/pages/todo/model/services/fetchTodos.ts';
import { fetchCreateTodo } from '../services/fetchCreateTodo.ts';
import { fetchNameTheme } from '../services/fetchNameTheme.ts';

const initialState: TypeTodosSchema = {
  entities: {},
  todosId: [],
  selectTodosTheme: [],
  error: undefined,
  addTodoError: undefined,
  themeName: undefined,
  fetchTodoStatus: 'idle',
  fetchCreateStatus: 'idle',
  fetchDeleteStatus: 'idle',
  fetchAddTodoStatus: 'idle',
  fetchThemeNameStatus: 'idle',
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
    selectorThemeName: (state) => state.themeName,
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
    builder.addCase(fetchCreateTodo.pending, (state) => {
      state.fetchCreateStatus = 'pending';
    });
    builder.addCase(
      fetchCreateTodo.fulfilled,
      (state, action: PayloadAction<TypeTodo>) => {
        const { id } = action.payload;
        state.entities[id] = action.payload;
        state.todosId.push(id);
        state.fetchCreateStatus = 'success';
      },
    );
    builder.addCase(
      fetchCreateTodo.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.fetchCreateStatus = 'failure';
        state.error = action.payload || 'Unknown error';
      },
    );
    builder.addCase(fetchNameTheme.pending, (state) => {
      state.fetchTodoStatus = 'pending';
    });
    builder.addCase(
      fetchNameTheme.fulfilled,
      (state, action: PayloadAction<{ text: string }>) => {
        const { text } = action.payload;
        state.themeName = text;
        state.fetchThemeNameStatus = 'success';
      },
    );
    builder.addCase(
      fetchNameTheme.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.fetchThemeNameStatus = 'failure';
        state.error = action.payload || 'Unknown error';
      },
    );
  },
});

export const {
  reducer: todosReducer,
  selectors: todosSelectors,
  actions: todosActions,
} = todosSlice;
