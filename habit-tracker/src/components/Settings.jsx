import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function Settings({ targets, setTargets, onNavigate }) {
  const [localTargets, setLocalTargets] = useState({ ...targets });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalTargets(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }));
  };

  const handleSave = () => {
    setTargets(localTargets);
    onNavigate('dashboard');
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen p-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="p-3 bg-white border-4 border-black rounded-full shadow-neo hover:translate-press hover:shadow-neo-pressed transition-all"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <h2 className="text-4xl font-black uppercase flex items-center gap-3">
          <SettingsIcon className="w-10 h-10" />
          Settings
        </h2>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-4 border-black p-8 rounded-2xl shadow-neo space-y-6"
      >
        <h3 className="text-2xl font-black mb-6">Set Your Health Goals</h3>

        <div className="space-y-4">
          <label className="block text-lg font-bold">
            Hydration (glasses of water)
            <input
              type="number"
              name="hydration"
              value={localTargets.hydration}
              onChange={handleChange}
              className="mt-2 w-full p-4 bg-neoYellow border-4 border-black rounded-lg text-2xl font-black outline-none focus:bg-white"
            />
          </label>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-bold">
            Sleep (hours)
            <input
              type="number"
              name="sleep"
              value={localTargets.sleep}
              onChange={handleChange}
              className="mt-2 w-full p-4 bg-neoYellow border-4 border-black rounded-lg text-2xl font-black outline-none focus:bg-white"
            />
          </label>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-bold">
            Physical Activity (minutes)
            <input
              type="number"
              name="activity"
              value={localTargets.activity}
              onChange={handleChange}
              className="mt-2 w-full p-4 bg-neoYellow border-4 border-black rounded-lg text-2xl font-black outline-none focus:bg-white"
            />
          </label>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-bold">
            Healthy Meals (number)
            <input
              type="number"
              name="meals"
              value={localTargets.meals}
              onChange={handleChange}
              className="mt-2 w-full p-4 bg-neoYellow border-4 border-black rounded-lg text-2xl font-black outline-none focus:bg-white"
            />
          </label>
        </div>

        <div className="flex items-center gap-4 mt-8 bg-blue-100 p-4 border-4 border-black rounded-lg">
          <input
            type="checkbox"
            name="screen_break"
            checked={localTargets.screen_break}
            onChange={handleChange}
            className="w-8 h-8 accent-neoBlue outline-none border-4 border-black bg-white"
          />
          <span className="text-xl font-bold">Track Screen Breaks (Hourly)</span>
        </div>

        <div className="flex items-center gap-4 bg-red-100 p-4 border-4 border-black rounded-lg">
          <input
            type="checkbox"
            name="stress_relief"
            checked={localTargets.stress_relief}
            onChange={handleChange}
            className="w-8 h-8 accent-neoRed outline-none border-4 border-black bg-white relative top-0"
          />
          <span className="text-xl font-bold">Track Daily Stress Relief</span>
        </div>

        <button
          onClick={handleSave}
          className="mt-10 w-full flex items-center justify-center gap-3 bg-neoBlue text-white border-4 border-black py-4 text-2xl font-black rounded-lg shadow-neo hover:translate-press hover:shadow-neo-pressed transition-all"
        >
          <Save className="w-8 h-8" />
          <span>Save Targets</span>
        </button>
      </motion.div>
    </div>
  );
}
