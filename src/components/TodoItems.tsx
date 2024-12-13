import { memo } from 'react';
import { TodoHeaderItems } from './TodoHeaderItems.tsx';
import { Outlet } from 'react-router-dom';

interface TodoItemsProps {}

export const TodoItems = memo((props: TodoItemsProps) => {
  const {} = props;

  return (
    <div>
      <TodoHeaderItems />
      <Outlet />
    </div>
  );
});
