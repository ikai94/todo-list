import { memo } from 'react';
import { Icon } from 'src/shared/ui/Icon';
import ArrowTodo from '../../../../shared/assets/icons/Arrow_todo.svg';
import { Link } from 'react-router-dom';
import Trash from '../../../../shared/assets/icons/Trash.svg';
import { useAppDispatch } from 'src/shared/lib/store.tsx';

interface TodoListItemProps {
  title: string;
  link: string;
  id: number;
}

export const ThemeListItem = memo((props: TodoListItemProps) => {
  const { title, link, id } = props;
  const dispatch = useAppDispatch();

  const deleteTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: 'deleteTheme', payload: id });
  };
  return (
    <Link
      to={link}
      className="flex items-center justify-between pl-[22px] pr-[14px] py-[14px] border-l-[#632329] border-l-[10px] w-full shadow-shadowList hover:scale-[1.01] transition"
    >
      <p className="text-[18px] text-second-200">{title}</p>
      <div className="flex gap-4">
        <button onClick={deleteTheme}>
          <Icon Svg={Trash} alt="delete list" height="24" width="24" />
        </button>
        <Icon Svg={ArrowTodo} alt={title} height={32} width={32} />
      </div>
    </Link>
  );
});
