import { memo } from 'react';
import { TodoHeaderList } from './TodoHeaderList.tsx';
import { Outlet } from 'react-router-dom';

export const TodoThemeList = memo(() => {
  return (
    <>
      <TodoHeaderList />
      <Outlet />
    </>
  );
});
