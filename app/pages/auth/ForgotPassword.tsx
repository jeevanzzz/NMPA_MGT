import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, KeyRound, AlertOctagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { authService } from '../../auth/services/authService';
import { forgotPasswordSchema, ForgotPasswordData } from '../../auth/validation/authSchema';
import { AuthCard } from '../../components/auth/AuthCard';
import { SecureInput } from '../../components/auth/SecureInput';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';
import { SecurityBadge } from '../../components/auth/SecurityBadge';

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
    try {
      setError(null);
      await authService.resetPassword(data.email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to initiate recovery protocol.');
    }
  };

  return (
    <AuthCard
      title={isSubmitted ? "RECOVERY INITIATED" : "ACCESS RECOVERY"}
      subtitle={isSubmitted ? "Secure Protocol Engaged" : "Identity Verification Required"}
    >
      <LoadingOverlay isLoading={isSubmitting} message="VERIFYING IDENTITY" />

      <AnimatePresence mode="wait">
        {isSubmitted ? (
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
              className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto"
            >
              <KeyRound className="w-8 h-8 text-emerald-400" />
            </motion.div>
            
            <div className="space-y-2">
              <p className="text-slate-300 text-sm">
                If the credentials exist in our secure database, a recovery link has been transmitted via encrypted channels.
              </p>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-emerald-400 text-xs font-mono"
              >
                STATUS: TRANSMISSION SECURE
              </motion.p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Gateway</span>
            </Link>
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

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 mt-4"
                >
                  <AlertOctagon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="text-red-400 text-sm font-medium leading-relaxed">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group border border-cyan-500/50 shadow-[0_0_20px_rgba(8,145,178,0.2)] disabled:opacity-50 disabled:pointer-events-none mt-6"
            >
              <KeyRound className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>REQUEST SECURE LINK</span>
            </button>

            <div className="text-center mt-6">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors text-sm group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Abort Protocol (Return to Login)</span>
              </Link>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthCard>
  );
}
