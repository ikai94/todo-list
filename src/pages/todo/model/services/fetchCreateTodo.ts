import { todosActions} from 'src/pages/todo/model/slice/todosSlice.ts';

import { AppThunk } from 'src/app/providers/StoreProvider/config/hooks.ts';

export const fetchCreateTodo =
  ( text: string): AppThunk<Promise<void>> =>
    async (dispatch, _, { apiTodos }) => {

      try {
        dispatch(todosActions.todoChecked({ todoId }));
        await apiTodos.checkedTodo(checked,todoId)
      } catch (e) {
        dispatch(todosActions.todoDeleteError());
      }
    };
