'use client';

import { Todo } from '@/app/lib/definitions';
import ButtonSection from './button-section';
import TimeBadge from './time-badge';
import { useContext } from 'react';
import { TodoContext } from '@/app/providers';

export default function TodoCard() {
  const todo = useContext(TodoContext);
  return (
    <div className="w-full border border-stone-300 rounded-lg p-3 bg-white shadow-lg">
      <section className="grid grid-cols-4 pb-4 mb-4 px-2 border-b border-gray-200">
        <h3 className="font-bold text-stone-700 col-start-2 col-end-4 text-center">
          {todo!.name}
        </h3>
        <TimeBadge
          color="amber"
          dateTimeValue={new Date(todo!.deadline)}
          includeDate={false}
        ></TimeBadge>
      </section>
      <ButtonSection />
    </div>
  );
}
