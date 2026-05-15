import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';

const PLATFORMS = ["Uber", "Lyft", "DoorDash", "Amazon Flex", "Instacart", "Spark Driver", "Uber Eats", "Other"];
const DURATIONS = ["1 Month", "2 Months", "3 Months", "6 Months", "Long Term"];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  preselectedCar?: string;
}

const FIELD = "w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm transition-colors";
const LABEL = "block text-sm font-medium text-gray-300 mb-1.5";

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
    startDate: '', duration: '', hasLicense: '', licenseNumber: '',
    notes: '',
  });
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function set(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function togglePlatform(p: string) {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  function reset() {
    setForm({ name: '', email: '', phone: '', address: '', startDate: '', duration: '', hasLicense: '', licenseNumber: '', notes: '' });
    setPlatforms([]);
    setError('');
    setSuccess(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (platforms.length === 0) return setError('Please select at least one platform.');
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/application`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, platforms: platforms.join(', ') }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || 'Something went wrong. Please try again.');
      setSuccess(true);
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
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden mb-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Driver Application</h2>
                <p className="text-sm text-muted-foreground mt-0.5">We'll reach out within 24 hours</p>
              </div>
              <button onClick={handleClose} className="text-muted-foreground hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Success state */}
            {success ? (
              <div className="p-10 flex flex-col items-center text-center gap-4">
                <CheckCircle size={52} className="text-primary" />
                <h3 className="text-2xl font-display font-bold text-white">Application Received!</h3>
                <p className="text-muted-foreground max-w-xs">
                  Thanks, <span className="text-white font-medium">{form.name}</span>! We'll review your application and reach out within 24 hours.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5">

                {/* Personal Info */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Personal Information</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>Full Name *</label>
                      <input required type="text" value={form.name} onChange={e => set('name', e.target.value)}
                        placeholder="John Smith" className={FIELD} />
                    </div>
                    <div>
                      <label className={LABEL}>Email *</label>
                      <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                        placeholder="john@example.com" className={FIELD} />
                    </div>
                    <div>
                      <label className={LABEL}>Phone Number *</label>
                      <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                        placeholder="(214) 555-0000" className={FIELD} />
                    </div>
                    <div>
                      <label className={LABEL}>Home Address *</label>
                      <input required type="text" value={form.address} onChange={e => set('address', e.target.value)}
                        placeholder="123 Main St, Dallas TX" className={FIELD} />
                    </div>
                  </div>
                </div>

                {/* Rental Details */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Rental Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>When do you need the vehicle? *</label>
                      <input required type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={FIELD + " [color-scheme:dark]"} />
                    </div>
                    <div>
                      <label className={LABEL}>How long do you need it? *</label>
                      <div className="relative">
                        <select required value={form.duration} onChange={e => set('duration', e.target.value)}
                          className={FIELD + " appearance-none pr-8 cursor-pointer"}>
                          <option value="">Select duration</option>
                          {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Driver's License */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Driver's License</p>
                  <div className="mb-3">
                    <label className={LABEL}>Do you have a valid driver's license? *</label>
                    <div className="flex gap-4 mt-1">
                      {["Yes", "No"].map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio" name="hasLicense" value={opt} required
                            checked={form.hasLicense === opt}
                            onChange={() => set('hasLicense', opt)}
                            className="accent-amber-500 w-4 h-4"
                          />
                          <span className="text-sm text-gray-300">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {form.hasLicense === 'Yes' && (
                    <div>
                      <label className={LABEL}>License Number</label>
                      <input type="text" value={form.licenseNumber} onChange={e => set('licenseNumber', e.target.value)}
                        placeholder="TX12345678" className={FIELD} />
                    </div>
                  )}
                </div>

                {/* Platforms */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Which platform(s) will you drive for? *</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PLATFORMS.map(p => {
                      const active = platforms.includes(p);
                      return (
                        <button
                          key={p} type="button" onClick={() => togglePlatform(p)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                            active
                              ? 'bg-primary/15 border-primary text-primary'
                              : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className={LABEL}>Additional Notes <span className="text-gray-500">(optional)</span></label>
                  <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                    rows={3} placeholder="Anything else we should know..."
                    className={FIELD + " resize-none"} />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  type="submit" disabled={loading}
                  className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-pulse">Sending your application…</span>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Application
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground">
                  No credit check · We'll respond within 24 hours · Insurance included
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
