import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What platforms can I use the car for?",
    a: "Our vehicles are eligible for all major gig platforms including Uber, Lyft, DoorDash, Amazon Flex, Instacart, and Uber Eats."
  },
  {
    q: "Is there really no credit check?",
    a: "Correct. We do not run your credit. We base our approvals on your driving record and active rideshare/delivery accounts."
  },
  {
    q: "What's included in my weekly rental?",
    a: "Your weekly payment includes the vehicle, commercial fleet insurance, standard maintenance, and roadside assistance. You just pay for gas/charging."
  },
  {
    q: "How long does approval take?",
    a: "Most drivers hear back within 24 hours of submitting their application, and many are driving the very next day."
  },
  {
    q: "Can I cancel my rental early?",
    a: "Yes. Our rentals are strictly week-to-week. Simply return the vehicle at the end of your current paid week with no penalties or cancellation fees."
  },
  {
    q: "What if I get into an accident?",
    a: "Contact our dedicated support line immediately. You are covered by our commercial fleet insurance while using the vehicle for approved gig work."
  },
  {
    q: "Do I need to bring my own insurance?",
    a: "No. Commercial fleet insurance is included with every rental. You do not need to provide personal auto insurance."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-card border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Common <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Everything you need to know about renting with Ivoire.
            </p>
            
            <div className="hidden lg:flex flex-col gap-2">
              {["Rental & Pricing", "Eligibility", "Insurance", "Payments", "Fleet"].map((cat, i) => (
                <button 
                  key={i}
                  className={`text-left px-4 py-3 rounded-md transition-colors ${
                    i === 0 ? 'bg-primary/10 text-primary font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`border ${openIndex === i ? 'border-primary/50 bg-background/50' : 'border-white/5 bg-background'} rounded-xl overflow-hidden transition-colors duration-300`}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span className="font-bold text-white pr-8">{faq.q}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-white/5 pt-4 mt-2">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
