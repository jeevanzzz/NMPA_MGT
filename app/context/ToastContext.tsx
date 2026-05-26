import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertOctagon, ShieldAlert, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-900/50',
          border: 'border-emerald-500/50',
          text: 'text-emerald-400',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
          shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]'
        };
      case 'error':
        return {
          bg: 'bg-red-900/50',
          border: 'border-red-500/50',
          text: 'text-red-400',
          icon: <AlertOctagon className="w-5 h-5 text-red-400 flex-shrink-0" />,
          shadow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]'
        };
      case 'warning':
        return {
          bg: 'bg-amber-900/50',
          border: 'border-amber-500/50',
          text: 'text-amber-400',
          icon: <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />,
          shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]'
        };
      case 'info':
        return {
          bg: 'bg-cyan-900/50',
          border: 'border-cyan-500/50',
          text: 'text-cyan-400',
          icon: <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />,
          shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]'
        };
    }
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const styles = getToastStyles(t.type);
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`flex items-center gap-3 p-4 min-w-[320px] backdrop-blur-md rounded-lg border ${styles.bg} ${styles.border} ${styles.shadow}`}
              >
                {styles.icon}
                <span className={`font-mono text-xs sm:text-sm font-bold tracking-wide uppercase ${styles.text}`}>
                  {t.message}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
