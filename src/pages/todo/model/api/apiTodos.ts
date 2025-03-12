import { baseApi } from 'src/shared/api/baseApi';
import { z } from 'zod';
import { TypeTodo, TypeTodosId } from '../types/todosTypes';
import { TypeThemeId } from 'src/pages/theme/model/types/themeTypes';

const baseUrl = 'http://localhost:5000';

const TodosDtoSchema = z.object({
  id: z.number(),
  text: z.string(),
  checked: z.boolean(),
  themeId: z.number(),
});

const TodoNameDto = z.object({ text: z.string() });

export const apiTodos = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTodo: build.mutation<void, { text: string; themeId: number }>({
      query: ({ text, themeId }) => ({
        method: 'POST',
        url: '/todos',
        body: { text, themeId },
      }),
      invalidatesTags: ['Todo'],
    }),
    getTodos: build.query<TypeTodo[], void>({
      query: () => '/todos',
      providesTags: ['Todo'],
      transformResponse: (res: unknown) => TodosDtoSchema.array().parse(res),
    }),
    getTodosTheme: build.query<TypeTodo[], TypeThemeId>({
      query: (themeId) => `/todos/${themeId}`,
      providesTags: ['Todo'],
      transformResponse: (res: unknown) =>
        TodosDtoSchema.array()
          .parse(res)
          .sort((a, b) => a.id - b.id),
    }),
    getThemeName: build.query<{ text: string }, TypeThemeId>({
      query: (themeId) => `/themes/theme/${themeId}`,
      transformResponse: (res: unknown) => TodoNameDto.parse(res),
    }),
    deleteTodo: build.mutation<void, TypeTodosId>({
      query: (todoId) => ({
        method: 'DELETE',
        url: `/todos/todo`,
        body: { id: todoId },
      }),
      invalidatesTags: ['Todo'],
    }),
    checkedTodo: build.mutation<void, { checked: boolean; todoId: number }>({
      query: ({ checked, todoId }) => ({
        method: 'PUT',
        url: '/todos',
        body: { checked: checked, todoId: todoId },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
  overrideExisting: true,
});

// export const apiTodos = {
//   createTodo: async (text: string, themeId: number) => {
//     return await fetch(`${baseUrl}/todos`, {
//       method: 'POST',
//       body: JSON.stringify({ text, themeId }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });
//   },
//   getTheme: async (themeId: number) => {
//     return await fetch(`${baseUrl}/todos/${themeId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         return TodosDtoSchema.array().parse(data);
//       });
//   },
//   getTodos: async () => {
//     return fetch(`${baseUrl}/todos`)
//       .then((res) => res.json())
//       .then((data) => {
//         return TodosDtoSchema.array().parse(data);
//       });
//   },
//   getThemeName: async (themeId: number) => {
//     try {
//       const response = await fetch(`${baseUrl}/themes/theme/${themeId}`);
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(`Ошибка API:${baseUrl}/themes/theme/${themeId}`);
//       }
//       return TodoNameDto.parse(data);
//     } catch (error) {
//       console.error('Ошибка при получении темы:', error);
//     }
//   },
//   deleteTodo: async (todoId: number) => {
//     return await fetch(`${baseUrl}/todos/todo`, {
//       method: 'DELETE',
//       body: JSON.stringify({ id: todoId }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });
//   },
//   checkedTodo: async (checked: boolean, todoId: number) => {
//     return await fetch(`${baseUrl}/todos`, {
//       method: 'PUT',
//       body: JSON.stringify({ checked: checked, todoId: todoId }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });
//   },
// };
