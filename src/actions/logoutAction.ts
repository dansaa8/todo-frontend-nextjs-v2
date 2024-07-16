'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function logoutAction() {
  try {
    cookies().set('token', '', { expires: new Date(0) });
  } catch (err: unknown) {
    console.error('Error logging out:', err);
  }
  redirect('/login'); 
}
