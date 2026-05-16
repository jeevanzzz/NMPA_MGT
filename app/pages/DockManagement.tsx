import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, AlertCircle, CheckCircle, Clock, Wrench, X, Activity } from 'lucide-react';
import { docks as initialDocks, vessels } from '../data/mockData';

export default function DockManagement() {
  const [docks, setDocks] = useState(initialDocks);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [selectedDock, setSelectedDock] = useState<any>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'occupied':
        return <CheckCircle className="w-5 h-5" />;
      case 'available':
        return <CheckCircle className="w-5 h-5" />;
      case 'reserved':
        return <Clock className="w-5 h-5" />;
      case 'maintenance':
        return <Wrench className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-blue-600 border-blue-700';
      case 'available':
        return 'bg-emerald-600 border-emerald-700';
      case 'reserved':
        return 'bg-amber-500 border-amber-600';
      case 'maintenance':
        return 'bg-slate-600 border-slate-700';
      default:
        return 'bg-slate-400 border-slate-500';
    }
  };

  const getVesselForDock = (vesselId: number | null) => {
    if (!vesselId) return null;
    return vessels.find((v) => v.id === vesselId) || null;
  };

  const openConfigureModal = (dock: any) => {
    setSelectedDock(dock);
    setIsConfigureModalOpen(true);
  };

  const handleSaveDockConfig = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedStatus = formData.get('status') as string;
    const assignedVesselId = formData.get('vesselId') ? Number(formData.get('vesselId')) : null;

    setDocks(docks.map(d => 
      d.id === selectedDock.id 
        ? { ...d, status: updatedStatus, vesselId: assignedVesselId } 
        : d
    ));
    setIsConfigureModalOpen(false);
  };

  // Congestion calculation
  const totalDocks = docks.length;
  const unavailableDocks = docks.filter(d => d.status === 'occupied' || d.status === 'reserved' || d.status === 'maintenance').length;
  const congestionPercentage = Math.round((unavailableDocks / totalDocks) * 100);

  return (
    <div className="space-y-6 relative">
      {/* Header and Congestion Indicator */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Berth / Dock Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Monitor berth allocation, congestion, and infrastructure scheduling
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-sm shadow-sm">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Port Congestion Level</span>
            <div className="flex items-center gap-2 mt-1">
              <Activity className={`w-5 h-5 ${congestionPercentage > 75 ? 'text-red-500' : congestionPercentage > 50 ? 'text-amber-500' : 'text-emerald-500'}`} />
              <span className={`text-xl font-bold ${congestionPercentage > 75 ? 'text-red-600 dark:text-red-400' : congestionPercentage > 50 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {congestionPercentage}%
              </span>
            </div>
          </div>
          <div className="w-32 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden ml-2">
            <div 
              className={`h-full ${congestionPercentage > 75 ? 'bg-red-500' : congestionPercentage > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${congestionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-6 flex-wrap">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mr-4">Status Legend:</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-600 rounded-sm"></div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Maintenance</span>
          </div>
        </div>
      </div>

      {/* Dock Layout Visualization */}
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-3">Interactive Berth Infrastructure Layout</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {docks.map((dock, index) => {
            const vessel = getVesselForDock(dock.vesselId);
            return (
              <motion.div
                key={dock.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openConfigureModal(dock)}
                className={`relative ${getStatusColor(dock.status)} rounded-sm p-5 text-white shadow-sm border-l-4 min-h-[200px] flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]`}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/20 p-2 rounded-sm backdrop-blur-sm">
                      <Anchor className="w-5 h-5" />
                    </div>
                    {getStatusIcon(dock.status)}
                  </div>
                  <h4 className="text-xl font-bold tracking-wide">{dock.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest opacity-80 mt-1 font-semibold">{dock.type} Terminal</p>
                  <p className="text-xs font-medium opacity-90 mt-2 bg-black/20 inline-block px-2 py-0.5 rounded-sm">Capacity: {dock.capacity}</p>
                </div>
                
                <div className="relative z-10 mt-auto pt-4">
                  {vessel ? (
                    <div className="border-t border-white/20 pt-3">
                      <p className="text-[10px] uppercase tracking-wider font-semibold opacity-80 mb-1">Assigned Vessel:</p>
                      <p className="text-sm font-bold truncate">{vessel.name}</p>
                      <p className="text-xs opacity-90 font-mono mt-0.5">IMO: {vessel.imoNumber}</p>
                    </div>
                  ) : (
                    <div className="border-t border-white/20 pt-3">
                      <p className="text-[10px] uppercase tracking-wider font-semibold opacity-80 mb-1">Status:</p>
                      <p className="text-sm font-bold">Clear for docking</p>
                    </div>
                  )}
                  <div className="mt-4 flex justify-between items-center">
                    <span className="inline-block px-2.5 py-1 bg-black/30 rounded-sm text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
                      {dock.status}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-75">Click to config</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border-l-4 border-emerald-600 border-y border-r border-slate-200 dark:border-y-slate-700 dark:border-r-slate-700">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Available Berths</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{docks.filter((d) => d.status === 'available').length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border-l-4 border-blue-600 border-y border-r border-slate-200 dark:border-y-slate-700 dark:border-r-slate-700">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Occupied Berths</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{docks.filter((d) => d.status === 'occupied').length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border-l-4 border-amber-500 border-y border-r border-slate-200 dark:border-y-slate-700 dark:border-r-slate-700">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Reserved Berths</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{docks.filter((d) => d.status === 'reserved').length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border-l-4 border-slate-600 border-y border-r border-slate-200 dark:border-y-slate-700 dark:border-r-slate-700">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Under Maintenance</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{docks.filter((d) => d.status === 'maintenance').length}</p>
        </div>
      </div>

      {/* Dock Details Table */}
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Infrastructure List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Berth Name
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Assigned Vessel
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {docks.map((dock) => {
                const vessel = getVesselForDock(dock.vesselId);
                return (
                  <tr
                    key={dock.id}
                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm text-slate-900 dark:text-white font-bold tracking-wide">
                      {dock.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {dock.type}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                      {dock.capacity}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm border ${
                          dock.status === 'available'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
                            : dock.status === 'occupied'
                            ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
                            : dock.status === 'reserved'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                            : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                        }`}
                      >
                        {dock.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {vessel ? vessel.name : <span className="text-slate-400 italic">Unassigned</span>}
                    </td>
                    <td className="py-4 px-6">
                      <button onClick={() => openConfigureModal(dock)} className="px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-slate-900 transition-colors shadow-sm">
                        Configure
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dock Configuration Modal */}
      <AnimatePresence>
        {isConfigureModalOpen && selectedDock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-sm shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                    Berth Configuration
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">{selectedDock.name} - {selectedDock.type} Terminal</p>
                </div>
                <button onClick={() => setIsConfigureModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <form id="dockConfigForm" onSubmit={handleSaveDockConfig} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Operational Status</label>
                    <select name="status" defaultValue={selectedDock.status} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                      <option value="available">Available (Clear)</option>
                      <option value="occupied">Occupied (Docked)</option>
                      <option value="reserved">Reserved (Incoming)</option>
                      <option value="maintenance">Maintenance (Offline)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Assign Vessel</label>
                    <select name="vesselId" defaultValue={selectedDock.vesselId || ''} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                      <option value="">-- No Vessel Assigned --</option>
                      {vessels.map(v => (
                        <option key={v.id} value={v.id}>{v.name} ({v.imoNumber})</option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-500 mt-2">Assigning a vessel updates the automated smart routing algorithm.</p>
                  </div>
                </form>
              </div>
              <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
                <button onClick={() => setIsConfigureModalOpen(false)} className="px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 hover:text-slate-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="dockConfigForm" className="px-6 py-2.5 bg-blue-700 text-white text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-blue-800 shadow-sm transition-colors">
                  Save Configuration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
