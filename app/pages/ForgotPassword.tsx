import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Anchor, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for password reset email
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
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
            Secure Password<br />
            Recovery<br />
            Protocol
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Follow the automated security protocol to reset your command center access credentials securely.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-6 pt-12 border-t border-slate-700/50">
          <div>
            <div className="text-3xl font-bold text-white mb-1">AES</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">256-bit Encryption</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">2FA</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Mandatory</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">Audit</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Logged Activity</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Password Reset */}
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

          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-8 uppercase tracking-wide">
            <ArrowLeft className="w-4 h-4" />
            Return to Login
          </Link>

          {!submitted ? (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Reset Password</h2>
                <p className="text-slate-500 font-medium">Enter your official email address to receive secure reset instructions.</p>
              </div>

              <form onSubmit={handleReset} className="space-y-6">
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

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-sm px-6 py-4 font-bold shadow-md transition-all flex justify-center items-center gap-2 uppercase tracking-wide text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Request...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      Send Secure Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Transmission Sent</h2>
              <p className="text-slate-600 font-medium mb-8">
                If the email <strong>{email}</strong> exists in our secure registry, you will receive encrypted instructions to reset your password within the next 5 minutes.
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-block bg-slate-800 hover:bg-slate-900 text-white rounded-sm px-8 py-3.5 font-bold shadow-md transition-all uppercase tracking-wide text-sm"
              >
                Return to Login
              </button>
            </div>
          )}

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
