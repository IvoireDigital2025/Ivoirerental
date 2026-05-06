import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, DollarSign, Map, Key, UserCheck, FileCheck, CheckCircle2 } from 'lucide-react';

const perks = [
  { icon: <DollarSign />, title: "Weekly Income", desc: "Consistent payouts for your vehicle" },
  { icon: <Shield />, title: "Insurance Protected", desc: "Commercial coverage included" },
  { icon: <Map />, title: "GPS Tracking", desc: "Live location on every vehicle" },
  { icon: <Key />, title: "Kill Switch", desc: "Remote security control" },
  { icon: <UserCheck />, title: "Driver Vetting", desc: "We screen every renter" },
  { icon: <FileCheck />, title: "We Handle Paperwork", desc: "You just collect checks" }
];

export default function Partner() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="partner" className="py-24 bg-card border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase mb-6">
            For Vehicle Owners
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Your Car Works. <br/>
            <span className="text-primary">You Don't Have To.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Turn your idle vehicle into a consistent weekly income stream. We manage the drivers, insurance, and maintenance. You collect the revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Col */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Why Partner With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {perks.map((perk, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-md bg-background border border-white/10 flex items-center justify-center text-primary">
                    {perk.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{perk.title}</h4>
                    <p className="text-xs text-muted-foreground">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-background p-8 rounded-xl border border-white/5">
              <h4 className="font-bold text-white mb-4">Vehicle Requirements</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Model year 2015 or newer
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Clean title (no salvage/rebuilt)
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Excellent mechanical condition
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Under 120,000 miles preferred
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Col - Form */}
          <div className="bg-background p-8 md:p-10 rounded-2xl border border-white/10 shadow-xl relative min-h-[600px]">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h3 className="text-2xl font-display font-bold text-white mb-6">List Your Fleet</h3>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <input required type="text" placeholder="First Name" className="w-full bg-card border border-white/10 rounded-md px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" />
                    </div>
                    <div>
                      <input required type="text" placeholder="Last Name" className="w-full bg-card border border-white/10 rounded-md px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <input required type="tel" placeholder="Phone Number" className="w-full bg-card border border-white/10 rounded-md px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" />
                    </div>
                    <div>
                      <input required type="email" placeholder="Email Address" className="w-full bg-card border border-white/10 rounded-md px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <input required type="text" placeholder="Vehicle Year & Make" className="w-full bg-card border border-white/10 rounded-md px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" />
                    </div>
                    <div>
                      <input required type="text" placeholder="Vehicle Model" className="w-full bg-card border border-white/10 rounded-md px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <input required type="number" placeholder="Current Mileage" className="w-full bg-card border border-white/10 rounded-md px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" />
                    </div>
                    <div>
                      <select required className="w-full bg-card border border-white/10 rounded-md px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none text-sm">
                        <option value="">Number of Vehicles</option>
                        <option value="1">1 vehicle</option>
                        <option value="2-4">2-4 vehicles</option>
                        <option value="5+">5+ vehicles</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <textarea rows={3} placeholder="Vehicle condition notes or questions..." className="w-full bg-card border border-white/10 rounded-md px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-sm"></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-md hover:bg-accent transition-colors mt-2 text-base"
                  >
                    Submit Fleet Inquiry
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-10"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Inquiry Received!</h3>
                  <p className="text-gray-300 text-sm max-w-sm mb-8">
                    Thanks for your interest in partnering with Ivoir Rental. Our fleet manager will contact you shortly to discuss next steps and earning potential.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 border border-white/20 rounded-md text-white text-sm hover:bg-white/5 transition-colors"
                  >
                    Submit Another Vehicle
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}
