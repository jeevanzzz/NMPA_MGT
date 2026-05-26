import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowRight } from 'lucide-react';
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
      navigate('/dashboard');
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

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group border border-cyan-500/50 shadow-[0_0_20px_rgba(8,145,178,0.2)] hover:shadow-[0_0_30px_rgba(8,145,178,0.4)] disabled:opacity-50 disabled:pointer-events-none"
        >
          <span>INITIATE CONNECTION</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </AuthCard>
  );
}
