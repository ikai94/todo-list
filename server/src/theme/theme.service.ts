import { PrismaClient, Theme } from '@prisma/client';
import { ITheme, IThemeDelete } from './theme.types';


export class ThemeService {
  private prisma = new PrismaClient();

  createTheme(themes: ITheme): Promise<Theme> {
    return this.prisma.theme.create({
      data: themes,
    });
  }

  getTheme(): Promise<Theme[]> {
    return this.prisma.theme.findMany();
  }

  deleteTheme(id:string) {
    return this.prisma.theme.delete({
      where: {
        id,
      },
    });
  }
}
