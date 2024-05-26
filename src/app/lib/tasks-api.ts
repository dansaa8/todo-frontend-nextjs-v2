'use server';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZXJ0aWwiLCJleHAiOjE3MTY4MDM1NTl9.TXRtSzm2XnS7JdAumqCm9W1C8fl99it6px0-hAy84yM';

const headers = {
  Authorization: token,
  'Content-Type': 'application/json',
};

const TASKS_URL = `${process.env.TASKS_API}/api/tasks`;

const getAllTasks = async () => {
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

export { getAllTasks };
