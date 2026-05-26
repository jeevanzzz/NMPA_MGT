import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';

import { authService } from '../../auth/services/authService';
import { forgotPasswordSchema, ForgotPasswordData } from '../../auth/validation/authSchema';
import { AuthCard } from '../../components/auth/AuthCard';
import { SecureInput } from '../../components/auth/SecureInput';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    await authService.resetPassword(data.email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AuthCard title="RECOVERY INITIATED" subtitle="Secure Protocol Engaged">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
            <KeyRound className="w-8 h-8 text-emerald-400" />
          </div>
          
          <div className="space-y-2">
            <p className="text-slate-300 text-sm">
              If the credentials exist in our secure database, a recovery link has been transmitted via encrypted channels.
            </p>
            <p className="text-emerald-400 text-xs font-mono">
              STATUS: TRANSMISSION SECURE
            </p>
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Gateway</span>
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="ACCESS RECOVERY"
      subtitle="Identity Verification Required"
    >
      <LoadingOverlay isLoading={isSubmitting} message="VERIFYING IDENTITY" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <p className="text-sm text-slate-400 text-center mb-6">
          Enter your official government email address. Recovery instructions will be sent via AES-256 encrypted channels.
        </p>

        <SecureInput
          label="REGISTERED EMAIL"
          type="email"
          placeholder="officer@nmpa.gov.in"
          icon={Mail}
          error={errors.email?.message}
          {...register('email')}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group border border-cyan-500/50 shadow-[0_0_20px_rgba(8,145,178,0.2)] disabled:opacity-50 disabled:pointer-events-none mt-6"
        >
          <KeyRound className="w-4 h-4" />
          <span>REQUEST SECURE LINK</span>
        </button>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Abort Protocol (Return to Login)</span>
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
