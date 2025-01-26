import { Router } from 'express';
import type { Request, Response } from 'express';
import { TodosService } from './todos.service';

const router = Router();
const todosService = new TodosService();

router.post('/todos:id', async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ message: 'Нет темы!' });
  }
  const todo = await todosService.createTodo(req.body);
  res.status(201).json(todo);
});

router.get('/todos', async (req: Request, res: Response) => {
  const todos = await todosService.getTodos();
  res.json(todos);
});

router.delete('/todos:id', async (req: Request, res: Response) => {
  const params: number = Number(req.body);

  if (!params) {
    res.status(404).json({ message: 'не передал id!' });
  }

  const result = await todosService.deleteTodo(params);

  res.status(200).json(result);
});

export const todosRouter = router;
