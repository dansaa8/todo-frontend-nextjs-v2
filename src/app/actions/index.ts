'use server';

import { redirect } from 'next/navigation';
import * as todoApi from '@/app/lib/tasks-api';

export async function createTodo(
  formState: { message: string },
  formData: FormData
) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    const date = formData.get('date') as string;
    const time = formData.get('time') as string;

    if (typeof name !== 'string' || name.length < 3) {
      return {
        message: 'Name must be longer',
      };
    }

    if (typeof description !== 'string' || description.length > 100) {
      return {
        message: 'Description must not be more than 100 characters',
      };
    }

    if (!date || !time) {
      return {
        message: 'Date and time must be provided',
      };
    }

    const deadline = new Date(`${date} ${time}`);

    if (isNaN(deadline.getTime())) {
      return {
        message: 'Invalid date or time format',
      };
    }

    if (deadline < new Date()) {
      return {
        message: 'Deadline must be in the future',
      };
    }

    const todo = await todoApi.create({
      name: name,
      description: description,
      deadline: deadline,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else
      return {
        message: 'An error occurred while creating the todo',
      };
  }
  redirect(`/todo/scheduled`);
}

export async function deleteTodo(formData: FormData) {
  console.log('\nFORMDATA OBJECT LOOKS LIKE THIS: ', formData, '\n');
  const id = formData.get('id');
  console.log('ID HEEEEEEEEEEEEERE: ', id);

  try {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay for 5 seconds

    await todoApi.deleteById(id);
    redirect('http://localhost:3000');
  } catch (error) {}
}

async function editTodo() {
  console.log('edit todo-action called');
}

export {};
