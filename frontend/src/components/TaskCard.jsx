import { PenSquareIcon, Trash2Icon, Square, CheckSquare, Sword, Zap, Calendar } from 'lucide-react';
import {Link} from 'react-router';
import {formatDate} from '../lib/utils'
import api from '../lib/axios';
import toast from 'react-hot-toast';

const TaskCard = ({task, setTasks}) => {
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Expert': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Legendary': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-base-content bg-base-200 border-base-300';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '⭐';
      case 'Medium': return '⚡';
      case 'Hard': return '🔥';
      case 'Expert': return '💀';
      case 'Legendary': return '👑';
      default: return '📋';
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of Link nav behaviour

    if(!window.confirm("Are you sure you want to delete this quest?")) return;
    
    try {
        api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter(task => task._id !== id)); // removes deleted task from array
        toast.success("Quest deleted successfully!");
    } catch(error) {
        console.log("Error in handleDelete", error);
        toast.error("Failed to delete quest");
    }  
  };

  const handleComplete = async (e, id) => {
    e.preventDefault(); // get rid of Link nav behaviour

    try {
        const updatedComplete = !task.complete;
        const response = await api.put(`/tasks/${id}`, {
            complete: updatedComplete
        });
        
        // Update the task in the tasks array
        setTasks((prev) => prev.map(t => 
            t._id === id ? { ...t, complete: updatedComplete } : t
        ));
        
        toast.success(`Quest ${updatedComplete ? 'completed' : 'marked as incomplete'} successfully!`);
    } catch(error) {
        console.log("Error in handleComplete", error);
        toast.error("Failed to update task status");
    }  
  };

  return (
    <div className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-solid ${
      task.complete ? 'border-green-400' : 'border-primary'
    } group`}>
      <Link to={`/task/${task._id}`} className="block">
        <div className="card-body p-6">
          {/* Quest Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${task.complete ? 'bg-green-400/10 text-green-400' : 'bg-primary/10 text-primary'}`}>
                <Sword className="size-5" />
              </div>
              <div>
                <h3 className="card-title text-lg font-bold text-base-content group-hover:text-primary transition-colors">
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`badge badge-sm ${getDifficultyColor(task.difficulty)}`}>
                    <span className="mr-1">{getDifficultyIcon(task.difficulty)}</span>
                    {task.difficulty}
                  </span>
                  {task.complete && (
                    <span className="badge badge-sm badge-success">
                      <CheckSquare className="size-3 mr-1" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                className={`btn btn-ghost btn-xs ${task.complete ? 'text-green-400 hover:bg-green-400/10' : 'text-warning hover:bg-warning/10'}`} 
                onClick={(e) => handleComplete(e, task._id)}
                title={task.complete ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {task.complete ? <CheckSquare className="size-4"/> : <Square className="size-4"/>}
              </button>
              <button 
                className="btn btn-ghost btn-xs text-error hover:bg-error/10" 
                onClick={(e) => handleDelete(e, task._id)}
                title="Delete quest"
              >
                <Trash2Icon className="size-4"/>
              </button>
            </div>
          </div>

          {/* Quest Description */}
          <p className="text-base-content/70 line-clamp-3 mb-4 leading-relaxed">
            {task.content}
          </p>

          {/* Quest Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* XP Reward */}
              <div className="flex items-center gap-1 text-primary">
                <Zap className="size-4" />
                <span className="font-semibold">{task.rewardXp} XP</span>
              </div>
              
              {/* Creation Date */}
              <div className="flex items-center gap-1 text-base-content/60">
                <Calendar className="size-4" />
                <span className="text-sm">{formatDate(new Date(task.createdAt))}</span>
              </div>
            </div>

            {/* Edit Icon */}
            <PenSquareIcon className="size-4 text-base-content/40 group-hover:text-base-content/70 transition-colors" />
          </div>
        </div>
      </Link>
    </div>
  );    
}

export default TaskCard
