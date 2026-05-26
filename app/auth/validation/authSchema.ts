import { z } from 'zod';

const passwordSchema = z
  .string({ required_error: 'Secure access key required' })
  .min(1, 'Secure access key required')
  .min(8, 'Authentication strength insufficient')
  .regex(/[A-Z]/, 'Authentication strength insufficient')
  .regex(/[a-z]/, 'Authentication strength insufficient')
  .regex(/[0-9]/, 'Authentication strength insufficient')
  .regex(/[^A-Za-z0-9]/, 'Authentication strength insufficient');

const emailSchema = z
  .string({ required_error: 'Official credentials required' })
  .min(1, 'Official credentials required')
  .email('Unauthorized government email format');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string({ required_error: 'Secure access key required' }).min(1, 'Secure access key required'),
  remember: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string({ required_error: 'Secure access key required' })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Access key validation failed",
  path: ["confirmPassword"],
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
