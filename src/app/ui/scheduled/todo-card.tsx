import { Todo } from '@/app/lib/definitions';
import ButtonSection from './button-section';

export default function TodoCard({
  id,
  name,
  description,
  deadline,
  completedAt,
}: Todo) {
  return (
    <ButtonSection />
  );
}
