import React from 'react';
import { Button } from '@mui/material';
import { Todo } from '@/lib/definitions';

interface TodosFilterProps {
  activeFilter: 'todo' | 'done' | null;
  setActiveFilter: React.Dispatch<React.SetStateAction<'todo' | 'done' | null>>;
  tasks: { todo: Todo[]; done: Todo[] };
  isDateInPast: boolean;
}

export default function TodosFilter({
  activeFilter,
  setActiveFilter,
  tasks,
  isDateInPast,
}: TodosFilterProps) {
  return (
    <section className="flex justify-center gap-2">
      {tasks.todo.length > 0 && (
        <Button
          size="small"
          className={
            activeFilter === 'todo'
              ? isDateInPast
                ? 'urgent'
                : 'future'
              : 'unselected'
          }
          onClick={() => setActiveFilter('todo')}
          disabled={tasks.done.length === 0}
        >
          <p
            className={
              tasks.todo.length === 0
                ? 'text-gray-300 normal-case'
                : 'text-gray-800 normal-case'
            }
          >
            Todo
          </p>
        </Button>
      )}

      {tasks.done.length > 0 && (
        <Button
          size="small"
          className={activeFilter === 'done' ? 'completed' : 'unselected'}
          onClick={() => setActiveFilter('done')}
          disabled={tasks.todo.length === 0}
        >
          <p
            className={
              tasks.done.length === 0
                ? 'text-gray-300 normal-case'
                : 'text-gray-800 normal-case'
            }
          >
            Done
          </p>
        </Button>
      )}
    </section>
  );
}
