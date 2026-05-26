import React from 'react';
import { TimerReset, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SessionExpired() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.15)_0%,transparent_70%)] pointer-events-none" 
      />
      
      <div className="max-w-md w-full relative z-10 text-center">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TimerReset className="w-12 h-12 text-yellow-500" />
          </motion.div>
        </motion.div>
        
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-2 tracking-tight"
        >
          SESSION TERMINATED
        </motion.h1>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="h-1 w-24 bg-yellow-500 mx-auto mb-6 rounded-full" 
        />
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 mb-8 text-sm leading-relaxed"
        >
          For your security, your authenticated session has automatically expired due to inactivity or token expiration. 
          Please establish a new secure connection to continue.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all border border-cyan-500/50 shadow-[0_0_20px_rgba(8,145,178,0.2)] hover:shadow-[0_0_30px_rgba(8,145,178,0.4)] group"
          >
            <LogIn className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Establish New Connection</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
