import { useState, useEffect, useCallback } from 'react';
import { Car, RefreshCw, ToggleLeft, ToggleRight, FileText, Lock, Eye, EyeOff, BellDot, Trash2, Download, X, ChevronDown, ChevronUp } from 'lucide-react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const ADMIN_TOKEN = 'ivoir-admin-2024';
const ADMIN_PW = 'Abidjan225@';
const SESSION_KEY = 'ivoire_admin_auth';

interface CarRow { car_key: string; car_name: string; available: boolean; updated_at: string; }
interface Booking { id: number; car_name: string; car_price_cents: number; customer_name: string; customer_email: string; customer_phone: string; status: string; created_at: string; }
interface Application { id: number; name: string; email: string; phone: string; address: string; start_date: string; duration: string; has_license: string; license_number: string; platforms: string; notes: string; created_at: string; seen: boolean; }

type Tab = 'fleet' | 'bookings' | 'applications';

function LoginScreen({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PW) { sessionStorage.setItem(SESSION_KEY, '1'); onAuth(); }
    else { setError(true); setPw(''); }
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
              <input autoFocus type={show ? 'text' : 'password'} value={pw}
                onChange={e => { setPw(e.target.value); setError(false); }}
                placeholder="Enter admin password"
                className={`w-full bg-[#080810] border rounded-lg px-4 py-2.5 pr-10 text-white placeholder-gray-600 focus:outline-none text-sm transition-colors ${error ? 'border-red-500' : 'border-white/10 focus:border-[#D4A843]'}`}
              />
              <button type="button" onClick={() => setShow(s => !s)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300 transition-colors">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-1.5">Incorrect password. Please try again.</p>}
          </div>
          <button type="submit" className="w-full py-2.5 bg-[#D4A843] text-[#080810] font-bold rounded-lg hover:bg-amber-400 transition-colors text-sm">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

function ApplicationModal({ app, onClose, onDelete }: { app: Application; onClose: () => void; onDelete: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirming) { setConfirming(true); return; }
    setDeleting(true);
    await fetch(`${BASE}/api/admin/applications/${app.id}`, {
      method: 'DELETE',
      headers: { 'x-admin-token': ADMIN_TOKEN },
    });
    onDelete();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10 sticky top-0 bg-[#0d0d1a] z-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{app.name}</h2>
              {!app.seen && <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A843] bg-[#D4A843]/10 px-2 py-0.5 rounded-full">New</span>}
            </div>
            <p className="text-gray-500 text-xs mt-0.5">Submitted {new Date(app.created_at).toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors mt-1"><X size={20} /></button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Personal */}
          <div>
            <p className="text-[#D4A843] text-xs font-bold uppercase tracking-widest mb-3">Personal Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Full Name', app.name],
                ['Email', app.email],
                ['Phone', app.phone],
                ['Address', app.address],
              ].map(([label, value]) => (
                <div key={label} className="bg-white/5 rounded-lg px-4 py-3">
                  <p className="text-gray-500 text-xs mb-0.5">{label}</p>
                  <p className="text-white text-sm font-medium">{value || '—'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rental */}
          <div>
            <p className="text-[#D4A843] text-xs font-bold uppercase tracking-widest mb-3">Rental Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Start Date', app.start_date],
                ['Duration', app.duration],
              ].map(([label, value]) => (
                <div key={label} className="bg-white/5 rounded-lg px-4 py-3">
                  <p className="text-gray-500 text-xs mb-0.5">{label}</p>
                  <p className="text-white text-sm font-medium">{value || '—'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* License */}
          <div>
            <p className="text-[#D4A843] text-xs font-bold uppercase tracking-widest mb-3">Driver's License</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg px-4 py-3">
                <p className="text-gray-500 text-xs mb-0.5">Valid License</p>
                <p className={`text-sm font-bold ${app.has_license === 'Yes' ? 'text-green-400' : 'text-red-400'}`}>
                  {app.has_license === 'Yes' ? '✓ Yes — Valid' : '✗ No'}
                </p>
              </div>
              {app.license_number && (
                <div className="bg-white/5 rounded-lg px-4 py-3">
                  <p className="text-gray-500 text-xs mb-0.5">License Number</p>
                  <p className="text-white text-sm font-medium">{app.license_number}</p>
                </div>
              )}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <p className="text-[#D4A843] text-xs font-bold uppercase tracking-widest mb-3">Platforms</p>
            <div className="flex flex-wrap gap-2">
              {(app.platforms || '').split(',').map(p => p.trim()).filter(Boolean).map(p => (
                <span key={p} className="px-3 py-1 bg-[#D4A843]/15 text-[#D4A843] text-sm rounded-full font-medium">{p}</span>
              ))}
            </div>
          </div>

          {/* Notes */}
          {app.notes && (
            <div>
              <p className="text-[#D4A843] text-xs font-bold uppercase tracking-widest mb-3">Additional Notes</p>
              <div className="bg-white/5 rounded-lg px-4 py-3">
                <p className="text-gray-300 text-sm leading-relaxed">{app.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 pb-6">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              confirming ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
            }`}
          >
            <Trash2 size={15} />
            {deleting ? 'Deleting…' : confirming ? 'Confirm Delete' : 'Delete'}
          </button>
          {confirming && !deleting && (
            <button onClick={() => setConfirming(false)} className="text-xs text-gray-500 hover:text-gray-300 underline">Cancel</button>
          )}
          <button onClick={onClose} className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg border border-white/10 hover:border-white/30">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function downloadCSV(applications: Application[]) {
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Address', 'Start Date', 'Duration', 'Valid License', 'License Number', 'Platforms', 'Notes', 'Submitted At'];
  const escape = (v: string) => `"${(v || '').replace(/"/g, '""')}"`;
  const rows = applications.map(a => [
    a.id, escape(a.name), escape(a.email), escape(a.phone), escape(a.address),
    escape(a.start_date), escape(a.duration), escape(a.has_license), escape(a.license_number || ''),
    escape(a.platforms || ''), escape(a.notes || ''),
    escape(new Date(a.created_at).toLocaleString()),
  ].join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `ivoire-applications-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [tab, setTab] = useState<Tab>('applications');
  const [cars, setCars] = useState<CarRow[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [selected, setSelected] = useState<Application | null>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const headers = { 'x-admin-token': ADMIN_TOKEN };

  const load = useCallback(async () => {
    setLoading(true);
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
  }, []);

  useEffect(() => { if (authed) load(); }, [authed]);

  useEffect(() => {
    if (tab !== 'applications' || !authed) return;
    const unseen = applications.filter(a => !a.seen);
    if (unseen.length === 0) return;
    fetch(`${BASE}/api/admin/applications/seen-all`, {
      method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' },
    }).then(() => setApplications(prev => prev.map(a => ({ ...a, seen: true }))));
  }, [tab, authed]);

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

  function handleDeleted(id: number) {
    setApplications(prev => prev.filter(a => a.id !== id));
    setSelected(null);
  }

  function toggleExpand(id: number) {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  if (!authed) return <LoginScreen onAuth={() => setAuthed(true)} />;

  const unseenCount = applications.filter(a => !a.seen).length;

  const TABS: { key: Tab; label: string; count?: number; unseen?: number }[] = [
    { key: 'applications', label: 'Applications', count: applications.length, unseen: unseenCount },
    { key: 'fleet', label: 'Fleet' },
    { key: 'bookings', label: 'Bookings', count: bookings.length },
  ];

  return (
    <div className="min-h-screen bg-[#080810] text-white p-6 md:p-8">
      {selected && (
        <ApplicationModal
          app={selected}
          onClose={() => setSelected(null)}
          onDelete={() => handleDeleted(selected.id)}
        />
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                Ivoire <span style={{ color: '#D4A843' }}>Admin</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">Driver applications & fleet management</p>
            </div>
            {unseenCount > 0 && (
              <div className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                <BellDot size={13} /> {unseenCount} new {unseenCount === 1 ? 'application' : 'applications'}
              </div>
            )}
          </div>
          <button onClick={load} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 w-fit">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 relative ${
                tab === t.key ? 'bg-[#D4A843] text-[#080810]' : 'text-gray-400 hover:text-white'
              }`}>
              {t.label}
              {t.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === t.key ? 'bg-black/20' : 'bg-white/10'}`}>{t.count}</span>
              )}
              {t.unseen !== undefined && t.unseen > 0 && tab !== t.key && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {t.unseen > 9 ? '9+' : t.unseen}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Applications Tab */}
        {tab === 'applications' && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <FileText size={18} className="text-[#D4A843]" />
                Driver Applications ({applications.length})
              </h2>
              {applications.length > 0 && (
                <button
                  onClick={() => downloadCSV(applications)}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-colors text-gray-300 hover:text-white"
                >
                  <Download size={15} />
                  Download Excel
                </button>
              )}
            </div>

            {applications.length === 0 ? (
              <p className="text-gray-500 text-sm">No applications yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {applications.map(a => {
                  const isExpanded = expanded.has(a.id);
                  return (
                    <div
                      key={a.id}
                      className={`border rounded-xl transition-all ${
                        !a.seen
                          ? 'bg-[#D4A843]/5 border-[#D4A843]/40'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      {/* Summary row — click to expand */}
                      <button
                        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                        onClick={() => toggleExpand(a.id)}
                      >
                        <div className="flex items-center gap-4 flex-wrap flex-1 min-w-0">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-white font-semibold truncate">{a.name}</p>
                              {!a.seen && (
                                <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-[#D4A843] bg-[#D4A843]/10 px-2 py-0.5 rounded-full">New</span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{a.email} · {a.phone}</p>
                          </div>
                          <div className="hidden sm:flex items-center gap-3 text-sm text-gray-400 shrink-0">
                            <span className="text-white">{a.duration}</span>
                            <span>·</span>
                            <span>{a.platforms?.split(',')[0]?.trim()}{(a.platforms?.split(',').length ?? 0) > 1 ? ` +${(a.platforms?.split(',').length ?? 1) - 1}` : ''}</span>
                            <span>·</span>
                            <span className={a.has_license === 'Yes' ? 'text-green-400' : 'text-red-400'}>
                              {a.has_license === 'Yes' ? '✓ License' : '✗ No license'}
                            </span>
                          </div>
                          <p className="hidden md:block text-gray-600 text-xs shrink-0">{new Date(a.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                        </div>
                      </button>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="px-6 pb-5 border-t border-white/5 pt-4 space-y-4">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                            {[
                              ['Address', a.address],
                              ['Start Date', a.start_date],
                              ['Duration', a.duration],
                              ['Valid License', a.has_license === 'Yes' ? '✓ Yes' : '✗ No'],
                            ].map(([label, value]) => (
                              <div key={label} className="bg-white/5 rounded-lg px-3 py-2">
                                <p className="text-gray-500 text-xs mb-0.5">{label}</p>
                                <p className={`font-medium ${label === 'Valid License' ? (a.has_license === 'Yes' ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>{value}</p>
                              </div>
                            ))}
                          </div>
                          {a.license_number && (
                            <div className="text-sm"><span className="text-gray-500">License #: </span><span className="text-white">{a.license_number}</span></div>
                          )}
                          <div>
                            <p className="text-gray-500 text-xs mb-1.5">Platforms</p>
                            <div className="flex flex-wrap gap-1.5">
                              {(a.platforms || '').split(',').map(p => p.trim()).filter(Boolean).map(p => (
                                <span key={p} className="px-2.5 py-0.5 bg-[#D4A843]/15 text-[#D4A843] text-xs rounded-full font-medium">{p}</span>
                              ))}
                            </div>
                          </div>
                          {a.notes && (
                            <div className="text-sm"><span className="text-gray-500">Notes: </span><span className="text-gray-300">{a.notes}</span></div>
                          )}
                          <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <button
                              onClick={() => setSelected(a)}
                              className="text-sm font-medium text-[#D4A843] hover:text-amber-300 transition-colors underline underline-offset-2"
                            >
                              View full details
                            </button>
                            <DeleteButton id={a.id} onDeleted={() => handleDeleted(a.id)} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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
                      car.available ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
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
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${b.status === 'paid' ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{new Date(b.created_at).toLocaleDateString()}</td>
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

function DeleteButton({ id, onDeleted }: { id: number; onDeleted: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handle(e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirming) { setConfirming(true); return; }
    setDeleting(true);
    await fetch(`${BASE}/api/admin/applications/${id}`, {
      method: 'DELETE', headers: { 'x-admin-token': ADMIN_TOKEN },
    });
    onDeleted();
  }

  return (
    <div className="flex items-center gap-2">
      {confirming && !deleting && (
        <button onClick={e => { e.stopPropagation(); setConfirming(false); }}
          className="text-xs text-gray-500 hover:text-gray-300 underline">Cancel</button>
      )}
      <button onClick={handle} disabled={deleting}
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
          confirming ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
        }`}>
        <Trash2 size={13} />
        {deleting ? 'Deleting…' : confirming ? 'Confirm' : 'Delete'}
      </button>
    </div>
  );
}
