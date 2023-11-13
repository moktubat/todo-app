export const saveUser = async (userInfo) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const data = response.json();
  return data;
};

export const getAllTasks = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks`);
    const data = res.json();
    return data;
  };