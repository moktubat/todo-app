import { AiOutlineCheck, AiOutlineFileSearch } from 'react-icons/ai';
  
  const MyTasks = () => {
    const item = {
      id: 1,
      status: 'pending',
      title: 'Remove Button',
      description:
        'We need a remove button in our task card. Meke the button red and use Heroicon for tashbin icon.',
      date: '2023-08-28',
      assignedTo: 'Mir Hussain',
      priority: 'high',
    };
  
    return (
      <div>
        <h1 className="text-xl my-3">My Tasks</h1>
        <div className=" h-[750px] overflow-auto space-y-3">
          <div
            key={item.id}
            className="bg-secondary/10 rounded-md p-3 flex justify-between"
          >
            <h1>{item.title}</h1>
            <div className="flex gap-3">
              <button className="grid place-content-center" title="Details">
                <AiOutlineFileSearch className="w-5 h-5 text-[#E44332]" />
              </button>
              <button className="grid place-content-center" title="Done">
                <AiOutlineCheck className="w-5 h-5 text-[#E44332]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MyTasks;