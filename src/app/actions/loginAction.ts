'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function loginAction(
  formState: { message: string },
  formData: FormData
) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username.trim().length === 0) {
      return {
        message: 'Username field must not be empty',
      };
    }

    if (password.trim().length === 0) {
      return {
        message: 'Password field must not be empty',
      };
    }

    // REMOVE IN PRODUCTION!!!!!!!!!
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay for 5 seconds

    const response = await fetch(`${process.env.TASKS_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    console.log('\nRESPONSE:', response, '\n');
    if (response.ok) {
      const authHeader = response.headers.get('Authorization');
      if (authHeader) {
        const token = authHeader.slice(6);
        cookies().set('token', token);
      }
    } else {
      return {
        message:
          'Login failed. Please verify your username and password and try again.',
      }; // if response !ok
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else
      return {
        message: 'An error occurred while logging in',
      };
  }
  redirect('/todo/scheduled');
}
