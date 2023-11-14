import { Draggable } from "react-beautiful-dnd";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { deleteTask } from "../../api/fetch";
import { useState } from "react";
import EditModalTask from "../TaskModal/EditModalTask";
const TaskCard = ({ task, setTasks, index, isCompleteStatus }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-[#c9eef9] rounded-md p-5 my-4 ${
            isCompleteStatus ? 'line-through text-gray-500' : ''
          }`}
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
              <button
                title="Delete"
                onClick={() => handleDelete(task)}
                aria-label="Delete Task"
              >
                <FaRegTrashAlt className="h-5 w-5 text-red-500" />
              </button>

              <button
                title="In progress"
                onClick={openEditModal}
                aria-label="Edit Task"
              >
                <FaRegEdit className="h-5 w-5 text-primary" />
              </button>
            </div>
          </div>

          <EditModalTask
            isOpen={isEditModalOpen}
            setIsOpen={closeEditModal}
            setTasks={setTasks}
            taskToEdit={task}
          ></EditModalTask>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
