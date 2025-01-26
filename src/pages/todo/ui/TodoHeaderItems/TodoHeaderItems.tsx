import { memo } from 'react';
import { TodoButtonItems } from '../TodoButtonItems/TodoButtonItems.tsx';
import arrowLeft from '../../../../shared/assets/icons/arrow_left.svg';
import { Icon } from '../../../../shared/ui/Icon';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/app/providers/StoreProvider';
import { todosSelectors } from 'src/pages/todo/model/slice/todosSlice.ts';


interface TodoHeaderItemsProps {}

export const TodoHeaderItems = memo((props: TodoHeaderItemsProps) => {
  const {} = props;
  const themeName = useAppSelector(todosSelectors.selectorThemeName)

  return (
    <div className="mb-[50px]">
      <div className="flex justify-between border-b-2 border-[#54353E]">
        <div className="flex gap-[24px] items-center">
          <Link to="/">
            <Icon Svg={arrowLeft} alt={'arrowLeft'} height={36} width={36} />
          </Link>
          <div className="text-[24px] text-second-200 font-semibold">{themeName}</div>
        </div>
        <TodoButtonItems />
      </div>
    </div>
  );
});
