import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface AmenityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function AmenityCard({ icon: Icon, title, description, delay = 0 }: AmenityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="p-8 bg-white rounded-sm shadow-lg text-center"
    >
      <motion.div
        initial={{ rotate: -180, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-black text-white rounded-full"
      >
        <Icon size={32} />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
        className="text-xl mb-2"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        className="text-gray-600"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
