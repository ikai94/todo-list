import { memo, useEffect } from 'react';
import { ThemeListItem } from 'src/pages/theme/ui/ThemeListItem/ThemeListItem.tsx';
import { IState, useAppDispatch } from 'src/shared/lib/store.tsx';
import { ThemeEmptyList } from 'src/pages/theme/ui/ThemeEmptyList/ThemeEmptyList.tsx';
import { useSelector } from 'react-redux';
import { getTheme } from 'src/shared/lib/actions/theme.ts';

interface ThemeContextProps {}

export const ThemeContext = memo((props: ThemeContextProps) => {
  const {} = props;
  const selectorTheme = (state: IState) => state.theme;
  const theme = useSelector(selectorTheme);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTheme());
  }, [getTheme]);

  if (theme.length === 0) return <ThemeEmptyList />;
  return (
    <div className="flex flex-col gap-[30px]">
      {theme.map((el) => (
        <ThemeListItem
          key={el.id}
          title={el.text}
          link={`/todos/${el.id}`}
          id={Number(el.id)}
        />
      ))}
    </div>
  );
});
