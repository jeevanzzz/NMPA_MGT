import { motion } from 'motion/react';
import { Anchor, Ship, Package, Briefcase, Zap, Shield } from 'lucide-react';

export default function Services() {
  const services = [
    { icon: Ship, title: 'Vessel Handling', desc: 'Expert handling of diverse vessels including VLCCs, container ships, and bulk carriers with precision scheduling.' },
    { icon: Package, title: 'Cargo Operations', desc: 'State-of-the-art mechanized cargo handling for dry bulk, liquid bulk, and containerized goods.' },
    { icon: Anchor, title: 'Dock & Berthing', desc: '15 deep-water berths available for multi-purpose usage, equipped with advanced mooring systems.' },
    { icon: Briefcase, title: 'Warehousing & Storage', desc: 'Extensive covered transit sheds and open storage yards for secure cargo keeping.' },
    { icon: Shield, title: 'Port Security', desc: 'ISPS compliant facility with comprehensive CCTV surveillance and access control systems.' },
    { icon: Zap, title: 'Digital Port Services', desc: 'Smart AI-driven predictive analytics and fully integrated billing portals for our stakeholders.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Port Services</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">Comprehensive maritime solutions designed for efficiency and scale.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-800/50">
              <service.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
