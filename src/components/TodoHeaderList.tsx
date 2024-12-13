import { memo } from 'react';
import { TodoButtonList } from './TodoButtonList.tsx';

interface TodoHeaderListProps {}

export const TodoHeaderList = memo((props: TodoHeaderListProps) => {
  const {} = props;

  return (
    <div className="mb-[50px]">
      <div className="flex justify-between py-[22px] border-b-2 border-[#54353E]">
        <div className="text-[24px] text-second-200">TO DO | YOUR LISTS</div>
        <TodoButtonList />
      </div>
    </div>
  );
});
