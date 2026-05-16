import { motion } from 'motion/react';
import { Users, Maximize, Wifi } from 'lucide-react';

interface RoomCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  guests: number;
  size: number;
  delay?: number;
}

export function RoomCard({ title, description, image, price, guests, size, delay = 0 }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-sm bg-white shadow-lg"
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Price Tag */}
        <motion.div
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="absolute top-4 left-0 bg-black/80 text-white px-4 py-2"
        >
          <span className="text-2xl">${price}</span>
          <span className="text-sm">/night</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          className="text-2xl mb-2"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="text-gray-600 mb-4"
        >
          {description}
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.4 }}
          className="flex items-center gap-4 text-sm text-gray-500"
        >
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{guests} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={16} />
            <span>{size} sqft</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi size={16} />
            <span>Free WiFi</span>
          </div>
        </motion.div>

        {/* Book Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-3 bg-black text-white rounded-sm hover:bg-black/90 transition-colors"
        >
          Reserve Now
        </motion.button>
      </div>
    </motion.div>
  );
}
