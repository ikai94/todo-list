import { memo, useRef } from 'react';
import { Icon } from '../shared/ui/Icon';
import PlusCircle from '../shared/assets/icons/PlusCircle.svg';
import { Modal } from '../shared/ui/Modal/Modal.tsx';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../shared/lib/store.tsx';

interface TodoButtonItemsProps {}

export const TodoButtonItems = memo((props: TodoButtonItemsProps) => {
  const {} = props;
  const { id } = useParams();

  const refTest = useRef<null | any>();
  const dispatch = useAppDispatch();

  const returnCallback = (ref: any) => {
    return (refTest.current = ref.current);
  };

  const openModal = () => {
    if (refTest.current) {
      refTest.current?.showModal();
    }
  };

  const onAddTheme = (value: string) => {
    dispatch({
      type: 'addTodo',
      payload: value,
      themeId: Number(id),
      checked: false,
    });
  };

  return (
    <div>
      <div className="flex gap-[24px]">
        <div className="flex items-center gap-[18px] py-[16px] px-[34px]">
          <Modal
            onAddText={onAddTheme}
            callback={returnCallback}
            title={'заметки'}
          />
          <button onClick={openModal}>
            <Icon Svg={PlusCircle} alt="add new list" height="24" width="24" />
          </button>
          <span className="text-primary text-[18px] ">Add to-do</span>
        </div>
      </div>
    </div>
  );
});
