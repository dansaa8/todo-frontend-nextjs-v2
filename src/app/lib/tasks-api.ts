'use server';

import { NewTodo } from '@/app/lib/definitions';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZXJ0aWwiLCJleHAiOjE3MTY5NzQ2MDJ9.6w1n71kQK2yNpAApLww7MsU_7bY9x_diBqjJGPACrIw';

const headers = {
  Authorization: token,
  'Content-Type': 'application/json',
};

const TASKS_URL = `${process.env.TASKS_API}/api/tasks`;

const getAll = async () => {
  try {
    const response = await fetch(TASKS_URL, {
      method: 'GET',
      headers: headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const create = async (newTodo: NewTodo) => {
  try {
    const response = await fetch(TASKS_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(newTodo),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
};

export { getAll, create };
