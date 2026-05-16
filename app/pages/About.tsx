import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">About NMPA</h1>
        <div className="prose dark:prose-invert max-w-4xl font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
          <p className="text-xl mb-6 text-slate-800 dark:text-slate-200">
            The New Mangalore Port Authority is a modern, all-weather port situated at Panambur, Mangalore in Karnataka state in India. It is the deepest inner harbour on the west coast.
          </p>
          <p className="mb-6">
            Officially inaugurated in 1974, it is the ninth major port of India. The port is primarily a gateway for Karnataka, catering to the export and import of bulk commodities like crude oil, petroleum products, LPG, iron ore, coal, and containerized cargo.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mt-12 mb-4">Our Vision</h2>
          <p>
            To be a world-class smart port by leveraging state-of-the-art technology, ensuring sustainable practices, and driving economic growth through seamless maritime logistics.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
