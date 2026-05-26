import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, AlertOctagon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../auth/hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import { loginSchema, LoginCredentials } from '../../auth/validation/authSchema';
import { AuthCard } from '../../components/auth/AuthCard';
import { SecureInput } from '../../components/auth/SecureInput';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { SecurityBadge } from '../../components/auth/SecurityBadge';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      setError(null);
      const user = await login(data);
      setIsSuccess(true);
      toast('success', 'Secure access granted');
      
      let redirectPath = '/dashboard';
      if (user?.role === 'Dock Manager') redirectPath = '/dashboard/dock-operations';
      else if (user?.role === 'Cargo Manager') redirectPath = '/dashboard/cargo-management';
      else if (user?.role === 'Analytics Officer') redirectPath = '/dashboard/analytics-center';
      else if (user?.role === 'Port Authority Admin') redirectPath = '/dashboard/operations-control';
      else if (user?.role === 'Ship Operator') redirectPath = '/dashboard/vessel-control';

      setTimeout(() => {
        navigate(redirectPath);
      }, 1500);
    } catch (err: any) {
      const msg = err.message || 'Authentication failed';
      setError(msg);
      toast('error', 'Authentication failed');
    }
  };

  return (
    <AuthCard
      title="SYSTEM AUTHENTICATION"
      subtitle="NMPA Secure Gateway Portal"
    >
      <LoadingOverlay isLoading={isSubmitting} />
      
      <SecurityBadge />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <SecureInput
                label="OFFICIAL EMAIL"
                type="email"
                placeholder="officer@nmpa.gov.in"
                icon={Mail}
                error={errors.email?.message}
                {...register('email')}
              />

              <PasswordInput
                label="ACCESS KEY"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      {...register('remember')}
                    />
                    <div className="w-4 h-4 border border-slate-600 rounded bg-slate-900/50 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 text-slate-900">
                      <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    Maintain Session
                  </span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors font-medium"
                >
                  Recover Access?
                </Link>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-4 rounded-lg flex items-start gap-3 border transition-all duration-300 ${
                      error.includes('Unauthorized')
                        ? 'bg-red-500/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}
                  >
                    <AlertOctagon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="text-red-400 text-sm font-medium leading-relaxed">
                      {error.split('. ').map((line, i) => {
                        const isLast = i === error.split('. ').length - 1;
                        if (!line) return null;
                        return (
                          <span key={i} className="block">
                            {line}{!isLast && !line.endsWith('.') ? '.' : ''}
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 group border disabled:opacity-50 disabled:pointer-events-none bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-500/50 shadow-[0_0_20px_rgba(8,145,178,0.2)] hover:shadow-[0_0_30px_rgba(8,145,178,0.4)]"
              >
                <span className="font-bold tracking-widest">INITIATE CONNECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              className="flex flex-col items-center justify-center py-10 space-y-6"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full animate-ping absolute inset-0" />
                <div className="w-24 h-24 bg-emerald-900/40 border-2 border-emerald-500 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                  <CheckCircle className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-emerald-400 font-mono text-xl font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                  Authorization Verified
                </h3>
                <p className="text-slate-300 text-sm font-medium tracking-wide">
                  Protected access granted
                </p>
                <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-500 uppercase tracking-[0.2em] mt-6 bg-emerald-900/30 py-1.5 px-3 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  Secure token generated
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </AuthCard>
  );
}
