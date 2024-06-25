'use client';
import { Todo } from '@/app/lib/definitions';
import TodoCard from '@/app/ui/scheduled/card/todo-card';
import { IconButton } from '@mui/material';
import CalendarIcon from '@/app/ui/svg/calendar-icon';
import CalendarModal from '@/app/ui/scheduled/calendar/CalendarModal';
import { useState } from 'react';
import * as utils from '@/utils/index';

type ScheduledContainerProps = {
  todos: Todo[];
};

export default function ScheduledContainer({ todos }: ScheduledContainerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const filteredTodos = todos.filter((todo: Todo) => {
    const todoDate = new Date(todo.deadline);
    return utils.isSameDay(todoDate, selectedDate);
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    handleModalClose();
  };

  const handleModalClose = () => {
    setShowCalendarModal(false);
  };

  const formattedDate = utils.formatDateWithSuffix(selectedDate);
  const relativeDateLabel = utils.getRelativeDateLabel(selectedDate);
  let containerColor;

  if (relativeDateLabel.includes('Today'))
    containerColor = 'bg-yellow-50 border-yellow-200';
  else if (
    relativeDateLabel.includes('days ago') ||
    relativeDateLabel.includes('Yesterday')
  )
    containerColor = 'bg-red-100 border border-red-200';
  else containerColor = 'bg-blue-50 border border-blue-100';

  return (
    <>
      <section
        className={`grid grid-cols-3 items-center border mb-5 ${containerColor} rounded-t pb-2`}
      >
        <h2 className="mt-3 col-start-1 justify-self-center font-bold text-lg">
          {relativeDateLabel}
        </h2>
        <div className="mt-3 col-start-2 justify-self-center">
          <p className="text-center">{formattedDate[0]}</p>
          <p className="text-center">
            {formattedDate[1] + ' ' + formattedDate[2]}
          </p>
        </div>

        <IconButton
          className="text-amber-600 col-start-3 justify-self-center"
          onClick={() => {
            setShowCalendarModal(true);
          }}
        >
          <CalendarIcon />
        </IconButton>
      </section>

      <section className="flex flex-col gap-8 items-center p-1 mb-20">
        {filteredTodos.map((todo: Todo) => {
          return <TodoCard key={todo.id} todo={todo} />;
        })}
        {/* <CalendarWithTodos todos={todos} handleDateChange={handleDateChange} /> */}
      </section>
      {showCalendarModal && (
        <CalendarModal
          handleModalClose={handleModalClose}
          handleDateChange={handleDateChange}
          todos={todos}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
}
