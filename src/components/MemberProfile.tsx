import React, { useState, useEffect } from 'react';
import { 
  Award, ShieldCheck, Mail, Phone, Users, Wallet, 
  MapPin, User, ChevronRight, Plus, Trash2, Check, ArrowRight
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export default function MemberProfile() {
  // Local active contacts list state
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('rydeon-member-contacts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: '1', name: 'Almira Sharma (Mother)', phone: '+91 98111 22233', relation: 'Family Coordinator' },
      { id: '2', name: 'Shweta Sharma (Sister)', phone: '+91 99313 88123', relation: 'Family Coordinator' }
    ];
  });

  // Contact add form state
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('Friend');
  
  // Dynamic wallet details
  const [rewardPoints, setRewardPoints] = useState(250);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    localStorage.setItem('rydeon-member-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const added: Contact = {
      id: Date.now().toString(),
      name: newName,
      phone: newPhone,
      relation: newRelation
    };

    setContacts(prev => [...prev, added]);
    setNewName('');
    setNewPhone('');
    setNewRelation('Friend');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const historicJourneys = [
    { id: 'h1', date: 'May 28, 2026', route: 'Hostel Sector 4 → Global Women Tech Park', driver: 'Priya Sharma (Vespa)', reward: '₹25 Points', status: 'Secured Standard' },
    { id: 'h2', date: 'May 24, 2026', route: 'Sector 5 Metro Central → Galleria Premium retail', driver: 'Ananya Deshmukh (Auto)', reward: '₹15 Points', status: 'Secured V2 Escort' },
    { id: 'h3', date: 'May 18, 2026', route: 'Imperial Arts Theatre → Galleria Premium Wing', driver: 'Shreya Iyer (Guard EV Cab)', reward: '₹35 Points', status: 'Secured V3 Escort' }
  ];

  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-3xl border border-slate-200 shadow-xl overflow-hidden mt-8 mb-12">
      
      {/* Page header */}
      <div className="border-b border-slate-200 pb-6 mb-8 text-left">
        <span className="text-[10px] uppercase tracking-widest font-black text-brand-yellow-600 bg-brand-yellow-500/10 px-3 py-1 rounded-full border border-brand-yellow-500/20 inline-block mb-2">Authenticated Commuter Safe Hub</span>
        <h2 className="text-3xl font-extrabold text-brand-navy-900 tracking-tight">Rider Safety Passport</h2>
        <p className="text-xs text-slate-500 font-semibold mt-1">
          Manage your emergency circle, review reward cashback wallets, and check verified secure trip historic archives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT: Safety Badge & Wallet balances (5 cols) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {/* Passport Badge card */}
          <div className="bg-brand-navy-900 bg-gradient-to-br from-brand-navy-900 to-slate-900 text-white rounded-3xl p-6 border border-white/15 relative overflow-hidden shadow-2xl">
            {/* Absolute vector emblem overlay */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Award className="w-40 h-40" />
            </div>

            <div className="relative z-10 space-y-6">
              
              <div className="flex justify-between items-start">
                <span className="text-[9.5px] uppercase bg-brand-yellow-500 text-brand-navy-900 px-3.5 py-1 rounded-full font-black tracking-widest">
                  PLATINUM TRAVELER PRO
                </span>
                <span className="font-mono text-slate-400 text-[10.5px]">SR-2026-9932</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-brand-yellow-500 flex items-center justify-center text-brand-yellow-500 font-black text-xl shadow-md">
                  A.S
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Ananya Sen</h3>
                  <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5">Verified Corporate Commuter Hubmember</p>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full"></div>

              {/* Verified passport statistics */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[8.5px] uppercase font-bold text-gray-400 block">Total Rides</span>
                  <span className="text-lg font-black font-mono text-white mt-0.5">42</span>
                </div>
                <div>
                  <span className="text-[8.5px] uppercase font-bold text-gray-400 block">Safe Kms</span>
                  <span className="text-lg font-black font-mono text-brand-yellow-500 mt-0.5">184 Kms</span>
                </div>
                <div>
                  <span className="text-[8.5px] uppercase font-bold text-gray-400 block">CO2 Offset</span>
                  <span className="text-lg font-black font-mono text-emerald-400 mt-0.5">52 Kg</span>
                </div>
              </div>

            </div>
          </div>

          {/* Reward Cashback Wallet Wallet balances */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
            
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Wallet className="w-5 h-5 text-brand-yellow-500" />
              <h4 className="font-black text-brand-navy-900 text-base">Safety Club Wallet Balance</h4>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
              <div>
                <span className="text-[9.5px] uppercase font-bold text-slate-400 block">Reward balance cash</span>
                <span className="text-3xl font-black text-brand-navy-900 font-mono mt-0.5">₹{rewardPoints}</span>
              </div>
              <button 
                onClick={() => { alert("Point redemption: Apply discount coupons during plan route checkout in active ride console."); }}
                className="bg-brand-navy-900 hover:bg-brand-navy-800 text-brand-yellow-500 px-4 py-2 rounded-xl text-xs font-black shadow-sm transition-transform hover:scale-103 cursor-pointer"
              >
                Redeem points
              </button>
            </div>

            <p className="text-[10px] text-slate-400 leading-normal font-sans">
              🌟 You earn 10 Safe points for every kilometer commuted using Rydeon EV Scooters or share pooling, which offsets fare commissions directly.
            </p>

          </div>

        </div>

        {/* RIGHT COMPONENT: Contact circle configuration & Previous Logs (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Safety contacts circles manager panel */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-5">
            <div>
              <h3 className="font-black text-brand-navy-900 text-base flex items-center gap-1.5">
                <Users className="w-5 h-5 text-brand-yellow-500" />
                <span>My Safe emergency circle contacts</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">These contacts automatically receive real-time map GPS links whenever you start a ride.</p>
            </div>

            {/* List contacts items */}
            <div className="space-y-2.5">
              {contacts.map(cnt => (
                <div key={cnt.id} className="p-3 bg-slate-50 border border-slate-100/80 rounded-xl flex justify-between items-center hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-yellow-500/10 text-brand-yellow-600 flex items-center justify-center font-bold text-xs shrink-0">
                      {cnt.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-brand-navy-900 block">{cnt.name}</span>
                      <span className="text-[10.5px] text-slate-400 font-mono block mt-0.5">{cnt.phone} — {cnt.relation}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDeleteContact(cnt.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Remove Contact"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Verification Alert capsule */}
            {showNotification && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] font-semibold flex items-center gap-2 animate-fade-in animate-pulse">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Emergency contact updated in your safety profiles successfully!</span>
              </div>
            )}

            {/* Form addition capsule inline */}
            <form onSubmit={handleAddContact} className="bg-[#fafafa] border p-4.5 rounded-2xl space-y-3">
              <span className="text-[9px] uppercase font-black tracking-widest text-[#64748b] block">Add New Safe Guardian contact</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input 
                  type="text" 
                  placeholder="Guardian full name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-white border rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-yellow-500 sm:col-span-1"
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Guardian mobile number"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="bg-white border rounded-lg p-2 text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-brand-yellow-500 sm:col-span-1"
                  required
                />
                
                <select
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="bg-white border rounded-lg p-2 text-xs font-semibold focus:outline-none cursor-pointer sm:col-span-1"
                >
                  <option value="Friend">Friend</option>
                  <option value="Family Coordinator">Family Coordinator</option>
                  <option value="Office Associate">Office Associate</option>
                  <option value="Community Leader">Community Leader</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-navy-900 hover:bg-brand-navy-800 text-white font-extrabold text-xs uppercase py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Contact Guardian</span>
              </button>
            </form>

          </div>

          {/* Past safe logs history widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
            <h3 className="font-black text-brand-navy-900 text-base">Historic safe travel archives</h3>
            
            <div className="divide-y divide-slate-100 font-sans">
              {historicJourneys.map(h => (
                <div key={h.id} className="py-3 flex justify-between items-center gap-2 hover:bg-slate-50/40 p-1 rounded-lg transition-colors">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-[#64748b] block">{h.date} — {h.status}</span>
                    <span className="font-extrabold text-xs text-brand-navy-900 mt-1 block">{h.route}</span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Captain: {h.driver}</span>
                  </div>

                  <span className="font-mono text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                    {h.reward}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
