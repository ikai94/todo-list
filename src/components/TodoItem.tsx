import { memo } from 'react';
import { Icon } from '../shared/ui/Icon';
import Trash from '../shared/assets/icons/Trash.svg';
import { useAppDispatch } from '../shared/lib/store.tsx';

interface TodoItemProps {
  title: string;
  id: number;
  checkbox: boolean;
}

export const TodoItem = memo((props: TodoItemProps) => {
  const { title, id, checkbox } = props;
  const dispatch = useAppDispatch();

  const deleteTodo = () => {
    dispatch({ type: 'deleteTodo', payload: id });
  };

  const onChecked = () => {
    dispatch({ type: 'checkedTodo', payload: id });
  };

  return (
    <div className="flex items-center justify-between pl-[32px] pr-[14px] py-[18px] w-full gap-[15px] bg-dark-800">
      <div className="flex">
        <div className="bg-gradient rounded w-[24px] h-[24px]">
          <input
            type="checkbox"
            className="bg-dark-800 appearance-none inline-grid place-content-center w-[24px] h-[24px] border-2 border-transparent rounded bg-clip-padding after:checked:content-['✔️']"
            onClick={onChecked}
            checked={checkbox}
          />
        </div>
        <p className="text-[18px] text-second-200 pl-[10px]">{title}</p>
      </div>
      <button onClick={deleteTodo}>
        <Icon Svg={Trash} alt="delete list" height="24" width="24" />
      </button>
    </div>
  );
});
