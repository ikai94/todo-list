import { memo } from 'react';
import { TodoItem } from '../TodoItem/TodoItem.tsx';
import {
  useAppSelector,
} from 'src/app/providers/StoreProvider';
import { todosSelectors } from 'src/pages/todo/model/slice/todosSlice.ts';

interface TodoItemsListProps {}

export const TodoItemsList = memo((props: TodoItemsListProps) => {
  const {} = props;
  const todo = useAppSelector(todosSelectors.selectorTodos);

  return (
    <div>
      {todo.map((task) => <TodoItem title={task.text} todoId={task.id} key={task.id} checkbox={task.checked} />)}
    </div>
  );
});
