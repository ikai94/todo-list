import { memo, useRef } from 'react';
import { Icon } from '../../../../shared/ui/Icon';
import PlusCircle from '../../../../shared/assets/icons/PlusCircle.svg';
import { Modal } from '../../../../shared/ui/Modal/Modal.tsx';
import { useAppDispatch } from 'src/app/providers/StoreProvider/index.ts';
import { fetchCreateTodo } from '../../model/services/fetchCreateTodo.ts';
import { useParams } from 'react-router-dom';
import { apiTodos } from '../../model/api/apiTodos.ts';

interface TodoButtonItemsProps {}

export const TodoButtonItems = memo((props: TodoButtonItemsProps) => {
  const {} = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { id } = useParams<{ id: string }>();
  const themeId = Number(id);
  const returnCallback = (ref: any) => {
    return (dialogRef.current = ref);
  };
  const [createTodo, { isLoading }] = apiTodos.useCreateTodoMutation();
  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleClickAddTodo = async (text: string) => {
    await createTodo({ text, themeId });
  };

  return (
    <div>
      <div className="flex gap-[24px]">
        <div className="flex items-center gap-[18px] py-[16px] px-[34px]">
          <Modal
            onAddText={handleClickAddTodo}
            callbackForm={returnCallback}
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
