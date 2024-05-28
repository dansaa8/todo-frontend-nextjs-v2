import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { redirect } from 'next/navigation';
import { create } from '@/app/lib/tasks-api';

export default function TodoCreatePage() {
  async function createTodo(formData: FormData) {
    // Thi needs to be a server action
    'use server';

    // Check the user's inputs an make sure they're valid
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const date = new Date();

    const todo = await create({
      name: name,
      description: description,
      deadline: date,
    });

    // Create a new record in the database
    console.log('\n', todo, ' was created successfully!\n');

    // Redirect the user back to the root route
    redirect('/todo/scheduled');
  }
  return (
    <form action={createTodo}>
      <h3 className="font-bold m-1 text-xl border border-b-stone-300">
        Create a Todo
      </h3>
      <div className="flex flex-col gap-5 mt-4">
        <div>
          <label className="w-12" htmlFor="name">
            Name
          </label>
          <input name="name" className="border rounded p-2 w-full" id="name" />
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
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
