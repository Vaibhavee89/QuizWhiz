
export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // Only used for auth, never stored in client state
  registeredAt: string;
}

export interface UserScore {
  id: string;
  userId: string;
  username: string;
  score: number;
  timeTaken: number; // in seconds
  totalQuestions: number;
  correctAnswers: number;
  category: string;
  date: string;
}
