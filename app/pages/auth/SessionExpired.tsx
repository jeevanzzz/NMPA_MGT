import React from 'react';
import { TimerReset, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SessionExpired() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10 text-center">
        <div className="w-24 h-24 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <TimerReset className="w-12 h-12 text-yellow-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">SESSION TERMINATED</h1>
        <div className="h-1 w-24 bg-yellow-500 mx-auto mb-6 rounded-full" />
        
        <p className="text-slate-400 mb-8 text-sm">
          For your security, your authenticated session has automatically expired due to inactivity or token expiration. 
          Please establish a new secure connection to continue.
        </p>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all border border-cyan-500/50 shadow-[0_0_20px_rgba(8,145,178,0.2)]"
        >
          <LogIn className="w-4 h-4" />
          <span>Establish New Connection</span>
        </Link>
      </div>
    </div>
  );
}
