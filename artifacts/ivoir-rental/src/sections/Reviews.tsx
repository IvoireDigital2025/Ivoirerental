import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    quote: "I was driving for Lyft within 48 hours of applying. Ivoire made it so simple — no drama, no credit check. I cleared over $900 my first week.",
    name: "Marcus T.",
    platform: "Lyft Driver",
    initial: "M"
  },
  {
    quote: "Other rental places turned me down. Ivoire approved me same day. The car is clean and the price is fair. I've been with them 6 months now.",
    name: "Destiny W.",
    platform: "Uber Driver",
    initial: "D"
  },
  {
    quote: "Best decision I made as a gig driver. No long contracts, just week-to-week. I feel in control of my income for the first time.",
    name: "James R.",
    platform: "DoorDash + Uber",
    initial: "J"
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Hear From Our <span className="text-primary">Drivers</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-primary text-xl mb-4">
            <Star className="fill-current" />
            <Star className="fill-current" />
            <Star className="fill-current" />
            <Star className="fill-current" />
            <Star className="fill-current" />
          </div>
          <p className="text-muted-foreground font-medium uppercase tracking-wider">
            4.9 Average Rating
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card p-8 rounded-2xl border border-white/5 relative hover:border-primary/30 transition-colors"
            >
              <div className="text-primary opacity-20 text-6xl absolute top-4 left-6 font-serif">"</div>
              <p className="text-gray-300 italic mb-8 relative z-10 pt-4 leading-relaxed">
                "{review.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xl">
                  {review.initial}
                </div>
                <div>
                  <div className="font-bold text-white">{review.name}</div>
                  <div className="text-sm text-primary">{review.platform}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
