import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, Download, Eye, CheckCircle, Clock, AlertCircle, Plus, X, Receipt, FileText } from 'lucide-react';
import { invoices as initialInvoices, vessels } from '../data/mockData';

export default function Billing() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [dockDays, setDockDays] = useState(1);
  const [cargoTons, setCargoTons] = useState(0);

  // Tariffs
  const DOCK_RATE_PER_DAY = 50000;
  const CARGO_RATE_PER_TON = 200;
  const BASE_SERVICE_FEE = 15000;

  const calculateTotal = () => {
    return (dockDays * DOCK_RATE_PER_DAY) + (cargoTons * CARGO_RATE_PER_TON) + BASE_SERVICE_FEE;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = invoices.filter((inv) => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = invoices.filter((inv) => inv.status === 'pending').reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = invoices.filter((inv) => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0);

  const handleGenerateInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const vesselId = Number(formData.get('vesselId'));
    const vessel = vessels.find(v => v.id === vesselId);
    
    if (!vessel) return alert("Please select a vessel.");

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15); // 15 net days

    const newInvoice = {
      id: Date.now(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
      vesselId: vessel.id,
      vesselName: vessel.name,
      issueDate: issueDate.toISOString(),
      dueDate: dueDate.toISOString(),
      total: calculateTotal(),
      status: 'pending',
      items: [
        { description: 'Dock Usage Fees', amount: dockDays * DOCK_RATE_PER_DAY },
        { description: 'Cargo Handling Tariffs', amount: cargoTons * CARGO_RATE_PER_TON },
        { description: 'Port Service Charge', amount: BASE_SERVICE_FEE }
      ]
    };

    setInvoices([newInvoice, ...invoices]);
    setIsInvoiceModalOpen(false);
    setDockDays(1);
    setCargoTons(0);
  };

  const updatePaymentStatus = (id: number, status: string) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status } : inv));
    setIsViewModalOpen(false);
  };

  const downloadPDF = (invoiceNumber: string) => {
    alert(`Downloading PDF for ${invoiceNumber}...`);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Billing & Tariff Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Manage corporate invoices, port charges, and transactional data
          </p>
        </div>
        <button onClick={() => setIsInvoiceModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-sm hover:bg-blue-800 transition-colors shadow-sm text-sm font-bold uppercase tracking-wide">
          <Plus className="w-4 h-4" />
          <span>Generate Invoice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
          <DollarSign className="w-6 h-6 mb-3 text-blue-600 dark:text-blue-400" />
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{(totalRevenue / 1000).toLocaleString(undefined, {maximumFractionDigits: 0})}K</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600"></div>
          <CheckCircle className="w-6 h-6 mb-3 text-emerald-600 dark:text-emerald-400" />
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Cleared Payments</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{(paidAmount / 1000).toLocaleString(undefined, {maximumFractionDigits: 0})}K</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <Clock className="w-6 h-6 mb-3 text-amber-500 dark:text-amber-400" />
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Pending Clearance</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{(pendingAmount / 1000).toLocaleString(undefined, {maximumFractionDigits: 0})}K</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
          <AlertCircle className="w-6 h-6 mb-3 text-red-600 dark:text-red-400" />
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Overdue Accounts</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{(overdueAmount / 1000).toLocaleString(undefined, {maximumFractionDigits: 0})}K</p>
        </motion.div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Transaction Ledger</h3>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 uppercase tracking-wide">Export Ledger</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Invoice No</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vessel / Client</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Issue Date</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Due Date</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                  <td className="py-4 px-6 text-sm text-slate-900 dark:text-white font-bold tracking-wide">{invoice.invoiceNumber}</td>
                  <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300 font-medium">{invoice.vesselName}</td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{new Date(invoice.issueDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-900 dark:text-white">₹{invoice.total.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm border ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedInvoice(invoice); setIsViewModalOpen(true); }} className="p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => downloadPDF(invoice.invoiceNumber)} className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors" title="Download Invoice">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                 <tr>
                   <td colSpan={7} className="py-8 text-center text-slate-500 dark:text-slate-400 font-medium">No invoices generated yet.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Invoice Modal */}
      <AnimatePresence>
        {isInvoiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-sm shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col my-auto"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shrink-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-600" /> Generate Port Tariff Invoice
                </h3>
                <button onClick={() => setIsInvoiceModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <form id="generateInvoiceForm" onSubmit={handleGenerateInvoice} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Select Vessel / Client</label>
                    <select name="vesselId" required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                      <option value="">-- Choose Vessel --</option>
                      {vessels.map(v => (
                        <option key={v.id} value={v.id}>{v.name} ({v.imoNumber}) - {v.agency}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-sm space-y-4">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 pb-2">Tariff Calculation Parameters</h4>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Dock Usage (Days)</label>
                        <div className="flex items-center">
                          <input type="number" min="1" value={dockDays} onChange={(e) => setDockDays(Number(e.target.value))} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                          <span className="ml-3 text-xs font-medium text-slate-500 whitespace-nowrap">@ ₹50K / day</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Cargo Volume (Tons)</label>
                        <div className="flex items-center">
                          <input type="number" min="0" value={cargoTons} onChange={(e) => setCargoTons(Number(e.target.value))} required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                          <span className="ml-3 text-xs font-medium text-slate-500 whitespace-nowrap">@ ₹200 / ton</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-800 rounded-sm flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Estimated Total Invoice</p>
                      <p className="text-xs text-blue-500 dark:text-blue-300 mt-0.5">Includes Base Service Fee of ₹15,000</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">₹{calculateTotal().toLocaleString()}</p>
                  </div>
                </form>
              </div>
              <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3 shrink-0">
                <button onClick={() => setIsInvoiceModalOpen(false)} className="px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 hover:text-slate-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="generateInvoiceForm" className="px-6 py-2.5 bg-blue-700 text-white text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-blue-800 shadow-sm transition-colors">
                  Generate Final Invoice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View/Edit Invoice Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-sm shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col my-auto"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shrink-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-500" /> Invoice {selectedInvoice.invoiceNumber}
                </h3>
                <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-700 pb-6 mb-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Billed To:</h4>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{selectedInvoice.vesselName}</p>
                    <p className="text-xs font-medium text-slate-500 mt-1">NMPA Port Authority</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm border mb-3 ${getStatusColor(selectedInvoice.status)}`}>
                      {getStatusIcon(selectedInvoice.status)}
                      {selectedInvoice.status}
                    </span>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Issue Date: <span className="text-slate-800 dark:text-slate-200">{new Date(selectedInvoice.issueDate).toLocaleDateString()}</span></p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Due Date: <span className="text-slate-800 dark:text-slate-200">{new Date(selectedInvoice.dueDate).toLocaleDateString()}</span></p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Line Items</h4>
                  {selectedInvoice.items && selectedInvoice.items.length > 0 ? (
                    <div className="space-y-3">
                      {selectedInvoice.items.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="font-medium text-slate-700 dark:text-slate-300">{item.description}</span>
                          <span className="font-bold text-slate-900 dark:text-white">₹{item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Port Services Tariff</span>
                      <span className="font-bold text-slate-900 dark:text-white">₹{selectedInvoice.total.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 flex justify-between">
                    <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Total Amount</span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">₹{selectedInvoice.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-sm border border-slate-200 dark:border-slate-700">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">Update Payment Status</h4>
                  <div className="flex gap-3">
                    <button onClick={() => updatePaymentStatus(selectedInvoice.id, 'paid')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-sm transition-colors border ${selectedInvoice.status === 'paid' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-emerald-500 hover:text-emerald-600'}`}>
                      Mark as Paid
                    </button>
                    <button onClick={() => updatePaymentStatus(selectedInvoice.id, 'pending')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-sm transition-colors border ${selectedInvoice.status === 'pending' ? 'bg-amber-500 text-white border-amber-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-amber-500 hover:text-amber-500'}`}>
                      Mark as Pending
                    </button>
                    <button onClick={() => updatePaymentStatus(selectedInvoice.id, 'overdue')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-sm transition-colors border ${selectedInvoice.status === 'overdue' ? 'bg-red-600 text-white border-red-700' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-red-500 hover:text-red-600'}`}>
                      Mark as Overdue
                    </button>
                  </div>
                </div>

              </div>
              <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-between shrink-0">
                <button onClick={() => downloadPDF(selectedInvoice.invoiceNumber)} className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button onClick={() => setIsViewModalOpen(false)} className="px-6 py-2.5 bg-slate-800 text-white text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-slate-900 shadow-sm transition-colors">
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
