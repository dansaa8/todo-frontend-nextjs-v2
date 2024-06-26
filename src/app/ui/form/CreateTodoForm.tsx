'use client';
import { useFormState } from 'react-dom';
import { DateField, TimeField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import * as actions from '@/app/actions';
import FormButton from '@/app/ui/common/FormButton';
import FormErrorMessage from '@/app/ui/common/FormErrorMessage';

export default function CreateTodoForm() {
  const [formState, action] = useFormState(actions.createTodo, { message: '' });

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
          <DateField label="Date" name="date" id="date" />
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
    </LocalizationProvider>
  );
}
