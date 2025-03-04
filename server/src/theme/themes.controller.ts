import { Router } from 'express';
import type { Request, Response } from 'express';
import { ThemeService } from './theme.service';

const router = Router();
const themeService = new ThemeService()

router.post('/themes', async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ message: 'Нет темы!' });
  }
  const theme = await themeService.createTheme(req.body);
  res.status(201).json(theme);
});

router.get('/themes', async (req: Request, res: Response) => {
  const themes = await themeService.getThemes();
  res.json(themes);
});

router.get('/themes/:id', async (req: Request, res: Response) => {
  const params = req.params;
  const theme = await themeService.getTheme(Number(params.id));
  res.json(theme);
});

router.delete('/themes/:id', async (req: Request, res: Response) => {
  const params: number = Number(req.body);

  if (!params) {
    res.status(404).json({ message: 'не передал id!' });
  }

  const result = await themeService.deleteTheme(params);

  res.status(200).json(result);
});

export const themeRouter = router;
