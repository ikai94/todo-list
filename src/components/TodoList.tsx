import { memo } from 'react';
import { TodoListItem } from './TodoListItem.tsx';
import { IState} from '../lib/store.tsx';
import { TodoEmptyList } from './TodoEmptyList.tsx';
import { useSelector } from 'react-redux';

interface TodoListProps {}

export const TodoList = memo((props: TodoListProps) => {
  const {} = props;
  const selectorTheme = (state: IState) => state.theme
  const theme = useSelector(selectorTheme)


  if (theme.length === 0) return <TodoEmptyList />;
  return (
    <div className="flex flex-col gap-[30px]">
      {theme.map((el) => (
        <TodoListItem key={el.id} title={el.text} link={`/todos/${el.id}`} id={Number(el.id)} />
      ))}
    </div>
  );
});
