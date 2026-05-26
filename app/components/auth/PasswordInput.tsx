import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';
import { cn } from './SecureInput';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showStrength?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label = "Password", error, showStrength, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const value = String(props.value || '');

    const calculateStrength = (pass: string) => {
      let score = 0;
      if (pass.length >= 8) score += 20;
      if (/[A-Z]/.test(pass)) score += 20;
      if (/[a-z]/.test(pass)) score += 20;
      if (/[0-9]/.test(pass)) score += 20;
      if (/[^A-Za-z0-9]/.test(pass)) score += 20;
      return score;
    };

    const strength = calculateStrength(value);

    return (
      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
            <Lock className="w-5 h-5" />
          </div>
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={cn(
              "w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-10 text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500",
              error && "border-red-500/50 focus:ring-red-500/50 focus:border-red-500",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        
        {showStrength && value.length > 0 && (
          <div className="mt-2 space-y-1 animate-in fade-in">
            <div className="flex gap-1 h-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "flex-1 rounded-full transition-colors duration-300",
                    level * 20 <= strength 
                      ? strength === 100 ? "bg-green-500" : strength >= 60 ? "bg-yellow-500" : "bg-red-500"
                      : "bg-slate-700"
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400 text-right">
              {strength === 100 ? 'Strong' : strength >= 60 ? 'Medium' : 'Weak'}
            </p>
          </div>
        )}

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

PasswordInput.displayName = 'PasswordInput';
