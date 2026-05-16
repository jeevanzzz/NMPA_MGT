import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, TrendingDown, Activity, BrainCircuit, RefreshCw } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Fallback Mock Data
const fallbackPerformanceData = [
  { month: 'Jan', efficiency: 85, congestion: 30, delays: 5 },
  { month: 'Feb', efficiency: 88, congestion: 25, delays: 4 },
  { month: 'Mar', efficiency: 82, congestion: 35, delays: 7 },
  { month: 'Apr', efficiency: 90, congestion: 20, delays: 3 },
  { month: 'May', efficiency: 92, congestion: 18, delays: 2 },
];

const fallbackPredictions = [
  { week: 'Week 1', predicted: 65, actual: 62 },
  { week: 'Week 2', predicted: 72, actual: 70 },
  { week: 'Week 3', predicted: 68, actual: 71 },
  { week: 'Week 4', predicted: 75, actual: 0 },
];

const fallbackAiInsights = [
  {
    title: 'Vessel Delay Prediction Model',
    description: 'Based on historical maritime data and current weather patterns, SS Global Navigator has a 65% probability of delay. Rerouting suggested.',
    impact: 'high',
  },
  {
    title: 'Automated Dock Allocation (AI)',
    description: 'Algorithm recommends reserving Berth A-2 for the next ultra-large container vessel to optimize turnaround time by 18%.',
    impact: 'medium',
  },
  {
    title: 'Revenue Forecasting Engine',
    description: 'Predictive models indicate a 12% increase in Q2 revenue driven by optimized bulk cargo processing and reduced idle times.',
    impact: 'positive',
  },
];

export default function Analytics() {
  const [performanceData, setPerformanceData] = useState(fallbackPerformanceData);
  const [predictions, setPredictions] = useState(fallbackPredictions);
  const [aiInsights, setAiInsights] = useState(fallbackAiInsights);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch from Python Backend
      const [insightsRes, perfRes, predRes] = await Promise.all([
        fetch('http://localhost:5000/api/insights'),
        fetch('http://localhost:5000/api/performance'),
        fetch('http://localhost:5000/api/predictions')
      ]);

      if (insightsRes.ok && perfRes.ok && predRes.ok) {
        const insights = await insightsRes.json();
        const perf = await perfRes.json();
        const pred = await predRes.json();
        
        setAiInsights(insights);
        setPerformanceData(perf);
        setPredictions(pred);
        setIsLive(true);
      } else {
        throw new Error("Backend response not ok");
      }
    } catch (error) {
      console.log('Python backend unreachable, falling back to mock predictions', error);
      setIsLive(false);
      // Reset to fallbacks if failed
      setAiInsights(fallbackAiInsights);
      setPerformanceData(fallbackPerformanceData);
      setPredictions(fallbackPredictions);
    } finally {
      setIsLoading(false);
    }
  };

  const getIconForImpact = (impact: string) => {
    switch (impact) {
      case 'high': return TrendingDown;
      case 'positive': return TrendingUp;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">AI Analytics & Prediction Modules</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Machine learning insights, regression models, and operational forecasting
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              {isLive ? 'Python AI Engine Active' : 'Offline / Mock Data'}
            </span>
          </div>
          <button onClick={fetchData} className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm" title="Refresh Models">
            <RefreshCw className={`w-4 h-4 text-slate-600 dark:text-slate-300 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {aiInsights.map((insight, index) => {
          const Icon = getIconForImpact(insight.impact);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-sm shadow-sm p-6 border relative overflow-hidden ${
                insight.impact === 'high'
                  ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50'
                  : insight.impact === 'positive'
                  ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50'
                  : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/50'
              }`}
            >
              {isLoading && (
                <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-slate-500 animate-spin" />
                </div>
              )}
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-sm shadow-sm shrink-0 ${
                    insight.impact === 'high'
                      ? 'bg-red-600'
                      : insight.impact === 'positive'
                      ? 'bg-emerald-600'
                      : 'bg-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700 relative overflow-hidden"
        >
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-slate-500 animate-spin" />
            </div>
          )}
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-100 dark:border-slate-700 pb-3">
            Operational Efficiency Trends (Pandas Output)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                }}
              />
              <Legend iconType="circle" />
              <Area
                type="monotone"
                dataKey="efficiency"
                stroke="#0f766e"
                fill="#0f766e"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="congestion"
                stroke="#b45309"
                fill="#b45309"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700 relative overflow-hidden"
        >
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-slate-500 animate-spin" />
            </div>
          )}
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-100 dark:border-slate-700 pb-3">
            Delay Analysis Histogram
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                }}
              />
              <Legend iconType="circle" />
              <Bar dataKey="delays" fill="#dc2626" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border border-slate-200 dark:border-slate-700 relative overflow-hidden"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-slate-500 animate-spin" />
          </div>
        )}
        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center gap-2">
          Scikit-Learn Vessel Traffic Forecast (Linear Regression)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictions}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
            <XAxis dataKey="week" stroke="#64748b" axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
              }}
            />
            <Legend iconType="circle" />
            <Line type="monotone" dataKey="predicted" stroke="#6366f1" strokeWidth={3} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
