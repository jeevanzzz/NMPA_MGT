import { LoginCredentials } from '../validation/authSchema';
import { LoginResponse, User } from '../types/auth';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

import { MOCK_USERS } from '../../data/mockUsers';

// Simulated account lock tracking
const failedAttempts = new Map<string, { count: number; lockedUntil: number | null }>();
const MAX_ATTEMPTS = 3;
const LOCK_DURATION = 5 * 60 * 1000; // 5 minutes

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulate network delay for realistic enterprise loading sequence
    await delay(2800);

    const email = credentials.email.toLowerCase();
    const userRecord = failedAttempts.get(email) || { count: 0, lockedUntil: null };

    // Check if account is currently locked
    if (userRecord.lockedUntil && userRecord.lockedUntil > Date.now()) {
      const remainingMins = Math.ceil((userRecord.lockedUntil - Date.now()) / 60000);
      throw new Error(`Unauthorized access attempts detected. Security monitoring activated. Cooldown: ${remainingMins} minute(s).`);
    } else if (userRecord.lockedUntil && userRecord.lockedUntil <= Date.now()) {
      // Lock expired, reset
      userRecord.count = 0;
      userRecord.lockedUntil = null;
    }

    const user = MOCK_USERS.find(u => u.email === credentials.email);

    if (!user || credentials.password !== 'Secure@123') {
      userRecord.count += 1;
      
      if (userRecord.count >= MAX_ATTEMPTS) {
        userRecord.lockedUntil = Date.now() + LOCK_DURATION;
        failedAttempts.set(email, userRecord);
        throw new Error(`Unauthorized access attempts detected. Security monitoring activated. Cooldown: 5 minute(s).`);
      }
      
      failedAttempts.set(email, userRecord);
      throw new Error(`Authorization failed. Credential verification rejected. Remaining attempts: ${MAX_ATTEMPTS - userRecord.count}.`);
    }

    // Success - clear attempts
    failedAttempts.delete(email);

    // Generate mock JWT
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8) // 8 hours
    }));
    const signature = btoa('mock-signature-secure-nmpa');
    
    const token = `${header}.${payload}.${signature}`;

    return { user, token };
  },

  async validateToken(token: string): Promise<User> {
    await delay(500);
    
    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));

      if (payload.exp < Math.floor(Date.now() / 1000)) {
        throw new Error('Session expired');
      }

      const user = MOCK_USERS.find(u => u.id === payload.sub);
      if (!user) throw new Error('User not found');

      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  async resetPassword(email: string): Promise<void> {
    await delay(1500);
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      // Don't reveal if user exists or not for security reasons
      return;
    }
    // Simulate sending email
  }
};
