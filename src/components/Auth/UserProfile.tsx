
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/userService";
import { User, LogOut, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = userService.getCurrentUser();

  const handleLogout = () => {
    userService.logout();
    setIsDropdownOpen(false);
    navigate("/");
    window.location.reload(); // Refresh to update auth state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
        onClick={toggleDropdown}
      >
        <User className="h-5 w-5" />
      </Button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-xl z-10 border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
          <div className="pt-2">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate("/leaderboard");
              }}
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
