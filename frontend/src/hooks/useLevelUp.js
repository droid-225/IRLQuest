import { useEffect, useRef } from 'react';
import { calculateLevel } from '../lib/leveling';
import toast from 'react-hot-toast';

export const useLevelUp = (tasks) => {
  const previousLevelRef = useRef(1);
  
  useEffect(() => {
    const totalXP = tasks
      .filter(task => task.complete)
      .reduce((total, task) => total + (task.rewardXp || 0), 0);
    
    const levelInfo = calculateLevel(totalXP);
    const currentLevel = levelInfo.level;
    const previousLevel = previousLevelRef.current;
    
    // Check if level increased
    if (currentLevel > previousLevel && previousLevel > 1) {
      const levelGained = currentLevel - previousLevel;
      
      // Show level up notification
      toast.success(
        `🎉 LEVEL UP! You reached Level ${currentLevel}!`,
        {
          duration: 5000,
          icon: '⭐',
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 'bold',
          }
        }
      );
      
      // Show multiple level ups if more than 1
      if (levelGained > 1) {
        setTimeout(() => {
          toast.success(
            `🚀 You gained ${levelGained} levels! Amazing progress!`,
            {
              duration: 4000,
              icon: '🔥',
              style: {
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                fontWeight: 'bold',
              }
            }
          );
        }, 1000);
      }
    }
    
    // Update the previous level reference
    previousLevelRef.current = currentLevel;
  }, [tasks]);
  
  return previousLevelRef.current;
};
