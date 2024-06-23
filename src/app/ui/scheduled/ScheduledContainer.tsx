'use client';
import { Todo } from '@/app/lib/definitions';
import TodoCard from '@/app/ui/scheduled/card/todo-card';
import { IconButton } from '@mui/material';
import CalendarIcon from '@/app/ui/svg/calendar-icon';
import CalendarWithTodos from '@/app/ui/scheduled/calendar/CalendarWithTodos';
import CalendarModal from '@/app/ui/scheduled/calendar/CalendarModal';
import { useState } from 'react';

type ScheduledContainerProps = {
  todos: Todo[];
};

export default function ScheduledContainer({ todos }: ScheduledContainerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    const todoDate = new Date(todo.deadline);
    return isSameDay(todoDate, selectedDate);
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleModalClose = () => {
    setShowCalendarModal(false);
  };

  return (
    <>
      <section className="grid grid-cols-4 items-center border mb-5">
        <h2 className="pb-5 col-start-1 justify-self-center">
          Name of the day
        </h2>
        <IconButton
          className="text-amber-600 col-start-4 justify-self-center"
          onClick={() => {
            setShowCalendarModal(true);
          }}
        >
          <CalendarIcon />
        </IconButton>
      </section>

      <div className="flex flex-col gap-8 items-center">
        {filteredTodos.map((todo: Todo) => {
          return <TodoCard key={todo.id} todo={todo} />;
        })}
        {/* <CalendarWithTodos todos={todos} handleDateChange={handleDateChange} /> */}
      </div>
      {showCalendarModal && (
        <CalendarModal
          handleModalClose={handleModalClose}
          handleDateChange={handleDateChange}
          todos={todos}
        />
      )}
    </>
  );
}
