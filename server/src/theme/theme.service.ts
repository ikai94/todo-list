import { PrismaClient, Theme } from '@prisma/client';
import { ITheme } from './theme.types';
import { TypeTodos } from '../todos/todos.types';

export class ThemeService {
  private prisma = new PrismaClient();

  createTheme(themes: ITheme): Promise<Theme> {
    return this.prisma.theme.create({
      data: themes,
    });
  }

  getThemes(): Promise<Theme[]> {
    return this.prisma.theme.findMany({
      include: {
        todo: true,
      },
    });
  }

  getTheme(themeId: number) {
    return this.prisma.theme.findUnique({
      include: {
        todo: true,
      },
      where: {
        id: themeId,
      }
    });
  }

  deleteTheme(themeId: number) {
    return this.prisma.theme.delete({
      where: {
        id: themeId,
      },
    });
  }
}
