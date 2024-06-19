// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

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
      const response = NextResponse.json({ message: 'Login successful' });
      response.cookies.set('token', token);
      return response;
    }
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
