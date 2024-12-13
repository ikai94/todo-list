import { memo } from 'react';

interface TodoEmptyListProps {}

export const TodoEmptyList = memo((props: TodoEmptyListProps) => {
  const {} = props;

  return (
    <div className="relative flex items-center justify-center pt-[130px]">
      <div className="bg-gradient">
        <div className="bg-dark-900 h-[312px] w-[471px] border-2 border-transparent bg-clip-padding  after:content-['TO-DO\00a0LIST'] after:text-[128px] after:absolute after:right-[0] after:left-[0] after:top-[50%] after:ml-auto after:mr-auto after:text-center after:text-second-200" />
      </div>
    </div>
  );
});
