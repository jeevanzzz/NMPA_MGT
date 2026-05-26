import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const SecurityBadge = () => {
  return (
    <div className="relative group mb-6">
      <div className="flex items-center justify-center gap-3 py-3 px-4 bg-emerald-900/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-mono font-medium tracking-wider cursor-help transition-colors hover:bg-emerald-900/20 hover:border-emerald-500/50">
        <div className="relative flex items-center justify-center w-5 h-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
          <ShieldCheck className="w-4 h-4 relative z-10" />
        </div>
        <span>AES-256 ENCRYPTED CONNECTION</span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-slate-900 border border-emerald-500/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-center pointer-events-none">
        <p className="text-slate-300 text-[10px] leading-relaxed">
          <strong className="text-emerald-400 block mb-1">Active Security Monitoring</strong>
          Your session is protected by enterprise-grade encryption. All unauthorized access attempts are logged and monitored.
        </p>
      </div>
    </div>
  );
};
