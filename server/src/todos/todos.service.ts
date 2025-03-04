import { PrismaClient, Todo } from '@prisma/client';

export class TodosService {
  private prisma = new PrismaClient();

  createTodo(todo: Todo): Promise<Todo> {
    return this.prisma.todo.create({
      data: todo,
    });
  }

  getTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  getThemeTodos(themeId: number): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      where: {
        themeId: themeId,
      },
    });
  }

  getTodosForTheme(themeId: number) {
    return this.prisma.todo.findMany({
      where: {
        themeId: themeId,
      },
    });
  }

  getThemeName(themeId: number) {
    return this.prisma.theme.findFirst({
      where: {
        id: themeId,
      },
      select: {
        text: true,
      },
    });
  }

  deleteTodo(todoId: number) {
    return this.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
  }

  updateChecked(todoId: number, checked: boolean) {
    return this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        checked: checked,
      },
    });
  }
}
