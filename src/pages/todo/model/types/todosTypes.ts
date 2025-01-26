export type TypeTodo = {
  id: number;
  text: string;
  checked: boolean;
  themeId: number;
};

export type TypeTheme = {
  id: number | undefined;
  text: string | undefined;
  todo: TypeTodo[];
};

export type TypeTodosSchema = {
  todo: TypeTheme;
  error: string | undefined;
  fetchTodoStatus: 'idle' | 'pending' | 'success' | 'failure';
  fetchDeleteStatus: 'idle' | 'pending' | 'success' | 'failure';
};
