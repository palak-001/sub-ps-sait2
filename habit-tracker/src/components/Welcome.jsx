import { motion } from 'framer-motion';
import { ArrowRight, Settings, Smile } from 'lucide-react';

export default function Welcome({ onNavigate }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center text-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="max-w-md w-full"
      >
        <div className="bg-white border-4 border-black p-8 shadow-neo rounded-xl mb-12">
          <Smile className="w-20 h-20 mx-auto mb-6 text-neoBlue" strokeWidth={2.5} />
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-tight">
            Stay <br/> Awesome.
          </h1>
          <p className="text-xl font-bold mb-6">Your personal health habit tracker built with good vibes.</p>
        </div>

        <div className="flex flex-col gap-5">
          <button
            onClick={() => onNavigate('dashboard')}
            className="group flex items-center justify-between bg-neoBlue text-white border-4 border-black px-8 py-5 text-2xl font-black rounded-lg shadow-neo hover:shadow-neo-pressed hover:translate-press transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
          >
            <span>Let's Track</span>
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
          
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center justify-center gap-3 bg-white text-black border-4 border-black px-8 py-5 text-xl font-bold rounded-lg shadow-neo hover:shadow-neo-pressed hover:translate-press transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
          >
            <Settings className="w-6 h-6" />
            <span>Configure Goals</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
