import {  memo } from 'react';
import { Icon } from '../../../../shared/ui/Icon';
import PlusCircle from '../../../../shared/assets/icons/PlusCircle.svg';
import { Modal } from '../../../../shared/ui/Modal/Modal.tsx';

interface TodoButtonItemsProps {}

export const TodoButtonItems = memo((props: TodoButtonItemsProps) => {
  const {} = props;

  const returnCallback = () => {

  };

  const openModal = () => {

  };

  const onAddTheme = () => {

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
