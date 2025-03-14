
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizQuestions } from "@/services/triviaService";
import { userService } from "@/services/userService";
import { leaderboardService } from "@/services/leaderboardService";
import CategorySelector from "@/components/CategorySelector";
import QuizCard from "@/components/QuizCard";
import QuizHeader from "@/components/QuizHeader";
import Results from "@/components/Results";
import LoadingSpinner from "@/components/LoadingSpinner";
import NavBar from "@/components/NavBar";
import { FormattedQuestion, QuizResult, QuizSettings } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

enum QuizState {
  SETUP,
  LOADING,
  PLAYING,
  RESULTS
}

const Index = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>(QuizState.SETUP);
  const [questions, setQuestions] = useState<FormattedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    amount: 10,
    category: "",
    difficulty: "any"
  });
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [quizTime, setQuizTime] = useState<number>(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isAuthenticated = userService.isAuthenticated();
  const currentUser = userService.getCurrentUser();

  const startQuiz = async (settings: QuizSettings) => {
    setQuizState(QuizState.LOADING);
    setQuizSettings(settings);
    
    const fetchedQuestions = await fetchQuizQuestions(
      settings.amount,
      settings.category,
      settings.difficulty
    );
    
    if (fetchedQuestions.length > 0) {
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setScore(0);
      setStartTime(Date.now());
      setQuizState(QuizState.PLAYING);
    } else {
      setQuizState(QuizState.SETUP);
      toast.error("No questions found. Please try different settings.");
    }
  };

  const handleAnswerSelection = (answer: string) => {
    if (selectedAnswers[currentQuestion.id] !== undefined) return;
    
    const isCorrect = answer === currentQuestion.correct_answer;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
    
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
    
    setTimeout(() => {
      if (isLastQuestion) {
        finishQuiz();
      }
    }, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    
    let correctCount = 0;
    for (const [questionId, answer] of Object.entries(selectedAnswers)) {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question && answer === question.correct_answer) {
        correctCount++;
      }
    }
    
    setQuizResult({
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score,
      timeTaken: quizTime * 1000
    });
    
    setQuizState(QuizState.RESULTS);
    
    // If user is logged in, save the score
    if (isAuthenticated && currentUser) {
      leaderboardService.saveScore(
        currentUser.id,
        currentUser.username,
        score,
        quizTime,
        questions.length,
        correctCount,
        quizSettings.category || "Mixed"
      );
    }
  };

  const handleTimeUpdate = (seconds: number) => {
    setQuizTime(seconds);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setStartTime(Date.now());
    setQuizState(QuizState.PLAYING);
  };

  const setupNewQuiz = () => {
    setQuizState(QuizState.SETUP);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden px-4 py-6 md:py-10 transition-colors duration-300">
      <div className="container max-w-4xl mx-auto flex-1 flex flex-col">
        <NavBar />
        
        {quizState === QuizState.SETUP && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-8 text-quiz-metallic-purple"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              QuizWhiz
            </motion.h1>
            <CategorySelector onStart={startQuiz} />
            
            {isAuthenticated && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={() => navigate("/leaderboard")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  View Leaderboard
                </Button>
              </motion.div>
            )}
          </div>
        )}

        {quizState === QuizState.LOADING && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-quiz-gray dark:text-quiz-medium-gray animate-pulse-subtle">Loading questions...</p>
          </div>
        )}

        {quizState === QuizState.PLAYING && currentQuestion && (
          <div className="flex-1 flex flex-col">
            <QuizHeader 
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              score={score}
              onSettings={setupNewQuiz}
              isActive={quizState === QuizState.PLAYING}
              onTimeUpdate={handleTimeUpdate}
              className="mb-8"
            />
            
            <div className="flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentQuestionIndex}
                  className="flex-1 flex flex-col justify-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuizCard
                    question={currentQuestion}
                    onAnswer={handleAnswerSelection}
                    selectedAnswer={selectedAnswers[currentQuestion.id]}
                    isAnswered={selectedAnswers[currentQuestion.id] !== undefined}
                    className="mb-6"
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-between mt-auto pt-6">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={isFirstQuestion}
                  className={`flex items-center gap-1 ${isFirstQuestion ? 'opacity-50' : ''}`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <Button
                  onClick={nextQuestion}
                  disabled={!selectedAnswers[currentQuestion.id]}
                  className={`bg-quiz-blue hover:bg-quiz-blue/90 flex items-center gap-1 
                    ${!selectedAnswers[currentQuestion.id] ? 'opacity-50' : ''}`}
                >
                  {isLastQuestion ? 'Finish' : 'Next'}
                  {!isLastQuestion && <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        )}

        {quizState === QuizState.RESULTS && quizResult && (
          <div className="flex-1 flex items-center justify-center">
            <Results 
              result={quizResult}
              onRestart={restartQuiz}
              onNewQuiz={setupNewQuiz}
              showLoginPrompt={!isAuthenticated}
              onViewLeaderboard={() => navigate("/leaderboard")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
