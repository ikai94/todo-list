import { memo, useEffect } from 'react';
import { TodoListItem } from './TodoListItem.tsx';
import { IState, useAppDispatch } from '../lib/store.tsx';
import { TodoEmptyList } from './TodoEmptyList.tsx';
import { useSelector } from 'react-redux';
import { getTheme } from '../lib/actions/theme.ts';

interface TodoListProps {}

export const TodoList = memo((props: TodoListProps) => {
  const {} = props;
  const selectorTheme = (state: IState) => state.theme;
  const isLoading = (state: IState) => state.isLoading
  const theme = useSelector(selectorTheme);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTheme());
  }, [getTheme]);

  if (isLoading) {
    console.log(isLoading)
  }

  if (theme.length === 0) return <TodoEmptyList />;
  return (
    <div className="flex flex-col gap-[30px]">
      {theme.map((el) => (
        <TodoListItem
          key={el.id}
          title={el.text}
          link={`/todos/${el.id}`}
          id={Number(el.id)}
        />
      ))}
    </div>
  );
});
