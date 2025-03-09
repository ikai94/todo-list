export type TypeTodo = {
  id: number;
  text: string;
  checked: boolean;
  themeId: number;
};

export interface FetchDataArg {
  refetch?: boolean;
  themeId: number;
}

export type TypeTodosId = number;

export type TypeTodosSchema = {
  entities: Record<TypeTodosId, TypeTodo>;
  todosId: TypeTodosId[];
  selectTodosTheme: TypeTodo[];
  error: string | undefined;
  addTodoError: string | undefined;
  themeName: string | undefined;
  fetchTodoStatus: 'idle' | 'pending' | 'success' | 'failure';
  fetchCreateStatus: 'idle' | 'pending' | 'success' | 'failure';
  fetchAddTodoStatus: 'idle' | 'pending' | 'success' | 'failure';
  fetchDeleteStatus: 'idle' | 'pending' | 'success' | 'failure';
  fetchThemeNameStatus: 'idle' | 'pending' | 'success' | 'failure';
};
