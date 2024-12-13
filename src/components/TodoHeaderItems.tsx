import { memo, useEffect } from 'react';
import { TodoButtonItems } from './TodoButtonItems.tsx';
import arrowLeft from '../assets/icons/arrow_left.svg';
import { Icon } from '../ui';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IState, useAppDispatch } from '../lib/store.tsx';

interface TodoHeaderItemsProps {}

export const TodoHeaderItems = memo((props: TodoHeaderItemsProps) => {
  const {} = props;

  const params = useParams();
  const dispatch = useAppDispatch();
  const getText = useSelector((state: IState) => state.text);

  useEffect(() => {
    dispatch({ type: 'getTextTheme', payload: Number(params.id) });
    console.log(getText);
  }, []);

  return (
    <div className="mb-[50px]">
      <div className="flex justify-between border-b-2 border-[#54353E]">
        <div className="flex gap-[24px] items-center">
          <Link to="/">
            <Icon Svg={arrowLeft} alt={'arrowLeft'} height={36} width={36} />
          </Link>
          <div className="text-[24px] text-second-200 font-semibold">{getText}</div>
        </div>
        <TodoButtonItems />
      </div>
    </div>
  );
});
