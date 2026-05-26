import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay = ({ isLoading, message = "AUTHENTICATING" }: LoadingOverlayProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-2xl"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-2 border-4 border-blue-500 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
            </div>
            <p className="text-cyan-400 font-mono text-sm tracking-[0.2em] animate-pulse">
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
