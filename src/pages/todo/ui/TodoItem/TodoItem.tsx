import { memo, useState } from 'react';
import { Icon } from '../../../../shared/ui/Icon';
import Trash from '../../../../shared/assets/icons/Trash.svg';
import { apiTodos } from '../../model/api/apiTodos';

interface TodoItemProps {
  title: string;
  todoId: number;
  checkbox: boolean;
  themeId: number;
}

export const TodoItem = memo((props: TodoItemProps) => {
  const { title, checkbox, todoId } = props;
  const [isChecked, setIsChecked] = useState(checkbox);

  const [checkedTodo] = apiTodos.useCheckedTodoMutation();
  const [deleteTodo] = apiTodos.useDeleteTodoMutation();

  const onChangeChecked = async () => {
    setIsChecked(!isChecked);
    await checkedTodo({ checked: !checkbox, todoId });
  };

  const onClickDeleteTodo = async() => {
    await deleteTodo(todoId);
  };

  return (
    <div className="flex items-center justify-between pl-[32px] pr-[14px] py-[18px] w-full gap-[15px] bg-dark-800">
      <div className="flex">
        <div className="bg-gradient rounded w-[24px] h-[24px]">
          <input
            onClick={onChangeChecked}
            type="checkbox"
            className="bg-dark-800 appearance-none inline-grid place-content-center w-[24px] h-[24px] border-2 border-transparent rounded bg-clip-padding after:checked:content-['✔️']"
            checked={checkbox}
          />
        </div>
        <p className="text-[18px] text-second-200 pl-[10px]">{title}</p>
      </div>
      <button onClick={onClickDeleteTodo}>
        <Icon Svg={Trash} alt="delete list" height="24" width="24" />
      </button>
    </div>
  );
});
