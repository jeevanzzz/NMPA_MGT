import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Search, Download, Eye, QrCode, Plus, Edit2, Trash2, X, History, Filter } from 'lucide-react';
import { cargo as initialCargo, vessels } from '../data/mockData';

export default function CargoTracking() {
  const [cargoList, setCargoList] = useState(initialCargo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [currentCargo, setCurrentCargo] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const filteredCargo = cargoList.filter((item) => {
    const matchesSearch = item.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.vesselName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.importExport === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-port':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'loading':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
      case 'unloading':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to permanently delete this cargo manifest?')) {
      setCargoList(cargoList.filter(c => c.id !== id));
    }
  };

  const handleSaveCargo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCargo = {
      id: currentCargo ? currentCargo.id : Date.now(),
      trackingId: formData.get('trackingId') as string,
      type: formData.get('type') as string,
      vesselId: currentCargo ? currentCargo.vesselId : null,
      vesselName: formData.get('vesselName') as string,
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit') as string,
      status: formData.get('status') as string,
      importExport: formData.get('importExport') as string,
      origin: formData.get('origin') as string,
      destination: formData.get('destination') as string,
      arrivalDate: formData.get('arrivalDate') as string,
      description: formData.get('description') as string,
    };

    if (currentCargo) {
      setCargoList(cargoList.map(c => c.id === currentCargo.id ? newCargo : c));
    } else {
      setCargoList([newCargo, ...cargoList]);
    }
    setIsFormModalOpen(false);
  };

  const openAddModal = () => {
    setCurrentCargo(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (cargo: any) => {
    setCurrentCargo(cargo);
    setIsFormModalOpen(true);
  };

  const openHistoryModal = (cargo: any) => {
    setCurrentCargo(cargo);
    setIsHistoryModalOpen(true);
  };

  const simulateQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Mock scanning a specific ID
      setSearchTerm('NMPA-2026-001235');
    }, 1500);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Cargo Tracking & Logistics</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Track, inspect, and monitor containerized and bulk cargo operations
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={simulateQRScan} className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-sm hover:bg-slate-900 transition-colors shadow-sm text-sm font-bold uppercase tracking-wide">
            <QrCode className="w-4 h-4" />
            <span>{isScanning ? 'Scanning...' : 'Scan QR'}</span>
          </button>
          <button onClick={openAddModal} className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-sm hover:bg-blue-800 transition-colors shadow-sm text-sm font-bold uppercase tracking-wide">
            <Plus className="w-4 h-4" />
            <span>Register Cargo</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by manifest ID, tracking code, or vessel name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 dark:text-white text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 dark:text-white text-sm font-medium uppercase tracking-wider"
          >
            <option value="all">All Operations</option>
            <option value="import">Imports Only</option>
            <option value="export">Exports Only</option>
          </select>
        </div>
      </div>

      {/* Cargo List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCargo.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${item.importExport === 'import' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
            <div className="flex flex-col lg:flex-row justify-between gap-6 pl-2">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 dark:bg-slate-700 p-2.5 rounded-sm border border-slate-200 dark:border-slate-600">
                      <Package className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono tracking-wide">
                          {item.trackingId}
                        </h3>
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase tracking-wider">{item.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-4">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Assigned Vessel</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.vesselName}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Cargo Type</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase">{item.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Volume/Quantity</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.quantity.toLocaleString()} <span className="text-xs text-slate-500 font-normal">{item.unit}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Trade Route</p>
                    <p className={`text-sm font-bold uppercase ${item.importExport === 'import' ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {item.importExport}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Port of Origin</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{item.origin}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Destination</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                      {item.destination}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">ETA / Arrival</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {new Date(item.arrivalDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col justify-end gap-3 lg:border-l lg:border-slate-100 dark:lg:border-slate-700 lg:pl-6 pt-4 lg:pt-0">
                <button onClick={() => openHistoryModal(item)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 rounded-sm transition-colors text-xs font-bold uppercase tracking-wide">
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline">Tracking History</span>
                </button>
                <button onClick={() => openEditModal(item)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-xs font-bold uppercase tracking-wide">
                  <Edit2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Manifest</span>
                </button>
                <button onClick={() => handleDelete(item.id)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors text-xs font-bold uppercase tracking-wide">
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredCargo.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-sm shadow-sm border border-slate-200 dark:border-slate-700">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No cargo records found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-sm shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col my-auto"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shrink-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  {currentCargo ? 'Update Cargo Manifest' : 'Register New Cargo'}
                </h3>
                <button onClick={() => setIsFormModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <form id="cargoForm" onSubmit={handleSaveCargo} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Tracking ID</label>
                      <input name="trackingId" defaultValue={currentCargo?.trackingId || `NMPA-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000)}`} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Vessel Name</label>
                      <input name="vesselName" defaultValue={currentCargo?.vesselName} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Cargo Type</label>
                      <select name="type" defaultValue={currentCargo?.type || 'Container'} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                        <option>Container</option>
                        <option>Bulk</option>
                        <option>General Cargo</option>
                        <option>Liquid Bulk</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Quantity</label>
                        <input type="number" name="quantity" defaultValue={currentCargo?.quantity} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Unit</label>
                        <select name="unit" defaultValue={currentCargo?.unit || 'TEU'} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                          <option>TEU</option>
                          <option>MT</option>
                          <option>Tons</option>
                          <option>Barrels</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Route Operation</label>
                      <select name="importExport" defaultValue={currentCargo?.importExport || 'import'} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                        <option value="import">Import</option>
                        <option value="export">Export</option>
                        <option value="transit">Transit</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Current Status</label>
                      <select name="status" defaultValue={currentCargo?.status || 'in-port'} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                        <option value="in-port">In Port (Cleared)</option>
                        <option value="loading">Loading onto Vessel</option>
                        <option value="unloading">Unloading at Dock</option>
                        <option value="customs">Pending Customs</option>
                        <option value="dispatched">Dispatched from Port</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Origin</label>
                      <input name="origin" defaultValue={currentCargo?.origin} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Destination</label>
                      <input name="destination" defaultValue={currentCargo?.destination} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Arrival Date</label>
                      <input type="date" name="arrivalDate" defaultValue={currentCargo?.arrivalDate} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Cargo Description</label>
                      <textarea name="description" defaultValue={currentCargo?.description} rows={2} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold resize-none"></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3 shrink-0">
                <button onClick={() => setIsFormModalOpen(false)} className="px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 hover:text-slate-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="cargoForm" className="px-6 py-2.5 bg-blue-700 text-white text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-blue-800 shadow-sm transition-colors">
                  {currentCargo ? 'Save Manifest' : 'Register Cargo'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tracking History Modal */}
      <AnimatePresence>
        {isHistoryModalOpen && currentCargo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-sm shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                    Tracking & Status History
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">Manifest ID: {currentCargo.trackingId}</p>
                </div>
                <button onClick={() => setIsHistoryModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-6">
                  {/* Origin */}
                  <div className="relative pl-6 border-l-2 border-slate-300 dark:border-slate-600">
                    <div className="absolute w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-full -left-[7px] top-1.5 border-2 border-white dark:border-slate-800"></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Origin Departure</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Departed from {currentCargo.origin}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Cargo loaded and verified.</p>
                  </div>
                  
                  {/* Arrival */}
                  <div className="relative pl-6 border-l-2 border-blue-500">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 border-2 border-white dark:border-slate-800"></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{new Date(currentCargo.arrivalDate).toLocaleDateString()}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Arrival at NMPA Port</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Vessel {currentCargo.vesselName} reached destination port.</p>
                  </div>
                  
                  {/* Current Status */}
                  <div className="relative pl-6 border-l-2 border-emerald-500">
                    <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5 border-2 border-white dark:border-slate-800"></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider animate-pulse">Live Status</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 uppercase">{currentCargo.status}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {currentCargo.status === 'in-port' ? 'Cargo is cleared and secured in port storage.' : 
                       currentCargo.status === 'loading' ? 'Actively being loaded onto vessel.' :
                       currentCargo.status === 'unloading' ? 'Actively being unloaded from vessel.' : 
                       'Processing cargo...'}
                    </p>
                  </div>
                  
                  {/* Destination */}
                  <div className="relative pl-6 border-l-2 border-dashed border-slate-200 dark:border-slate-700">
                    <div className="absolute w-3 h-3 bg-slate-200 dark:bg-slate-700 rounded-full -left-[7px] top-1.5 border-2 border-white dark:border-slate-800"></div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</p>
                    <p className="text-sm font-bold text-slate-400 mt-1">Delivery to {currentCargo.destination}</p>
                    <p className="text-xs text-slate-500 mt-1">Awaiting final dispatch.</p>
                  </div>
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
