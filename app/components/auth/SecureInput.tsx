import React, { forwardRef, InputHTMLAttributes } from 'react';
import { LucideIcon, AlertOctagon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SecureInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  isSuccess?: boolean;
}

export const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>(
  ({ label, icon: Icon, error, isSuccess, className, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full group/input">
        <div className="flex justify-between items-end">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 group-focus-within/input:text-cyan-400 transition-colors duration-300">
            {label}
          </label>
          {/* Secure typing indicator */}
          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-emerald-500/0 group-focus-within/input:text-emerald-500/80 transition-all duration-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_1s_ease-in-out_infinite]" />
            256-bit Secure
          </span>
        </div>
        <div className="relative group">
          {Icon && (
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${error ? 'text-red-400' : 'text-slate-500 group-focus-within:text-cyan-400'}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-slate-900/60 border border-slate-700/80 rounded-xl py-3.5 text-white placeholder:text-slate-600 transition-all duration-300 focus:outline-none focus:ring-1 focus:border-transparent",
              Icon ? "pl-12 pr-4" : "px-4",
              error 
                ? "border-red-500/50 focus:ring-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-red-500/5" 
                : "focus:ring-cyan-500 focus:shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:border-slate-600",
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-pulse pointer-events-none">
              <AlertOctagon className="w-5 h-5" />
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-start gap-2 text-red-400 text-[11px] font-bold tracking-wide mt-2 uppercase animate-in slide-in-from-top-1">
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

SecureInput.displayName = 'SecureInput';
