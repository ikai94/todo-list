import { z } from 'zod';

const baseUrl = 'http://localhost:5000';

const TodosDtoSchema = z.object({
  id: z.number(),
  text: z.string(),
  checked: z.boolean(),
  themeId: z.number(),
});

const TodoNameDto = z.string();

export const apiTodos = {
  getTheme: (themeId: number) => {
    return fetch(`${baseUrl}/todos/${themeId}`)
      .then((res) => res.json())
      .then((data) => {
        return TodosDtoSchema.array().parse(data);
      });
  },
  getTodos: () => {
    return fetch(`${baseUrl}/todos`)
      .then((res) => res.json())
      .then((data) => {
        return TodosDtoSchema.array().parse(data);
      });
  },
  getThemeName: (themeId: number) => {
    return fetch(`${baseUrl}/themes/theme/${themeId}`)
      .then((res) => res.json())
      .then((data) => {
        return TodoNameDto.parse(data);
      });
  },
  deleteTodo: async (todoId: number) => {
    return await fetch(`${baseUrl}/todos/todo`, {
      method: 'DELETE',
      body: JSON.stringify({ id: todoId }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },
  checkedTodo: async (checked: boolean, todoId: number) => {
    return await fetch(`${baseUrl}/todos`, {
      method: 'PUT',
      body: JSON.stringify({ checked: checked, id: todoId }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },
};
