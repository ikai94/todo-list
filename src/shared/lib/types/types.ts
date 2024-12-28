export interface ITodoList {
  id: number;
  text: string;
}

export interface ITodoItems {
  id: number;
  text: string;
  themeId: number;
  checkbox: boolean;
}

export type ActionTypeAddThemes = {
  type: 'addThemes';
  payload: string;
};
export type ActionTypeAddTodo = {
  type: 'addTodo';
  payload: string;
  themeId: number;
  checked: boolean;
};
export type ActionTypeDeleteTodo = {
  type: 'deleteTodo';
  payload: number;
};
export type ActionTypeDeleteTheme = {
  type: 'deleteTheme';
  payload: number;
};
export type ActionTypeCheckedTodo = {
  type: 'checkedTodo';
  payload: number;
};
export type ActionTypeGetTextTheme = {
  type: 'getTextTheme';
  payload: number;
};

// Theme


export type TypeGetThemeStarted = {
  type: 'getThemeStarted';
  isLoading: boolean
};

export type TypeGetThemeSuccess = {
  type: 'getThemeSuccess';
  payload: ITodoList[];
  isLoading: boolean;
};

export type TypeGetThemeFailure = {
  type: 'getThemeFailure';
  payload: string;
  isLoading: boolean;
};
