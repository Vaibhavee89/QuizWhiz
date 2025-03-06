
import { FormattedQuestion, Question, Category } from "@/types/quiz";

const API_BASE_URL = "https://opentdb.com";

// Decode HTML entities that come from the API
const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

// Shuffle array (for randomizing answer options)
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Get categories from the API
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api_category.php`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Fetch quiz questions
export const fetchQuizQuestions = async (
  amount = 10,
  category = "",
  difficulty = ""
): Promise<FormattedQuestion[]> => {
  try {
    let url = `${API_BASE_URL}/api.php?amount=${amount}&type=multiple`;
    
    if (category && category !== "any") {
      url += `&category=${category}`;
    }
    
    if (difficulty && difficulty !== "any") {
      url += `&difficulty=${difficulty}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }
    
    const data = await response.json();
    
    // Format and decode the questions
    return data.results.map((question: Question, index: number) => {
      const decodedQuestion = decodeHtmlEntities(question.question);
      const decodedCorrectAnswer = decodeHtmlEntities(question.correct_answer);
      const decodedIncorrectAnswers = question.incorrect_answers.map(decodeHtmlEntities);
      
      // Combine and shuffle all options
      const options = shuffleArray([
        decodedCorrectAnswer,
        ...decodedIncorrectAnswers
      ]);
      
      return {
        id: index,
        question: decodedQuestion,
        category: question.category,
        difficulty: question.difficulty,
        options,
        correct_answer: decodedCorrectAnswer
      };
    });
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return [];
  }
};
