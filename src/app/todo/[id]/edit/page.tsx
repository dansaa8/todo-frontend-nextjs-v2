import { notFound } from 'next/navigation';
import TodoForm from '@/components/form/TodoForm';
import { getById } from '@/lib/tasks-api';

interface TodoEditPageProps {
  params: {
    id: string;
  };
}

export default async function TodoEditPage(props: TodoEditPageProps) {
  const id = parseInt(props.params.id);
  const todo = await getById(id);

  console.log('WHERE IS THE TODO: ', todo);

  if (!todo) {
    return notFound();
  }

  return <TodoForm todo={todo} />;
}
