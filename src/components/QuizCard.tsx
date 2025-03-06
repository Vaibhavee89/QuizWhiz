
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormattedQuestion } from "@/types/quiz";
import { Badge } from "@/components/ui/badge";

interface QuizCardProps {
  question: FormattedQuestion;
  onAnswer: (selectedAnswer: string) => void;
  disabled?: boolean;
  selectedAnswer?: string;
  isAnswered: boolean;
  className?: string;
}

// Add framer-motion package for animations
<lov-add-dependency>framer-motion@latest</lov-add-dependency>

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  disabled = false,
  selectedAnswer,
  isAnswered,
  className,
}) => {
  const [answeredOptions, setAnsweredOptions] = useState<Record<string, boolean>>({});

  const handleOptionClick = (option: string) => {
    if (disabled || isAnswered) return;
    
    onAnswer(option);
    
    // Track which options have been selected
    setAnsweredOptions((prev) => ({ ...prev, [option]: true }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "w-full max-w-2xl mx-auto glass rounded-3xl p-6 shadow-lg",
        className
      )}
    >
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="rounded-full font-medium text-xs py-1">
          {question.category}
        </Badge>
        <Badge 
          variant="outline" 
          className={cn(
            "rounded-full font-medium text-xs py-1", 
            getDifficultyColor(question.difficulty)
          )}
        >
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </Badge>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold mb-6 leading-tight text-quiz-dark">
        {question.question}
      </h2>

      <div className="space-y-3 mt-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = question.correct_answer === option;
          const isWrong = isSelected && !isCorrect && isAnswered;
          
          return (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={disabled}
              className={cn(
                "option-btn w-full rounded-xl py-4 px-5 text-base sm:text-lg font-medium",
                isAnswered && isCorrect && "correct",
                isAnswered && isWrong && "wrong",
                isSelected && !isAnswered && "border-quiz-blue bg-quiz-light-blue/30"
              )}
            >
              <div className="flex justify-between items-center">
                <span>{option}</span>
                {isAnswered && (
                  <>
                    {isCorrect && (
                      <div className="h-6 w-6 flex items-center justify-center bg-quiz-correct text-white rounded-full">
                        <CheckIcon className="h-4 w-4" />
                      </div>
                    )}
                    {isWrong && (
                      <div className="h-6 w-6 flex items-center justify-center bg-quiz-wrong text-white rounded-full">
                        <XIcon className="h-4 w-4" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuizCard;
