import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, Lock, AlertOctagon, ShieldCheck } from 'lucide-react';
import { cn } from './SecureInput';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showStrength?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label = "Access Key", error, showStrength, className, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [localValue, setLocalValue] = useState('');

    const calculateStrength = (pass: string) => {
      let score = 0;
      if (pass.length >= 8) score += 20;
      if (/[A-Z]/.test(pass)) score += 20;
      if (/[a-z]/.test(pass)) score += 20;
      if (/[0-9]/.test(pass)) score += 20;
      if (/[^A-Za-z0-9]/.test(pass)) score += 20;
      return score;
    };

    const strength = calculateStrength(localValue);

    return (
      <div className="space-y-2 w-full group/input">
        <div className="flex justify-between items-end">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 group-focus-within/input:text-cyan-400 transition-colors duration-300">
            {label}
          </label>
          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-emerald-500/0 group-focus-within/input:text-emerald-500/80 transition-all duration-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_1s_ease-in-out_infinite]" />
            Encrypted
          </span>
        </div>
        <div className="relative group">
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${error ? 'text-red-400' : 'text-slate-500 group-focus-within:text-cyan-400'}`}>
            <Lock className="w-5 h-5" />
          </div>
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              setLocalValue(e.target.value);
              if (onChange) onChange(e);
            }}
            className={cn(
              "w-full bg-slate-900/60 border border-slate-700/80 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 transition-all duration-300 focus:outline-none focus:ring-1 focus:border-transparent",
              error 
                ? "border-red-500/50 focus:ring-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-red-500/5" 
                : "focus:ring-cyan-500 focus:shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:border-slate-600",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors focus:outline-none ${error ? 'text-red-400 hover:text-red-300' : 'text-slate-500 hover:text-cyan-400'}`}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        
        {showStrength && localValue.length > 0 && (
          <div className="mt-3 space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-300">
            <div className="flex gap-1.5 h-1.5">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "flex-1 rounded-full transition-all duration-500 shadow-sm",
                    level * 20 <= strength 
                      ? strength === 100 
                        ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                        : strength >= 60 
                          ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" 
                          : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                      : "bg-slate-800"
                  )}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold">
              <span className="text-slate-500">Security Level</span>
              <span className={
                strength === 100 ? 'text-emerald-400 flex items-center gap-1.5' : 
                strength >= 60 ? 'text-amber-400' : 'text-red-400'
              }>
                {strength === 100 && <ShieldCheck className="w-3.5 h-3.5" />}
                {strength === 100 ? 'Maximum' : strength >= 60 ? 'Moderate' : 'Insufficient'}
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-red-400 text-[11px] font-bold tracking-wide mt-2 uppercase animate-in slide-in-from-top-1">
            <AlertOctagon className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
