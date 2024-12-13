import { memo } from 'react';
import emptyItems from '../assets/emptyItems.png';

interface TodoEmptyItemsProps {}

export const TodoEmptyItems = memo((props: TodoEmptyItemsProps) => {
  const {} = props;

  return (
    <div className="relative flex items-center justify-center flex-col pt-[130px]">
      <div className="bg-gradient">
        <div className="bg-dark-900 h-[312px] w-[471px]  border-2 border-transparent bg-clip-padding" />
      </div>
      <img
        className="absolute top-[10%] left-[35%]"
        src={emptyItems}
        alt="emptyItems"
      />
      <p className="text-[24px] text-second-200 pt-[23px]">
        Write some task or note ;)
      </p>
    </div>
  );
});
