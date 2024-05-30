import { getAll } from '@/app/lib/tasks-api';
import { Todo } from '@/app/lib/definitions';
import TodoCard from './card/todo-card';
import { IconButton } from '@mui/material';
import CalendarIcon from '@/app/ui/svg/calendar-icon';
import TodoProvider from '@/app/providers';

export default async function TodoContainer() {
  const fetchedTodos = await getAll();

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
        {fetchedTodos.map((todo: Todo) => {
          return (
            <TodoProvider todo={todo}>
              <TodoCard key={todo.id} />;
            </TodoProvider>
          );
        })}
      </div>
    </>
  );
}
