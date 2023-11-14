import { useForm } from "react-hook-form";
import TaskModal from "./TaskModal";
import { useEffect, useState } from "react";
import { allUsers, getAllTasks } from "../../api/fetch";

const AddModalTask = ({ isOpen, setIsOpen, setTasks, title, children }) => {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    allUsers()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-1/4 mx-auto my-24">
        <img
          src="https://i0.wp.com/zuptu.com/wp-content/uploads/2021/05/slackanimation.gif"
          className="w-1/3 h-1/3 mx-auto "
          alt=""
        />
      </div>
    );
  }
  
  const onCancel = () => {
    reset();
    setIsOpen(false);
  };
  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      status: "pending",
    };
  
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
  
      const updatedTasks = await getAllTasks();
      setTasks(updatedTasks);
  
      console.log('Task submitted successfully');
      onCancel(false);
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };
  

  return (
    <div>
      <TaskModal isOpen={isOpen} setIsOpen={setIsOpen} title={"Add Task"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Title
            </label>
            <input
              className="w-full rounded-md"
              type="text"
              id="taskTitle"
              {...register("taskTitle")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Description
            </label>
            <input
              className="w-full rounded-md"
              type="text"
              id="taskDescription"
              {...register("taskDescription")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Deadline
            </label>
            <input
              className="w-full rounded-md"
              type="date"
              id="deadline"
              {...register("deadline")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Assign to
            </label>
            <select
              className="w-full rounded-md"
              id="assignedTo"
              {...register("assignedTo")}
            >
              {users.map((user) => (
                <option key={user._id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Priority
            </label>
            <select
              className="w-full rounded-md"
              id="priority"
              {...register("priority")}
            >
              <option defaultValue value="high">
                High
              </option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <button onClick={() => onCancel()} type="button">
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </TaskModal>
    </div>
  );
};

export default AddModalTask;
