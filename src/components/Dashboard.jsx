import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Zap,
  Calendar as CalendarIcon,
  TrendingUp,
} from "lucide-react";
import HabitCard from "./HabitCard";
import ScoreDisplay from "./ScoreDisplay";
import StreakCalendar from "./StreakCalendar";
import TrendChart from "./TrendChart";
import { getTodayDateString, saveHistory } from "../utils/storage";

const HABITS = [
  { id: "hydration", label: "Hydration", icon: "💧", metric: "glasses" },
  { id: "sleep", label: "Sleep", icon: "💤", metric: "hours" },
  { id: "activity", label: "Activity", icon: "🏃", metric: "minutes" },
  { id: "meals", label: "Healthy Meals", icon: "🥗", metric: "meals" },
  { id: "screen_break", label: "Screen Breaks", icon: "💻", isBoolean: true },
  { id: "stress_relief", label: "Stress Relief", icon: "🧘", isBoolean: true },
];

export default function Dashboard({
  targets,
  history,
  onUpdateDay,
  onNavigate,
}) {
  const today = getTodayDateString();
  const todayData = history[today] || {};

  const handleToggleHabit = (id) => {
    // If it's a boolean habit, toggle. If it's numeric, we just mark it as max target for simplicity (1 tap checkoff as requested)
    const isCompleted =
      todayData[id] ===
      (HABITS.find((h) => h.id === id).isBoolean ? true : targets[id]);
    const nextValue = isCompleted
      ? 0
      : HABITS.find((h) => h.id === id).isBoolean
        ? true
        : targets[id];

    // Actually the user said "A single tap/click checks them off."
    const updatedData = { ...todayData, [id]: nextValue };
    onUpdateDay(today, updatedData);
  };

  const calculateScore = (data, tgts) => {
    if (!data) return 0;
    let earned = 0;
    let total = HABITS.length;

    HABITS.forEach((h) => {
      const val = data[h.id];
      if (h.isBoolean) {
        if (tgts[h.id] === val) earned += 1; // target is true by default
      } else {
        if (val >= tgts[h.id]) earned += 1;
      }
    });

    return Math.round((earned / total) * 100);
  };

  const getTip = () => {
    // Check lowest performing over last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    });

    const scores = {};
    HABITS.forEach((h) => (scores[h.id] = { total: 0, count: 0 }));

    last7Days.forEach((date) => {
      const data = history[date] || {};
      HABITS.forEach((h) => {
        if (data[h.id] !== undefined) {
          scores[h.id].count += 1;
          const val = data[h.id];
          const isMet = h.isBoolean
            ? val === targets[h.id]
            : val >= targets[h.id];
          if (isMet) scores[h.id].total += 1;
        }
      });
    });

    let lowestScore = 1;
    let lowestHabit = HABITS[0];

    HABITS.forEach((h) => {
      const s = scores[h.id].count
        ? scores[h.id].total / scores[h.id].count
        : 0;
      if (s < lowestScore) {
        lowestScore = s;
        lowestHabit = h;
      }
    });

    const tips = {
      hydration: "You're lagging on water intake! Keep a bottle at your desk.",
      sleep:
        "Your sleep average is low this week. Try winding down 30 mins earlier tonight!",
      activity:
        "Remember to stay active! A simple 15-min walk makes a big difference.",
      meals: "Missing healthy meals? Try prepping some quick salads or wraps.",
      screen_break: "Eye strain alert! Make sure to follow the 20-20-20 rule.",
      stress_relief:
        "Take a deep breath. 5 minutes of meditation or stretching could help right now!",
    };

    return tips[lowestHabit.id];
  };

  const injectDemoData = () => {
    const mockDb = {};
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      const mockResult = {};
      HABITS.forEach((h) => {
        const rand = Math.random();
        if (h.isBoolean) {
          mockResult[h.id] = rand > 0.3; // 70% chance of doing it
        } else {
          mockResult[h.id] =
            rand > 0.4 ? targets[h.id] : Math.floor(targets[h.id] / 2); // 60% chance of full, 40% half
        }
      });
      mockDb[dateStr] = mockResult;
    }

    Object.keys(mockDb).forEach((k) => {
      onUpdateDay(k, mockDb[k]);
    });
  };

  const todayScore = calculateScore(todayData, targets);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12 mb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center bg-white p-4 md:p-6 border-4 border-black rounded-2xl shadow-neo"
      >
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          Today
        </h1>
        <div className="flex gap-3 relative">
          <button
            onClick={injectDemoData}
            className="flex items-center gap-2 bg-neoAmb bg-neoRed text-white px-4 py-3 border-4 border-black rounded-xl font-bold shadow-neo hover:translate-press hover:shadow-neo-pressed transition-all text-sm md:text-base"
          >
            <Zap className="w-5 h-5" fill="currentColor" />
            <span className="hidden md:inline">Judge Demo</span>
          </button>
          <button
            onClick={() => onNavigate("settings")}
            className="bg-neoYellow p-3 border-4 border-black rounded-xl shadow-neo hover:translate-press hover:shadow-neo-pressed transition-all"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </motion.div>

      {/* Score */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <ScoreDisplay score={todayScore} />
      </motion.div>

      {/* Habits Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      >
        {HABITS.map((habit) => {
          const isCompleted =
            todayData[habit.id] ===
            (habit.isBoolean ? true : targets[habit.id]);
          return (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={isCompleted}
              onClick={() => handleToggleHabit(habit.id)}
            />
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white border-4 border-black p-6 rounded-2xl shadow-neo"
        >
          <div className="flex items-center gap-3 mb-6">
            <CalendarIcon className="w-8 h-8" />
            <h2 className="text-2xl font-black uppercase">Streak</h2>
          </div>
          <StreakCalendar
            history={history}
            targets={targets}
            calculateScore={calculateScore}
          />
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white border-4 border-black p-6 rounded-2xl shadow-neo"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8" />
            <h2 className="text-2xl font-black uppercase">Weekly Trend</h2>
          </div>
          <TrendChart
            history={history}
            targets={targets}
            calculateScore={calculateScore}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="bg-neoBlue text-white border-4 border-black p-6 md:p-8 rounded-2xl shadow-neo"
      >
        <h2 className="text-2xl font-black uppercase mb-4 text-neoYellow">
          AI-Free Tip Engine
        </h2>
        <p className="text-xl font-bold leading-relaxed">{getTip()}</p>
      </motion.div>
    </div>
  );
}
