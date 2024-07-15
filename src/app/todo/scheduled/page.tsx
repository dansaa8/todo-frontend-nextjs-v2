import { getAll } from '@/lib/tasks-api';
import TodosWrapper from '@/components/scheduled/TodosWrapper';

export default async function Page() {
  const todos = await getAll();

  return <TodosWrapper todos={todos} />;
}
