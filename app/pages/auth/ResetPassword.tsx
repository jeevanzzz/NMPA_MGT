import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Lock, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { resetPasswordSchema, ResetPasswordData } from '../../auth/validation/authSchema';
import { AuthCard } from '../../components/auth/AuthCard';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';
import { SecurityBadge } from '../../components/auth/SecurityBadge';

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

  const passwordValue = watch('password') || '';

  const passwordRules = [
    { label: 'Minimum 8 characters', met: passwordValue.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(passwordValue) },
    { label: 'Lowercase letter', met: /[a-z]/.test(passwordValue) },
    { label: 'Number', met: /[0-9]/.test(passwordValue) },
    { label: 'Special character', met: /[^A-Za-z0-9]/.test(passwordValue) },
  ];

  const onSubmit = async (data: ResetPasswordData) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSuccess(true);
  };

  return (
    <AuthCard
      title={isSuccess ? "CREDENTIALS UPDATED" : "RESET CREDENTIALS"}
      subtitle={isSuccess ? "Security Policy Enforced" : "Establish New Security Key"}
    >
      <LoadingOverlay isLoading={isSubmitting} message="ENCRYPTING NEW CREDENTIALS" />

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            </motion.div>
            
            <div className="space-y-2">
              <p className="text-slate-300 text-sm">
                Your secure access credentials have been successfully updated according to NMPA security protocols.
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-all border border-cyan-500/50 shadow-[0_0_20px_rgba(8,145,178,0.2)] hover:shadow-[0_0_30px_rgba(8,145,178,0.4)] mt-6"
            >
              PROCEED TO LOGIN
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-5"
          >
            <SecurityBadge />

            <div className="space-y-4">
              <PasswordInput
                label="NEW SECURITY KEY"
                placeholder="••••••••"
                showStrength={true}
                value={passwordValue}
                error={errors.password?.message}
                {...register('password')}
              />

              {/* Password Rules Indicators */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 grid grid-cols-2 gap-2">
                {passwordRules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] sm:text-xs">
                    {rule.met ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <X className="w-3 h-3 text-slate-600" />
                    )}
                    <span className={rule.met ? "text-emerald-400" : "text-slate-500"}>
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>

              <PasswordInput
                label="CONFIRM SECURITY KEY"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group border border-cyan-500/50 shadow-[0_0_20px_rgba(8,145,178,0.2)] disabled:opacity-50 disabled:pointer-events-none"
              >
                <Lock className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>ENFORCE NEW CREDENTIALS</span>
              </button>
            </div>
            
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="text-slate-400 hover:text-slate-300 transition-colors text-sm"
              >
                Cancel and return to Login
              </Link>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthCard>
  );
}
