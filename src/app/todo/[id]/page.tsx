import { notFound } from 'next/navigation';
import { getById } from '@/lib/tasks-api';
import { Todo } from '@/app/lib/definitions';

interface TodoShowPageProps {
  params: {
    id: string;
  };
}

export default async function TodoShowPage(props: TodoShowPageProps) {
  const todo: Todo = await getById(parseInt(props.params.id));

  if (!todo) {
    return notFound();
  }

  return <div>{todo.name}</div>;
}
