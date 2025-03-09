import { createAppAsyncThunk } from 'src/app/providers/StoreProvider/config/hooks';

export const fetchDeleteTheme = createAppAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: string }
>('theme/fetchDeleteTheme', async ({ id }, ThunkApi) => {
  try {
    const response = await ThunkApi.extra.apiThemes.deleteTheme(id);
    const deletedTheme: { id: number; text: string } = await response.json();
    return { id: deletedTheme.id };
  } catch (error) {
    return ThunkApi.rejectWithValue('Failed to delete theme');
  }
});
