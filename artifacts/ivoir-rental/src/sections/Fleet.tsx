import { motion } from 'framer-motion';
import { Users, Droplets, Fuel, CarFront } from 'lucide-react';

const fleet = [
  {
    name: "Toyota Camry SE",
    subtitle: "Reliable & Efficient",
    price: "$200",
    popular: true,
    specs: [
      { icon: <Users size={16}/>, text: "5 Seats" },
      { icon: <Droplets size={16}/>, text: "4 Doors" },
      { icon: <Fuel size={16}/>, text: "32 MPG" },
      { icon: <CarFront size={16}/>, text: "Uber/Lyft" }
    ]
  },
  {
    name: "Honda CR-V SUV",
    subtitle: "Spacious Comfort",
    price: "$249",
    popular: false,
    specs: [
      { icon: <Users size={16}/>, text: "5 Seats" },
      { icon: <Droplets size={16}/>, text: "4 Doors" },
      { icon: <Fuel size={16}/>, text: "30 MPG" },
      { icon: <CarFront size={16}/>, text: "Uber/Lyft XL" }
    ]
  },
  {
    name: "Hyundai Sonata",
    subtitle: "Premium Sedan",
    price: "$220",
    popular: false,
    specs: [
      { icon: <Users size={16}/>, text: "5 Seats" },
      { icon: <Droplets size={16}/>, text: "4 Doors" },
      { icon: <Fuel size={16}/>, text: "33 MPG" },
      { icon: <CarFront size={16}/>, text: "All Platforms" }
    ]
  }
];

export default function Fleet() {
  return (
    <section id="fleet" className="py-24 bg-card border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Our <span className="text-primary">Fleet</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Clean, reliable vehicles ready for the road. Commercial insurance and maintenance included in every weekly rental.
            </p>
          </div>
          <a href="#apply" className="text-primary hover:text-accent font-bold flex items-center gap-2 group">
            Apply to Drive
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleet.map((car, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 relative group"
            >
              {car.popular && (
                <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="h-48 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center border-b border-white/5 relative">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                <CarFront size={80} className="text-white/20 group-hover:text-primary/40 transition-colors" />
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium text-green-500 uppercase tracking-wider">Available</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-1">{car.name}</h3>
                  <p className="text-muted-foreground text-sm">{car.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {car.specs.map((spec, j) => (
                    <div key={j} className="flex items-center gap-2 bg-white/5 rounded-md px-3 py-2 text-xs text-gray-300">
                      <span className="text-primary">{spec.icon}</span>
                      {spec.text}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div>
                    <span className="text-3xl font-bold text-white">{car.price}</span>
                    <span className="text-muted-foreground text-sm">/wk</span>
                  </div>
                  <button className="px-6 py-2.5 bg-white/10 hover:bg-primary hover:text-primary-foreground text-white font-medium rounded-md transition-colors">
                    Book This Car
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
