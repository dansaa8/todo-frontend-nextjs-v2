'use server';

import { redirect } from 'next/navigation';
import * as todoApi from '@/lib/tasks-api';

export async function createTodo(formData: FormData) {
  // Thi needs to be a server action

  // Check the user's inputs an make sure they're valid
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const deadline = new Date(`${date} ${time}`);

  const todo = await todoApi.create({
    name: name,
    description: description,
    deadline: deadline,
  });

  return todo;
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
