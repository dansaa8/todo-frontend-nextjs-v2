import { getAll } from '@/lib/tasks-api';
import CreateTodoForm from '@/components/form/CreateTodoForm';

export default async function TodoCreatePage() {
  const todos = await getAll();

  return <CreateTodoForm todos={todos} />;
}
