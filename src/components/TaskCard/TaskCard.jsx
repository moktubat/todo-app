import { useEffect, useState } from "react";
import { FaArrowRight, FaRegTrashAlt } from "react-icons/fa";
import { getAllTasks } from "../../api/fetch";

const TaskCard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTasks()
      .then((data) => setTasks(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-1/4 mx-auto my-24">
        <img
          src="https://media.tenor.com/2JOBy0LSoX8AAAAi/toto-gym.gif"
          className="w-1/3 h-1/3 mx-auto "
          alt=""
        />
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-200 rounded-md p-5 my-4">
          <h1
            className={`text-lg font-semibold mb-3  ${
              task.priority === "high" ? "text-red-500" : ""
            } ${task.priority === "medium" ? "text-yellow-500" : ""} ${
              task.priority === "low" ? "text-green-500" : ""
            }`}
          >
            {task?.taskTitle}
          </h1>
          <p className="mb-3">{task?.taskDescription}</p>
          <p className="text-sm">Assigned to - {task?.assignedTo}</p>
          <div className="flex justify-between mt-3">
            <p>{task?.deadline}</p>
            <div className="flex gap-3">
              <button title="Delete">
                <FaRegTrashAlt className="h-5 w-5 text-red-500" />
              </button>
              <button title="In progress">
                <FaArrowRight className="h-5 w-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
