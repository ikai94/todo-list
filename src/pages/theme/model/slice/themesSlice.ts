import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TypeTheme,
  TypeThemeId,
  TypeThemesSchema,
} from 'src/pages/theme/model/types/themeTypes.ts';

const initialState: TypeThemesSchema = {
  entities: {},
  ids: [],
  fetchThemeStatus: 'idle',
  selectedThemeId: undefined,
  error: undefined,
};

export const themesSlice = createSlice({
  name: 'themes',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  selectors: {
    selectorThemeStatus: (state) => state.fetchThemeStatus,
    selectorThemeId: (state) => state.selectedThemeId,
    selectorThemeIdle: (state) => state.fetchThemeStatus === 'idle',
    selectorThemePending: (state => state.fetchThemeStatus === 'pending'),
    selectorThemeError: (state) => state.fetchThemeStatus === 'failure',
    selectorNameTheme: createSelector(
      (state: TypeThemesSchema) => state.ids,
      (state: TypeThemesSchema) => state.entities,
      (ids, entities) => ids.map((id) => entities[id]),
    ),
  },
  reducers: {
    themeStoredPending: (state: TypeThemesSchema) => {
      state.fetchThemeStatus = 'pending';
    },
    themeStoredSuccess: (
      state: TypeThemesSchema,
      action: PayloadAction<{ themes: TypeTheme[] }>,
    ) => {
      const { themes } = action.payload;
      state.entities = themes.reduce(
        (acc, theme) => {
          acc[theme.id] = theme;
          return acc;
        },
        {} as Record<TypeThemeId, TypeTheme>,
      );
      state.ids = themes.map((theme) => theme.id);
      state.fetchThemeStatus = 'success';
    },
    themeStoredFailure: (
      state: TypeThemesSchema,
      action: PayloadAction<string>,
    ) => {
      state.fetchThemeStatus = 'failure';
      state.error = action.payload;
    },
  },
});

export const {
  actions: themesActions,
  selectors: themesSelectors,
  reducer: themesReducer,
} = themesSlice;
