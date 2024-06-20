import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function LoginPage() {
  const login = async (formData: FormData) => {
    'use server';
    const username = formData.get('username');
    const password = formData.get('password');
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
  };

  return (
    <div className="primary-background h-screen flex flex-col justify-center items-center relative">
      <h1 className="absolute top-0 left-0 p-4 font-bold">Todo-manager</h1>
      <form action={login} className="container-light-gray self-center p-4">
        <h3 className="font-bold m-1 pb-5 text-center text-xl border border-b-stone-300">
          Login
        </h3>
        <div className="flex flex-col gap-5 mt-4">
          <div>
            <label className="w-12" htmlFor="username">
              Username
            </label>
            <input
              name="username"
              id="username"
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="w-12" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              id="password"
              className="border rounded p-2 w-full"
            />
          </div>
          <button type="submit" className="rounded p-2 button-primary mt-7">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
