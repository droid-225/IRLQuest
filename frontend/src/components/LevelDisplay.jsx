import React from 'react';
import { Star, Trophy, Zap } from 'lucide-react';
import { calculateLevel, getLevelTitle, getLevelColor } from '../lib/leveling';

const LevelDisplay = ({ tasks }) => {
  const totalXP = tasks
    .filter(task => task.complete)
    .reduce((total, task) => total + (task.rewardXp || 0), 0);
  
  const levelInfo = calculateLevel(totalXP);
  const levelTitle = getLevelTitle(levelInfo.level);
  const levelColor = getLevelColor(levelInfo.level);

  return (
    <div className="card bg-base-100 shadow-lg border border-primary/20 hover:shadow-xl transition-all duration-300">
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-primary/10 ${levelColor}`}>
              <Star className="size-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Level {levelInfo.level}</h3>
              <p className={`text-sm font-medium ${levelColor}`}>{levelTitle}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-base-content/70">
              <Zap className="size-4" />
              <span className="font-mono">{totalXP.toLocaleString()} XP</span>
            </div>
          </div>
        </div>

        {!levelInfo.isMaxLevel && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-base-content/60">
              <span>Progress to Level {levelInfo.level + 1}</span>
              <span>{levelInfo.xpInCurrentLevel.toLocaleString()} / {levelInfo.xpNeededForNext.toLocaleString()} XP</span>
            </div>
            <div className="w-full bg-base-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${levelInfo.progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="text-xs text-center text-base-content/50">
              {Math.round(levelInfo.progressPercentage)}% complete
            </div>
          </div>
        )}

        {levelInfo.isMaxLevel && (
          <div className="flex items-center justify-center gap-2 py-2">
            <Trophy className="size-5 text-amber-400" />
            <span className="text-amber-400 font-bold">MAX LEVEL ACHIEVED!</span>
            <Trophy className="size-5 text-amber-400" />
          </div>
        )}

        <div className="divider my-2"></div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="stat p-0">
            <div className="stat-title text-xs">Completed Quests</div>
            <div className="stat-value text-lg text-primary">
              {tasks.filter(task => task.complete).length}
            </div>
          </div>
          <div className="stat p-0">
            <div className="stat-title text-xs">Total Quests</div>
            <div className="stat-value text-lg text-base-content">
              {tasks.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelDisplay;
