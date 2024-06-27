import { getAll } from '@/app/lib/tasks-api';
import TodosWrapper from '@/app/ui/scheduled/TodosWrapper';

export default async function Page() {
  const todos = await getAll();

  return <TodosWrapper todos={todos} />;
}
