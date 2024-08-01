'use client';
import { useFormState } from 'react-dom';
import { DateField, TimeField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { Todo } from '@/lib/definitions';
import CalendarIcon from '@/components/svg/calendar-icon';
import { IconButton } from '@mui/material';
import 'dayjs/locale/zh-cn';
import * as actions from '@/actions/todo';
import FormButton from '@/components/common/FormButton';
import FormErrorMessage from '@/components/common/FormErrorMessage';
import { useState, useEffect } from 'react';
import CalendarModal from '@/components/scheduled/calendar/CalendarModal';
import dayjs, { Dayjs } from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import CheckMarkIcon from '@/components/svg/checkmark-icon';
import { useSnackbar } from '@/providers/snackbar-context';
import { useRouter } from 'next/navigation';

interface TodoFormProps {
  todo?: Todo; // Passed in as a parameter when editing a todo
}

export default function TodoForm({ todo }: TodoFormProps) {
  const [formState, action] = useFormState(
    todo ? actions.updateTodo.bind(null, todo.id) : actions.createTodo,
    { message: '' }
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const { showSnackbar } = useSnackbar();

  const router = useRouter();

  useEffect(() => {
    if (todo) {
      setName(todo.name);
      setDescription(todo.description || '');
      setSelectedDate(dayjs(todo.deadline));
    }
  }, []);

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

  useEffect(() => {
    const snackbarMessage = todo
      ? `Todo ${name} was updated.`
      : `Todo ${name} was added.`;
    if (formState.message === 'SUCCESS') {
      showSnackbar(snackbarMessage);
      router.push('/todo/scheduled');
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
      <div className="flex justify-center flex-grow">
        <div className="bg-gray-100 border border-gray-300 rounded max-w-96 m-2">
          <form
            action={action}
            className="px-2 pb-2 flex flex-col flex-start justify-between gap-1 h-full max-h-[750px]"
          >
            <h1 className="text-center font-bold text-xl py-6 h-20 border-b-1">
              {todo ? 'Edit' : 'New'} Todo
            </h1>
            {/* <div className=' text-gray-500 border-b-1'></div> */}
            <div className="flex flex-col gap-4 pt-2">
              <h3 className="font-bold text-sm text-gray-500 italic">
                Information
              </h3>
              <div>
                <TextField
                  name="name"
                  id="name"
                  label="Name"
                  variant="outlined"
                  className="bg-white"
                  fullWidth
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="border-b-1 text-gray-500 py-2"></div>
            <div className="flex items-center justify-between flex-col pt-3">
              <h3 className="font-bold text-sm w-full text-gray-500 italic">
                Date & Time
              </h3>
              <div className="flex items-center">
                <div className="flex flex-col gap-3 items-center justify-center">
                  <DateField
                    label="Date"
                    name="date"
                    id="date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    disablePast
                    className="bg-white"
                    size="small"
                  />
                  <TimeField
                    label="Time"
                    name="time"
                    id="time"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    className="bg-white"
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
                    <CalendarIcon className="w-28 h-28" />
                  </IconButton>
                </div>
              </div>
            </div>
            <FormErrorMessage>
              {formState.message != 'SUCCESS' && formState.message}
            </FormErrorMessage>
            {todo ? (
              <FormButton
                className="rounded-md p-2 bg-lime-400  min-h-12 max-h-20 grow"
                pendingText="Saving changes..."
              >
                Save Changes
                <CheckMarkIcon />
              </FormButton>
            ) : (
              <FormButton
                className="rounded-md p-2 bg-sky-400  min-h-12 max-h-20 grow"
                pendingText="Adding Todo..."
              >
                Add Todo
                <AddIcon />
              </FormButton>
            )}
          </form>
        </div>
      </div>

      {showCalendarModal && (
        <CalendarModal
          handleModalClose={() => {
            setShowCalendarModal(false);
          }}
          handleDateChange={(date: Date) => handleDateChange(dayjs(date))}
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
