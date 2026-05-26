import { User } from '../auth/types/auth';

export const MOCK_USERS: User[] = [
  {
    id: 'USR-001',
    email: 'admin@nmpa.gov.in',
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
    email: 'port.admin@nmpa.gov.in',
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
    email: 'analytics@nmpa.gov.in',
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
  },
  {
    id: 'USR-006',
    email: 'operator@nmpa.gov.in',
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
  }
];
