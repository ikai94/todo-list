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

  async deleteTheme(id: number): Promise<Theme> {
    
    await this.prisma.todo.deleteMany({
      where: { themeId: id }, // Удаляем все todo с этой темой
    });

    return await this.prisma.theme.delete({
      where: {
        id: id,
      },
    });
  }
}
