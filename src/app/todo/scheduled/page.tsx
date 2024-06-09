import { getAll } from '@/app/lib/tasks-api';
import { Todo } from '@/app/lib/definitions';
import TodoCard from '@/app/ui/scheduled/card/todo-card';
import { IconButton } from '@mui/material';
import CalendarIcon from '@/app/ui/svg/calendar-icon';

export default async function Page() {
  const todos = await getAll();

  return (
    <>
      <section className="grid grid-cols-4 items-center border mb-5">
        <h2 className="pb-5 col-start-1 justify-self-center">
          Name of the day
        </h2>
        <IconButton className="text-amber-600 col-start-4 justify-self-center">
          <CalendarIcon />
        </IconButton>
      </section>

      <div className="flex flex-col gap-8 items-center">
        {todos.map((todo: Todo) => {
          return (
              <TodoCard key={todo.id} todo={todo}/>
          );
        })}
      </div>
    </>
  );
}