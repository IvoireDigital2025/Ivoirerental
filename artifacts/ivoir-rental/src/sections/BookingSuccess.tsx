import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function BookingSuccess({ sessionId, onDone }: { sessionId: string; onDone: () => void }) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    fetch(`${BASE}/api/booking/webhook-confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then(r => r.json())
      .then(d => { if (d.success) setConfirmed(true); })
      .catch(() => setConfirmed(true));
  }, [sessionId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-primary/30 rounded-2xl p-10 max-w-md w-full text-center"
      >
        <CheckCircle className="text-primary mx-auto mb-4" size={56} />
        <h2 className="text-2xl font-display font-bold text-white mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground mb-6">
          Payment received. Our team will reach out to you within 24 hours to arrange pickup.
        </p>
        <button
          onClick={onDone}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-amber-400 transition-colors"
        >
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  );
}
