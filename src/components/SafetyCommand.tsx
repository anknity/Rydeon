import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Users, PhoneCall, Volume2, 
  MapPin, CheckCircle2, Siren, Play, Circle, Bell, ExternalLink, ShieldAlert as AlertIcon
} from 'lucide-react';

export default function SafetyCommand() {
  const [activeCity, setActiveCity] = useState<'blr' | 'delhi' | 'mumbai' | 'pune'>('blr');
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Active secure corridors data
  const corridors = {
    blr: [
      { id: '1', name: 'Global Tech Park Junction Terminal', patrols: '6 Active Bikes', state: 'Green - Secured', coverage: '99.9%', beacon: 'Active Anchor 04' },
      { id: '2', name: 'Sector 5 Metro Central Gate 3 Corridor', patrols: '4 Active Bikes', state: 'Green - Secured', coverage: '99.8%', beacon: 'Active Anchor 12' },
      { id: '3', name: 'Vidyalaya Women\'s Hostel Link Highway', patrols: '3 Active Bikes', state: 'Green - Secured', coverage: '99.7%', beacon: 'Active Anchor 09' },
      { id: '4', name: 'Galleria Premium Retail Boulevard', patrols: '5 Active Bikes', state: 'Green - Secured', coverage: '99.9%', beacon: 'Active Anchor 02' }
    ],
    delhi: [
      { id: '1', name: 'Connaught Outer Circle Ladies Safe Loop', patrols: '8 Active Bikes', state: 'Green - Secured', coverage: '99.8%', beacon: 'Active Anchor 18' },
      { id: '2', name: 'Nehru Place Tech Center Express Link', patrols: '5 Active Bikes', state: 'Green - Secured', coverage: '99.6%', beacon: 'Active Anchor 22' },
      { id: '3', name: 'South Delhi Varsity Corridor Block Q', patrols: '4 Active Bikes', state: 'Green - Secured', coverage: '99.7%', beacon: 'Active Anchor 15' }
    ],
    mumbai: [
      { id: '1', name: 'Bandra-Kurla Complex Women Commuter Trail', patrols: '7 Active Bikes', state: 'Green - Secured', coverage: '99.9%', beacon: 'Active Anchor 31' },
      { id: '2', name: 'Andheri Metro Interchange Outer Circle', patrols: '6 Active Bikes', state: 'Green - Secured', coverage: '99.8%', beacon: 'Active Anchor 25' },
      { id: '3', name: 'Nariman Point Coastal Secure Lane', patrols: '4 Active Bikes', state: 'Green - Secured', coverage: '99.9%', beacon: 'Active Anchor 29' }
    ],
    pune: [
      { id: '1', name: 'Hinjawadi IT Precinct Phase 1 Ring Road', patrols: '5 Active Bikes', state: 'Green - Secured', coverage: '99.8%', beacon: 'Active Anchor 06' },
      { id: '2', name: 'Viman Nagar Hostel & Cafe Boulevard', patrols: '4 Active Bikes', state: 'Green - Secured', coverage: '99.7%', beacon: 'Active Anchor 14' }
    ]
  };

  const dispatchHelplines = [
    { name: "Direct Police Dispatch Hotline", number: "112", subtitle: "Instant GPS location push & vehicle details link" },
    { name: "National Women Helpline", number: "10911", subtitle: "Nationwide emergency voice responder team" },
    { name: "RydeOn 24/7 Command Center", number: "1800-419-RYD", subtitle: "Physical escort bike backup dispatch within 3 mins" }
  ];

  // Sirens oscillator audio synthesis (safe de-escalation/deterrent sound)
  const toggleSirenSinthetic = () => {
    if (sirenPlaying) {
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        setOscillator(null);
      }
      setSirenPlaying(false);
    } else {
      try {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtxClass();
        setAudioCtx(ctx);

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        // Alternating pitch frequency simulation sweep
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.5);
        osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 1.0);
        
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime); // keep volume subtle/comfort
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();

        // Loop the pitch sweep frequency
        let frequencyDirection = 1;
        const interval = setInterval(() => {
          if (!osc) {
            clearInterval(interval);
            return;
          }
          try {
            osc.frequency.setValueAtTime(frequencyDirection === 1 ? 580 : 880, ctx.currentTime);
            frequencyDirection = frequencyDirection === 1 ? 0 : 1;
          } catch (e) {
            clearInterval(interval);
          }
        }, 500);

        setOscillator(osc);
        setSirenPlaying(true);
      } catch (e) {
        console.warn("Synth audio barred by browser settings.", e);
        setSirenPlaying(true); // show active state regardless
      }
    }
  };

  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-3xl border border-slate-200 shadow-xl overflow-hidden mt-8 mb-12">
      
      {/* Page Title Header */}
      <div className="border-b border-slate-200 pb-6 mb-8 text-left">
        <span className="text-[10px] uppercase tracking-widest font-black text-brand-yellow-600 bg-brand-yellow-500/10 px-3 py-1 rounded-full border border-brand-yellow-500/20 inline-block mb-2">Physical Security & Command Desk</span>
        <h2 className="text-3xl font-extrabold text-brand-navy-900 tracking-tight">Safety Command Center</h2>
        <p className="text-xs text-slate-500 font-semibold mt-1">
          Monitor metropolitan transit corridors, test distress sirening systems, or coordinate directly with our physical field Safety Patrol Units.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT: Distress Alert Broadcaster Widget (5 cols) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {/* Real Audio Oscillator panic tester */}
          <div className="bg-brand-navy-905 bg-[#0f172a] rounded-3xl p-6 border border-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Siren className="w-40 h-40" />
            </div>

            <div className="relative z-10 space-y-5">
              <div className="flex items-center gap-1.5 text-brand-yellow-500">
                <Siren className="w-5 h-5 animate-pulse" />
                <span className="text-[10.5px] uppercase tracking-widest font-black">Aura Alarm Broadcaster</span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">Distress Sound Deterrent</h3>
                <p className="text-[11px] text-slate-300 font-normal leading-relaxed mt-1">
                  Triggering this launches a high-pitched acoustic synth sound from your phone. Use this as a direct audible deterrent to draw high domestic attention on streets.
                </p>
              </div>

              {/* Siren switch button */}
              <button 
                onClick={toggleSirenSinthetic}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 transition-all outline-none cursor-pointer border-2 shadow-lg ${
                  sirenPlaying 
                    ? 'bg-rose-600 border-rose-600 text-white animate-pulse' 
                    : 'bg-brand-yellow-500 border-brand-yellow-500 text-brand-navy-900 hover:bg-brand-yellow-600'
                }`}
              >
                <Bell className={sirenPlaying ? 'animate-bounce w-4 h-4' : 'w-4 h-4'} />
                <span>{sirenPlaying ? '🔔 Mute Distress Alarm' : '🚨 Test Acoustic Alarm'}</span>
              </button>

              <p className="text-[9.5px] text-slate-400 font-medium">
                🔒 Testing standard: Audits your local Web Audio oscillators. Generates zero outside server alerts without explicit authorization.
              </p>
            </div>
          </div>

          {/* Unified Helpline Connections Capsule */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
            <h3 className="font-extrabold text-brand-navy-900 text-base flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-brand-yellow-500" />
              <span>Direct Link Dispatch Lines</span>
            </h3>

            <div className="space-y-3.5">
              {dispatchHelplines.map((hl, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100/50 transition-colors flex justify-between items-center gap-3">
                  <div className="text-left">
                    <span className="font-black text-xs text-brand-navy-900 block">{hl.name}</span>
                    <span className="text-[10px] text-slate-400 font-semibold leading-normal block mt-0.5">{hl.subtitle}</span>
                  </div>

                  <a 
                    href={`tel:${hl.number}`}
                    onClick={(e) => { e.preventDefault(); alert(`Direct call dialog triggered on client container to: ${hl.number}`); }}
                    className="bg-brand-navy-900 text-brand-yellow-500 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-brand-navy-800 flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <span>{hl.number}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COMPONENT: Safe Corridors Status monitor (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Active Corridors Panel */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="font-black text-brand-navy-900 text-base">Secured City Corridors</h3>
                <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5">Physical motorcycle patrol status on major workspace highways.</p>
              </div>

              {/* City pills selectors */}
              <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'blr', label: 'Bengaluru' },
                  { id: 'delhi', label: 'Delhi NCR' },
                  { id: 'mumbai', label: 'Mumbai' },
                  { id: 'pune', label: 'Pune' }
                ].map(city => (
                  <button
                    key={city.id}
                    onClick={() => setActiveCity(city.id as any)}
                    className={`px-3 py-1 text-[10.5px] font-black rounded-lg transition-all cursor-pointer ${
                      activeCity === city.id 
                        ? 'bg-brand-navy-900 text-white shadow-sm' 
                        : 'text-slate-500 hover:text-brand-navy-900'
                    }`}
                  >
                    {city.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Corridors Table list */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="pb-3.5 font-bold">Transit Stretch & Sector</th>
                    <th className="pb-3.5 font-bold">Patrol Squads</th>
                    <th className="pb-3.5 font-bold text-center">Safety Score</th>
                    <th className="pb-3.5 font-bold text-right">Aura Anchoring</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-xs text-slate-700">
                  {corridors[activeCity].map(corr => (
                    <tr key={corr.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 pr-3">
                        <span className="font-bold text-slate-900 block">{corr.name}</span>
                        <span className="text-[9.5px] text-slate-400 font-medium block mt-0.5">High-frequency female worker loop</span>
                      </td>
                      <td className="py-4 pr-3.5 text-slate-700 font-mono text-[11px] font-black">
                        {corr.patrols}
                      </td>
                      <td className="py-4 font-mono text-[11.5px] text-center text-[#10b981] font-black">
                        {corr.coverage}
                      </td>
                      <td className="py-4 text-right text-brand-navy-900 font-bold">
                        <span className="inline-flex items-center gap-1 font-mono text-[10.5px] bg-slate-100 px-2 py-0.5 rounded">
                          <Circle className="w-2 h-2 fill-[#10b981] text-[#10b981]" />
                          <span>{corr.beacon}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Descriptive footnotes */}
            <div className="mt-6 p-4 bg-blue-50/80 border border-blue-100 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900 font-sans leading-relaxed">
                <span className="font-bold block">Physical Escort & Corridor Guard Details</span>
                Our fleet travels actively with helmet dash-cameras, integrated VHF wireless walkies connecting local municipal hubs, and smart GPS anchors that synchronize with police networks.
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
