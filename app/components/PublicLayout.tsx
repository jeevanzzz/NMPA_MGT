import { Outlet, Link, useLocation } from 'react-router';
import { Anchor, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function PublicLayout() {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B132B] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-[#0A0F1E]/80 backdrop-blur-md border-b border-slate-200/50 dark:border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">
                NMPA
              </h1>
              <p className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mt-0.5">
                New Mangalore Port
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-bold uppercase tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Portal Login <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-[#050810] text-slate-400 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Anchor className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-white tracking-tight">NMPA</h2>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-sm">
              New Mangalore Port Authority is the leading deep-water, all-weather port on the Western Coast of India, driving global maritime trade and intelligent logistics.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Port Services</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Legal</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Tariff Guidelines</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-xs font-semibold text-center text-slate-500">
          © {new Date().getFullYear()} New Mangalore Port Authority. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
