import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import {Link} from 'react-router';
import {formatDate} from '../lib/utils'
import api from '../lib/axios';
import toast from 'react-hot-toast';

const TaskCard = ({task, setTasks}) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of Link nav behaviour

    if(!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
        api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter(task => task._id !== id)); // removes deleted task from array
        toast.success("Note deleted successfully!");
    } catch(error) {
        console.log("Error in handleDelete", error);
        toast.error("Failed to delete task");
    }  
  };

  return <Link to={`/task/${task._id}`} className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
            
            {/* Page content here */}
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                Open drawer
            </label>
        </div>
        
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
            </ul>
        </div>
    </Link>;
     {/*
    className="card bg-base-100 card-xl shadow-sm" { hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] }
        <div className="card-body">
            <h3 className="card-title text-base-content">{task.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{task.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">{formatDate(new Date(task.createdAt))}</span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4"/>
                    <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, task._id)}>
                        <Trash2Icon className="size-4"/>
                    </button>
                </div>
            </div>
        </div>
    */}
}

export default TaskCard
