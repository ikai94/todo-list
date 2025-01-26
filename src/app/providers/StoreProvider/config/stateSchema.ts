import { TypeThemesSchema } from 'src/pages/theme';
import { todosSlice } from 'src/pages/todo/model/slice/todosSlice.ts';
import { TypeTodosSchema } from 'src/pages/todo/model/types/todosTypes.ts';
import { themesSlice } from 'src/pages/theme/model/slice/themesSlice.ts';

export interface StateSchema {
  [themesSlice.name]: TypeThemesSchema;
  [todosSlice.name]: TypeTodosSchema;
}
