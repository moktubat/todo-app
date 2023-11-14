import { useEffect, useState } from "react";
import { allUsers, getAllTasks, updateTaskStatus } from "../../api/fetch";
import TaskModal from "./TaskModal";
import { useForm } from "react-hook-form";

const EditModalTask = ({ isOpen, setIsOpen, setTasks, taskToEdit }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    allUsers()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));

    if (taskToEdit) {
      setValue("taskTitle", taskToEdit.taskTitle);
      setValue("taskDescription", taskToEdit.taskDescription);
      setValue("deadline", taskToEdit.deadline);
      setValue("assignedTo", taskToEdit.assignedTo);
      setValue("priority", taskToEdit.priority);
    }
  }, [taskToEdit]);

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
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      // Use the existing status of the task
      status: taskToEdit.status,
    };

    try {
      await updateTaskStatus(taskToEdit._id, taskData);

      const updatedTasks = await getAllTasks();
      setTasks(updatedTasks);

      console.log("Task updated successfully");
      onCancel();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <TaskModal isOpen={isOpen} setIsOpen={setIsOpen} title={"Edit Task"}>
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
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </TaskModal>
    </div>
  );
};

export default EditModalTask;
