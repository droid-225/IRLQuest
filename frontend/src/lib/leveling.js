// Leveling system for IRLQuest
// Implements a progressive XP requirement system similar to RPG games

export const LEVEL_CONFIG = {
  BASE_XP: 100,        // XP required for level 2
  GROWTH_RATE: 1.2,    // Each level requires 20% more XP than the previous
  MAX_LEVEL: 100,      // Maximum achievable level
};

/**
 * Calculate the total XP required to reach a specific level
 * @param {number} level - The target level
 * @returns {number} - Total XP required
 */
export function getXPForLevel(level) {
  if (level <= 1) return 0;
  
  let totalXP = 0;
  for (let i = 2; i <= level; i++) {
    totalXP += Math.floor(LEVEL_CONFIG.BASE_XP * Math.pow(LEVEL_CONFIG.GROWTH_RATE, i - 2));
  }
  return totalXP;
}

/**
 * Calculate the current level based on total XP
 * @param {number} totalXP - Current total XP
 * @returns {object} - Level information
 */
export function calculateLevel(totalXP) {
  if (totalXP < 0) totalXP = 0;
  
  let currentLevel = 1;
  let xpForCurrentLevel = 0;
  let xpForNextLevel = LEVEL_CONFIG.BASE_XP;
  
  // Find the current level
  while (totalXP >= xpForNextLevel && currentLevel < LEVEL_CONFIG.MAX_LEVEL) {
    xpForCurrentLevel = xpForNextLevel;
    currentLevel++;
    xpForNextLevel = getXPForLevel(currentLevel + 1);
  }
  
  // Calculate progress to next level
  const xpInCurrentLevel = totalXP - xpForCurrentLevel;
  const xpNeededForNext = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100);
  
  return {
    level: currentLevel,
    totalXP: totalXP,
    xpForCurrentLevel: xpForCurrentLevel,
    xpForNextLevel: xpForNextLevel,
    xpInCurrentLevel: xpInCurrentLevel,
    xpNeededForNext: xpNeededForNext,
    progressPercentage: progressPercentage,
    isMaxLevel: currentLevel >= LEVEL_CONFIG.MAX_LEVEL
  };
}

/**
 * Calculate total XP from completed tasks
 * @param {Array} tasks - Array of task objects
 * @returns {number} - Total XP from completed tasks
 */
export function calculateTotalXP(tasks) {
  return tasks
    .filter(task => task.complete)
    .reduce((total, task) => total + (task.rewardXp || 0), 0);
}

/**
 * Get level title/rank based on level
 * @param {number} level - Current level
 * @returns {string} - Level title
 */
export function getLevelTitle(level) {
  const titles = [
    "Novice", "Apprentice", "Adventurer", "Explorer", "Warrior", 
    "Guardian", "Champion", "Hero", "Legend", "Mythic"
  ];
  
  if (level <= 10) return titles[0];
  if (level <= 20) return titles[1];
  if (level <= 30) return titles[2];
  if (level <= 40) return titles[3];
  if (level <= 50) return titles[4];
  if (level <= 60) return titles[5];
  if (level <= 70) return titles[6];
  if (level <= 80) return titles[7];
  if (level <= 90) return titles[8];
  return titles[9];
}

/**
 * Get level color based on level
 * @param {number} level - Current level
 * @returns {string} - CSS color class
 */
export function getLevelColor(level) {
  if (level <= 10) return "text-gray-400";
  if (level <= 20) return "text-green-400";
  if (level <= 30) return "text-blue-400";
  if (level <= 40) return "text-purple-400";
  if (level <= 50) return "text-yellow-400";
  if (level <= 60) return "text-orange-400";
  if (level <= 70) return "text-red-400";
  if (level <= 80) return "text-pink-400";
  if (level <= 90) return "text-indigo-400";
  return "text-amber-400";
}
