import { motion } from 'framer-motion';
import { SiUber, SiLyft, SiDoordash, SiInstacart, SiUbereats } from 'react-icons/si';
import { Package } from 'lucide-react';

const platforms = [
  { name: "Uber", icon: <SiUber className="w-12 h-12" /> },
  { name: "Lyft", icon: <SiLyft className="w-12 h-12" /> },
  { name: "DoorDash", icon: <SiDoordash className="w-12 h-12" /> },
  { name: "Amazon Flex", icon: <Package className="w-12 h-12" /> },
  { name: "Instacart", icon: <SiInstacart className="w-12 h-12" /> },
  { name: "Uber Eats", icon: <SiUbereats className="w-12 h-12" /> }
];

export default function Platforms() {
  return (
    <section id="platforms" className="py-20 bg-card border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-display font-bold text-white mb-12">
          Works With Every Major Platform
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
          {platforms.map((platform, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-white hover:text-primary transition-colors duration-300 flex flex-col items-center gap-3"
              title={platform.name}
            >
              {platform.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
