import { json, Router } from 'express';
import type { Request, Response } from 'express';
import { TodosService } from './todos.service';
import { Todo } from '@prisma/client';
import { parser } from 'typescript-eslint';
import bodyParser from 'body-parser';

const router = Router();
const todosService = new TodosService();

router.post('/todos', async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ message: 'данные не переданы' });
  }

  const todo = await todosService.createTodo(req.body);
  res.status(201).json(todo);
});

router.get('/todos', async (req: Request, res: Response) => {
  const todos = await todosService.getTodos();
  res.json(todos);
});

router.get('/todos/:id', async (req: Request, res: Response) => {
  const params = req.params;

  const todosForTheme = await todosService.getTodosForTheme(Number(params.id));
  res.json(todosForTheme);
});

router.get('/themes/theme/:id', async (req: Request, res: Response) => {
  const themeId = Number(req.params.id);

  if (isNaN(themeId)) {
    res.status(400).json({ error: 'Некорректный ID' });
  }

  try {
    const themeName = await todosService.getThemeName(themeId);

    if (!themeName) {
      res.status(404).json({ error: 'Тема не найдена' });
    }

    res.json(themeName);
  } catch (error) {
    console.error('Ошибка при получении темы:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.get('/todos/todo/:id', async (req: Request, res: Response) => {
  const params = req.params;

  const themeTodos = await todosService.getThemeTodos(Number(params.id));
  res.json(themeTodos);
});

router.delete('/todos/todo', async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    res.status(404).json({ message: 'Не передан id задачи' });
  }

  await todosService.deleteTodo(id);

  res.status(200);
});

router.put('/todos', async (req: Request, res: Response) => {
  const { checked, todoId }: { checked: boolean; todoId: number } = req.body;

  if (typeof checked !== 'boolean' || !todoId) {
    res.status(404).json({ message: 'Не передан флаг поля checkedd' });
  }

  const result = await todosService.updateChecked(todoId, checked);
  res.status(200).json(result);
});

export const todosRouter = router;
