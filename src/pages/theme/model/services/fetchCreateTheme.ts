import { createAppAsyncThunk } from 'src/app/providers/StoreProvider/config/hooks';

export const fetchCreateTheme = createAppAsyncThunk<
  { id: number; text: string },
  { theme: string },
  { rejectValue: string }
>('theme/fetchCreateTheme', async ({ theme }, ThunkApi) => {
  try {
    const newTheme = await ThunkApi.extra.apiThemes.createTheme(theme);

    if (!newTheme.ok) {
      throw new Error('Failed to create theme');
    }

    return newTheme.json();
  } catch (error) {
    return ThunkApi.rejectWithValue('Failed to create theme');
  }
});
