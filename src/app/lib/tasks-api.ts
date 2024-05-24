"use server";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZXJ0aWwiLCJleHAiOjE3MTY2NTU2Nzl9.FHVcjByyvb_UP36ZVKbuC0eYaZMA0PBdyPc4_xR1wVA"


const headers = {
    'Authorization': token,
    'Content-Type': 'application/json',
  };

  const TASKS_URL = `${process.env.TASKS_API}/api/tasks`

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

  export { getAllTasks }