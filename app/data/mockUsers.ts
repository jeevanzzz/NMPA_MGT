import { User } from '../auth/types/auth';

export interface MockUser extends User {
  password?: string; // Stored securely backend-only
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'USR-001',
    email: 'admin@nmpa.gov.in',
    password: 'Admin@123',
    name: 'System Administrator',
    role: 'Super Admin',
    department: 'IT Security',
    lastLogin: new Date().toISOString(),
    permissions: {
      canViewBilling: true,
      canManageUsers: true,
      canAccessAnalytics: true,
      canManageDock: true,
      canManageCargo: true,
      canOperateVessels: true,
      canViewReports: true
    }
  },
  {
    id: 'USR-002',
    email: 'operations@nmpa.gov.in',
    password: 'Operations@123',
    name: 'Port Authority Director',
    role: 'Port Authority Admin',
    department: 'Management',
    lastLogin: new Date().toISOString(),
    permissions: {
      canViewBilling: true,
      canManageUsers: false,
      canAccessAnalytics: true,
      canManageDock: true,
      canManageCargo: true,
      canOperateVessels: true,
      canViewReports: true
    }
  },
  {
    id: 'USR-003',
    email: 'dock@nmpa.gov.in',
    password: 'Dock@123',
    name: 'Senior Dock Manager',
    role: 'Dock Manager',
    department: 'Operations',
    lastLogin: new Date().toISOString(),
    permissions: {
      canViewBilling: false,
      canManageUsers: false,
      canAccessAnalytics: false,
      canManageDock: true,
      canManageCargo: false,
      canOperateVessels: true,
      canViewReports: false
    }
  },
  {
    id: 'USR-004',
    email: 'cargo@nmpa.gov.in',
    password: 'Cargo@123',
    name: 'Chief Cargo Officer',
    role: 'Cargo Manager',
    department: 'Logistics',
    lastLogin: new Date().toISOString(),
    permissions: {
      canViewBilling: false,
      canManageUsers: false,
      canAccessAnalytics: false,
      canManageDock: false,
      canManageCargo: true,
      canOperateVessels: false,
      canViewReports: true
    }
  },
  {
    id: 'USR-005',
    email: 'ship@nmpa.gov.in',
    password: 'Ship@123',
    name: 'Vessel Commander',
    role: 'Ship Operator',
    department: 'Marine Operations',
    lastLogin: new Date().toISOString(),
    permissions: {
      canViewBilling: false,
      canManageUsers: false,
      canAccessAnalytics: false,
      canManageDock: false,
      canManageCargo: false,
      canOperateVessels: true,
      canViewReports: false
    }
  },
  {
    id: 'USR-006',
    email: 'analytics@nmpa.gov.in',
    password: 'Analytics@123',
    name: 'Lead Data Scientist',
    role: 'Analytics Officer',
    department: 'Intelligence',
    lastLogin: new Date().toISOString(),
    permissions: {
      canViewBilling: false,
      canManageUsers: false,
      canAccessAnalytics: true,
      canManageDock: false,
      canManageCargo: false,
      canOperateVessels: false,
      canViewReports: true
    }
  }
];
