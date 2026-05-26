import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
  "Establishing secure communication channel...",
  "Verifying encrypted credentials...",
  "Generating secure authorization token...",
  "Synchronizing protected access session...",
  "Authentication verified"
];

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string; // Kept for backwards compatibility, though we use steps now
}

export const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setStep(0);
      const interval = setInterval(() => {
        setStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 500); // 5 steps * 500ms = 2500ms total
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center rounded-2xl border border-cyan-500/30 overflow-hidden"
        >
          {/* Cyber Security Scanline Background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_50%,rgba(8,145,178,0.5)_50%)] bg-[length:100%_4px] pointer-events-none" />
          
          <div className="flex flex-col items-center gap-8 relative z-10 w-full px-8">
            {/* Spinning Loader */}
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
              <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(8,145,178,0.5)]" />
              <div className="absolute inset-3 border-4 border-emerald-500 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse] shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              
              {/* Center Security Pulse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,211,238,1)]" />
              </div>
            </div>

            <div className="w-full max-w-[280px] space-y-5">
              {/* Terminal Text Display */}
              <div className="h-6 flex items-center justify-center">
                <motion.p 
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-cyan-400 font-mono text-xs sm:text-[13px] text-center tracking-wide"
                >
                  {LOADING_STEPS[step]}
                </motion.p>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 relative"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((step + 1) / LOADING_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>

              {/* Step Sequence Dots */}
              <div className="flex justify-center gap-2">
                {LOADING_STEPS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i <= step ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] scale-110' : 'bg-slate-700'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
