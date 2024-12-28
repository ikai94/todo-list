import { applyMiddleware, createStore } from 'redux';
import { todoItems} from './data.ts';
import { useDispatch } from 'react-redux';
import { thunk } from 'redux-thunk';
import {
  ActionTypeAddThemes,
  ActionTypeAddTodo,
  ActionTypeCheckedTodo,
  ActionTypeDeleteTheme,
  ActionTypeDeleteTodo,
  ActionTypeGetTextTheme,
  ITodoItems,
  ITodoList,
  TypeGetThemeFailure,
  TypeGetThemeStarted,
  TypeGetThemeSuccess,
} from './types/types.ts';

export interface IState {
  loading: boolean;
  theme: ITodoList[];
  todos: ITodoItems[];
  error: string | null;
  text: string | undefined | null;
  isLoading: boolean;
}

const initialState: IState = {
  theme: [],
  error: null,
  loading: false,
  todos: todoItems,
  text: null,
  isLoading: false,
};

type ActionAll =
  | ActionTypeAddThemes
  | ActionTypeAddTodo
  | ActionTypeDeleteTodo
  | ActionTypeCheckedTodo
  | ActionTypeDeleteTheme
  | ActionTypeGetTextTheme
  | TypeGetThemeStarted
  | TypeGetThemeSuccess
  | TypeGetThemeFailure;

function nextTodoId(todos: ITodoList[]) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

function textTheme(state: IState, action: ActionTypeGetTextTheme) {
  const text = state.theme.find((el) => {
    if (el.id == action.payload) {
      return el.text;
    }
  });
  return text?.text;
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
        text: textTheme(state, action),
      };
      case 'getThemeStarted':
        return {
          ...state,
          isLoading: true
        }
    case 'getThemeSuccess' :
      return {
        ...state,
        theme: action.payload,
        isLoading: false,
      }
      case 'getThemeFailure' :
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        }
    default:
      return state;
  }
};

export const store = createStore(reducerRouter, applyMiddleware(thunk));

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
