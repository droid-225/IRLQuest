import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import RateLimitUI from '../components/RateLimitUI';
import TaskCard from '../components/TaskCard.jsx'
import LevelDisplay from '../components/LevelDisplay.jsx'
import { useLevelUp } from '../hooks/useLevelUp.js'
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import NotesNotFound from '../components/NotesNotFound.jsx';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Level up detection
  useLevelUp(tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        //console.log(res.data);
        setTasks(res.data);
        setIsRateLimited(false);
      } catch(error) {
        console.log("Error fetching tasks!");
        console.log(error);
        if(error.response?.status == 429) {
          setIsRateLimited(true);
        }
        else {
          toast.error("Failed to load tasks");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading Quests...</div>}

        {tasks.length === 0 && !isRateLimited && <NotesNotFound />}

        {tasks.length > 0 && !isRateLimited && (
          <>
            {/* Level Display */}
            <div className="mb-8">
              <LevelDisplay tasks={tasks} />
            </div>
            
            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map(task => (
                <TaskCard key={task._id} task={task} setTasks={setTasks}/>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
