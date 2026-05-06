import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Note: No backend integration per requirements
  };

  return (
    <section id="apply" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-card rounded-3xl border border-primary/20 overflow-hidden shadow-2xl max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Col - Info */}
            <div className="p-10 md:p-16 bg-gradient-to-br from-primary/10 to-transparent border-r border-white/5">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Ready to <span className="text-primary">Drive?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                Fill out the quick application below. Our team will review your info and get back to you within 24 hours with your approval status and next steps.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-primary w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-lg">No Credit Checks</h4>
                    <p className="text-muted-foreground text-sm">We care about your driving record, not your credit score.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-primary w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-lg">Fast Approval</h4>
                    <p className="text-muted-foreground text-sm">Hear back within 24 hours. Many drivers start the next day.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-primary w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-lg">Flexible Terms</h4>
                    <p className="text-muted-foreground text-sm">Week-to-week rentals. No long-term traps.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Right Col - Form */}
            <div className="p-10 md:p-16 relative">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">First Name</label>
                        <input required type="text" className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Last Name</label>
                        <input required type="text" className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Phone Number</label>
                        <input required type="tel" className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <input required type="email" className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Primary Platform</label>
                        <select required className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                          <option value="">Select Platform...</option>
                          <option value="uber">Uber</option>
                          <option value="lyft">Lyft</option>
                          <option value="doordash">DoorDash</option>
                          <option value="amazon">Amazon Flex</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Vehicle Preference</label>
                        <select required className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                          <option value="">Select Vehicle...</option>
                          <option value="sedan">Standard Sedan (Camry, etc)</option>
                          <option value="suv">Mid-size SUV (CR-V, etc)</option>
                          <option value="any">Any Available</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Do you have an active rideshare account?</label>
                      <select required className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                        <option value="">Select...</option>
                        <option value="yes">Yes, I am currently active</option>
                        <option value="pending">No, but I am applying</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Additional Notes (Optional)</label>
                      <textarea rows={3} className="w-full bg-background border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-md hover:bg-accent transition-colors mt-4 text-lg shadow-[0_0_20px_rgba(212,168,67,0.3)] hover:shadow-[0_0_30px_rgba(212,168,67,0.5)]"
                    >
                      Submit Application →
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                  >
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                      <CheckCircle2 className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white">Application Received!</h3>
                    <p className="text-gray-300 text-lg max-w-md">
                      Thanks for applying. Our team will review your details and contact you within 24 hours. Keep an eye on your email and phone.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-8 px-8 py-3 border border-white/20 rounded-md text-white hover:bg-white/5 transition-colors"
                    >
                      Submit Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
