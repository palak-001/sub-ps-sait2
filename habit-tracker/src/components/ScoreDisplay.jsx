import { motion } from 'framer-motion';

export default function ScoreDisplay({ score }) {
  let emoji = '😐';
  let comment = "Let's get started!";
  if (score === 100) {
    emoji = '🔥';
    comment = "PERFECTION!";
  } else if (score >= 80) {
    emoji = '😎';
    comment = "Doing great!";
  } else if (score >= 50) {
    emoji = '👍';
    comment = "Halfway there.";
  } else if (score > 0) {
    emoji = '💪';
    comment = "Keep pushing!";
  }

  return (
    <div className="bg-white border-4 border-black p-6 md:p-10 rounded-2xl shadow-neo flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
      <div className="flex-1">
        <h2 className="text-2xl md:text-4xl font-black uppercase mb-2 text-center md:text-left">Wellness Score</h2>
        <div className="w-full bg-neoYellow border-4 border-black h-8 md:h-10 rounded-full overflow-hidden mt-6 shadow-neo-sm relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="h-full bg-neoBlue border-r-4 border-black relative"
          />
          <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-black z-10 pointer-events-none drop-shadow-md">
            {score}%
          </span>
        </div>
      </div>
      <div className="flex-none flex flex-col items-center justify-center p-6 bg-neoYellow border-4 border-black rounded-full h-32 w-32 md:h-40 md:w-40 shadow-neo shrink-0 transform rotate-3">
        <motion.div 
          key={emoji}
          initial={{ scale: 0.5, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-5xl md:text-7xl"
        >
          {emoji}
        </motion.div>
        <span className="font-black text-sm md:text-base mt-2 uppercase tracking-wide px-2 bg-white border-2 border-black rounded absolute -bottom-4 translate-y-1 z-20">
          {comment}
        </span>
      </div>
    </div>
  );
}
