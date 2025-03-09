import { memo } from 'react';
import { TodoItem } from '../TodoItem/TodoItem.tsx';
import { useAppSelector } from 'src/app/providers/StoreProvider';
import { todosSelectors } from 'src/pages/todo/model/slice/todosSlice.ts';

interface TodoItemsListProps {}

export const TodoItemsList = memo((props: TodoItemsListProps) => {
  const {} = props;

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
