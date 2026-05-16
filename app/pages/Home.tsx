import { motion } from 'motion/react';
import { ArrowRight, Ship, Anchor, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 dark:bg-[#050810] py-32 lg:py-48 flex items-center min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-slate-900/80 mix-blend-multiply z-10" />
          {/* Abstract background shapes */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-8">
                The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Maritime Trade</span> Starts Here.
              </h1>
              <p className="text-lg lg:text-xl text-slate-300 font-medium mb-12 max-w-2xl leading-relaxed">
                Welcome to the New Mangalore Port Authority. Experience seamless logistics, intelligent dock allocation, and world-class cargo handling at India's premier western gateway.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] hover:-translate-y-1">
                  Explore Port Services
                </Link>
                <Link to="/login" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-xl font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-3 border border-white/10 hover:border-white/20">
                  Access Portal <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-[#0B132B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">World-Class Infrastructure</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">Equipped with state-of-the-art technology to handle diverse cargo profiles with maximum efficiency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Anchor, title: 'Deep Water Berths', desc: 'All-weather port accommodating large vessels with drafts up to 14 meters.' },
              { icon: Ship, title: 'Smart Scheduling', desc: 'AI-driven vessel management and dock allocation to minimize wait times.' },
              { icon: ShieldCheck, title: 'Secure Operations', desc: 'ISPS compliant facility with 24/7 monitoring and stringent safety protocols.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
