import { motion } from 'framer-motion';
import { FileText, CheckCircle, Car, DollarSign } from 'lucide-react';

const steps = [
  {
    num: "01",
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Apply Online",
    desc: "5 minute form, no credit check required"
  },
  {
    num: "02",
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Get Approved",
    desc: "Hear back within 24 hours of submitting"
  },
  {
    num: "03",
    icon: <Car className="w-8 h-8 text-primary" />,
    title: "Pick Up Your Car",
    desc: "Come to our Dallas location, sign, drive"
  },
  {
    num: "04",
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: "Start Earning",
    desc: "Hit the road with Uber, Lyft, DoorDash & more"
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get on the road and start earning in four simple steps. We've removed the red tape so you can focus on driving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card p-8 rounded-xl border border-white/5 hover:border-primary/50 transition-colors duration-300 relative group"
            >
              <div className="absolute top-6 right-6 text-6xl font-display font-bold text-white/5 group-hover:text-primary/10 transition-colors duration-300">
                {step.num}
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
