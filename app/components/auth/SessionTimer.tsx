import React, { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import { useAuth } from '../../auth/hooks/useAuth';
import { decodeMockToken } from '../../auth/utils/token';

export const SessionTimer = () => {
  const { token } = useAuth();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!token) {
      setTimeLeft(null);
      return;
    }

    const decoded = decodeMockToken(token);
    if (!decoded || !decoded.exp) return;

    const calculateTimeLeft = () => {
      const remainingSeconds = Math.max(0, Math.floor(decoded.exp - (Date.now() / 1000)));
      setTimeLeft(remainingSeconds);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [token]);

  if (timeLeft === null) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const isWarning = timeLeft < 300; // Less than 5 minutes

  return (
    <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold font-mono transition-colors ${
      isWarning 
        ? 'bg-red-500/10 border-red-500/50 text-red-500 animate-pulse' 
        : 'bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
    }`}>
      <Timer className={`w-4 h-4 ${isWarning ? 'text-red-500' : 'text-slate-400'}`} />
      <span>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
};
