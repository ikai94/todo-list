import { memo } from 'react';
import { Icon } from '../../../../shared/ui/Icon';
import PlusCircle from '../../../../shared/assets/icons/PlusCircle.svg';
import { Modal } from 'src/shared/ui/Modal/Modal.tsx';

interface TodoButtonListProps {}

export const ThemeListButton = memo((props: TodoButtonListProps) => {
  const {} = props;

  const returnCallback = () => {

  };

  const openModal = () => {
  };

  const onAddTheme = () => {

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
