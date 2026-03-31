import { motion } from 'framer-motion';
import clsx from 'clsx';
import { getTodayDateString } from '../utils/storage';

export default function StreakCalendar({ history, targets, calculateScore }) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  return (
    <div className="flex gap-2 justify-between items-end h-32">
      {last7Days.map((date, idx) => {
        const data = history[date];
        const score = data ? calculateScore(data, targets) : 0;
        
        let colorClass = 'bg-gray-200';
        if (score === 100) colorClass = 'bg-neoGreen';
        else if (score >= 50) colorClass = 'bg-neoAmber';
        else if (score > 0) colorClass = 'bg-neoRed';

        const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

        return (
          <div key={date} className="flex flex-col items-center gap-2 group flex-1">
            <span className="text-xs font-bold uppercase rotate-[-45deg] origin-left group-hover:block transition-all duration-300">
              {dayName}
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ delay: idx * 0.1, type: "spring" }}
              className={clsx(
                "w-full max-w-[40px] border-4 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                colorClass,
                getTodayDateString() === date && "ring-4 ring-neoBlue ring-offset-2"
              )}
              style={{ minHeight: '60px' }}
            />
          </div>
        );
      })}
    </div>
  );
}
