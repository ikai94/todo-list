import { memo, useEffect } from 'react';
import { TodoItem } from '../TodoItem/TodoItem.tsx';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/app/providers/StoreProvider';
import { todosSelectors } from 'src/pages/todo/model/slice/todosSlice.ts';
import { fetchTodos } from 'src/pages/todo/model/services/fetchTodos.ts';
import { useParams } from 'react-router-dom';

interface TodoItemsListProps {}

export const TodoItemsList = memo((props: TodoItemsListProps) => {
  const {} = props;
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos({ themeId: Number(id) }));
  }, [dispatch, id]);

  const todos = useAppSelector(todosSelectors.selectorTodos);

  return (
    <div>
      {todos.map(({ text, id, checked, themeId }) => (
        <TodoItem
          title={text}
          todoId={id}
          checkbox={checked}
          key={id}
          themeId={themeId}
        />
      ))}
    </div>
  );
});
