import { createStore } from 'redux';
import { ITodoList, ITodoItems } from './data.ts';
import { todoList, todoItems } from './data.ts';
import { useDispatch } from 'react-redux';

export interface IState {
  loading: boolean;
  theme: ITodoList[];
  todos: ITodoItems[];
  error: string | null;
  text: string | null;
}

type ActionTypeAddThemes = {
  type: 'addThemes';
  payload: string;
};

type ActionTypeAddTodo = {
  type: 'addTodo';
  payload: string;
  themeId: number;
  checked: boolean;
};

type ActionTypeDeleteTodo = {
  type: 'deleteTodo';
  payload: number;
};

type ActionTypeDeleteTheme = {
  type: 'deleteTheme';
  payload: number;
};

type ActionTypeCheckedTodo = {
  type: 'checkedTodo';
  payload: number;
};

type ActionTypeGetTextTheme = {
  type: 'getTextTheme';
  payload: number;
};

const initialState: IState = {
  theme: todoList,
  error: null,
  loading: false,
  todos: todoItems,
  text: null,
};

type ActionAll =
  | ActionTypeAddThemes
  | ActionTypeAddTodo
  | ActionTypeDeleteTodo
  | ActionTypeCheckedTodo
  | ActionTypeDeleteTheme
  | ActionTypeGetTextTheme;

function nextTodoId(todos: ITodoList[]) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

const reducerRouter = (state = initialState, action: ActionAll): IState => {
  switch (action.type) {
    case 'addThemes':
      return {
        ...state,
        theme: [
          ...state.theme,
          {
            id: nextTodoId(state.theme),
            text: action.payload,
          },
        ],
      };
    case 'addTodo':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nextTodoId(state.todos),
            text: action.payload,
            checkbox: false,
            themeId: action.themeId,
          },
        ],
      };
    case 'deleteTodo':
      return {
        ...state,
        todos: [...state.todos].filter((el) => Number(el.id) != action.payload),
      };
    case 'deleteTheme':
      return {
        ...state,
        theme: [...state.theme].filter((el) => Number(el.id) != action.payload),
      };
    case 'checkedTodo':
      return {
        ...state,
        todos: [...state.todos].map((todo) => {
          if (todo.id != action.payload) return todo;
          return { ...todo, checkbox: !todo.checkbox };
        }),
      };
    case 'getTextTheme':
      return {
        ...state,
        theme: [
          ...state.theme.filter((el) => {
            if (el.id === action.payload) {
              return {...state, text: el.text};
            }
            return el;
          }),
        ],
      };

    default:
      return state;
  }
};

export const store = createStore(reducerRouter);

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
