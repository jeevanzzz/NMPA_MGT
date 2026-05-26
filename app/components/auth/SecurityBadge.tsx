import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const SecurityBadge = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-900/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-mono font-medium tracking-wider mb-6">
      <ShieldCheck className="w-4 h-4" />
      <span>AES-256 ENCRYPTED CONNECTION</span>
    </div>
  );
};
