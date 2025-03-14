
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { userService } from "@/services/userService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await userService.login(formData.username, formData.password);
      if (success) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In to QuizWhiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-quiz-blue hover:bg-quiz-blue/90 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
            <LogIn className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
