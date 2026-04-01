const DEFAULT_TARGETS = {
  hydration: 8,
  sleep: 8,
  activity: 30,
  meals: 3,
  screen_break: true,
  stress_relief: true,
};

export const loadData = (key, defaultVal) => {
  try {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
  } catch (e) {
    console.error("Error loading data", e);
  }
  return defaultVal;
};

export const saveData = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error("Error saving data", e);
  }
};

export const getTodayDateString = () => {
  const date = new Date();
  return date.toISOString().split("T")[0];
};

export const loadTargets = () => loadData("targets", DEFAULT_TARGETS);
export const saveTargets = (targets) => saveData("targets", targets);

export const loadHistory = () => loadData("history", {});
export const saveHistory = (history) => saveData("history", history);

// Format history: records indexed by date YYYY-MM-DD
// Example: { "2023-10-01": { hydration: true, sleep: false, activity: true, meals: false, screen_break: true, stress_relief: true } }
