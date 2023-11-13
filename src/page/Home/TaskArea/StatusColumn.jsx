import TaskCard from "../../../components/TaskCard/TaskCard";
import {  Droppable } from "react-beautiful-dnd";

const StatusColumn = ({ tasks, status }) => {
  
  return (
    
      <div className="relative h-[800px] overflow-auto">
        <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
          <h1>{status}</h1>
          <p className="text-[#E44332] w-6 h-6 grid place-content-center rounded-md">
            {tasks.length}
          </p>
        </div>
        <Droppable droppableId={status.toLowerCase()}>
          {(provided) => (
            <div
              className="space-y-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <TaskCard key={task._id} task={task} index={index}/>
              ))}
            </div>
          )}
        </Droppable>
      </div>
  );
};

export default StatusColumn;