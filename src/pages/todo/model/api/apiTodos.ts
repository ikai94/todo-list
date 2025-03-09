import { z } from 'zod';

const baseUrl = 'http://localhost:5000';

const TodosDtoSchema = z.object({
  id: z.number(),
  text: z.string(),
  checked: z.boolean(),
  themeId: z.number(),
});

const TodoNameDto = z.object({ text: z.string() });

export const apiTodos = {
  createTodo: async (text: string, themeId: number) => {
    return await fetch(`${baseUrl}/todos`, {
      method: 'POST',
      body: JSON.stringify({ text, themeId }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },
  getTheme: async (themeId: number) => {
    return await fetch(`${baseUrl}/todos/${themeId}`)
      .then((res) => res.json())
      .then((data) => {
        return TodosDtoSchema.array().parse(data);
      });
  },
  getTodos: async () => {
    return fetch(`${baseUrl}/todos`)
      .then((res) => res.json())
      .then((data) => {
        return TodosDtoSchema.array().parse(data);
      });
  },
  getThemeName: async (themeId: number) => {
    try {
      const response = await fetch(`${baseUrl}/themes/theme/${themeId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Ошибка API:${baseUrl}/themes/theme/${themeId}`);
      }
      return TodoNameDto.parse(data);
    } catch (error) {
      console.error('Ошибка при получении темы:', error);
    }
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
