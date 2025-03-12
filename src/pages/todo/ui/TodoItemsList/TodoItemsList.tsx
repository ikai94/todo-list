import { memo } from 'react';
import { TodoItem } from '../TodoItem/TodoItem.tsx';
import { apiTodos } from '../../model/api/apiTodos.ts';
import { useParams } from 'react-router-dom';

interface TodoItemsListProps {}

export const TodoItemsList = memo((props: TodoItemsListProps) => {
  const {} = props;
  const { id } = useParams<{ id: string }>();
  const themeId = Number(id);

  const { data: todos } = apiTodos.useGetTodosThemeQuery(themeId);

  return (
    <div>
      {todos?.map(({ text, id, checked, themeId }) => (
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
