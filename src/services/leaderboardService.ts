
import { UserScore } from "@/types/user";

// Simulating database with localStorage
const SCORES_KEY = "quizwhiz_scores";

export const leaderboardService = {
  // Save a user's quiz score
  saveScore: async (
    userId: string,
    username: string,
    score: number,
    timeTaken: number,
    totalQuestions: number,
    correctAnswers: number,
    category: string
  ): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const scores = JSON.parse(localStorage.getItem(SCORES_KEY) || "[]");
    
    const newScore: UserScore = {
      id: Date.now().toString(),
      userId,
      username,
      score,
      timeTaken,
      totalQuestions,
      correctAnswers,
      category,
      date: new Date().toISOString()
    };
    
    const updatedScores = [...scores, newScore];
    localStorage.setItem(SCORES_KEY, JSON.stringify(updatedScores));
  },
  
  // Get user's personal top scores
  getUserScores: async (userId: string): Promise<UserScore[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const scores = JSON.parse(localStorage.getItem(SCORES_KEY) || "[]");
    
    return scores
      .filter((score: UserScore) => score.userId === userId)
      .sort((a: UserScore, b: UserScore) => b.score - a.score);
  },
  
  // Get global top scores
  getTopScores: async (limit = 10): Promise<UserScore[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const scores = JSON.parse(localStorage.getItem(SCORES_KEY) || "[]");
    
    return scores
      .sort((a: UserScore, b: UserScore) => b.score - a.score)
      .slice(0, limit);
  }
};
