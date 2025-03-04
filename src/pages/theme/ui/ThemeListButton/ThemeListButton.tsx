import { memo, useRef } from 'react';
import { Icon } from 'src/shared/ui/Icon';
import PlusCircle from '../../../../shared/assets/icons/PlusCircle.svg';
import { Modal } from 'src/shared/ui/Modal/Modal.tsx';

interface TodoButtonListProps {}

export const ThemeListButton = memo((props: TodoButtonListProps) => {
  const {} = props;
  const dialogRef = useRef<HTMLDialogElement>(null)

  const returnCallback = (ref:any) => {
    return dialogRef.current = ref;
    console.log('Ссылка на элемент:', dialogRef.current);
  };

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
  };

  const onAddTodo = () => {

  };

  return (
    <div className="flex items-center gap-[18px]">


      <button onClick={openModal}>
        <Icon Svg={PlusCircle} alt="add new list" height="24" width="24" />
      </button>
      <Modal onAddText={onAddTodo} callbackForm={returnCallback} title={'тему'} />
      <span className="text-primary text-[18px] ">Add new List</span>
    </div>
  );
});
