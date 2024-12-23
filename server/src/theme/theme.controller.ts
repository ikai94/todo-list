import { json, Router } from 'express';
import type { Request, Response } from 'express';
import { ThemeService } from './theme.service';
import { Theme } from '@prisma/client';

const router = Router();
const themeService = new ThemeService();

router.post('/theme', async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ message: 'Нет темы!' });
  }
  const theme = await themeService.createTheme(req.body);
  res.status(201).json(theme);
});

router.get('/theme', async (req: Request, res: Response) => {

  const themes = await themeService.getTheme();
  res.json(themes);
});

router.delete('/theme/:id', async (req: Request, res: Response) => {


  const params = req.params.id;

  if (!params) {
    res.status(404).json({ message: 'не передал id!' });
  }

  const result = await themeService.deleteTheme(params);

   res.status(200).json(result);

});

export const themeRouter = router;
