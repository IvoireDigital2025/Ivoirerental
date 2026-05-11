import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const requirements = [
  {
    title: "Valid Driver's License",
    desc: "Must be valid, non-expired US driver's license."
  },
  {
    title: "Active Rideshare Account",
    desc: "Approved Uber, Lyft, DoorDash, or other gig account required."
  },
  {
    title: "Clean Driving Record",
    desc: "No major violations (DUI, reckless driving) in the last 3 years."
  },
  {
    title: "Security Deposit",
    desc: "Refundable deposit required at time of pickup."
  },
  {
    title: "Weekly Payment Method",
    desc: "Valid debit/credit card or Zelle for weekly payments."
  },
  {
    title: "Must be 21+ Years Old",
    desc: "Minimum age requirement for commercial insurance."
  }
];

export default function Requirements() {
  return (
    <section id="requirements" className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Driver <span className="text-primary">Requirements</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-lg">
              We keep it simple. If you meet these basic criteria, you can be on the road earning within 24 hours.
            </p>
            
            <div className="space-y-8">
              {requirements.map((req, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-lg border border-primary text-primary font-display font-bold text-xl flex items-center justify-center bg-primary/5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{req.title}</h3>
                    <p className="text-muted-foreground">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-background p-10 rounded-2xl border border-primary shadow-[0_0_40px_rgba(212,168,67,0.1)] lg:sticky lg:top-32"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-8">Ready to get started?</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Call or Text</div>
                  <div className="font-medium">(214) 555-0123</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email Us</div>
                  <div className="font-medium">info@ivoirerental.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Location</div>
                  <div className="font-medium">Dallas, TX (By Appointment)</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Hours</div>
                  <div className="font-medium">Mon-Fri: 9am - 6pm</div>
                </div>
              </div>
            </div>
            
            <a 
              href="#apply"
              className="block w-full py-4 bg-primary text-primary-foreground text-center font-bold rounded-md hover:bg-accent transition-colors"
            >
              Apply Now →
            </a>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
