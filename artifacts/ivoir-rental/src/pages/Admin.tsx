import { useState, useEffect } from 'react';
import { Car, RefreshCw, ToggleLeft, ToggleRight, FileText, Lock, Eye, EyeOff } from 'lucide-react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const ADMIN_TOKEN = 'ivoir-admin-2024';
const ADMIN_PW = 'Abiddjan225@';
const SESSION_KEY = 'ivoire_admin_auth';

interface CarRow { car_key: string; car_name: string; available: boolean; updated_at: string; }
interface Booking { id: number; car_name: string; car_price_cents: number; customer_name: string; customer_email: string; customer_phone: string; status: string; created_at: string; }
interface Application { id: number; name: string; email: string; phone: string; address: string; start_date: string; duration: string; has_license: string; license_number: string; platforms: string; notes: string; created_at: string; }

type Tab = 'fleet' | 'bookings' | 'applications';

function LoginScreen({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PW) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onAuth();
    } else {
      setError(true);
      setPw('');
    }
  }

  return (
    <div className="min-h-screen bg-[#080810] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#D4A843]/10 border border-[#D4A843]/30 mb-4">
            <Lock size={24} className="text-[#D4A843]" />
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Ivoire <span style={{ color: '#D4A843' }}>Admin</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                autoFocus
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setError(false); }}
                placeholder="Enter admin password"
                className={`w-full bg-[#080810] border rounded-lg px-4 py-2.5 pr-10 text-white placeholder-gray-600 focus:outline-none text-sm transition-colors ${
                  error ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#D4A843]'
                }`}
              />
              <button type="button" onClick={() => setShow(s => !s)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300 transition-colors">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-1.5">Incorrect password. Please try again.</p>}
          </div>
          <button type="submit"
            className="w-full py-2.5 bg-[#D4A843] text-[#080810] font-bold rounded-lg hover:bg-amber-400 transition-colors text-sm">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [tab, setTab] = useState<Tab>('applications');
  const [cars, setCars] = useState<CarRow[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const headers = { 'x-admin-token': ADMIN_TOKEN };
    const [carsRes, bookingsRes, appsRes] = await Promise.all([
      fetch(`${BASE}/api/admin/cars`, { headers }),
      fetch(`${BASE}/api/admin/bookings`, { headers }),
      fetch(`${BASE}/api/admin/applications`, { headers }),
    ]);
    const [carsData, bookingsData, appsData] = await Promise.all([
      carsRes.json(), bookingsRes.json(), appsRes.json(),
    ]);
    setCars(carsData.cars || []);
    setBookings(bookingsData.bookings || []);
    setApplications(appsData.applications || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleCar(carKey: string, available: boolean) {
    setToggling(carKey);
    await fetch(`${BASE}/api/admin/cars/${carKey}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN },
      body: JSON.stringify({ available }),
    });
    await load();
    setToggling(null);
  }

  if (!authed) return <LoginScreen onAuth={() => setAuthed(true)} />;

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: 'applications', label: 'Applications', count: applications.length },
    { key: 'fleet', label: 'Fleet' },
    { key: 'bookings', label: 'Bookings', count: bookings.length },
  ];

  return (
    <div className="min-h-screen bg-[#080810] text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
              Ivoire <span style={{ color: '#D4A843' }}>Admin</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Driver applications & fleet management</p>
          </div>
          <button onClick={load} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 w-fit">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                tab === t.key ? 'bg-[#D4A843] text-[#080810]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.label}
              {t.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  tab === t.key ? 'bg-black/20' : 'bg-white/10'
                }`}>{t.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Applications Tab */}
        {tab === 'applications' && (
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-200 flex items-center gap-2">
              <FileText size={18} className="text-[#D4A843]" />
              Driver Applications ({applications.length})
            </h2>
            {applications.length === 0 ? (
              <p className="text-gray-500 text-sm">No applications yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {applications.map(a => (
                  <div key={a.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      {/* Left: identity */}
                      <div className="min-w-[200px]">
                        <p className="text-white font-semibold text-base">{a.name}</p>
                        <p className="text-gray-400 text-sm mt-0.5">{a.email}</p>
                        <p className="text-gray-400 text-sm">{a.phone}</p>
                        <p className="text-gray-500 text-xs mt-1">{a.address}</p>
                      </div>
                      {/* Center: rental info */}
                      <div className="min-w-[160px]">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rental</p>
                        <p className="text-white text-sm">Starts: <span className="text-gray-300">{a.start_date}</span></p>
                        <p className="text-white text-sm">Duration: <span className="text-gray-300">{a.duration}</span></p>
                      </div>
                      {/* License */}
                      <div className="min-w-[140px]">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">License</p>
                        <p className={`text-sm font-semibold ${a.has_license === 'Yes' ? 'text-green-400' : 'text-red-400'}`}>
                          {a.has_license === 'Yes' ? '✓ Valid' : '✗ No license'}
                        </p>
                        {a.license_number && <p className="text-gray-400 text-xs mt-0.5">{a.license_number}</p>}
                      </div>
                      {/* Platforms */}
                      <div className="min-w-[180px]">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Platforms</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(a.platforms || '').split(',').map(p => p.trim()).filter(Boolean).map(p => (
                            <span key={p} className="px-2 py-0.5 bg-[#D4A843]/15 text-[#D4A843] text-xs rounded-full font-medium">{p}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {a.notes && (
                      <p className="mt-4 text-gray-400 text-sm border-t border-white/5 pt-3">
                        <span className="text-gray-500">Notes: </span>{a.notes}
                      </p>
                    )}
                    <p className="text-gray-600 text-xs mt-3">
                      Submitted {new Date(a.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Fleet Tab */}
        {tab === 'fleet' && (
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Fleet Availability</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cars.map(car => (
                <div key={car.car_key} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">{car.car_name}</p>
                      <p className={`text-xs font-semibold mt-1 ${car.available ? 'text-green-400' : 'text-red-400'}`}>
                        {car.available ? 'Available' : 'Sold Out'}
                      </p>
                    </div>
                    <Car size={20} className="text-gray-500 mt-0.5" />
                  </div>
                  <button
                    disabled={toggling === car.car_key}
                    onClick={() => toggleCar(car.car_key, !car.available)}
                    className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      car.available
                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                        : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    }`}
                  >
                    {car.available ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                    {toggling === car.car_key ? 'Saving…' : car.available ? 'Mark Sold Out' : 'Mark Available'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Bookings ({bookings.length})</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-sm">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 text-left">
                      <th className="px-4 py-3 font-medium">Customer</th>
                      <th className="px-4 py-3 font-medium">Vehicle</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} className="border-t border-white/5 hover:bg-white/3">
                        <td className="px-4 py-3">
                          <p className="text-white font-medium">{b.customer_name}</p>
                          <p className="text-gray-400 text-xs">{b.customer_email}</p>
                          <p className="text-gray-400 text-xs">{b.customer_phone}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-300">{b.car_name}</td>
                        <td className="px-4 py-3 text-white font-semibold">${(b.car_price_cents / 100).toFixed(0)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            b.status === 'paid' ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">
                          {new Date(b.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  );
}
