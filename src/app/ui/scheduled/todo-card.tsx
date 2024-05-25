import { Todo } from '@/app/lib/definitions';
import ButtonSection from './button-section';
import TimeBadge from './time-badge';

export default function TodoCard({
  id,
  name,
  description,
  deadline,
  completedAt,
}: Todo) {
  return (
    <div style={{maxWidth: 450}} className="w-full border border-stone-300 rounded-lg p-3 bg-white shadow-lg">
      <section className="flex justify-between items-start pb-4 mb-4 px-2 border-b border-gray-200">
        <h3 className="font-bold text-stone-700">{name}</h3>
        <TimeBadge
          color="amber"
          dateTimeValue={new Date(deadline)}
          includeDate={false}
        ></TimeBadge>
      </section>
      <ButtonSection />
    </div>
  );
}
