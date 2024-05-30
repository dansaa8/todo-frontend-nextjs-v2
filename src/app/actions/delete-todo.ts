'use server';
import { redirect } from 'next/navigation';
import { deleteById } from '../lib/tasks-api';

export default async function deleteTodoAction(formData : FormData) {
  const id = formData.get('id');
  console.log('ID HEEEEEEEEEEEEERE: ', id);

  try {
    await deleteById(id);
    redirect('http://localhost:3000');
  } catch (error) {}
}
