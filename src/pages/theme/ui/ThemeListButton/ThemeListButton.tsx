import { memo, useRef } from 'react';
import { Icon } from 'src/shared/ui/Icon';
import PlusCircle from '../../../../shared/assets/icons/PlusCircle.svg';
import { Modal } from 'src/shared/ui/Modal/Modal.tsx';
import { useAppDispatch } from 'src/app/providers/StoreProvider';
import { fetchCreateTheme } from '../../model/services/fetchCreateTheme';
import { apiThemes } from '../../model/api/apiThemes';
import { skipToken } from '@reduxjs/toolkit/query';

interface TodoButtonListProps {}

export const ThemeListButton = memo((props: TodoButtonListProps) => {
  const {} = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [createTheme] = apiThemes.useCreateThemeMutation();

  const returnCallback = (ref: any) => {
    return (dialogRef.current = ref);
  };

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const onAddTodo = (text: string) => {
    createTheme(text);
  };

  return (
    <div className="flex items-center gap-[18px]">
      <button onClick={openModal}>
        <Icon Svg={PlusCircle} alt="add new list" height="24" width="24" />
      </button>
      <Modal
        onAddText={onAddTodo}
        callbackForm={returnCallback}
        title={'тему'}
      />
      <span className="text-primary text-[18px] ">Add new List</span>
    </div>
  );
});
