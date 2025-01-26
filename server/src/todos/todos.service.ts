import { PrismaClient, Theme, Todo } from '@prisma/client';

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

  deleteTodo(todoId: number) {
    return this.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
  }
}
