import { createHashRouter } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Unauthorized from './pages/auth/Unauthorized';
import SessionExpired from './pages/auth/SessionExpired';

// Guards
import { ProtectedRoute } from './auth/guards/ProtectedRoute';
import { PublicRoute } from './auth/guards/PublicRoute';
import { RoleGuard } from './auth/guards/RoleGuard';

import Dashboard from './pages/Dashboard';
import VesselManagement from './pages/VesselManagement';
import DockManagement from './pages/DockManagement';
import CargoTracking from './pages/CargoTracking';
import Billing from './pages/Billing';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import DashboardLayout from './components/DashboardLayout';
import AuditLogs from './pages/AuditLogs';

export const router = createHashRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '/session-expired',
    element: <SessionExpired />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'operations-control',
        element: (
          <RoleGuard allowedRoles={['Super Admin', 'Port Authority Admin']}>
            <Dashboard />
          </RoleGuard>
        ),
      },
      {
        path: 'vessel-control',
        element: (
          <RoleGuard allowedRoles={['Super Admin', 'Port Authority Admin', 'Dock Manager', 'Ship Operator']}>
            <VesselManagement />
          </RoleGuard>
        ),
      },
      {
        path: 'dock-operations',
        element: (
          <RoleGuard allowedRoles={['Super Admin', 'Port Authority Admin', 'Dock Manager']}>
            <DockManagement />
          </RoleGuard>
        ),
      },
      {
        path: 'cargo-management',
        element: (
          <RoleGuard allowedRoles={['Super Admin', 'Port Authority Admin', 'Cargo Manager']}>
            <CargoTracking />
          </RoleGuard>
        ),
      },
      {
        path: 'billing',
        element: (
          <RoleGuard allowedRoles={['Super Admin', 'Port Authority Admin']}>
            <Billing />
          </RoleGuard>
        ),
      },
      {
        path: 'analytics-center',
        element: (
          <RoleGuard allowedRoles={['Super Admin', 'Port Authority Admin', 'Analytics Officer']}>
            <Analytics />
          </RoleGuard>
        ),
      },
      {
        path: 'reports',
        element: (
          <RoleGuard allowedRoles={['Super Admin', 'Port Authority Admin', 'Analytics Officer']}>
            <Reports />
          </RoleGuard>
        ),
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'audit-logs',
        element: (
          <RoleGuard allowedRoles={['Super Admin']}>
            <AuditLogs />
          </RoleGuard>
        ),
      },
      {
        path: 'users',
        element: (
          <RoleGuard allowedRoles={['Super Admin']}>
            <UserManagement />
          </RoleGuard>
        ),
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);
