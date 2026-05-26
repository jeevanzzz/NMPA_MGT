import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { resetPasswordSchema, ResetPasswordData } from '../../auth/validation/authSchema';
import { AuthCard } from '../../components/auth/AuthCard';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordData) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <AuthCard title="CREDENTIALS UPDATED" subtitle="Security Policy Enforced">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-cyan-400" />
          </div>
          
          <div className="space-y-2">
            <p className="text-slate-300 text-sm">
              Your secure access credentials have been successfully updated according to NMPA security protocols.
            </p>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-all"
          >
            PROCEED TO LOGIN
          </button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="RESET CREDENTIALS"
      subtitle="Establish New Security Key"
    >
      <LoadingOverlay isLoading={isSubmitting} message="ENCRYPTING NEW CREDENTIALS" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <PasswordInput
          label="NEW SECURITY KEY"
          placeholder="••••••••"
          showStrength={true}
          error={errors.password?.message}
          {...register('password')}
        />

        <PasswordInput
          label="CONFIRM SECURITY KEY"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group border border-cyan-500/50 shadow-[0_0_20px_rgba(8,145,178,0.2)] disabled:opacity-50 disabled:pointer-events-none"
          >
            <Lock className="w-4 h-4" />
            <span>ENFORCE NEW CREDENTIALS</span>
          </button>
        </div>
      </form>
    </AuthCard>
  );
}
