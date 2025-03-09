import { createAppAsyncThunk } from 'src/app/providers/StoreProvider/config/hooks.ts';

export const fetchNameTheme = createAppAsyncThunk<
  { text: string },
  { themeId: number },
  { rejectValue: string }
>('todo/fetchNameTheme', async ({ themeId }, ThunkApi) => {
  try {
    const response = await ThunkApi.extra.apiTodos.getThemeName(themeId);
    if (!response) {
      return ThunkApi.rejectWithValue('Данные не найдены');
    }
    return response;
  } catch (error) {
    return ThunkApi.rejectWithValue('error add fetchNameTheme');
  }
});
