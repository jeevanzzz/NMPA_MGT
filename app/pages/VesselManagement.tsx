import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Ship, Anchor, Clock, AlertCircle, Navigation, Filter, Plus, Edit2, Trash2, X, History } from 'lucide-react';
import { vessels as initialVessels } from '../data/mockData';

export default function VesselManagement() {
  const [vessels, setVessels] = useState(initialVessels);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [currentVessel, setCurrentVessel] = useState<any>(null);

  const filteredVessels = vessels.filter((vessel) => {
    const matchesSearch = vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vessel.imoNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || vessel.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'docked':
      case 'loading':
      case 'unloading':
        return <Anchor className="w-4 h-4" />;
      case 'arriving':
      case 'scheduled':
        return <Navigation className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'docked':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'loading':
      case 'unloading':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'arriving':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      case 'scheduled':
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-700';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-700';
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to permanently delete this vessel record?')) {
      setVessels(vessels.filter(v => v.id !== id));
    }
  };

  const handleSaveVessel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newVessel: any = {
      id: currentVessel ? currentVessel.id : Date.now(),
      name: formData.get('name') as string,
      imoNumber: formData.get('imoNumber') as string,
      captain: formData.get('captain') as string,
      cargoType: formData.get('cargoType') as string,
      vesselType: formData.get('vesselType') as string,
      status: formData.get('status') as string,
      eta: formData.get('eta') as string,
      ata: formData.get('ata') as string || null,
      length: Number(formData.get('length')),
      draft: Number(formData.get('draft')),
      assignedDock: formData.get('assignedDock') as string || '',
      arrivalTime: formData.get('eta') as string,
      departureTime: null
    };

    if (currentVessel) {
      setVessels(vessels.map(v => v.id === currentVessel.id ? newVessel : v));
    } else {
      setVessels([...vessels, newVessel]);
    }
    setIsFormModalOpen(false);
  };

  const openAddModal = () => {
    setCurrentVessel(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (vessel: any) => {
    setCurrentVessel(vessel);
    setIsFormModalOpen(true);
  };

  const openHistoryModal = (vessel: any) => {
    setCurrentVessel(vessel);
    setIsHistoryModalOpen(true);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Vessel Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Monitor, register, and update port vessel traffic
          </p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-sm hover:bg-blue-800 transition-colors shadow-sm text-sm font-bold uppercase tracking-wide">
          <Plus className="w-4 h-4" />
          <span>Register Vessel</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by vessel name or IMO number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 dark:text-white text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 dark:text-white text-sm font-medium uppercase tracking-wider"
          >
            <option value="all">All Statuses</option>
            <option value="docked">Docked</option>
            <option value="loading">Loading</option>
            <option value="unloading">Unloading</option>
            <option value="arriving">Arriving</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Vessel List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredVessels.map((vessel, index) => (
          <motion.div
            key={vessel.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${vessel.status === 'arriving' ? 'bg-amber-500' : vessel.status === 'docked' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
            <div className="flex flex-col lg:flex-row justify-between gap-6 pl-2">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4 border-b border-slate-100 dark:border-slate-700 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-sm">
                      <Ship className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {vessel.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{vessel.imoNumber}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] uppercase tracking-wider font-bold border ${getStatusColor(vessel.status)}`}>
                    {getStatusIcon(vessel.status)}
                    {vessel.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-4">
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">Vessel Type</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{vessel.vesselType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">Captain</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{vessel.captain}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">Assigned Dock</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{vessel.assignedDock || 'Unassigned'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">Cargo</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase">{vessel.cargoType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> ETA</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{new Date(vessel.eta).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1 flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-500" /> ATA</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{vessel.ata ? new Date(vessel.ata).toLocaleString() : 'Pending'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">Dimensions</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{vessel.length}m (L) x {vessel.draft}m (D)</p>
                  </div>
                </div>
              </div>
              
              <div className="flex lg:flex-col justify-end gap-3 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-700 pt-4 lg:pt-0 lg:pl-6">
                <button onClick={() => openHistoryModal(vessel)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 rounded-sm transition-colors">
                  <History className="w-3.5 h-3.5" />
                  History
                </button>
                <button onClick={() => openEditModal(vessel)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/40 rounded-sm transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button onClick={() => handleDelete(vessel.id)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/40 rounded-sm transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredVessels.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-sm shadow-sm border border-slate-200 dark:border-slate-700">
            <Ship className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No vessels found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-sm shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  {currentVessel ? 'Update Vessel Registration' : 'New Vessel Registration'}
                </h3>
                <button onClick={() => setIsFormModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <form id="vesselForm" onSubmit={handleSaveVessel} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Vessel Name</label>
                      <input name="name" defaultValue={currentVessel?.name} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">IMO Number</label>
                      <input name="imoNumber" defaultValue={currentVessel?.imoNumber} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Captain</label>
                      <input name="captain" defaultValue={currentVessel?.captain} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Vessel Type</label>
                      <select name="vesselType" defaultValue={currentVessel?.vesselType || 'Container Ship'} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                        <option>Container Ship</option>
                        <option>Bulk Carrier</option>
                        <option>Tanker</option>
                        <option>General Cargo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Cargo Type</label>
                      <select name="cargoType" defaultValue={currentVessel?.cargoType || 'Container'} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                        <option>Container</option>
                        <option>Bulk</option>
                        <option>Liquid Bulk</option>
                        <option>General Cargo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Length (m)</label>
                      <input type="number" name="length" defaultValue={currentVessel?.length} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Draft (m)</label>
                      <input type="number" name="draft" step="0.1" defaultValue={currentVessel?.draft} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Status</label>
                      <select name="status" defaultValue={currentVessel?.status || 'scheduled'} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                        <option value="scheduled">Scheduled</option>
                        <option value="arriving">Arriving</option>
                        <option value="docked">Docked</option>
                        <option value="loading">Loading</option>
                        <option value="unloading">Unloading</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">ETA</label>
                      <input type="datetime-local" name="eta" defaultValue={currentVessel?.eta ? new Date(currentVessel.eta).toISOString().slice(0,16) : ''} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">ATA (Actual Time of Arrival)</label>
                      <input type="datetime-local" name="ata" defaultValue={currentVessel?.ata ? new Date(currentVessel.ata).toISOString().slice(0,16) : ''} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Assigned Dock (Optional)</label>
                      <input name="assignedDock" defaultValue={currentVessel?.assignedDock} placeholder="e.g., Berth A-1" className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
                <button onClick={() => setIsFormModalOpen(false)} className="px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 hover:text-slate-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="vesselForm" className="px-6 py-2.5 bg-blue-700 text-white text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-blue-800 shadow-sm transition-colors">
                  {currentVessel ? 'Save Changes' : 'Register Vessel'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {isHistoryModalOpen && currentVessel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-sm shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                    Vessel Operation History
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">{currentVessel.imoNumber} - {currentVessel.name}</p>
                </div>
                <button onClick={() => setIsHistoryModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-blue-500">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 border-2 border-white dark:border-slate-800"></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{currentVessel.eta ? new Date(currentVessel.eta).toLocaleString() : 'N/A'}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Estimated Time of Arrival Logged</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">System generated ETA based on route.</p>
                  </div>
                  {currentVessel.ata && (
                    <div className="relative pl-6 border-l-2 border-emerald-500">
                      <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5 border-2 border-white dark:border-slate-800"></div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{new Date(currentVessel.ata).toLocaleString()}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Vessel Arrived at Port (ATA)</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Pilot guided docking at {currentVessel.assignedDock || 'Anchorage'}.</p>
                    </div>
                  )}
                  {['docked', 'loading', 'unloading'].includes(currentVessel.status) && (
                    <div className="relative pl-6 border-l-2 border-amber-500">
                      <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-[7px] top-1.5 border-2 border-white dark:border-slate-800"></div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Status</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 uppercase">Operations: {currentVessel.status}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Cargo operations underway for {currentVessel.cargoType}.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end">
                <button onClick={() => setIsHistoryModalOpen(false)} className="px-6 py-2.5 bg-slate-800 text-white text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-slate-900 shadow-sm transition-colors">
                  Close Log
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
