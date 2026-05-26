import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10 text-center">
        <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <ShieldAlert className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">ACCESS DENIED</h1>
        <div className="h-1 w-24 bg-red-500 mx-auto mb-6 rounded-full" />
        
        <p className="text-slate-400 mb-8 text-sm">
          Your current clearance level does not permit access to this secure module. 
          This unauthorized attempt has been logged according to NMPA security protocols.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-700 hover:border-slate-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Authorized Area</span>
        </Link>
      </div>
    </div>
  );
}
