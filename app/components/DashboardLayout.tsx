import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { socket } from '../services/socket';
import {
  LayoutDashboard,
  Ship,
  Anchor,
  Package,
  DollarSign,
  BarChart3,
  FileText,
  Bell,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  ChevronDown,
  ShieldAlert
} from 'lucide-react';

const ROLES = [
  'Super Admin',
  'Port Authority Admin',
  'Dock Manager',
  'Cargo Manager',
  'Ship Operator',
  'Analytics Officer'
];

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard Overview', path: '/dashboard', roles: ROLES },
  { icon: Ship, label: 'Vessel Management', path: '/dashboard/vessels', roles: ['Super Admin', 'Port Authority Admin', 'Dock Manager', 'Ship Operator'] },
  { icon: Anchor, label: 'Dock Allocation', path: '/dashboard/docks', roles: ['Super Admin', 'Port Authority Admin', 'Dock Manager'] },
  { icon: Package, label: 'Cargo Tracking', path: '/dashboard/cargo', roles: ['Super Admin', 'Port Authority Admin', 'Cargo Manager'] },
  { icon: DollarSign, label: 'Billing & Tariff', path: '/dashboard/billing', roles: ['Super Admin', 'Port Authority Admin'] },
  { icon: BarChart3, label: 'Analytics & Predictions', path: '/dashboard/analytics', roles: ['Super Admin', 'Port Authority Admin', 'Analytics Officer'] },
  { icon: FileText, label: 'Reporting System', path: '/dashboard/reports', roles: ['Super Admin', 'Port Authority Admin', 'Analytics Officer', 'Dock Manager', 'Cargo Manager'] },
  { icon: Bell, label: 'Alerts & Notifications', path: '/dashboard/notifications', roles: ROLES },
  { icon: Users, label: 'User Roles', path: '/dashboard/users', roles: ['Super Admin'] },
  { icon: ShieldAlert, label: 'Audit Logs', path: '/dashboard/audit-logs', roles: ['Super Admin', 'Port Authority Admin'] },
  { icon: Settings, label: 'System Settings', path: '/dashboard/settings', roles: ['Super Admin'] },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currentRole, setCurrentRole] = useState('Super Admin');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Automatically toggle dark mode class on the HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    socket.on('notification', () => {
      setUnreadNotifications(prev => prev + 1);
    });

    // Reset when visiting the notifications page
    if (location.pathname === '/dashboard/notifications') {
      setUnreadNotifications(0);
    }

    return () => {
      socket.off('notification');
    };
  }, [location.pathname]);

  const handleLogout = () => {
    navigate('/');
  };

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(currentRole));

  return (
    <div className={`min-h-screen transition-all duration-500 font-sans ${darkMode ? 'premium-bg-dark text-slate-100' : 'premium-bg-light text-slate-900'}`}>
      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 h-screen w-64 bg-[#0A0F1E] dark:bg-[#050810] text-white shadow-2xl z-50 flex flex-col border-r border-white/5"
            >
              <div className="p-5 border-b border-white/10 flex flex-col justify-center items-center">
                <div className="flex items-center gap-3 w-full">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-lg shadow-lg flex-shrink-0">
                    <Anchor className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">NMPA CORE</h2>
                    <p className="text-[9px] text-slate-400 tracking-widest uppercase mt-0.5">Command Center</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
                <div className="px-4 mb-2">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2">System Modules</p>
                  <div className="space-y-1">
                    {filteredMenuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => navigate(item.path)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-bold tracking-wide ${
                            isActive
                              ? 'bg-blue-600/20 text-blue-400 shadow-[inset_2px_0_0_0_#3b82f6]'
                              : 'text-slate-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                          <span className="text-left">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-bold border border-transparent hover:border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Secure Logout</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Header */}
          <header className="glass-header sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  {sidebarOpen ? (
                     <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  ) : (
                    <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  )}
                </button>
                <div className="hidden md:block">
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                    {menuItems.find((item) => item.path === location.pathname)?.label || 'Dashboard Overview'}
                  </h1>
                </div>
              </div>

              <div className="flex-1 max-w-xl mx-8 hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search vessels, cargo, or documentation..."
                    className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800 dark:text-slate-200 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all"
                  title="Toggle Theme"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-600" />
                  )}
                </button>

                <button onClick={() => navigate('/dashboard/notifications')} className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                  <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[9px] font-bold text-white bg-red-600 border-2 border-white dark:border-slate-800 rounded-full animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                <div className="relative">
                  <div 
                    className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700 cursor-pointer group"
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-all">
                      {currentRole.split(' ').map(n => n[0]).join('').substring(0,2)}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Mock User</p>
                      <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mt-0.5">{currentRole}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 ml-1 group-hover:text-blue-500 transition-colors" />
                  </div>

                  <AnimatePresence>
                    {roleDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-56 glass-card rounded-xl shadow-2xl z-50 overflow-hidden border border-white/20 dark:border-slate-700/50"
                      >
                        <div className="px-4 py-3 border-b border-slate-100/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Simulate Role</p>
                        </div>
                        <div className="py-2">
                          {ROLES.map(role => (
                            <button
                              key={role}
                              onClick={() => {
                                setCurrentRole(role);
                                setRoleDropdownOpen(false);
                                navigate('/dashboard');
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${currentRole === role ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50'}`}
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
