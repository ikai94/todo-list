import {
  todosActions, todosSelectors,
} from 'src/pages/todo/model/slice/todosSlice.ts';
import { AppThunk } from 'src/app/providers/StoreProvider/config/store.ts';

export const fetchTodo =
  (themeId: number): AppThunk =>
  (dispatch,getState, { apiTodos }) => {
    const idle = todosSelectors.selectorIdle(getState())

    if (!idle) {
      return
    }

  dispatch(todosActions.todoStorePending());
    apiTodos
      .getTheme(themeId)
      .then((theme) => {
        dispatch(todosActions.todoStoreSuccess({ theme }));
      })
      .catch((err) => {
        dispatch(todosActions.todoStoreError(err));
      });
  };
