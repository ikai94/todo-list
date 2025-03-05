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
  getTheme: async (themeId: number) => {
    return await fetch(`${baseUrl}/todos/${themeId}`)
      .then((res) => res.json())
      .then((data) => {
        return TodosDtoSchema.array().parse(data);
      });
  },
  getTodos: async () => {
    return await fetch(`${baseUrl}/todos`)
      .then((res) => res.json())
      .then((data) => {
        return TodosDtoSchema.array().parse(data);
      });
  },
  getThemeName: async (themeId: number) => {
    return await fetch(`${baseUrl}/themes/theme/${themeId}`)
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
      body: JSON.stringify({ checked: checked, todoId: todoId }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },
};
