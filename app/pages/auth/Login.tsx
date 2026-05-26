import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, AlertOctagon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../auth/hooks/useAuth';
import { loginSchema, LoginCredentials } from '../../auth/validation/authSchema';
import { AuthCard } from '../../components/auth/AuthCard';
import { SecureInput } from '../../components/auth/SecureInput';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { SecurityBadge } from '../../components/auth/SecurityBadge';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
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
      await login(data);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
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
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
            >
              <AlertOctagon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-red-400 text-sm font-medium leading-relaxed">
                {error.split('. ').map((line, i) => (
                  <span key={i} className="block">{line}{i < error.split('. ').length - 1 ? '.' : ''}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className={`w-full font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group border disabled:opacity-50 disabled:pointer-events-none ${
            isSuccess 
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-500/50 shadow-[0_0_20px_rgba(8,145,178,0.2)] hover:shadow-[0_0_30px_rgba(8,145,178,0.4)]'
          }`}
        >
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>CONNECTION SECURED</span>
            </motion.div>
          ) : (
            <>
              <span>INITIATE CONNECTION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </AuthCard>
  );
}
