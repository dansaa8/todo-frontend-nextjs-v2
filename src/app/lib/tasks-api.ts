// import 'server-only'
'use server';

import { NewTodo } from '@/app/lib/definitions';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZXJ0aWwiLCJleHAiOjE3MTc2NjI4OTN9.1SxG758TRO8-b8tDJO5H1JIUQbiOwCVc8lRC-xV8MjY';

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

const getById = async (id: number) => {
  try {
    const response = await fetch(`${TASKS_URL}/${id}`, {
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

const deleteById = async (id: number) => {
  try {
    const response = await fetch(`${TASKS_URL}/${id}`, {
      method: 'DELETE',
      headers: headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
export { getAll, getById, create, deleteById };
