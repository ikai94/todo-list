import { themesActions, themesSelectors } from 'src/pages/theme';


import { AppThunk } from 'src/app/providers/StoreProvider/config/hooks.ts';

export const fetchThemes =
  (): AppThunk =>
  (dispatch, getState, { apiThemes }) => {
    const isIdle = themesSelectors.selectorThemeIdle(getState());

    if (!isIdle) {
      return;
    }

    dispatch(themesActions.themeStoredPending());
    apiThemes
      .getThemes()
      .then((themes) => {
        dispatch(themesActions.themeStoredSuccess({ themes }));
      })
      .catch((error) => {
        dispatch(themesActions.themeStoredFailure(error));
      });
  };
