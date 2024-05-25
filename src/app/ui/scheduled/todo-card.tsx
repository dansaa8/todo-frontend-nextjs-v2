import { Todo } from '@/app/lib/definitions';

export default function TodoCard({
  id,
  name,
  description,
  deadline,
  completedAt,
}: Todo) {
  console.log('DEADLINE: ', deadline);
  return (
    <div className="todo-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Deadline: {deadline ? new Date(deadline).toLocaleDateString() : 'nada'}</p>
      <p>
        Completed at: {completedAt ? new Date(completedAt).toLocaleDateString() : 'nada'}
      </p>
    </div>
  );
}
