import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Basic",
    price: "320",
    popular: false,
    features: [
      "Standard Sedan (e.g. Camry)",
      "Commercial Insurance",
      "Standard Maintenance",
      "Uber & Lyft Eligible",
      "500 Miles/Week"
    ]
  },
  {
    name: "Standard",
    price: "380",
    popular: true,
    features: [
      "Mid-size SUV (e.g. CR-V)",
      "Commercial Insurance",
      "Priority Maintenance",
      "Uber XL Eligible",
      "Unlimited Miles"
    ]
  },
  {
    name: "Premium",
    price: "450",
    popular: false,
    features: [
      "Premium Sedan/SUV",
      "Commercial Insurance",
      "Premium Maintenance",
      "Uber Black Eligible",
      "Unlimited Miles"
    ]
  }
];

export default function Pricing({ onBook }: { onBook?: () => void }) {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No hidden fees, no long-term commitments. Just clear weekly rates so you can plan your earnings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-card rounded-2xl border ${
                plan.popular ? 'border-primary shadow-[0_0_30px_rgba(212,168,67,0.15)] relative transform md:-translate-y-4' : 'border-white/5'
              } p-8 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{plan.name}</h3>
              <div className="text-center mb-8">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-muted-foreground">/wk</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={onBook}
                className={`w-full py-3 rounded-md font-bold transition-colors ${
                  plan.popular 
                    ? 'bg-primary text-primary-foreground hover:bg-accent' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
