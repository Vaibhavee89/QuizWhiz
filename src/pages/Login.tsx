
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/Auth/LoginForm";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/userService";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if already logged in
    if (userService.isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-quiz-metallic-purple">
          QuizWhiz
        </h1>
        <LoginForm />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Don't have an account?
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/register")}
            className="w-full"
          >
            Create Account
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mt-4 text-sm"
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
