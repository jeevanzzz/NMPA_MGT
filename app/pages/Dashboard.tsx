import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ship, Anchor, Package, DollarSign, AlertTriangle, Clock } from 'lucide-react';
import { socket } from '../services/socket';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  monthlyRevenue,
  vesselTraffic,
  cargoAnalytics,
  dockUsageTrends,
  vessels as initialVessels,
} from '../data/mockData';

const COLORS = ['#1d4ed8', '#4f46e5', '#0f766e', '#b45309'];

export default function Dashboard() {
  const [liveStats, setLiveStats] = useState({
    activeVessels: 12,
    dockOccupancy: 85,
    cargoVolume: 12450,
    revenueGenerated: 1250000,
    delayedShips: 3,
    pendingRequests: 5,
  });

  const [recentActivity, setRecentActivity] = useState(initialVessels.slice(0, 5));
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');

  useEffect(() => {
    socket.on('dashboard_metrics', (data) => {
      setLiveStats(prev => ({
        ...prev,
        activeVessels: data.activeVessels,
        cargoVolume: data.throughput,
        dockOccupancy: data.efficiency,
        revenueGenerated: data.revenue
      }));
      setLastUpdated(new Date().toLocaleTimeString());
    });

    socket.on('vessel_activity', (data) => {
      setRecentActivity(prev => {
        const newActivity = [{
          id: data.id.toString(),
          name: data.vesselName,
          imoNumber: `IMO${Math.floor(1000000 + Math.random() * 9000000)}`,
          assignedDock: `Berth ${Math.floor(1 + Math.random() * 10)}`,
          cargoType: 'Mixed',
          status: data.status.toLowerCase().replace(' ', '')
        }, ...prev];
        return newActivity.slice(0, 5); // keep only 5
      });
      setLastUpdated(new Date().toLocaleTimeString());
    });

    return () => {
      socket.off('dashboard_metrics');
      socket.off('vessel_activity');
    };
  }, []);

  const stats = [
    {
      icon: Ship,
      label: 'Total Active Vessels',
      value: liveStats.activeVessels,
      bgColor: 'bg-blue-600/10 dark:bg-blue-500/20',
      iconColor: 'text-blue-700 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-900',
    },
    {
      icon: Anchor,
      label: 'Dock Efficiency',
      value: `${liveStats.dockOccupancy}%`,
      bgColor: 'bg-indigo-600/10 dark:bg-indigo-500/20',
      iconColor: 'text-indigo-700 dark:text-indigo-400',
      borderColor: 'border-indigo-200 dark:border-indigo-900',
    },
    {
      icon: Package,
      label: 'Cargo Volume (MT)',
      value: liveStats.cargoVolume?.toLocaleString() ?? '0',
      bgColor: 'bg-teal-600/10 dark:bg-teal-500/20',
      iconColor: 'text-teal-700 dark:text-teal-400',
      borderColor: 'border-teal-200 dark:border-teal-900',
    },
    {
      icon: DollarSign,
      label: 'Revenue Generated',
      value: `₹${((liveStats.revenueGenerated || 0) / 1000).toFixed(0)}K`,
      bgColor: 'bg-emerald-600/10 dark:bg-emerald-500/20',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-900',
    },
    {
      icon: AlertTriangle,
      label: 'Delayed Ships',
      value: liveStats.delayedShips,
      bgColor: 'bg-red-600/10 dark:bg-red-500/20',
      iconColor: 'text-red-700 dark:text-red-400',
      borderColor: 'border-red-200 dark:border-red-900',
    },
    {
      icon: Clock,
      label: 'Pending Dock Requests',
      value: liveStats.pendingRequests,
      bgColor: 'bg-amber-600/10 dark:bg-amber-500/20',
      iconColor: 'text-amber-700 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-900',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Live Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">System Overview</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Real-time port metrics and performance indicators</p>
        </div>
        <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-sm shadow-sm transition-all duration-300">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Live System Sync</span>
          <span className="text-[10px] text-slate-400 font-mono ml-2">Updated: {lastUpdated}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-sm shadow-sm p-5 hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${stat.bgColor.split(' ')[0].replace('/10', '')} transition-all duration-300 group-hover:w-2`}></div>
              <div className="flex items-center justify-between mb-4 pl-2">
                <div className={`p-2.5 rounded-sm ${stat.bgColor} border ${stat.borderColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 pl-2">{stat.label}</p>
              <motion.p 
                key={stat.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-2xl font-black text-slate-900 dark:text-white pl-2"
              >
                {stat.value}
              </motion.p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-sm shadow-sm p-6"
        >
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-100 dark:border-slate-700/50 pb-3">
            Monthly Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: '#fff',
                }}
              />
              <Legend iconType="circle" />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#1d4ed8"
                strokeWidth={3}
                dot={{ fill: '#1d4ed8', r: 4, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Vessel Traffic */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-sm shadow-sm p-6"
        >
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-100 dark:border-slate-700/50 pb-3">
            Weekly Vessel Traffic
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vesselTraffic} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: '#fff',
                }}
              />
              <Legend iconType="circle" />
              <Bar dataKey="arrivals" fill="#0f766e" radius={[2, 2, 0, 0]} />
              <Bar dataKey="departures" fill="#b45309" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cargo Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-sm shadow-sm p-6"
        >
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-100 dark:border-slate-700/50 pb-3">
            Cargo Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cargoAnalytics}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, volume }) => `${type}: ${volume}%`}
                outerRadius={100}
                innerRadius={60}
                paddingAngle={2}
                fill="#8884d8"
                dataKey="volume"
              >
                {cargoAnalytics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Dock Usage Trends */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-sm shadow-sm p-6"
        >
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-100 dark:border-slate-700/50 pb-3">
            Dock Usage Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dockUsageTrends} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis dataKey="week" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: '#fff',
                }}
                cursor={{fill: 'rgba(148, 163, 184, 0.1)'}}
              />
              <Bar dataKey="occupancy" fill="#4f46e5" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Vessel Activity */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-sm shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex justify-between items-center bg-white/50 dark:bg-slate-800/50">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live Vessel Activity
          </h3>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 uppercase tracking-wide">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-700/50">
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Vessel Name
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  IMO Number
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Dock
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Cargo Type
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {recentActivity.map((vessel) => (
                  <motion.tr
                    key={vessel.id}
                    initial={{ opacity: 0, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                    animate={{ opacity: 1, backgroundColor: 'transparent' }}
                    exit={{ opacity: 0 }}
                    className="border-b border-slate-100/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm text-slate-900 dark:text-white font-bold tracking-wide">
                      {vessel.name}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {vessel.imoNumber}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {vessel.assignedDock}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
                      {vessel.cargoType}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm ${
                          vessel.status === 'docked'
                            ? 'bg-green-100/80 text-green-700 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800/50'
                            : vessel.status === 'loading' || vessel.status === 'unloading'
                            ? 'bg-blue-100/80 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50'
                            : vessel.status === 'arriving' || vessel.status === 'intransit'
                            ? 'bg-amber-100/80 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'
                            : 'bg-slate-100/80 text-slate-700 dark:bg-slate-800/40 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50'
                        }`}
                      >
                        {vessel.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
