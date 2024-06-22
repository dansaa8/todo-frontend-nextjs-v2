// components/CalendarWithTodos.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import CalendarTileProperties from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { Todo } from '@/app/lib/definitions';


interface CalendarWithTodosProps {
  todos: Todo[];
  handleDateChange: (date: Date) => void;
}

const CalendarWithTodos: React.FC<CalendarWithTodosProps> = ({ todos, handleDateChange }) => {
  const [dateList, setDateList] = useState<Date[]>([]);

  useEffect(() => {
    const datesWithTodos = todos.map(todo => new Date(todo.deadline));
    setDateList(datesWithTodos);
  }, [todos]);

  const tileDisabled = ({ date, view }: CalendarTileProperties): boolean => {
    // Disable all dates initially
    if (view === 'month') {
      // Enable dates that have todos
      return !dateList.some(d => d.toDateString() === date.toDateString());
    }
    return false;
  };

  const tileClassName = ({ date, view }: CalendarTileProperties): string => {
    if (view === 'month') {
      return dateList.some(d => d.toDateString() === date.toDateString())
        ? 'clickable-date'
        : 'unclickable-date';
    }
    return '';
  };

  return (
    <div>
      <Calendar
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        onClickDay={(date) => {
          if (dateList.some(d => d.toDateString() === date.toDateString())) {
            alert(`You clicked on a date with todos: ${date.toDateString()}`);
            handleDateChange(date)
          }
        }}
      />
      <style jsx>{`
        .clickable-date {
          background-color: #90ee90; /* Light green */
        }
        .unclickable-date {
          pointer-events: none;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default CalendarWithTodos;
