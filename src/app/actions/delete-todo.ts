'use server';
import { redirect } from 'next/navigation';
import { deleteById } from '../lib/tasks-api';

export default async function deleteTodoAction(formData: FormData) {
  console.log("\nFORMDATA OBJECT LOOKS LIKE THIS: " , formData, "\n");
  const id = formData.get('id');
  console.log('ID HEEEEEEEEEEEEERE: ', id);

  try {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay for 5 seconds

    await deleteById(id);
    redirect('http://localhost:3000');
  } catch (error) {}
}
