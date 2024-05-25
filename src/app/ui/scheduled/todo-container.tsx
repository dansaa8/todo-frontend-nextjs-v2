import { getAllTasks } from '@/app/lib/tasks-api';
import { Todo } from '@/app/lib/definitions';
import TodoCard from './todo-card';

export default async function TodoContainer() {
  const fetchedTodos = await getAllTasks();

  return (
    <div className='flex flex-col gap-3'>
      {fetchedTodos.map((todo: Todo) => {
        return <TodoCard key={todo.id} {...todo} />;
      })}
    </div>
  );
}
