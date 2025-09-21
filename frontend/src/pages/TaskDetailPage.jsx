import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import {ArrowLeftIcon, LoaderIcon, Trash2Icon, Sword, Zap, CheckSquare, Square} from 'lucide-react';
import {formatDate} from '../lib/utils';

const TaskDetailPage = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this quest?")) return;
    
    try {
        await api.delete(`/tasks/${id}`);
        toast.success("Quest deleted successfully!");
        navigate("/");
    } catch(error) {
        console.log("Error in deleting the quest", error);
        toast.error("Failed to delete quest");
    }  
  };

  const handleSave = async () => {
    if(!task.title.trim() || !task.content.trim()) {
      toast.error("Please add a quest title and description");
      return;
    }

    if(task.rewardXp < 1 || task.rewardXp > 1000) {
      toast.error("Reward XP must be between 1 and 1000!");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/tasks/${id}`, task);
      toast.success("Quest Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error saving the quest", error);
      toast.error("Failed to update quest!");
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async () => {
    try {
      const updatedComplete = !task.complete;
      await api.put(`/tasks/${id}`, {
        complete: updatedComplete
      });
      
      setTask({...task, complete: updatedComplete});
      toast.success(`Quest ${updatedComplete ? 'completed' : 'marked as incomplete'} successfully!`);
    } catch(error) {
      console.log("Error in handleComplete", error);
      toast.error("Failed to update quest status");
    }  
  };

  useEffect(() => {
    const fetchTask = async() => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch(error) {
        console.log("Error in fetching quest", error);
        toast.error("Failed to fetch the quest");
      } finally {
        setLoading(false);
      }
    }

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quest Not Found</h2>
          <p className="text-base-content/70 mb-6">The quest you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeftIcon className="size-5" />
            Back to Quests
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      case 'Legendary': return 'text-purple-400';
      default: return 'text-base-content';
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5"/>
              Back to Quests
            </Link>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleComplete} 
                className={`btn btn-outline ${task.complete ? 'btn-success' : 'btn-warning'}`}
              >
                {task.complete ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5" />}
                {task.complete ? 'Completed' : 'Mark Complete'}
              </button>
              <button onClick={handleDelete} className="btn btn-error btn-outline">
                <Trash2Icon className="h-5 w-5" />
                Delete Quest
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quest Details */}
            <div className="lg:col-span-2">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Sword className="size-6" />
                    </div>
                    <div className="flex-1">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-lg">Quest Title</span>
                          <span className="label-text-alt text-base-content/60">
                            {task.title.length}/100 characters
                          </span>
                        </label>
                        <input 
                          type="text" 
                          placeholder='Enter your quest title...' 
                          className="input input-bordered input-lg text-2xl font-bold focus:input-primary transition-all duration-200 hover:shadow-md focus:shadow-lg" 
                          value={task.title} 
                          onChange={(e) => setTask({...task, title: e.target.value})}
                          maxLength={100}
                        />
                        {task.title.length > 80 && (
                          <label className="label">
                            <span className="label-text-alt text-warning">
                              Title is getting long ({task.title.length}/100)
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-semibold">Quest Description</span>
                    </label>
                    <textarea 
                      placeholder='Describe your quest objectives and details...' 
                      className="textarea textarea-bordered h-32 textarea-lg" 
                      value={task.content} 
                      onChange={(e) => setTask({...task, content: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Difficulty</span>
                      </label>
                      <select 
                        className="select select-bordered select-lg"
                        value={task.difficulty} 
                        onChange={(e) => setTask({...task, difficulty: e.target.value})}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Expert">Expert</option>
                        <option value="Legendary">Legendary</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold flex items-center gap-2">
                          <Zap className="size-4" />
                          Reward XP
                        </span>
                      </label>
                      <input 
                        type="number" 
                        min="1" 
                        max="1000" 
                        className="input input-bordered input-lg" 
                        value={task.rewardXp} 
                        onChange={(e) => setTask({...task, rewardXp: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>

                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-lg" disabled={saving} onClick={handleSave}>
                      {saving ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Updating Quest...
                        </>
                      ) : (
                        <>
                          <Sword className="size-5" />
                          Update Quest
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quest Info Sidebar */}
            <div className="space-y-4">
              {/* Status Card */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-4">
                  <h3 className="card-title text-lg mb-3">Quest Status</h3>
                  <div className="flex items-center gap-3">
                    {task.complete ? (
                      <CheckSquare className="size-8 text-green-400" />
                    ) : (
                      <Square className="size-8 text-error" />
                    )}
                    <div>
                      <p className={`font-bold ${task.complete ? 'text-green-400' : 'text-error'}`}>
                        {task.complete ? 'Completed' : 'In Progress'}
                      </p>
                      <p className="text-sm text-base-content/70">
                        {task.complete ? 'Quest finished!' : 'Quest in progress...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quest Stats */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-4">
                  <h3 className="card-title text-lg mb-3">Quest Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Difficulty:</span>
                      <span className={`font-bold ${getDifficultyColor(task.difficulty)}`}>
                        {task.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Zap className="size-4" />
                        Reward XP:
                      </span>
                      <span className="font-bold text-primary">
                        {task.rewardXp} XP
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Created:</span>
                      <span className="text-sm text-base-content/70">
                        {formatDate(new Date(task.createdAt))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Updated:</span>
                      <span className="text-sm text-base-content/70">
                        {formatDate(new Date(task.updatedAt))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* XP Preview */}
              <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg">
                <div className="card-body p-4">
                  <h3 className="card-title text-lg mb-2 flex items-center gap-2">
                    <Zap className="size-5" />
                    XP Reward
                  </h3>
                  <p className="text-sm text-base-content/70 mb-2">
                    Complete this quest to earn:
                  </p>
                  <div className="text-2xl font-bold text-primary">
                    {task.rewardXp} XP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailPage
