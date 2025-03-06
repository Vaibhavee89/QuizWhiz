
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const LoadingSpinner = ({ 
  className, 
  size = "md", 
  color
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };
  
  const colorClass = color ? `text-${color}` : "text-quiz-blue";
  
  return (
    <div 
      className={cn(
        "loading-spinner", 
        sizeClasses[size], 
        colorClass, 
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
