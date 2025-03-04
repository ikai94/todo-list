import { FetchDataArg } from 'src/pages/todo/model/types/todosTypes.ts';
import { createAppAsyncThunk } from 'src/app/providers/StoreProvider/config/hooks.ts';

export const fetchTodos = createAppAsyncThunk(
  'todos/fetchTodos',
  async ({ themeId }: FetchDataArg, ThunkApi) => {
    try {
      return ThunkApi.extra.apiTodos.getTheme(themeId);
    } catch (e) {
      console.log(e);
      return ThunkApi.rejectWithValue('Failed to fetch todos');
    }
  },
);
