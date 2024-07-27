'use server';

import { redirect } from 'next/navigation';
import * as todoApi from '@/lib/tasks-api';
import { revalidatePath } from 'next/cache';
import { validateFormData } from './utils';

export async function createTodo(
  formState: { message: string },
  formData: FormData
) {
  try {
    const validationResult = validateFormData(formData);

    if (!validationResult.valid) {
      return { message: validationResult.message };
    }

    const { name, description, deadline } = validationResult.data;

    await todoApi.create({
      name,
      description,
      deadline,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: 'An error occurred while creating the todo' };
    }
  }
  revalidatePath('/todo/scheduled');
  redirect('/todo/scheduled');
}

export async function updateTodo(
  id: number,
  formState: { message: string },
  formData: FormData
) {
  try {
    const validationResult = validateFormData(formData);

    if (!validationResult.valid) {
      return { message: validationResult.message };
    }

    const { name, description, deadline } = validationResult.data;

    await todoApi.updateById(id, {
      name,
      description,
      deadline,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: 'An error occurred while updating the todo' };
    }
  }
  revalidatePath('/todo/scheduled');
  redirect('/todo/scheduled');
}

export async function deleteTodo(formData: FormData) {
  const id = Number(formData.get('id')) || -1;

  if (id === -1) {
    console.log('ID is null or invalid. Skipping the delete operation.');
    return;
  }

  try {
    await todoApi.deleteById(id);
    revalidatePath('/todo/scheduled');
    redirect('http://localhost:3000');
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

export async function completeTodo(id: number) {
  try {
    await todoApi.setCompleteById(id);
    revalidatePath('/todo/scheduled');
  } catch (error) {}
}

export async function undoTodo(formData: FormData) {
  const id = Number(formData.get('id')) || -1;
  if (id === -1) {
    console.log('ID is null or invalid. Skipping the delete operation.');
    return;
  }

  try {
    await todoApi.setCompletedAtToNullById(id);
    revalidatePath('/todo/scheduled');
  } catch (error) {}
}
