import React from 'react';
import { motion } from 'framer-motion';
import { AuthHeader } from './AuthHeader';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthCard = ({ children, title, subtitle }: AuthCardProps) => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/30 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4" 
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-2xl shadow-[0_0_40px_rgba(8,145,178,0.1)] overflow-hidden">
          <AuthHeader title={title} subtitle={subtitle} />

          {/* Body */}
          <div className="p-8">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
