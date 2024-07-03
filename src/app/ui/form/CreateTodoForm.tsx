'use client';
import { useFormState } from 'react-dom';
import { DateField, TimeField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Todo } from '@/app/lib/definitions';
import CalendarIcon from '@/app/ui/svg/calendar-icon';
import { IconButton } from '@mui/material';
import 'dayjs/locale/zh-cn';
import * as actions from '@/app/actions';
import FormButton from '@/app/ui/common/FormButton';
import FormErrorMessage from '@/app/ui/common/FormErrorMessage';
import { useState } from 'react';
import CalendarModal from '@/app/ui/scheduled/calendar/CalendarModal';
import dayjs, { Dayjs } from 'dayjs';

export default function CreateTodoForm({ todos }: { todos: Todo[] }) {
  const [formState, action] = useFormState(actions.createTodo, { message: '' });
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Convert Dayjs to Date and set the state
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    setShowCalendarModal(false);
  };

  const isValidDate = (date: Dayjs | null) => {
    if (!date || !date.isValid()) return false;
    const today = dayjs().startOf('day'); // Start of today for comparison
    return date.isSame(today, 'day') || date.isAfter(today);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
      <form action={action}>
        <h3 className="font-bold m-1 text-xl border border-b-stone-300 text-center">
          Create a Todo
        </h3>
        <div className="flex flex-col gap-5 mt-4">
          <div>
            <label className="w-12" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              className="border rounded p-2 w-full"
              id="name"
            />
          </div>
          <div>
            <label className="w-12" htmlFor="name">
              Description
            </label>
            <textarea
              name="description"
              className="border rounded p-2 w-full"
              id="description"
            />
          </div>
          <div className="flex justify-start items-center">
            <DateField
              label="Date"
              name="date"
              id="date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              disablePast
            />
            <IconButton
              className="text-black-800"
              onClick={() => {
                setShowCalendarModal(true);
              }}
            >
              <CalendarIcon />
            </IconButton>
          </div>
          <TimeField label="Time" name="time" id="time" />
          <FormErrorMessage>{formState.message}</FormErrorMessage>
          <FormButton
            type="submit"
            className="rounded p-2 bg-orange-300"
            pendingText="Creating a new Todo..."
          >
            Create
          </FormButton>
          <button></button>
        </div>
      </form>
      {showCalendarModal && (
        <CalendarModal
          handleModalClose={() => {
            setShowCalendarModal(false);
          }}
          handleDateChange={(date: Date) => handleDateChange(dayjs(date))}
          todos={todos}
          selectedDate={
            isValidDate(selectedDate) ? selectedDate!.toDate() : null
          }
          isNew={true}
          modalHeader="Set a Date"
        />
      )}
    </LocalizationProvider>
  );
}
