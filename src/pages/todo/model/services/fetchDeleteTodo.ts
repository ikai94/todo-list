import { todosActions} from 'src/pages/todo/model/slice/todosSlice.ts';
import { fetchTodos } from 'src/pages/todo/model/services/fetchTodos.ts';
import { AppThunk } from 'src/app/providers/StoreProvider/config/hooks.ts';

export const fetchDeleteTodo =
  (todoId: number, themeId: number): AppThunk<Promise<void>> =>
 async (dispatch, _, { apiTodos }) => {
   dispatch(todosActions.todoDeletePending());
   try {
     dispatch(todosActions.todoDeleteSuccess({ todoId }));
     await apiTodos.deleteTodo(todoId)
     dispatch(fetchTodos(themeId, {refetch: true}))
    } catch (e) {
      dispatch(todosActions.todoDeleteError());
    }
  };
