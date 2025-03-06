
import React from "react";
import { motion } from "framer-motion";
import { Trophy, Frown, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { QuizResult } from "@/types/quiz";

interface ResultsProps {
  result: QuizResult;
  onRestart: () => void;
  onNewQuiz: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onRestart, onNewQuiz }) => {
  const { totalQuestions, correctAnswers, score, timeTaken } = result;
  
  const formatTime = (timeInMs: number) => {
    const seconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreMessage = () => {
    const percentage = (correctAnswers / totalQuestions) * 100;
    
    if (percentage >= 80) {
      return "Amazing job! You're a trivia master!";
    } else if (percentage >= 60) {
      return "Great work! You know your stuff!";
    } else if (percentage >= 40) {
      return "Not bad! Keep learning!";
    } else {
      return "Keep practicing! You'll improve!";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass rounded-3xl p-8 max-w-md w-full mx-auto"
    >
      <motion.div 
        variants={itemVariants} 
        className="flex justify-center mb-6"
      >
        {correctAnswers / totalQuestions >= 0.5 ? (
          <div className="w-24 h-24 rounded-full bg-quiz-light-blue flex items-center justify-center">
            <Trophy className="h-12 w-12 text-quiz-blue" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
            <Frown className="h-12 w-12 text-red-500" />
          </div>
        )}
      </motion.div>

      <motion.h2 
        variants={itemVariants} 
        className="text-2xl font-bold mb-2 text-center text-quiz-dark"
      >
        Quiz Completed!
      </motion.h2>

      <motion.p 
        variants={itemVariants} 
        className="text-center text-quiz-gray mb-6"
      >
        {getScoreMessage()}
      </motion.p>

      <motion.div 
        variants={itemVariants} 
        className="space-y-6 mb-8"
      >
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-quiz-gray">Score</span>
            <span className="text-xl font-bold text-quiz-dark">{score} points</span>
          </div>
          <Progress value={(correctAnswers / totalQuestions) * 100} className="h-2" />
        </div>

        <div className="px-4 py-4 bg-quiz-light-gray rounded-xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Clock className="h-5 w-5 text-quiz-blue" />
            </div>
            <span className="text-quiz-dark font-medium">Time Taken</span>
          </div>
          <span className="font-semibold text-quiz-dark">{formatTime(timeTaken)}</span>
        </div>

        <div className="px-4 py-4 bg-quiz-light-gray rounded-xl">
          <div className="flex justify-between mb-2">
            <span className="text-quiz-dark font-medium">Questions</span>
            <span className="font-semibold text-quiz-dark">{totalQuestions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-quiz-dark font-medium">Correct Answers</span>
            <span className="font-semibold text-quiz-blue">{correctAnswers}</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        <Button 
          onClick={onRestart} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
        <Button 
          onClick={onNewQuiz} 
          className="bg-quiz-blue hover:bg-quiz-blue/90"
        >
          New Quiz
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Results;
