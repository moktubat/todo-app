import { useForm } from "react-hook-form";
import TaskModal from "./TaskModal";

const AddModalTask = ({ isOpen, setIsOpen, title, children }) => {
  const { register, handleSubmit, reset } = useForm();
  
  const onCancel = () => {
    reset();
    setIsOpen(false);
  };
  const onSubmit = (data) => {
    console.log(data);
    onCancel(false);
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
              id="title"
              {...register("title")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Description
            </label>
            <input
              className="w-full rounded-md"
              type="text"
              id="description"
              {...register("description")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Deadline
            </label>
            <input
              className="w-full rounded-md"
              type="date"
              id="date"
              {...register("date")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Assign to
            </label>
            <select
              className="w-full rounded-md"
              id="assignTo"
              {...register("assignTo")}
            >
              <option value="Sam">Sam</option>
              <option value="Tom">Tom</option>
              <option value="June">June</option>
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
