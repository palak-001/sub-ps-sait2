import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import clsx from 'clsx';

export default function HabitCard({ habit, isCompleted, onClick }) {
  return (
    <motion.button
      whileHover={{ y: 2, x: 2 }}
      whileTap={{ y: 4, x: 4, boxShadow: "none" }}
      onClick={onClick}
      className={clsx(
        "relative p-4 md:p-6 flex flex-col items-center justify-center gap-4 border-4 border-black rounded-2xl transition-colors duration-300 w-full aspect-square md:aspect-auto",
        isCompleted ? "bg-neoGreen text-black" : "bg-white text-black",
        isCompleted ? "shadow-neo-pressed translate-press" : "shadow-neo"
      )}
    >
      <div className="absolute top-3 md:top-4 right-3 md:right-4 w-6 h-6 md:w-8 md:h-8 border-4 border-black bg-white rounded flex items-center justify-center overflow-hidden">
        {isCompleted && <Check className="w-4 h-4 md:w-6 md:h-6 text-black stroke-[4]" />}
      </div>
      <div className="text-4xl md:text-5xl lg:text-6xl mb-2">{habit.icon}</div>
      <div className="text-base md:text-xl lg:text-2xl font-black uppercase text-center leading-tight">
        {habit.label}
      </div>
    </motion.button>
  );
}
