import { memo, useEffect } from 'react';
import { ThemeListItem } from 'src/pages/theme/ui/ThemeListItem/ThemeListItem.tsx';
import { themesSelectors } from 'src/pages/theme';
import { ThemeEmptyList } from '../ThemeEmptyList/ThemeEmptyList';
import { fetchThemes } from 'src/pages/theme/model/services/fetchThemes.ts';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/app/providers/StoreProvider';
import { apiThemes } from '../../model/api/apiThemes';
interface ThemeContextProps {}

export const ThemeContext = memo((props: ThemeContextProps) => {
  const {} = props;

  const {
    data: selectedTheme,
    isError,
    isLoading,
  } = apiThemes.useGetThemesQuery();

  if (selectedTheme?.length == 0) return <ThemeEmptyList />;

  if (isError) {
    return (
      <h1>Произошла ошибка при получении данных, повторите загрузку...</h1>
    );
  }

  if (isLoading) {
    return <div>...Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-[30px]">
      {selectedTheme?.map(({ text, id }) => (
        <ThemeListItem key={id} title={text} link={`/todos/${id}`} id={id} />
      ))}
    </div>
  );
});
