import { useState, useEffect } from 'react';
import { Car, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const ADMIN_TOKEN = 'ivoir-admin-2024';

interface CarRow { car_key: string; car_name: string; available: boolean; updated_at: string; }
interface Booking { id: number; car_name: string; car_price_cents: number; customer_name: string; customer_email: string; customer_phone: string; status: string; created_at: string; }

export default function Admin() {
  const [cars, setCars] = useState<CarRow[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const [carsRes, bookingsRes] = await Promise.all([
      fetch(`${BASE}/api/admin/cars`, { headers: { 'x-admin-token': ADMIN_TOKEN } }),
      fetch(`${BASE}/api/admin/bookings`, { headers: { 'x-admin-token': ADMIN_TOKEN } }),
    ]);
    const carsData = await carsRes.json();
    const bookingsData = await bookingsRes.json();
    setCars(carsData.cars || []);
    setBookings(bookingsData.bookings || []);
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

  return (
    <div className="min-h-screen bg-[#080810] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
              Ivoire <span style={{ color: '#D4A843' }}>Admin</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Fleet & bookings management</p>
          </div>
          <button onClick={load} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Fleet Availability */}
        <section className="mb-10">
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

        {/* Bookings */}
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
      </div>
    </div>
  );
}
