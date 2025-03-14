
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, RefreshCw, Home, LogIn } from "lucide-react";
import { QuizResult } from "@/types/quiz";
import { useNavigate } from "react-router-dom";

interface ResultsProps {
  result: QuizResult;
  onRestart: () => void;
  onNewQuiz: () => void;
  showLoginPrompt?: boolean;
  onViewLeaderboard?: () => void;
}

const Results = ({ 
  result, 
  onRestart, 
  onNewQuiz, 
  showLoginPrompt = false,
  onViewLeaderboard
}: ResultsProps) => {
  const navigate = useNavigate();
  const { totalQuestions, correctAnswers, score, timeTaken } = result;
  
  // Convert time from milliseconds to readable format
  const seconds = Math.floor((timeTaken / 1000) % 60);
  const minutes = Math.floor((timeTaken / 1000 / 60) % 60);
  const timeString = `${minutes}m ${seconds}s`;
  
  // Calculate percentage
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Determine feedback message based on percentage
  let feedbackMessage = "";
  let feedbackClass = "";
  
  if (percentage >= 90) {
    feedbackMessage = "Excellent! You're a quiz master! 🏆";
    feedbackClass = "text-quiz-correct";
  } else if (percentage >= 70) {
    feedbackMessage = "Great job! You know your stuff! 👍";
    feedbackClass = "text-green-600 dark:text-green-400";
  } else if (percentage >= 50) {
    feedbackMessage = "Good effort! Keep learning! 📚";
    feedbackClass = "text-blue-600 dark:text-blue-400";
  } else {
    feedbackMessage = "Keep practicing! You'll get better! 💪";
    feedbackClass = "text-orange-600 dark:text-orange-400";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md metallic-glass rounded-xl p-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Quiz Results</h2>
      
      <div className="mb-6">
        <div className="text-center mb-4">
          <span className="text-5xl font-bold text-quiz-metallic-purple">{score}</span>
          <p className="text-quiz-medium-gray mt-1">points</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 glass rounded-lg">
            <p className="text-xl font-bold">{percentage}%</p>
            <p className="text-sm text-quiz-medium-gray">Accuracy</p>
          </div>
          <div className="text-center p-3 glass rounded-lg">
            <p className="text-xl font-bold">{timeString}</p>
            <p className="text-sm text-quiz-medium-gray">Time</p>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-quiz-medium-gray mb-2">
          <span>Questions</span>
          <span>{correctAnswers} of {totalQuestions} correct</span>
        </div>
        
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-quiz-metallic-purple"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
      
      <p className={`text-center font-medium mb-6 ${feedbackClass}`}>{feedbackMessage}</p>
      
      {showLoginPrompt && (
        <div className="mb-6 p-3 border border-quiz-blue/30 bg-quiz-light-blue/10 dark:bg-quiz-blue/10 rounded-lg">
          <p className="text-sm text-center mb-2">
            Sign in to save your score and compete on the leaderboard!
          </p>
          <Button 
            className="w-full bg-quiz-blue hover:bg-quiz-blue/90"
            onClick={() => navigate("/login")}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={onRestart}
          className="flex items-center justify-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Restart
        </Button>
        <Button 
          onClick={onNewQuiz}
          className="bg-quiz-blue hover:bg-quiz-blue/90 flex items-center justify-center gap-2"
        >
          <Home className="h-4 w-4" />
          New Quiz
        </Button>
      </div>
      
      {onViewLeaderboard && (
        <Button 
          variant="ghost" 
          onClick={onViewLeaderboard}
          className="w-full mt-4 flex items-center justify-center gap-2"
        >
          <Trophy className="h-4 w-4" />
          View Leaderboard
        </Button>
      )}
    </motion.div>
  );
};

export default Results;
