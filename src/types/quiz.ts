
export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface FormattedQuestion {
  id: number;
  question: string;
  category: string;
  difficulty: string;
  options: string[];
  correct_answer: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface QuizSettings {
  amount: number;
  category: string;
  difficulty: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeTaken: number;
}
