'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function (formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay for 5 seconds

  const response = await fetch(`${process.env.TASKS_API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const authHeader = response.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.slice(6);
      cookies().set('token', token);
      redirect('/todo/scheduled');
    }
  }
  // redirect('/todo/scheduled');
}
