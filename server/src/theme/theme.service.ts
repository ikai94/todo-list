import { PrismaClient, Theme } from '@prisma/client';
import { ITheme } from './theme.types';
import { TypeTodos } from '../todos/todos.types';

export class ThemeService {
  private prisma = new PrismaClient();

  async createTheme(themes: ITheme): Promise<Theme> {
    try {
      return await this.prisma.theme.create({
        data: themes,
      });
    } catch (error) {
      throw new Error('Failed to create theme');
    }
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
      },
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
