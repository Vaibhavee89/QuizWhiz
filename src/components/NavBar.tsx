
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import UserProfile from "@/components/Auth/UserProfile";
import { userService } from "@/services/userService";
import { LogIn, UserPlus } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = userService.isAuthenticated();

  return (
    <nav className="flex justify-between items-center w-full mb-8">
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
      
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <UserProfile />
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => navigate("/login")}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-quiz-blue hover:bg-quiz-blue/90 flex items-center gap-1"
              onClick={() => navigate("/register")}
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
