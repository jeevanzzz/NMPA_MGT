export type Role = 
  | 'Super Admin'
  | 'Port Authority Admin'
  | 'Dock Manager'
  | 'Cargo Manager'
  | 'Ship Operator'
  | 'Analytics Officer';

export interface Permissions {
  canViewBilling: boolean;
  canManageUsers: boolean;
  canAccessAnalytics: boolean;
  canManageDock: boolean;
  canManageCargo: boolean;
  canOperateVessels: boolean;
  canViewReports: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  department: string;
  lastLogin: string;
  permissions: Permissions;
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
