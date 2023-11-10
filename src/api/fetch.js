export const getAllTasks = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks`);
    const data = res.json();
    return data;
  };