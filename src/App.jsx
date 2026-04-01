import { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import {
  loadTargets,
  loadHistory,
  saveTargets,
  saveHistory,
} from "./utils/storage";

function App() {
  const [currentView, setCurrentView] = useState("welcome");
  const [targets, setTargets] = useState(loadTargets());
  const [history, setHistory] = useState(loadHistory());

  // Save changes automatically
  useEffect(() => {
    saveTargets(targets);
  }, [targets]);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const handleDayUpdate = (dateString, updatedDayRecords) => {
    setHistory((prev) => ({ ...prev, [dateString]: updatedDayRecords }));
  };

  return (
    <div className="min-h-screen bg-neoYellow font-sans overflow-x-hidden selection:bg-neoBlue selection:text-white">
      {currentView === "welcome" && <Welcome onNavigate={setCurrentView} />}
      {currentView === "dashboard" && (
        <Dashboard
          targets={targets}
          history={history}
          onUpdateDay={handleDayUpdate}
          onNavigate={setCurrentView}
        />
      )}
      {currentView === "settings" && (
        <Settings
          targets={targets}
          setTargets={setTargets}
          onNavigate={setCurrentView}
        />
      )}
    </div>
  );
}

export default App;
