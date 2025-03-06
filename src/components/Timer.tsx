
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate: (time: number) => void;
  className?: string;
}

const Timer = ({ isRunning, onTimeUpdate, className }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds(prev => {
          const newTime = prev + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, onTimeUpdate]);
  
  // Format seconds to mm:ss
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={cn(
      "flex items-center gap-1.5 bg-quiz-light-gray px-3 py-1.5 rounded-full",
      className
    )}>
      <Clock className="h-4 w-4 text-quiz-metallic-purple" />
      <span className="text-sm font-medium">{formatTime(seconds)}</span>
    </div>
  );
};

export default Timer;
