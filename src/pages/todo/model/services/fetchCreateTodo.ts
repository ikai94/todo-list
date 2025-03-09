import { createAppAsyncThunk } from 'src/app/providers/StoreProvider/config/hooks.ts';
import { TypeTodo } from '../types/todosTypes';

export const fetchCreateTodo = createAppAsyncThunk<
  TypeTodo,
  { text: string; themeId: number },
  { rejectValue: string }
>('todo/fetchCreateTodo', async ({ text, themeId }, ThunkApi) => {
  try {
    return (await ThunkApi.extra.apiTodos.createTodo(text, themeId)).json();
  } catch (error) {
    return ThunkApi.rejectWithValue('Произоша ошибка');
  }
});
