
import { User } from "@/types/user";

// Simulating database with localStorage
const USERS_KEY = "quizwhiz_users";
const CURRENT_USER_KEY = "quizwhiz_current_user";

export const userService = {
  // Register a new user
  register: async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingUsers = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    
    // Check if username already exists
    if (existingUsers.some((user: User) => user.username === username)) {
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password, // In a real app, NEVER store plain text passwords
      registeredAt: new Date().toISOString()
    };
    
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    
    return true;
  },
  
  // Login a user
  login: async (username: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const user = users.find((u: User) => 
      u.username === username && u.password === password
    );
    
    if (user) {
      // Store current user (without password) in localStorage
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem(CURRENT_USER_KEY) !== null;
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    if (!userJson) return null;
    return JSON.parse(userJson);
  }
};
