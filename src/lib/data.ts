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

export const todoList: ITodoList[] = [
  {
    id: 1,
    text: 'Спорт',
  },
  {
    id: 2,
    text: 'Жизнь',
  },
  {
    id: 3,
    text: 'Прочее',
  },
];

export const todoItems: ITodoItems[] = [
  {
    id: 1,
    text: 'Смотреть лучшее',
    checkbox: false,
    themeId: 1,
  },
  {
    id: 2,
    text: 'Смотреть лучшее 2',
    checkbox: false,
    themeId: 1,
  },
  {
    id: 3,
    text: 'настройка vsCode',
    checkbox: false,
    themeId: 2,
  },
  {
    id: 4,
    text: 'asfsfsfsfsfsf',
    checkbox: false,
    themeId: 3,
  },
  {
    id: 5,
    text: 'sfsfscvserfsesewqqerqe',
    checkbox: false,
    themeId: 4,
  },
];
