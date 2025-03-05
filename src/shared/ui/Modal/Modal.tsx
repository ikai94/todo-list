import { memo, useEffect, useRef, useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

interface ModalProps {
  onAddText: (value: string) => void;
  callbackForm: (ref: any) => void;
  title: string;
}

export const Modal = memo((props: ModalProps) => {
  const { callbackForm, onAddText, title } = props;
  const [value, setValue] = useState<string>('');
  const dialogRef = useRef<any>(null);

  useEffect(() => {
    if (callbackForm) {
      callbackForm(dialogRef.current);
    }
  }, [callbackForm]);


  const onToggleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const closeModal = () => {
      dialogRef.current.close();
  };

  return (
    <dialog
      className="py-[1rem] w-[500px] max-w-[800px] pt-[2rem] bg-dark-500 backdrop:bg-backdrop"
      ref={dialogRef}
    >
      <form method="dialog" className="flex flex-col items-center">
        <section className="flex gap-2">
          <label
            htmlFor="name"
            className="text-second-200 text-[16px] w-full text-center"
          >
            Название {title}:
          </label>
          <input
            type="text"
            placeholder={'Введите текст...'}
            value={value}
            onChange={onToggleClick}
          />
        </section>
        <menu className="pt-[20px]">
          <button
            className="absolute right-[4px] top-[4px]"
            onClick={closeModal}
          >
            <RiCloseCircleLine color="#F25551" size={24} />
          </button>
          <div className="bg-gradient rounded w-full">
            <button
              className="flex justify-center items-center w-full px-[10px] bg-dark-500 border-2 border-transparent bg-clip-padding text-second-200 text-[16px]"
              type="submit"
              onClick={() => onAddText(value)}
            >
              Создать
            </button>
          </div>
        </menu>
      </form>
    </dialog>
  );
});
