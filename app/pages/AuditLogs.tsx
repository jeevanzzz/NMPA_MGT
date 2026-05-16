import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Search, Filter, Clock, Activity, User, FileText, Download } from 'lucide-react';

const mockLogs = [
  { id: 'AL-1001', user: 'Admin User', role: 'Super Admin', action: 'System Configuration Updated', module: 'Settings', time: '10 mins ago', severity: 'low', timestamp: '2026-05-16T10:05:00Z' },
  { id: 'AL-1002', user: 'Rajesh K.', role: 'Dock Manager', action: 'Reallocated Berth A-2 to SS Voyager', module: 'Dock Allocation', time: '45 mins ago', severity: 'medium', timestamp: '2026-05-16T09:30:00Z' },
  { id: 'AL-1003', user: 'System', role: 'System', action: 'Failed login attempt detected (IP: 192.168.1.104)', module: 'Authentication', time: '2 hours ago', severity: 'high', timestamp: '2026-05-16T08:15:00Z' },
  { id: 'AL-1004', user: 'Meera S.', role: 'Cargo Manager', action: 'Approved manifest #MN-9042', module: 'Cargo Tracking', time: '3 hours ago', severity: 'low', timestamp: '2026-05-16T07:10:00Z' },
  { id: 'AL-1005', user: 'System', role: 'System', action: 'Generated Monthly Revenue Report', module: 'Reports', time: '5 hours ago', severity: 'low', timestamp: '2026-05-16T05:20:00Z' },
  { id: 'AL-1006', user: 'Vikram M.', role: 'Port Authority Admin', action: 'Modified tariff structure for bulk cargo', module: 'Billing', time: '1 day ago', severity: 'high', timestamp: '2026-05-15T14:00:00Z' },
  { id: 'AL-1007', user: 'Anita L.', role: 'Analytics Officer', action: 'Exported Predictive Delay Model Data', module: 'Analytics', time: '1 day ago', severity: 'low', timestamp: '2026-05-15T11:45:00Z' },
];

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('All Modules');
  const [filterSeverity, setFilterSeverity] = useState('All Severities');

  const filteredLogs = mockLogs.filter(log => {
    const searchMatch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const moduleMatch = filterModule === 'All Modules' || log.module === filterModule;
    
    let severityMatch = true;
    if (filterSeverity === 'High (Security)') severityMatch = log.severity === 'high';
    else if (filterSeverity === 'Medium (Operational)') severityMatch = log.severity === 'medium';
    else if (filterSeverity === 'Low (Informational)') severityMatch = log.severity === 'low';

    return searchMatch && moduleMatch && severityMatch;
  });

  const handleExport = () => {
    alert('Compiling audit logs... The CSV file will download shortly.');
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">System Audit Logs</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Immutable record of user actions, system events, and security flags
          </p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-sm shadow-sm hover:bg-slate-900 transition-colors font-bold text-sm uppercase tracking-wide">
          <Download className="w-4 h-4" />
          Export Log File
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, User, or Action..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 dark:text-white text-sm font-medium"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 dark:text-white text-sm font-medium"
            >
              <option value="All Modules">All Modules</option>
              <option value="Authentication">Authentication</option>
              <option value="Dock Allocation">Dock Allocation</option>
              <option value="Cargo Tracking">Cargo Tracking</option>
              <option value="Billing">Billing</option>
              <option value="Reports">Reports</option>
              <option value="Analytics">Analytics</option>
              <option value="Settings">Settings</option>
            </select>
          </div>
          <div className="relative">
            <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 dark:text-white text-sm font-medium"
            >
              <option value="All Severities">All Severities</option>
              <option value="High (Security)">High (Security)</option>
              <option value="Medium (Operational)">Medium (Operational)</option>
              <option value="Low (Informational)">Low (Informational)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Log ID</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Timestamp</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User / Role</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Module</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={log.id}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                >
                  <td className="py-4 px-6 text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    {log.id}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold">{log.time}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">{new Date(log.timestamp).toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-sm shrink-0">
                        <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{log.user}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 mt-0.5">{log.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {log.action}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                      <Activity className="w-3 h-3" />
                      {log.module}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm border ${
                        log.severity === 'high'
                          ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                          : log.severity === 'medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
                      }`}
                    >
                      {log.severity}
                    </span>
                  </td>
                </motion.tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                    No logs found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
