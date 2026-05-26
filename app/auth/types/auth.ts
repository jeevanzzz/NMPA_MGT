export type Role = 
  | 'Super Admin'
  | 'Port Authority Admin'
  | 'Dock Manager'
  | 'Cargo Manager'
  | 'Ship Operator'
  | 'Analytics Officer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  department: string;
  lastLogin: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface LoginResponse {
  user: User;
  token: string;
}
