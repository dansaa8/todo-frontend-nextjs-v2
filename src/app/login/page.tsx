// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push('/todo/scheduled'); // Redirect to home page or any other page
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className="primary-background h-screen flex flex-col justify-center items-center relative">
      <h1 className="absolute top-0 left-0 p-4 font-bold">Todo-manager</h1>
      <form
        onSubmit={handleLogin}
        className="container-light-gray self-center p-4"
      >
        <h3 className="font-bold m-1 pb-5 text-center text-xl border border-b-stone-300">
          Login
        </h3>
        <div className="flex flex-col gap-5 mt-4">
          <div>
            <label className="w-12" htmlFor="name">
              Name
            </label>
            <input
              // name="name"
              // id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="w-12" htmlFor="name">
              Password
            </label>
            <input
              // name="name"
              // id="name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
};

export default LoginPage;
