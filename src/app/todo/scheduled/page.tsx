import { getAll } from '@/app/lib/tasks-api';
import ScheduledContainer from '@/app/ui/scheduled/ScheduledContainer';

export default async function Page() {
  const todos = await getAll();

  return (
    <ScheduledContainer todos={todos}/>
  );
}
