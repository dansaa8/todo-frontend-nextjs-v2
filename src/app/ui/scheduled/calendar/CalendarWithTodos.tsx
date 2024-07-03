'use client';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Todo } from '@/app/lib/definitions';
import { isSameDay, isToday } from '@/utils';

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
  const [urgentDates, setUrgentDates] = useState<Date[]>([]);
  const [completedDates, setCompletedDates] = useState<Date[]>([]);

  useEffect(() => {
    const datesWithTodos = todos.map((todo) => new Date(todo.deadline));
    setDateList(datesWithTodos);

    const today = new Date();
    const urgentDates = todos
      .filter((todo) => !todo.completedAt && new Date(todo.deadline) < today)
      .map((todo) => new Date(todo.deadline));
    setUrgentDates(urgentDates);

    const completedDates = todos
      .filter((todo) => todo.completedAt && new Date(todo.deadline) < today)
      .map((todo) => new Date(todo.deadline));
    setCompletedDates(completedDates);
  }, [todos]);

  const tileDisabled = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): boolean => {
    if (view === 'month') {
      return !dateList.some((d) => isSameDay(d, date));
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
      let className = '';

      // Check if the date has urgent todos
      const isUrgent = urgentDates.some((d) => isSameDay(d, date));

      // Check if the date is selected
      const isSelected = isSameDay(date, selectedDate);

      // Check if the date has completed todos and is in the past
      const isCompletedAndInThePast = completedDates.some(
        (d) => isSameDay(d, date) && !isToday(date)
      );

      if (isUrgent) {
        className += isSelected ? 'urgentSelected' : 'urgent';
      } else if (isCompletedAndInThePast) {
        className += isSelected ? 'completedSelected' : 'completed';
      } else if (isSelected && isToday(date)) {
        className += 'todaySelected';
      } else if (isToday(date)) {
        className += 'today';
      } else if (date > new Date() && dateList.some((d) => isSameDay(d, date))) {
        className += isSelected ? 'futureSelected' : 'future';
      }

      return className.trim();
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
          if (dateList.some((d) => isSameDay(d, date))) {
            handleDateChange(date);
          }
        }}
      />
    </div>
  );
};

export default CalendarWithTodos;
