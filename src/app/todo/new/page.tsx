import { getAll } from '@/app/lib/tasks-api';
import CreateTodoForm from '@/app/ui/form/CreateTodoForm';

export default async function TodoCreatePage() {
  const todos = await getAll();

  return <CreateTodoForm todos={todos} />
}
