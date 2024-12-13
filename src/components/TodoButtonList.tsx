import { memo, useRef } from 'react';
import { Icon } from '../ui';
import PlusCircle from '../assets/icons/PlusCircle.svg';
import { Modal } from '../ui/Modal.tsx';
import { useAppDispatch } from '../lib/store.tsx';

interface TodoButtonListProps {}

export const TodoButtonList = memo((props: TodoButtonListProps) => {
  const {} = props;
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
      dispatch({ type: 'addThemes', payload: value });
  };

  return (
    <div className="flex items-center gap-[18px]">
      <Modal onAddText={onAddTheme} callback={returnCallback} title={'тему'} />
      <button onClick={openModal}>
        <Icon Svg={PlusCircle} alt="add new list" height="24" width="24" />
      </button>
      <span className="text-primary text-[18px] ">Add new List</span>
    </div>
  );
});
