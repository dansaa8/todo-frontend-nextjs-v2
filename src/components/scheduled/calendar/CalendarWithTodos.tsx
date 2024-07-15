'use client';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Todo } from '@/lib/definitions';
import { isSameDay, isToday, setToMidnight } from '@/utils';

interface CalendarWithTodosProps {
  todos: Todo[];
  handleDateChange: (date: Date) => void;
  selectedDate: Date | null;
  isNew: boolean; // prop to determine if we are creating a new todo
}

const CalendarWithTodos: React.FC<CalendarWithTodosProps> = ({
  todos,
  handleDateChange,
  selectedDate,
  isNew,
}) => {
  const [datesWithTodos, setDatesWithTodos] = useState<Date[]>([]);
  const [urgentDates, setUrgentDates] = useState<Date[]>([]);
  const [completedDates, setCompletedDates] = useState<Date[]>([]);

  useEffect(() => {  
    const today = setToMidnight(new Date());
  
    const datesWithTodos = todos.map((todo) => ({
      deadline: setToMidnight(todo.deadline),
      completedAt: todo.completedAt ? setToMidnight(todo.completedAt) : null,
    }));
    setDatesWithTodos(datesWithTodos.map((item) => item.deadline));
  
    // Filter urgent and completed dates from datesWithTodos
    const urgentDates = datesWithTodos
      .filter((item) => !item.completedAt && item.deadline < today)
      .map((item) => item.deadline);
    setUrgentDates(urgentDates);
  
    const completedDates = datesWithTodos
      .filter((item) => item.completedAt && item.deadline < today)
      .map((item) => item.deadline);
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
      // Disable dates in the past if isNew is true
      if (isNew) {
        return date < new Date() && !isToday(date);
      }
      return !datesWithTodos.some((d) => isSameDay(d, date) || isToday(date));
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
      let isSelected;
      if (!selectedDate) {
        isSelected = false;
      } else {
        isSelected = isSameDay(date, selectedDate);
      }

      // Check if the date has completed todos and is in the past
      const isCompletedAndInThePast = completedDates.some(
        (d) => isSameDay(d, date) && !isToday(date)
      );

      if (isUrgent) {
        className += isSelected ? 'urgentSelected' : 'urgent';
      } else if (isCompletedAndInThePast && !isNew) {
        className += isSelected ? 'completedSelected' : 'completed';
      } else if (isSelected && isToday(date)) {
        className += 'todaySelected';
      } else if (isToday(date)) {
        className += 'today';
      } else if (
        date > new Date() &&
        datesWithTodos.some((d) => isSameDay(d, date))
      ) {
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
          // Allow date selection only if the date is not disabled
          if (!tileDisabled({ date, view: 'month' })) {
            handleDateChange(date);
          }
        }}
      />
    </div>
  );
};

export default CalendarWithTodos;
