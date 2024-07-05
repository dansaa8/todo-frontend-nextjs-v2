'use client';
import { useFormState } from 'react-dom';
import { DateField, TimeField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
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
import AddIcon from '@mui/icons-material/Add';

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
      <div className="flex justify-center bg-sky-100 flex-grow">
        <form
          action={action}
          className="p-2 border rounded bg-sky-200 border-sky-400 max-w-96 m-4 flex flex-col flex-start gap-4 "
        >
          <div className="flex flex-col gap-3   ">
            <h3 className="font-bold text-xl text-gray-500">Information</h3>
            <div>
              <TextField
                name="name"
                id="name"
                label="Name"
                variant="outlined"
                className="bg-white"
                fullWidth
                size="small"
              />
            </div>
            <div>
              <TextField
                name="description"
                id="description"
                label="Description"
                multiline
                rows={4}
                className="bg-white"
                fullWidth
              />
            </div>
          </div>
          <div className="w-full border-t border-sky-400"> </div>
          <div className="flex items-center justify-between flex-col">
            <h3 className="font-bold text-xl w-full text-gray-500">
              Date & Time
            </h3>
            <div className="flex items-center">
              <div className="flex flex-col gap-2 items-center justify-center">
                <DateField
                  label="Date"
                  name="date"
                  id="date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  disablePast
                  className="bg-white"
                  size="small"
                  // fullWidth
                />
                <TimeField
                  label="Time"
                  name="time"
                  id="time"
                  className="bg-white"
                  // fullWidth
                  size="small"
                />
              </div>
              <div className="flex items-center justify-center">
                <IconButton
                  className="text-black-800"
                  onClick={() => {
                    setShowCalendarModal(true);
                  }}
                >
                  <CalendarIcon className="w-24 h-24" />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="w-full border-t border-sky-400 my-2"> </div>
          <FormErrorMessage>{formState.message}</FormErrorMessage>
          <FormButton
            type="submit"
            className="rounded p-2 bg-orange-300 h-12"
            pendingText="Adding new Todo..."
          >
            <AddIcon />
            Add Todo
          </FormButton>
        </form>
      </div>

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
