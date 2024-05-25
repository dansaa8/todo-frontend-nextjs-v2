export type Todo = {
  id: number;
  name: string;
  description: string | null;
  deadline: Date;
  completedAt: Date | null;
};

export type CreateTodo = {};
