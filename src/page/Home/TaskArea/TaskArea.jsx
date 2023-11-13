import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineBell } from "react-icons/ai";
import AddModalTask from "../../../components/TaskModal/AddModalTask";
import { getAllTasks } from "../../../api/fetch";
import StatusColumn from "./StatusColumn";
import { DragDropContext } from "react-beautiful-dnd";
import MyTasks from "../../../components/MyTasks/MyTasks";

const TaskArea = () => {
  const [isOpen, setIsOpen] = useState(false);
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
          src="https://i0.wp.com/zuptu.com/wp-content/uploads/2021/05/slackanimation.gif"
          className="w-1/3 h-1/3 mx-auto "
          alt=""
        />
      </div>
    );
  }

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "progress");
  const completeTasks = tasks.filter((task) => task.status === "complete");

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  }

  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-9 md:px-4 pt-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-3xl">Tasks</h1>
          </div>
          <div className="flex gap-5">
            <button className="border-2 border-secondary/20 hover:border-[#E44332] hover:[#E44332] rounded-xl h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
            <button className="border-2 border-secondary/20 hover:border-[#E44332] hover:[#E44332] rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
              <AiOutlineBell className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#E44332] rounded-xl h-10 px-4 grid place-content-center text-white font-semibold transition-all"
            >
              Add Task
            </button>
            <AddModalTask isOpen={isOpen} setIsOpen={setIsOpen}></AddModalTask>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=644&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-10">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <StatusColumn tasks={pendingTasks} status="Pending" />
            <StatusColumn tasks={inProgressTasks} status="In Progress" />
            <StatusColumn tasks={completeTasks} status="Complete" />
          </DragDropContext>
        </div>
      </div>
      <div className="hidden md:block col-span-3 border-l-2 border-secondary/20 px-10 pt-10">
        <div>
          <h1 className="text-xl">Members</h1>
          <div className="flex gap-3 mt-3">
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
        <MyTasks />
      </div>
    </div>
  );
};

export default TaskArea;
