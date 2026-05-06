import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const features = [
  "No Credit Check Required",
  "Commercial Insurance Included",
  "Weekly Flexible Terms",
  "24-Hour Approval Process",
  "Uber & Lyft Eligible Vehicles",
  "Dedicated Driver Support"
];

export default function WhyUs() {
  return (
    <section id="why" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none rounded-full translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Built for the <span className="text-primary">Hustle</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-lg">
              Traditional car rentals don't understand gig work. We do. Our entire service is designed around what drivers actually need to succeed.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-md border border-primary/30 bg-primary/10 flex items-center justify-center">
                    <Check className="text-primary w-5 h-5" />
                  </div>
                  <span className="text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-card p-10 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute -right-6 -top-6 text-9xl font-display font-bold text-white/5 group-hover:text-primary/5 transition-colors">
                500
              </div>
              <div className="relative z-10">
                <div className="text-5xl font-bold text-white mb-4">500+</div>
                <p className="text-xl text-primary font-medium">Drivers helped get on the road</p>
              </div>
            </div>
            
            <div className="bg-card p-10 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute -right-6 -top-6 text-9xl font-display font-bold text-white/5 group-hover:text-primary/5 transition-colors">
                4.9
              </div>
              <div className="relative z-10">
                <div className="text-5xl font-bold text-white mb-4">4.9<span className="text-primary text-3xl">★</span></div>
                <p className="text-xl text-primary font-medium">Average driver rating</p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
