import { getAllTasks } from '@/app/lib/tasks-api';
import { Todo } from '@/app/lib/definitions';
import TodoCard from './todo-card';
import { IconButton } from '@mui/material';
import CalendarIcon from '@/app/ui/svg/calendar-icon';

export default async function TodoContainer() {
  const fetchedTodos = await getAllTasks();

  return (
    <>
      <section className="flex justify-between items-center border mb-5">
        <h2 className="pb-5">Name of the day</h2>
        <IconButton className="text-amber-600 ">
          <CalendarIcon />
        </IconButton>
      </section>

      <div className="flex flex-col gap-8 items-center">
        {fetchedTodos.map((todo: Todo) => {
          return <TodoCard key={todo.id} {...todo} />;
        })}
      </div>
    </>
  );
}
