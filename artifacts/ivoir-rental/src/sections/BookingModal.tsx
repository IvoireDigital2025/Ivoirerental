import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, CheckCircle, AlertCircle } from 'lucide-react';

interface Car {
  key: string;
  name: string;
  available: boolean;
  priceCents: number;
}

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  preselectedCar?: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function BookingModal({ open, onClose, preselectedCar }: BookingModalProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      fetch(`${BASE}/api/booking/cars`)
        .then(r => r.json())
        .then(d => setCars(d.cars || []))
        .catch(() => {});
    }
  }, [open]);

  useEffect(() => {
    if (preselectedCar) setSelectedCar(preselectedCar);
  }, [preselectedCar]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!selectedCar) return setError('Please select a vehicle.');

    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/booking/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carKey: selectedCar,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || 'Something went wrong.');
      window.location.href = data.url;
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Book Your Vehicle</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Secure payment via Stripe</p>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Car Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Vehicle</label>
                <div className="space-y-2">
                  {cars.length === 0 && (
                    <p className="text-sm text-muted-foreground">Loading vehicles…</p>
                  )}
                  {cars.map(car => (
                    <label
                      key={car.key}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        !car.available
                          ? 'border-white/5 opacity-50 cursor-not-allowed'
                          : selectedCar === car.key
                          ? 'border-primary bg-primary/10'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="car"
                          value={car.key}
                          disabled={!car.available}
                          checked={selectedCar === car.key}
                          onChange={() => setSelectedCar(car.key)}
                          className="accent-amber-500"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{car.name}</p>
                          {!car.available && (
                            <p className="text-xs text-red-400 font-medium">Sold Out</p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        ${(car.priceCents / 100).toFixed(0)}/wk
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="John Smith"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="(214) 555-0000"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !selectedCar}
                className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Redirecting to payment…</span>
                ) : (
                  <>
                    <Car size={18} />
                    Pay & Book Now
                  </>
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground">
                Secured by Stripe · No credit check · Insurance included
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
