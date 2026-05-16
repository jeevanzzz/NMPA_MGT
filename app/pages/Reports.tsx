import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, Calendar, Filter, Plus, X, BarChart2 } from 'lucide-react';

const initialReports = [
  {
    id: 1,
    title: 'Daily Operations Report',
    type: 'Daily',
    date: '2026-05-16',
    size: '2.4 MB',
    format: 'PDF',
  },
  {
    id: 2,
    title: 'Monthly Revenue Report',
    type: 'Monthly',
    date: '2026-04-30',
    size: '5.1 MB',
    format: 'PDF',
  },
  {
    id: 3,
    title: 'Vessel Traffic Analysis',
    type: 'Vessel',
    date: '2026-05-12',
    size: '3.8 MB',
    format: 'CSV',
  },
  {
    id: 4,
    title: 'Cargo Operations Summary',
    type: 'Cargo',
    date: '2026-04-30',
    size: '4.2 MB',
    format: 'PDF',
  },
];

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [filterDate, setFilterDate] = useState('');

  const filteredReports = reports.filter(r => {
    const typeMatch = filterType === 'All' || r.type === filterType;
    const dateMatch = filterDate === '' || r.date === filterDate;
    return typeMatch && dateMatch;
  });

  const handleGenerateReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as string;
    const format = formData.get('format') as string;
    const dateRange = formData.get('dateRange') as string;

    const newReport = {
      id: Date.now(),
      title: `${type} Operations Report`,
      type: type,
      date: new Date().toISOString().split('T')[0],
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      format: format,
    };

    setReports([newReport, ...reports]);
    setIsGenerateModalOpen(false);
    
    // Simulate auto-download after generation
    setTimeout(() => {
      alert(`Successfully generated and downloaded ${newReport.title} as ${format}`);
    }, 500);
  };

  const downloadReport = (report: any, format: string) => {
    alert(`Downloading ${report.title} in ${format} format...`);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">System Reports & Analytics</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Generate, access, and archive operational documentation and compliance audits
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsGenerateModalOpen(true)}
          className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-sm shadow-sm hover:bg-blue-800 transition-colors font-bold text-sm uppercase tracking-wide"
        >
          <Plus className="w-4 h-4" />
          Generate Report
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 dark:text-white text-sm font-medium"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 dark:text-white text-sm font-medium"
            >
              <option value="All">All Document Types</option>
              <option value="Daily">Daily Reports</option>
              <option value="Weekly">Weekly Reports</option>
              <option value="Monthly">Monthly Reports</option>
              <option value="Vessel">Vessel Reports</option>
              <option value="Cargo">Cargo Reports</option>
            </select>
          </div>
          <button onClick={() => { setFilterDate(''); setFilterType('All'); }} className="bg-slate-800 dark:bg-slate-700 text-white px-4 py-2 rounded-sm hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors text-sm font-bold uppercase tracking-wide">
            Reset Filters
          </button>
        </div>
      </div>

      {/* Report List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 dark:bg-slate-700 p-2.5 rounded-sm border border-slate-200 dark:border-slate-600">
                  <FileText className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase">{report.title}</h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mt-0.5">{report.type} Archive</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm border border-emerald-200 dark:border-emerald-800 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                Generated
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Generated On</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {new Date(report.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">File Stats</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{report.size} • {report.format}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => downloadReport(report, 'PDF')} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-600 text-red-600 dark:border-red-500 dark:text-red-400 rounded-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-xs font-bold uppercase tracking-wide">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button onClick={() => downloadReport(report, 'CSV')} className="flex items-center justify-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400 rounded-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-xs font-bold uppercase tracking-wide">
                <Download className="w-4 h-4" />
                CSV / Excel
              </button>
            </div>
          </motion.div>
        ))}
        {filteredReports.length === 0 && (
          <div className="col-span-2 text-center py-12 bg-white dark:bg-slate-800 rounded-sm shadow-sm border border-slate-200 dark:border-slate-700">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No reports found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Generate Report Modal */}
      <AnimatePresence>
        {isGenerateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-sm shadow-2xl w-full max-w-md overflow-hidden flex flex-col my-auto"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shrink-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-blue-600" /> Report Generator
                </h3>
                <button onClick={() => setIsGenerateModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <form id="generateReportForm" onSubmit={handleGenerateReport} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Report Data Type</label>
                    <select name="type" required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                      <option value="Daily">Daily Port Operations</option>
                      <option value="Weekly">Weekly Summaries</option>
                      <option value="Monthly">Monthly Financials & Revenue</option>
                      <option value="Vessel">Vessel Traffic Analysis</option>
                      <option value="Cargo">Cargo Logistics & Trade Routes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Time Period</label>
                    <select name="dateRange" required className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="this_week">This Week</option>
                      <option value="last_month">Last Month</option>
                      <option value="ytd">Year to Date (YTD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Output Format</label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                        <input type="radio" name="format" value="PDF" defaultChecked className="w-4 h-4 text-blue-600" />
                        PDF Document
                      </label>
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                        <input type="radio" name="format" value="CSV" className="w-4 h-4 text-emerald-600" />
                        CSV / Excel Data
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsGenerateModalOpen(false)} className="px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 hover:text-slate-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="generateReportForm" className="px-6 py-2.5 bg-blue-700 text-white text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-blue-800 shadow-sm transition-colors">
                  Compile & Download
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
