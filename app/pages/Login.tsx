import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Anchor, Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#0B132B] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="bg-blue-600 p-3 rounded-sm shadow-lg">
              <Anchor className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-widest text-white">NMPA</h2>
              <p className="text-xs text-blue-300 tracking-widest uppercase mt-1">New Mangalore Port Authority</p>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Smart Port<br />
            Management &<br />
            Analytics System
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Enterprise-grade infrastructure for real-time vessel scheduling, automated dock management, and predictive cargo tracking.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-6 pt-12 border-t border-slate-700/50">
          <div>
            <div className="text-3xl font-bold text-white mb-1">1.2M+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">TEU Handled</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">99.9%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Monitoring</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
        <div className="w-full max-w-md">
          
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="bg-blue-700 p-2 rounded-sm shadow-md">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-widest text-slate-900">NMPA</h2>
              <p className="text-[10px] text-slate-500 tracking-widest uppercase">New Mangalore Port</p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Secure Access</h2>
            <p className="text-slate-500 font-medium">Please authenticate to enter the command center.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                Official Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-sm px-10 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm font-medium"
                  placeholder="admin@nmpa.gov.in"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                  Reset Password
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-sm px-10 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm font-medium"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center text-sm py-2">
              <label className="flex items-center text-slate-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mr-2 border-slate-300 rounded-sm text-blue-600 focus:ring-blue-600 cursor-pointer" />
                <span className="font-medium">Stay signed in on this device</span>
              </label>
            </div>

            <button
               type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-sm px-6 py-4 font-bold shadow-md transition-all flex justify-center items-center gap-2 uppercase tracking-wide text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Authorize Access
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 justify-center text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Gov.in Secure Gateway</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-6 text-center w-full right-0 text-slate-400 text-xs font-medium uppercase tracking-wide lg:hidden">
          © 2026 New Mangalore Port Authority
        </div>
      </div>
    </div>
  );
}
