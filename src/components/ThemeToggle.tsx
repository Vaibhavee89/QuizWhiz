
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-background/10 backdrop-blur-sm border border-border/40 shadow-md"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        exit={{ scale: 0.5, opacity: 0, rotate: 0 }}
        transition={{ duration: 0.3 }}
        key={theme}
        className="h-5 w-5 text-quiz-metallic-purple"
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
