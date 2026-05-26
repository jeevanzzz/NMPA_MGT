import React, { forwardRef, InputHTMLAttributes } from 'react';
import { LucideIcon, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SecureInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>(
  ({ label, icon: Icon, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
        <div className="relative group">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500",
              Icon ? "pl-10 pr-4" : "px-4",
              error && "border-red-500/50 focus:ring-red-500/50 focus:border-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <div className="flex items-center gap-1.5 text-red-400 text-sm mt-1 animate-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

SecureInput.displayName = 'SecureInput';
