import { memo } from 'react';
import { TodoItem } from './TodoItem.tsx';
import { useParams } from 'react-router-dom';
import { IState } from '../lib/store.tsx';
import { useSelector } from 'react-redux';


import { ITodoItems } from '../lib/types/types.ts';

interface TodoItemsListProps {}

export const TodoItemsList = memo((props: TodoItemsListProps) => {
  const {} = props;
  const selectorItems = (state: IState) => state.todos;

  const items = useSelector(selectorItems);
  const params = useParams().id;

  const arr: ITodoItems[] = items.filter((el: ITodoItems) => {
    if (el.themeId === Number(params)) {
      return el;
    }
  });

  return (
    <div>
      {arr.map((el) => (
        <TodoItem key={el.id} title={el.text} id={el.id} checkbox={el.checkbox}/>
      ))}
    </div>
  );
});
