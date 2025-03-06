
import React, { useEffect, useState } from "react";
import { Category, QuizSettings } from "@/types/quiz";
import { fetchCategories } from "@/services/triviaService";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

interface CategorySelectorProps {
  onStart: (settings: QuizSettings) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onStart }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<QuizSettings>({
    amount: 10,
    category: "",
    difficulty: "any",
  });

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    };

    getCategories();
  }, []);

  const handleStartQuiz = () => {
    onStart(settings);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
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
      <motion.h2 
        variants={itemVariants} 
        className="text-2xl font-bold mb-6 text-center text-quiz-dark"
      >
        Customize Your Quiz
      </motion.h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-quiz-dark">
              Number of Questions
            </label>
            <div className="flex items-center gap-4">
              <Slider
                id="amount"
                min={5}
                max={30}
                step={1}
                value={[settings.amount]}
                onValueChange={(value) => setSettings({ ...settings, amount: value[0] })}
                className="flex-1"
              />
              <span className="w-10 h-10 flex items-center justify-center bg-quiz-light-blue rounded-full font-semibold text-quiz-blue">
                {settings.amount}
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-quiz-dark">
              Category
            </label>
            <Select
              value={settings.category}
              onValueChange={(value) => setSettings({ ...settings, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Category</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="difficulty" className="block text-sm font-medium text-quiz-dark">
              Difficulty
            </label>
            <Select
              value={settings.difficulty}
              onValueChange={(value) => setSettings({ ...settings, difficulty: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Difficulty</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4">
            <Button 
              onClick={handleStartQuiz} 
              className="w-full bg-quiz-blue hover:bg-quiz-blue/90 text-white font-semibold py-6"
            >
              Start Quiz
            </Button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CategorySelector;
