import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-[70vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Contact Us</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-12">
            Have inquiries regarding port operations, tariff details, or logistics? Reach out to our dedicated support teams.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/50">
                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide">Headquarters</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium mt-1">
                  New Mangalore Port Authority<br />
                  Panambur, Mangalore<br />
                  Karnataka, India 575010
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/50">
                <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide">Phone</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium mt-1">+91 824 2407341</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/50">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide">Email</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium mt-1">info@nmpt.gov.in</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-6">Send a Message</h2>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully."); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">First Name</label>
                <input type="text" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Last Name</label>
                <input type="text" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white font-medium" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Message</label>
              <textarea rows={4} required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white font-medium resize-none"></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wide rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Send className="w-5 h-5" /> Submit Inquiry
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
