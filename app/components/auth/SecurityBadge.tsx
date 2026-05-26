import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Server, Lock, Fingerprint, Activity } from 'lucide-react';

const STATUS_INDICATORS = [
  { 
    text: "AES-256 ENCRYPTION ACTIVE", 
    icon: ShieldCheck, 
    colorClass: "text-emerald-400",
    pingClass: "bg-emerald-400",
    barClass: "bg-emerald-500",
    borderClass: "border-emerald-500/30",
    bgClass: "bg-emerald-900/10"
  },
  { 
    text: "SECURE CHANNEL VERIFIED", 
    icon: Server, 
    colorClass: "text-cyan-400",
    pingClass: "bg-cyan-400",
    barClass: "bg-cyan-500",
    borderClass: "border-cyan-500/30",
    bgClass: "bg-cyan-900/10"
  },
  { 
    text: "TOKEN VALIDATED", 
    icon: Fingerprint, 
    colorClass: "text-blue-400",
    pingClass: "bg-blue-400",
    barClass: "bg-blue-500",
    borderClass: "border-blue-500/30",
    bgClass: "bg-blue-900/10"
  },
  { 
    text: "PROTECTED NETWORK ACTIVE", 
    icon: Lock, 
    colorClass: "text-indigo-400",
    pingClass: "bg-indigo-400",
    barClass: "bg-indigo-500",
    borderClass: "border-indigo-500/30",
    bgClass: "bg-indigo-900/10"
  },
  { 
    text: "SESSION MONITORING ENABLED", 
    icon: Activity, 
    colorClass: "text-teal-400",
    pingClass: "bg-teal-400",
    barClass: "bg-teal-500",
    borderClass: "border-teal-500/30",
    bgClass: "bg-teal-900/10"
  }
];

export const SecurityBadge = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STATUS_INDICATORS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentStatus = STATUS_INDICATORS[currentIndex];
  const Icon = currentStatus.icon;

  return (
    <div className="relative group mb-6 overflow-hidden rounded-lg">
      <div className={`flex items-center justify-center py-3 px-4 ${currentStatus.bgClass} border ${currentStatus.borderClass} cursor-help transition-all duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]`}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: 5, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -5, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 ${currentStatus.colorClass} text-[11px] sm:text-xs font-mono font-bold tracking-wider`}
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatus.pingClass} opacity-20`}></span>
              <Icon className="w-4 h-4 relative z-10" />
            </div>
            <span>{currentStatus.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Dynamic Loading Glow Line */}
      <motion.div 
        key={`bar-${currentIndex}`}
        className={`absolute bottom-0 left-0 h-[2px] ${currentStatus.barClass} shadow-[0_0_10px_currentColor]`}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, ease: "linear" }}
      />
      
      {/* Tooltip */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-center pointer-events-none">
        <p className="text-slate-300 text-[10px] leading-relaxed">
          <strong className={`${currentStatus.colorClass} block mb-1 uppercase tracking-wider`}>Active Security Monitoring</strong>
          Your session is protected by enterprise-grade encryption. All unauthorized access attempts are logged and strictly monitored.
        </p>
      </div>
    </div>
  );
};
