import { memo } from 'react';
import { Icon } from 'src/shared/ui/Icon';
import ArrowTodo from 'src/shared/assets/icons/Arrow_todo.svg';
import { Link } from 'react-router-dom';
import Trash from 'src/shared/assets/icons/Trash.svg';
import { useAppDispatch } from 'src/app/providers/StoreProvider';
import { fetchDeleteTheme } from '../../model/services/fetchDeleteTheme';
import { apiThemes } from '../../model/api/apiThemes';

interface TodoListItemProps {
  title: string;
  link: string;
  id: number;
}

export const ThemeListItem = memo((props: TodoListItemProps) => {
  const { title, link, id } = props;

  const [deleteTheme, { isLoading }] = apiThemes.useDeleteThemeMutation();

  const clickDeleteTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteTheme(id);
  };

  return (
    <Link
      to={link}
      className="flex items-center justify-between pl-[22px] pr-[14px] py-[14px] border-l-[#632329] border-l-[10px] w-full shadow-shadowList hover:scale-[1.01] transition"
    >
      <p className="text-[18px] text-second-200">{title}</p>
      <div className="flex gap-4">
        <button onClick={clickDeleteTheme}>
          <Icon Svg={Trash} alt="delete list" height="24" width="24" />
        </button>
        <Icon Svg={ArrowTodo} alt={title} height={32} width={32} />
      </div>
    </Link>
  );
});
