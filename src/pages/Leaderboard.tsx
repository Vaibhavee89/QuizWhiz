
import { useNavigate } from "react-router-dom";
import LeaderboardTable from "@/components/Leaderboard/LeaderboardTable";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 py-6 md:py-10">
      <div className="container max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Quiz
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-center mb-6">
            <Trophy className="h-8 w-8 text-quiz-metallic-purple mr-3" />
            <h1 className="text-3xl font-bold">Leaderboard</h1>
          </div>
          
          <LeaderboardTable />
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
