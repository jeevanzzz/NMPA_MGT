import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="p-8 pb-6 text-center relative border-b border-slate-800/50">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="w-16 h-16 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-center mx-auto mb-6 shadow-inner"
      >
        <Shield className="w-8 h-8 text-cyan-400" />
      </motion.div>
      <h1 className="text-2xl font-bold text-white tracking-tight mb-2">{title}</h1>
      <p className="text-slate-400 text-sm font-medium">{subtitle}</p>
    </div>
  );
};
