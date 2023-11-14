import { Draggable } from "react-beautiful-dnd";
import { FaArrowRight, FaRegTrashAlt } from "react-icons/fa";
import { deleteTask } from "../../api/fetch";

const TaskCard = ({ task, setTasks, index }) => {
  const handleDelete = async (item) => {
    try {
      await deleteTask(item);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== item));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided) => (
        <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="bg-gray-200 rounded-md p-5 my-4"
      >
          <h1
            className={`text-lg font-semibold mb-3 ${
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
              <button title="Delete" onClick={() => handleDelete(task)}>
                <FaRegTrashAlt className="h-5 w-5 text-red-500" />
              </button>
              <button title="In progress">
                <FaArrowRight className="h-5 w-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
