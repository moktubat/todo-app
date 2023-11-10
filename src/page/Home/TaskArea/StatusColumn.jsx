import TaskCard from "../../../components/TaskCard/TaskCard";

const StatusColumn = ({ tasks, status }) => {
  return (
    <div className="relative h-[800px] overflow-auto">
      <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
        <h1>{status}</h1>
        <p className="text-[#E44332] w-6 h-6 grid place-content-center rounded-md">
          {tasks.length}
        </p>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default StatusColumn;