import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {ArrowLeftIcon, Sword, Zap} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [rewardXp, setRewardXp] = useState(50);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from refreshing as it does by default
    
    if(!title.trim() || !content.trim()) {
      toast.error("All Fields Are Required!");
      return;
    }

    if(rewardXp < 1 || rewardXp > 1000) {
      toast.error("Reward XP must be between 1 and 1000!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/tasks", {
        title,
        content,
        difficulty,
        rewardXp: parseInt(rewardXp),
        complete: false
      });
      toast.success("Quest created successfully!");
      navigate("/");
    } catch(error) {
      console.log("Error creating quest", error);
      if(error.response?.status === 429) {
        toast.error("Too many quests!!! Slow down!!!", {
          duration: 4000,
          icon: "☠️"
        });
      }
      else {
        toast.error("Failed to create quest!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Quests
          </Link>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Sword className="size-6" />
              </div>
              <h2 className="card-title text-2xl">Create New Quest</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Quest Title</span>
                </label>
                <input 
                  type="text" 
                  placeholder='Enter your quest title...' 
                  className="input input-bordered input-lg" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Quest Description</span>
                </label>
                <textarea 
                  placeholder='Describe your quest objectives and details...' 
                  className="textarea textarea-bordered h-32 textarea-lg" 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Difficulty</span>
                  </label>
                  <select 
                    className="select select-bordered select-lg"
                    value={difficulty} 
                    onChange={(e) => setDifficulty(e.target.value)}
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
                    placeholder='50' 
                    className="input input-bordered input-lg" 
                    value={rewardXp} 
                    onChange={(e) => setRewardXp(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="card bg-base-200 p-4">
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <Zap className="size-4" />
                  <span>This quest will reward <strong>{rewardXp} XP</strong> when completed</span>
                </div>
              </div>

              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating Quest...
                    </>
                  ) : (
                    <>
                      <Sword className="size-5" />
                      Create Quest
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
