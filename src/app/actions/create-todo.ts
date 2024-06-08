'use server';
import { create } from '@/app/lib/tasks-api';

export default async function createTodoAction(formData: FormData) {
  // Thi needs to be a server action

  // Check the user's inputs an make sure they're valid
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const deadline = new Date(`${date} ${time}`)

  const todo = await create({
    name: name,
    description: description,
    deadline: deadline,
  });

  return todo;
}
