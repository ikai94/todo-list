import axios from 'axios';
import { ITodoList } from '../types/types.ts';

export const getTheme = () => {
  // @ts-ignore
  return dispatch => {
    dispatch(getThemeStarted());

    axios
      .get('http://localhost:5000/theme')
      .then((res) => {
          dispatch(getThemeSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getThemeFailure(err));
      });
  };
};

const getThemeSuccess = (theme: ITodoList[]) => ({
  type: 'getThemeSuccess',
  payload: theme,
});

const getThemeStarted = () => ({
  type: 'getThemeStarted',
});

const getThemeFailure = (error: string) => ({
  type:'getThemeFailure',
  payload: {
    error,
  },
});
