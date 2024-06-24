'use client';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Todo } from '@/app/lib/definitions';

interface CalendarWithTodosProps {
  todos: Todo[];
  handleDateChange: (date: Date) => void;
  selectedDate: Date;
}

const CalendarWithTodos: React.FC<CalendarWithTodosProps> = ({
  todos,
  handleDateChange,
  selectedDate,
}) => {
  const [dateList, setDateList] = useState<Date[]>([]);

  useEffect(() => {
    const datesWithTodos = todos.map((todo) => new Date(todo.deadline));
    setDateList(datesWithTodos);
  }, [todos]);

  const tileDisabled = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): boolean => {
    if (view === 'month') {
      return !dateList.some((d) => d.toDateString() === date.toDateString());
    }
    return false;
  };

  const tileClassName = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): string => {
    if (view === 'month') {
      if (dateList.some((d) => d.toDateString() === date.toDateString())) {
        return 'clickable-date';
      }
      if (date.toDateString() === selectedDate.toDateString()) {
        return 'selected-date';
      }
    }
    return '';
  };

  return (
    <div>
      <Calendar
        value={selectedDate}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        onClickDay={(date) => {
          if (dateList.some((d) => d.toDateString() === date.toDateString())) {
            handleDateChange(date);
          }
        }}
      />  
    </div>
  );
};

export default CalendarWithTodos;
