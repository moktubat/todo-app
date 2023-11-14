export const allUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`);
  const data = res.json();
  return data;
};

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

export const deleteTask = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/task/${id}`, {
    method: "DELETE",
  });
  const data = res.json();
  return data;
};

export const updateTaskStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/task/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task status: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};



export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_KEY
  }`;
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};
