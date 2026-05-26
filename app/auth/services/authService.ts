import { LoginCredentials } from '../validation/authSchema';
import { LoginResponse, User } from '../types/auth';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock database of users
const MOCK_USERS: User[] = [
  {
    id: 'USR-001',
    email: 'admin@nmpa.gov.in',
    name: 'System Administrator',
    role: 'Super Admin',
    department: 'IT Security',
    lastLogin: new Date().toISOString()
  },
  {
    id: 'USR-002',
    email: 'port.admin@nmpa.gov.in',
    name: 'Port Authority Director',
    role: 'Port Authority Admin',
    department: 'Management',
    lastLogin: new Date().toISOString()
  },
  {
    id: 'USR-003',
    email: 'dock.manager@nmpa.gov.in',
    name: 'Dock Manager',
    role: 'Dock Manager',
    department: 'Operations',
    lastLogin: new Date().toISOString()
  }
];

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulate network delay for realistic feel
    await delay(1200);

    const user = MOCK_USERS.find(u => u.email === credentials.email);

    // In a real app, we would verify the password hash here.
    // For this mock, we just check if the email exists. If it doesn't, or password is wrong (we'll just pretend 'Password123!' is valid)
    if (!user || credentials.password !== 'Secure@123') {
      throw new Error('Invalid email or password');
    }

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
