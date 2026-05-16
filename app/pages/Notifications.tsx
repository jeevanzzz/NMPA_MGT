import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Ship, AlertTriangle, DollarSign, Wrench, CheckCircle, Mail, Megaphone, X, Settings2 } from 'lucide-react';
import { socket } from '../services/socket';
import { notifications as initialNotifications } from '../data/mockData';

export default function Notifications() {
  const [notificationsList, setNotificationsList] = useState(initialNotifications);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Email Preferences State
  const [emailPrefs, setEmailPrefs] = useState({
    arrival: true,
    delay: true,
    dock: false,
    billing: true,
    maintenance: false,
  });

  useEffect(() => {
    socket.on('notification', (data) => {
      setNotificationsList(prev => [data, ...prev]);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'arrival': return <Ship className="w-5 h-5" />;
      case 'delay': return <AlertTriangle className="w-5 h-5" />;
      case 'billing': return <DollarSign className="w-5 h-5" />;
      case 'maintenance': return <Wrench className="w-5 h-5" />;
      case 'announcement': return <Megaphone className="w-5 h-5" />;
      case 'alert': return <AlertTriangle className="w-5 h-5" />;
      case 'info': return <Ship className="w-5 h-5" />;
      case 'success': return <CheckCircle className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotificationsList(notificationsList.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map(n => ({ ...n, read: true })));
  };

  const handleBroadcast = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const message = formData.get('message') as string;
    const priority = formData.get('priority') as string;

    const newNotification = {
      id: `ann-${Date.now()}`,
      title,
      message,
      type: 'announcement',
      priority,
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotificationsList([newNotification, ...notificationsList]);
    setIsAnnouncementModalOpen(false);
  };

  const toggleEmailPref = (key: keyof typeof emailPrefs) => {
    setEmailPrefs({ ...emailPrefs, [key]: !emailPrefs[key] });
  };

  const unreadCount = notificationsList.filter(n => !n.read && n.isRead !== false).length + notificationsList.filter(n => n.isRead === false).length;

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            Notification Center
            {unreadCount > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount} UNREAD</span>
            )}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Monitor real-time system alerts, vessel arrivals, delays, and port announcements
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-xs uppercase tracking-wide">
            <Settings2 className="w-4 h-4" />
            Preferences
          </button>
          <button onClick={() => setIsAnnouncementModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-sm hover:bg-blue-800 transition-colors shadow-sm font-bold text-xs uppercase tracking-wide">
            <Megaphone className="w-4 h-4" />
            Broadcast
          </button>
          <button onClick={markAllAsRead} disabled={unreadCount === 0} className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-colors shadow-sm font-bold text-xs uppercase tracking-wide ${unreadCount > 0 ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'}`}>
            <CheckCircle className="w-4 h-4" />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Email Preferences Panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card rounded-sm shadow-sm p-6 mb-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-3">
                <Mail className="w-4 h-4 text-blue-600" /> Email Notification Routing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { key: 'arrival', label: 'Vessel Arrival Alerts', desc: 'ATA & Check-in confirmations' },
                  { key: 'delay', label: 'Delay & Exception Alerts', desc: 'ETA changes and port congestion' },
                  { key: 'dock', label: 'Dock Allocation Alerts', desc: 'Berth reassignment notices' },
                  { key: 'billing', label: 'Billing & Tariff Alerts', desc: 'Invoice generation and overdue' },
                  { key: 'maintenance', label: 'Maintenance Alerts', desc: 'Equipment offline status' },
                ].map(pref => (
                  <label key={pref.key} className="flex items-start gap-3 p-3 border border-slate-100/50 dark:border-slate-700/50 rounded-sm cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-750/50 transition-colors">
                    <input type="checkbox" checked={emailPrefs[pref.key as keyof typeof emailPrefs]} onChange={() => toggleEmailPref(pref.key as keyof typeof emailPrefs)} className="mt-1 w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">{pref.label}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{pref.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence>
          {notificationsList.map((notification, index) => {
            const isUnread = notification.isRead === false || notification.read === false;
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className={`glass-card rounded-sm shadow-sm p-5 border-l-4 ${
                  !isUnread
                    ? 'border-l-slate-300 dark:border-l-slate-600'
                    : 'border-l-blue-600 dark:border-l-blue-500'
                } relative`}
              >
                {isUnread && (
                  <span className="absolute top-5 right-5 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                )}
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-sm text-white flex-shrink-0 shadow-sm ${getColor(notification.priority || notification.severity)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 pr-6">
                    <div className="flex items-start justify-between mb-1.5">
                      <div>
                        <h3 className={`text-sm font-bold uppercase tracking-wide ${!isUnread ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                          {notification.title}
                        </h3>
                      </div>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm border ${
                          (notification.priority || notification.severity) === 'high'
                            ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50'
                            : (notification.priority || notification.severity) === 'medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50'
                            : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50'
                        }`}
                      >
                        {notification.priority || notification.severity}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${!isUnread ? 'text-slate-500 dark:text-slate-400 font-normal' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-100/50 dark:border-slate-700/50 pt-3 mt-1">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                      {isUnread && (
                        <button onClick={() => markAsRead(notification.id)} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 uppercase tracking-wide transition-colors">
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Broadcast Announcement Modal */}
      <AnimatePresence>
        {isAnnouncementModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-sm shadow-2xl w-full max-w-md overflow-hidden flex flex-col my-auto"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shrink-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-blue-600" /> Broadcast System Announcement
                </h3>
                <button onClick={() => setIsAnnouncementModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <form id="broadcastForm" onSubmit={handleBroadcast} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Announcement Title</label>
                    <input type="text" name="title" required placeholder="e.g., Port Operations Suspended" className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold placeholder:font-normal" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Message Body</label>
                    <textarea name="message" required rows={4} placeholder="Enter the detailed announcement..." className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-medium resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Alert Priority</label>
                    <select name="priority" required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                      <option value="low">Low - General Info</option>
                      <option value="medium">Medium - Operational Change</option>
                      <option value="high">High - Critical Alert</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsAnnouncementModalOpen(false)} className="px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 hover:text-slate-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="broadcastForm" className="px-6 py-2.5 bg-blue-700 text-white text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-blue-800 shadow-sm transition-colors flex items-center gap-2">
                  <Megaphone className="w-4 h-4" /> Send Broadcast
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
