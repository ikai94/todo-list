import { memo } from 'react';
import { ThemeContext, ThemeHeaderList } from 'src/entities/Theme';

export const ThemeList = memo(() => {
  return (
    <>
      <ThemeHeaderList />
      <ThemeContext />
    </>
  );
});
