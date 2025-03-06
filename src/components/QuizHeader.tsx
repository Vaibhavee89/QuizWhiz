
import React from "react";
import { LightbulbIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizHeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  onSettings: () => void;
  className?: string;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentQuestionIndex,
  totalQuestions,
  score,
  onSettings,
  className,
}) => {
  return (
    <header 
      className={cn(
        "w-full flex justify-between items-center py-4 px-4 sm:px-6 glass rounded-2xl",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-quiz-light-blue p-2 flex-shrink-0">
          <LightbulbIcon className="h-5 w-5 text-quiz-blue" />
        </div>
        <h1 className="text-xl font-semibold text-quiz-dark">Trivia Challenge</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex gap-1 text-sm bg-quiz-light-gray px-3 py-1.5 rounded-full">
          <span className="font-semibold text-quiz-blue">{currentQuestionIndex + 1}</span>
          <span className="text-quiz-gray">/</span>
          <span className="text-quiz-gray">{totalQuestions}</span>
        </div>
        
        <div className="bg-quiz-light-gray px-3 py-1.5 rounded-full flex items-center">
          <span className="text-sm font-semibold mr-1">Score:</span>
          <span className="text-sm font-bold text-quiz-blue">{score}</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onSettings}
          className="text-quiz-gray hover:text-quiz-dark hover:bg-quiz-light-gray"
        >
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default QuizHeader;
