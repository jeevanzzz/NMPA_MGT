import { createHashRouter } from 'react-router';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
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
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'vessels',
        element: <VesselManagement />,
      },
      {
        path: 'docks',
        element: <DockManagement />,
      },
      {
        path: 'cargo',
        element: <CargoTracking />,
      },
      {
        path: 'billing',
        element: <Billing />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'audit-logs',
        element: <AuditLogs />,
      },
      {
        path: 'users',
        element: <UserManagement />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);
