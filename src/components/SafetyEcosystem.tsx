import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  User, 
  Users, 
  Phone, 
  MapPin, 
  Eye, 
  Radio, 
  Bell, 
  AlertOctagon, 
  Heart, 
  GraduationCap, 
  DollarSign, 
  Sparkles, 
  Building2, 
  Truck, 
  Activity, 
  Volume2, 
  Plus, 
  Clock, 
  ShieldAlert,
  ChevronRight,
  Map,
  Bike,
  Car,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  shortDesc: string;
  benefits: string[];
  highlightBadge?: string;
}

export default function SafetyEcosystem() {
  const [activeTab, setActiveTab] = useState<'community' | 'shields' | 'fares' | 'zones' | 'fleets'>('community');
  
  // States for live interactive mini-simulators inside each tab
  const [guardianPhone, setGuardianPhone] = useState('9988123456');
  const [guardianName, setGuardianName] = useState('Mom');
  const [sentSMSs, setSentSMSs] = useState<{ type: string; msg: string; timestamp: string }[]>([
    { type: 'Info', msg: 'Guardian Link established. Real-time GPS alerts standby.', timestamp: 'Active' }
  ]);

  const [estimateDistance, setEstimateDistance] = useState<number>(6);
  const [estimateVehicle, setEstimateVehicle] = useState<'bike' | 'pool' | 'cab' | 'healthcare'>('bike');
  const [applyPass, setApplyPass] = useState<boolean>(false);
  const [nightModeActive, setNightModeActive] = useState<boolean>(false);

  const [voiceLog, setVoiceLog] = useState<string>('Ready for voice actions. Say "Help me" or press diagnostic check...');
  const [voicePulse, setVoicePulse] = useState<boolean>(false);
  
  const [activePinkHub, setActivePinkHub] = useState<'college' | 'metro' | 'mall'>('college');

  // Trigger simulated SMS log
  const pushSimulatedAlert = (scenario: 'pickup' | 'deviation' | 'arrival') => {
    const contact = guardianName || 'Guardian';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let smsText = '';

    if (scenario === 'pickup') {
      smsText = `[Rydeon Secure] Ride Boarded: Hello ${contact}, your daughter is in a safe cabinet route (KA-03-SR-2026) with verified Female Captain Priya S. Track live: rydeon.in/t/88hG`;
    } else if (scenario === 'deviation') {
      smsText = `[Rydeon ALERT] Detour prompt: Hello ${contact}, ride KA-03-SR-2026 has detoured. Safety patrol has checked safety parameters - vehicle is steady at 35km/h over waterlogged pass.`;
    } else {
      smsText = `[Rydeon Success] Safely Arrived: Hello ${contact}, passenger has reached colleges dropoff point safely. Safe-travel verified!`;
    }

    setSentSMSs(prev => [{ type: scenario.toUpperCase(), msg: smsText, timestamp: now }, ...prev]);
  };

  // Calculate pre-booking rates with zero extra hidden surges
  const calculateTransparentPrice = () => {
    let base = 10;
    let ratePerKm = 8;
    if (estimateVehicle === 'pool') ratePerKm = 6;
    if (estimateVehicle === 'cab') ratePerKm = 18;
    if (estimateVehicle === 'healthcare') ratePerKm = 12;

    let total = base + (estimateDistance * ratePerKm);
    if (applyPass) total = Math.floor(total * 0.7); // 30% off for student pass
    return Math.max(10, total);
  };

  // Simulate AI Vocal diagnostics
  const runVoiceSecurityCheck = () => {
    setVoicePulse(true);
    setVoiceLog('Voice Engine active... Processing voice-triggered SOS parameters...');
    setTimeout(() => {
      setVoiceLog('"Aura-Sister AI Status check triggered. Acoustic feedback: Sister is in safe boundaries. No abnormal noise detected."');
      setVoicePulse(false);
    }, 1200);
  };

  // Defined dynamic tabs combining all requested capabilities
  const tabs = [
    {
      id: 'community',
      label: '👩‍✈️ Verified Community',
      desc: 'Mandatory verifications and dedicated women driver/rider protection loops.',
      features: [
        {
          id: 'driver-only',
          title: 'Women Drivers Only (Captains)',
          shortDesc: 'Every Captain on our primary levels undergoes robust background checks and certification.',
          benefits: [
            'Mandatory Police criminal database clearance verification',
            'Full biometric verification of Aadhaar UID & authenticated commercial DL',
            'Minimum 4.8★ user safety rating requirement for high-shift rides',
          ],
          badge: '100% Vetted Female Partners'
        },
        {
          id: 'rider-only',
          title: 'Women Passengers Circle',
          shortDesc: 'A dedicated, hyper-secure ride-sharing safehouse custom built for women\'s comfort on the streets.',
          benefits: [
            'Strict female identity validation during registration onboarding',
            'Verification of student IDs or workplace profile linkages',
            'Zero tolerance safety parameters for passenger accounts'
          ],
          badge: 'Zero Pink-Bias Safety'
        },
        {
          id: 'driver-panic',
          title: 'Driver Safety Panic Controls',
          shortDesc: 'Mutual safety! Our professional Captain partners deserve complete respect and safety safeguards.',
          benefits: [
            'Dual driver SOS trigger notifying police dispatch desk instantly',
            'Immediate live location sharing and real-time audio transmission',
            'Trained female backup marshals dispatched to coordinate help'
          ],
          badge: 'Captain Protect'
        },
        {
          id: 'driver-community',
          title: 'Sisters Driver Network Hub',
          shortDesc: 'Empowering professional women with stellar workplace dignity, security, and growth.',
          benefits: [
            'Health insurance plans, maternity benefits and school grants support',
            'Flexible timing schedules tailored for working single mothers',
            'Daily bonuses and industry-best minimum 90% fare payouts'
          ],
          badge: 'Women Empowerment'
        }
      ]
    },
    {
      id: 'shields',
      label: '🛡️ Active Shields & SOS',
      desc: 'One-click tactile and voice responders keeping you protected continuously.',
      features: [
        {
          id: 'safety-first',
          title: 'Safety First Core Controls',
          shortDesc: 'One-tap protection triggers linked directly to our physical escort network & emergency response.',
          benefits: [
            'Supervised SOS button connected directly with state security and physical guards',
            'Real-time automated trip status sharing with up to 5 family contacts',
            'Encrypted client-side Ride Audio Recording (processed locally with 100% privacy)'
          ],
          badge: 'Active Protection'
        },
        {
          id: 'deviance-detect',
          title: 'Smart AI Route Watcher',
          shortDesc: 'Behind-the-scenes machine learning keeping eyes on every road segment to flag delays.',
          benefits: [
            'AI-driven auto-detection for unexpected route deviations',
            'Sudden stop alarms triggering automatic call companion checks',
            'Dynamic diversion logs linked with live control desk'
          ],
          badge: 'Automated AI Patrol'
        },
        {
          id: 'voice-companion',
          title: 'Hands-Free AI Voice Assistant',
          shortDesc: 'A powerful vocal companion watching over you without needing physical taps.',
          benefits: [
            'Automatic "Are you feeling comfortable, sister?" verbal checkups on unexpected stops',
            'Voice-triggered silent SOS triggered by custom safety phrases',
            'Interactive backup call simulation to ease user anxiety'
          ],
          badge: 'Vocal AI Shield'
        },
        {
          id: 'smart-safety-score',
          title: 'AI Smart Safety Score Metric',
          shortDesc: 'Real-time scoring algorithms analyzing your journey to configure state-of-the-art protections.',
          benefits: [
            'Dynamic rating indicating safety level of the designated route',
            'Crowdsourced illumination index and driver history checks',
            'Automatic routing optimization favoring high-density well-lit highways'
          ],
          badge: 'Trust Score'
        }
      ]
    },
    {
      id: 'fares',
      label: '💸 Fixed Pricing & Passes',
      desc: 'Say goodbye to unexpected surges. Economic commutes with absolute billing clarity.',
      features: [
        {
          id: 'fixed-prices-core',
          title: 'Transparent Flat Pricing',
          shortDesc: 'Extremely economic rates matching true utility. Absolute clarity, down to the last rupee.',
          benefits: [
            'Subsidized base rates starting at exactly ₹10/km',
            'Absolute zero demand surge pricing or weather peak additions',
            'Fares fully pre-calculated and displayed clearly before booking'
          ],
          badge: '₹10/km Flat base'
        },
        {
          id: 'women-pool',
          title: 'Sisters Pool-Sharing Rides',
          shortDesc: 'Share rides with fellow verified sisters commuting along identical transit avenues.',
          benefits: [
            'Extremely cheap fares by splitting commute costs dynamically',
            'Available strictly for female passenger-to-female passenger pairing',
            'Intelligent routes matching only same-direction travelers'
          ],
          badge: 'Affordable Sharing'
        },
        {
          id: 'college-pass',
          title: 'Student Commute College Pass',
          shortDesc: 'Helping young women commuters beat high prices with heavily discounted recurring rides.',
          benefits: [
            'Highly economic weekly/monthly pre-paid campus commute pass',
            'Up to 30% discount on routine fixed study lanes',
            'No booking limits or peak hour queue delays'
          ],
          badge: 'Campus Special'
        }
      ]
    },
    {
      id: 'zones',
      label: '🚨 Safe Zones & Guards',
      desc: 'High-visibility boarding zone networks and guardian SMS telemetry loops.',
      features: [
        {
          id: 'pink-hubs',
          title: 'Pink Zones (Safe Wait Points)',
          shortDesc: 'Strategically curated, highly illuminated drop & pickup hubs situated across crowded lanes.',
          benefits: [
            'Designated waiting spots at major Malls, Metro exits, Hospital yards, and Colleges',
            'Vigilant constant security camera streams & regular physical patrol bike runs',
            'Instantly visible prominent board markers and helpful female helpers'
          ],
          badge: 'Illuminated Checkpoints'
        },
        {
          id: 'guardian-mode-sync',
          title: 'Guardian Commute Sync',
          shortDesc: 'Seamless live links sending push logs directly to your parents, family, or friends.',
          benefits: [
            'Pre-add primary close contacts (parents, husband, sisters) to tracking database',
            'Automated real-time SMS alerts dispatched during onboarding and safe drop-off',
            'Live GPS map panel sharing with high-precision route tracking'
          ],
          badge: 'Guardian Care'
        },
        {
          id: 'night-patrol',
          title: 'Vigilant Night Safety Mode',
          shortDesc: 'Special night-shift safeguards turning on automatically after 8 PM.',
          benefits: [
            'Mandatory real-time GPS route tracking with no opt-out',
            'Frequent interactive "Are you safe?" prompts on-screen',
            'Dedicated SOS tracking line & priority rapid-patrol response',
            'Zero night-shift pricing surges to assist working professionals'
          ],
          badge: '8PM - 6AM Security'
        },
        {
          id: 'security-partner',
          title: 'Female Security Escort Partner',
          shortDesc: 'For absolute confidence, request an additional safety escort backup for sensitive night travels.',
          benefits: [
            'Physical escort motorcycle keeping pace within visual range',
            'Direct intervention specialists for transport links to suburbs',
            'Premium overnight reassurance and late flight support'
          ],
          badge: 'VIP Escort Backup'
        }
      ]
    },
    {
      id: 'fleets',
      label: '🏥 Special Fleets & Delivery',
      desc: 'Care-centric fleets customized for specific utility, healthcare, or package deliveries.',
      features: [
        {
          id: 'women-bike-taxi',
          title: 'Women Bike Taxi Service',
          shortDesc: 'Swift, exceptionally economical solo two-wheelers driven exclusively by female Captains.',
          benefits: [
            'Fastest transit bypassing urban bottleneck jams with female captains',
            'Fresh, clean sanitary inner caps and high-grade safety helmets provided',
            'The absolute most affordable and secure transport across town'
          ],
          badge: 'Scooters & Bikes'
        },
        {
          id: 'women-cabs',
          title: 'Rydeon Comfort Cab Service',
          shortDesc: 'Spacious four-wheelers with built-in physical barriers and automated tracking.',
          benefits: [
            'Hatchbacks for quick travel, comfortable Sedans, and premium SUVs',
            'Fully climate-controlled interiors with professional certified women drivers',
            'Dual emergency panic buttons inside passenger side door panels'
          ],
          badge: 'Hatchbacks, Sedan, SUV'
        },
        {
          id: 'healthcare-fleet',
          title: 'Care & Maternity Healthcare Rides',
          shortDesc: 'Optimized travel for pregnant mothers, hospital consults, or senior female citizens.',
          benefits: [
            'Gentle driving speeds, defensive routing, and cushioned suspension rides',
            'Pre-equipped with mineral water, motion sickness assistance, and medical first-aid boxes',
            'Direct emergency bypass match priority with the leading town maternity centers'
          ],
          badge: 'Maternity Support'
        },
        {
          id: 'corporate-link',
          title: 'Corporate Women Transport',
          shortDesc: 'Dedicated office commute fleets offering streamlined booking for corporate female staff.',
          benefits: [
            'Recurring scheduling models for reliable daily office pickups and late drops',
            'Consolidated monthly post-paid business invoicing portals',
            'Continuous tracking links integrated into the company\'s chief security desk'
          ],
          badge: 'Enterprise Commutes'
        },
        {
          id: 'delivery-service',
          title: 'Female Delivery Express (Coming Soon)',
          shortDesc: 'Extending our safe commute network to grocery, parcel, and medicine dropoffs.',
          benefits: [
            'Groceries, medicine packs, and documents collected and dropped safely',
            'Secure OTP handshakes with female receiver validation checks',
            'Low logistics rates supporting women household micro-businesses'
          ],
          badge: 'Logistics Shield'
        }
      ]
    }
  ];

  const currentTabData = tabs.find(t => t.id === activeTab) || tabs[0];

  // Specific Pink Zones information data
  const pinkZonesInfo = {
    college: {
      name: 'South Campus University Hub (Gate 2 wait zone)',
      status: 'High Police Patrol Coordination - 99% Secure Checkpoint',
      installations: 'Luminous solar-lit waiting booth, SOS panic button pillar, female marshal team on standby.'
    },
    metro: {
      name: 'Rajiv Metro interchange Gate No. 3 (Dedicated Ladies Exit)',
      status: 'Active Security Camera Link - 98% Secure Checkpoint',
      installations: 'Rydeon transit parking bay, ladies police outpost, bright fluorescent boarding signages.'
    },
    mall: {
      name: 'Westside Galleria Mall (Lower Portico Loading Bay)',
      status: 'High Density Well-Lit Zone - 95% Secure Checkpoint',
      installations: 'Private indoor lounge area matching app bookings, designated female concierge helper.'
    }
  };

  return (
    <section className="py-24 bg-slate-50 border-t border-b border-slate-200/80" id="safety-ecosystem-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Unified Tagline Banner */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand-navy-50 border border-brand-navy-100 px-4 py-1.5 rounded-full text-brand-navy-900 text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <ShieldCheck className="w-4 h-4 text-brand-yellow-500 fill-brand-yellow-500 shrink-0" />
            Rydeon Shield: 19+ Specialised Features
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-navy-900 tracking-tight leading-none">
            Our Care-Centric <span className="text-brand-yellow-600 block sm:inline">Security Ecosystem</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Rydeon is built bottom-up exclusively on women-oriented commuter utilities. Review our verified security metrics, pricing formulas, and interact with the live dashboard panels.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-2 pt-2 text-[11px] font-black text-brand-navy-900 uppercase tracking-wider">
            <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">"Safe Rides, Powered by Women"</span>
            <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">"She Drives. She Rides. She Trusts."</span>
            <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">"Your Safety, Our Priority."</span>
          </div>
        </div>

        {/* ------------------- STYLISH NAVIGATION TABS BAR ------------------- */}
        <div className="bg-white rounded-3xl p-2.5 border border-slate-200 shadow-md mb-12 flex flex-wrap gap-1.5 justify-center md:justify-around max-w-5xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[150px] py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-brand-navy-900 text-white shadow-md font-extrabold scale-[1.01]'
                  : 'text-slate-600 hover:text-brand-navy-900 hover:bg-slate-50'
              }`}
            >
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ------------------- ACTIVE TAB SCREEN CORE GRID (Light Theme High Contrast) ------------------- */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE SUB-SECTION DISPLAY - Interactive Live Simulators mapped to each category tab */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6 lg:sticky lg:top-24">
            
            <div className="border-b border-slate-200 pb-4 space-y-1">
              <span className="text-[10px] font-black text-brand-yellow-600 uppercase tracking-widest">Aura Interactive Room</span>
              <h3 className="text-lg font-black text-brand-navy-900">
                {activeTab === 'community' && '👮‍♀️ Verification Center Log'}
                {activeTab === 'shields' && '🎤 Acoustic AI Diagnostic'}
                {activeTab === 'fares' && '🎫 Pre-Ride Price Quote'}
                {activeTab === 'zones' && '📍 Guardian Tracker SMS'}
                {activeTab === 'fleets' && '🏙️ Live Pink-Zone Checkpoint'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Verify exactly how our security integrations perform in real-time scenarios.
              </p>
            </div>

            {/* TAB INTERACTION SIMULATOR 1 - COMMUNITY VERIFICATION */}
            {activeTab === 'community' && (
              <div className="space-y-4 text-left">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Database Search Unit</span>
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 font-black border border-emerald-200 px-2 py-0.5 rounded-full animate-pulse uppercase">
                      Sync Connect
                    </span>
                  </div>
                  
                  {/* Visual mockup checking items */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>National Crime Records Bureau Check (100% Pass)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>UIDAI Aadhaar biometric fingerprint linked</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>RTO Driving License validation ID complete</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-brand-yellow-50 border border-brand-yellow-100 rounded-xl space-y-1">
                  <span className="text-[9px] font-black text-brand-yellow-600 uppercase tracking-wider block">Captain Compliance Note</span>
                  <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                    Zero compromise. Any driver safety indicator sliding below 4.7★ triggers immediate system shutdown.
                  </p>
                </div>
              </div>
            )}

            {/* TAB INTERACTION SIMULATOR 2 - SHIELDS & ACOUSTIC VOICE COMMAND */}
            {activeTab === 'shields' && (
              <div className="space-y-4 text-left">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-sm text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-brand-yellow-500 ${voicePulse ? 'animate-ping' : ''}`}></span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-navy-900">Aura Vocal Safehouse</span>
                  </div>
                  
                  <div className="p-3 bg-brand-navy-50 text-brand-navy-900 text-xs font-black italic rounded-xl border border-brand-navy-100">
                    "Sister, we registered a detour. Are you feeling secure?"
                  </div>

                  <p className="text-[11px] text-slate-500 font-semibold max-w-xs mx-auto">
                    Try running an acoustic checkout or speaking our vocal prompt silent guards.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button 
                      onClick={() => setVoiceLog('Vocal feed processed: "Affirmative, stopping for fuel pass". Safety standards stay secure.')}
                      className="text-[9px] py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-slate-250"
                    >
                      "Yes, all OK"
                    </button>
                    <button 
                      onClick={() => setVoiceLog('ALERT: SILENT VOICE EMERGENCY! Directing tactical response partner and location links instantly.')}
                      className="text-[9px] py-2 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      "SOS Emergency"
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-1.5 font-mono text-[10px]">
                  <div className="flex gap-1.5 items-center text-brand-yellow-400">
                    <Activity className="w-3.5 h-3.5 text-brand-yellow-400 animate-pulse shrink-0" />
                    <span className="font-extrabold uppercase">Audio Feed Monitor</span>
                  </div>
                  <p className="text-slate-300 font-medium leading-relaxed">{voiceLog}</p>
                </div>

                <button 
                  onClick={runVoiceSecurityCheck}
                  className="w-full bg-brand-navy-900 text-white hover:bg-brand-navy-800 transition-colors py-2.5 rounded-xl text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1 cursor-pointer shadow-md"
                >
                  <Radio className="w-4 h-4" /> Run Acoustic Safety diagnostics
                </button>
              </div>
            )}

            {/* TAB INTERACTION SIMULATOR 3 - FARES ESTIMATOR */}
            {activeTab === 'fares' && (
              <div className="space-y-4 text-left">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-sm">
                  
                  <div>
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-wider text-slate-500 mb-1">
                      <span>Travel Distance</span>
                      <span className="text-brand-navy-900 font-black">{estimateDistance} KM</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="40" 
                      className="w-full accent-brand-navy-900 cursor-pointer"
                      value={estimateDistance}
                      onChange={(e) => setEstimateDistance(Number(e.target.value))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] font-black uppercase tracking-wider text-slate-500 mb-1">Vehicle Match</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl p-2 focus:outline-none text-brand-navy-900 cursor-pointer"
                        value={estimateVehicle}
                        onChange={(e: any) => setEstimateVehicle(e.target.value)}
                      >
                        <option value="bike">🛵 Bike Taxi (₹8/km)</option>
                        <option value="pool">👥 Women Share Pool (₹6/km)</option>
                        <option value="cab">🚗 Rydeon Cab Hatchback (₹18/km)</option>
                        <option value="healthcare">🏥 Healthcare Escort (₹12/km)</option>
                      </select>
                    </div>

                    <div className="flex flex-col justify-end">
                      <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-200 rounded-xl p-2 hover:bg-slate-100 select-none">
                        <input 
                          type="checkbox" 
                          className="rounded text-brand-navy-900 focus:ring-brand-navy-900 cursor-pointer" 
                          checked={applyPass}
                          onChange={(e) => setApplyPass(e.target.checked)}
                        />
                        <span className="text-[9px] font-extrabold text-slate-700 uppercase">Student Pass (-30%)</span>
                      </label>
                    </div>
                  </div>

                  <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-200 rounded-xl p-2 select-none hover:bg-slate-100">
                    <input 
                      type="checkbox" 
                      className="rounded text-brand-navy-900 focus:ring-brand-navy-900 cursor-pointer" 
                      checked={nightModeActive}
                      onChange={(e) => setNightModeActive(e.target.checked)}
                    />
                    <div className="flex-1 text-[9px] font-extrabold text-slate-700 uppercase flex justify-between">
                      <span>🌙 Safe Night Ride (After 8 PM)</span>
                      <span className="text-emerald-600">₹0 Surge Charge</span>
                    </div>
                  </label>

                </div>

                <div className="bg-slate-900 text-white rounded-xl p-4 space-y-2 border border-slate-800 shadow-inner">
                  <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                    <span className="text-[9px] text-[#22c55e] font-black uppercase tracking-wider bg-[#22c55e]/15 px-2 rounded-full">Surge Exempt Fares</span>
                    <span className="text-[10px] text-slate-400 font-bold">RPS Token Approved</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Booking Base Amount</span>
                      <span>₹10.00</span>
                    </div>
                    <div className="flex justify-between text-slate-300 font-mono">
                      <span>Distance fee ({estimateDistance} km)</span>
                      <span>₹{(estimateDistance * (estimateVehicle === 'bike' ? 8 : estimateVehicle === 'pool' ? 6 : estimateVehicle === 'cab' ? 18 : 12)).toFixed(2)}</span>
                    </div>
                    {applyPass && (
                      <div className="flex justify-between text-brand-yellow-400 font-black">
                        <span>🎒 College Campus Discount</span>
                        <span>-30%</span>
                      </div>
                    )}
                    {nightModeActive && (
                      <div className="flex justify-between text-[#38bdf8] font-black">
                        <span>🌙 Late Security Surcharge</span>
                        <span>₹0.00 (Waived)</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-black text-white border-t border-white/5 pt-1.5 mt-1.5">
                      <span className="text-brand-yellow-500 uppercase text-xs tracking-wider">Prepaid Estimate</span>
                      <span className="text-brand-yellow-500 font-mono">₹{calculateTransparentPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB INTERACTION SIMULATOR 4 - GUARDIAN SMS LINK */}
            {activeTab === 'zones' && (
              <div className="space-y-4 text-left">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3.5 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] font-black uppercase tracking-widest text-[#a1a1aa] mb-1">Guardian Identity</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 p-2 text-xs font-bold rounded-lg text-brand-navy-900"
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        placeholder="Mom / Parent"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black uppercase tracking-widest text-[#a1a1aa] mb-1">Mobile Relay Link</label>
                      <input 
                        type="tel" 
                        className="w-full bg-slate-50 border border-slate-200 p-2 text-xs font-bold rounded-lg text-brand-navy-900 text-center"
                        value={guardianPhone}
                        onChange={(e) => setGuardianPhone(e.target.value)}
                        placeholder="+91..."
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block">Trigger Test SMS Alert</span>
                    <div className="grid grid-cols-3 gap-1">
                      <button 
                        onClick={() => pushSimulatedAlert('pickup')}
                        className="text-[9px] py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-lg transition-all cursor-pointer border border-slate-250 text-center"
                      >
                        Boarded
                      </button>
                      <button 
                        onClick={() => pushSimulatedAlert('deviation')}
                        className="text-[9px] py-2 bg-slate-100 hover:bg-slate-200 text-brand-yellow-600 border border-brand-yellow-250 font-black rounded-lg transition-all cursor-pointer text-center"
                      >
                        Detour
                      </button>
                      <button 
                        onClick={() => pushSimulatedAlert('arrival')}
                        className="text-[9px] py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-lg transition-all cursor-pointer border border-slate-250 text-center"
                      >
                        Arrived
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live SMS feed container */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#a1a1aa] block">Relayed SMS Output Logs</span>
                  <div className="bg-slate-900 font-mono text-white p-3 rounded-xl border border-slate-800 space-y-2.5 h-32 overflow-y-auto">
                    {sentSMSs.map((sh, sIdx) => (
                      <div key={sIdx} className="text-[10px] leading-relaxed border-b border-white/5 pb-2 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center text-[8px]">
                          <span className={`${
                            sh.type === 'DEVIATION' ? 'text-red-400 bg-red-950/40 border border-red-500/25 px-1.5 rounded' : 
                            sh.type === 'PICKUP' ? 'text-indigo-400 bg-indigo-950/40 border border-indigo-500/25 px-1.5 rounded' : 
                            sh.type === 'arrival' ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/25 px-1.5 rounded' : 'text-slate-400'
                          } font-black uppercase`}>
                            {sh.type}
                          </span>
                          <span className="text-slate-500">{sh.timestamp}</span>
                        </div>
                        <p className="text-[#a5b4fc] mt-1 font-medium">{sh.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB INTERACTION SIMULATOR 5 - METRO/COLLEGE HUB */}
            {activeTab === 'fleets' && (
              <div className="space-y-4 text-left">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-sm">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block">Select Illuminated Pink Hub</span>
                  <div className="grid grid-cols-3 gap-1">
                    <button 
                      onClick={() => setActivePinkHub('college')}
                      className={`text-[9px] py-1.5 font-bold rounded-lg uppercase cursor-pointer transition-all border text-center ${
                        activePinkHub === 'college' ? 'bg-brand-navy-950 text-white border-brand-navy-950' : 'bg-slate-50 hover:bg-slate-100 text-[#a1a1aa] border-slate-200'
                      }`}
                    >
                      🎒 South Uni
                    </button>
                    <button 
                      onClick={() => setActivePinkHub('metro')}
                      className={`text-[9px] py-1.5 font-bold rounded-lg uppercase cursor-pointer transition-all border text-center ${
                        activePinkHub === 'metro' ? 'bg-brand-navy-950 text-white border-brand-navy-950' : 'bg-slate-50 hover:bg-slate-100 text-[#a1a1aa] border-slate-200'
                      }`}
                    >
                      🚇 Rajiv Gate
                    </button>
                    <button 
                      onClick={() => setActivePinkHub('mall')}
                      className={`text-[9px] py-1.5 font-bold rounded-lg uppercase cursor-pointer transition-all border text-center ${
                        activePinkHub === 'mall' ? 'bg-brand-navy-950 text-white border-brand-navy-950' : 'bg-slate-50 hover:bg-slate-100 text-[#a1a1aa] border-slate-200'
                      }`}
                    >
                      🛍️ Galleria
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-brand-yellow-50 border border-brand-yellow-100 rounded-xl space-y-2 text-brand-navy-900 border-l-4 border-l-brand-yellow-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-brand-navy-900" />
                    <span className="font-extrabold text-xs">{pinkZonesInfo[activePinkHub].name}</span>
                  </div>
                  <div>
                    <span className="text-[7px] font-black uppercase tracking-wider text-slate-500 block">Checkpoint Status</span>
                    <span className="text-[11px] font-black text-emerald-600 block">{pinkZonesInfo[activePinkHub].status}</span>
                  </div>
                  <div>
                    <span className="text-[7px] font-black uppercase tracking-wider text-slate-500 block">Active Equipment Included</span>
                    <p className="text-[11px] font-semibold text-slate-700 leading-relaxed">
                      {pinkZonesInfo[activePinkHub].installations}
                    </p>
                  </div>
                </div>

                <p className="text-[9px] italic text-[#4b5563] text-center font-bold">
                  ⚡ 4 Captain backup bikes patrolling within 5 minutes of this spot.
                </p>
              </div>
            )}

          </div>

          {/* RIGHT SIDE SUB-SECTION DISPLAY - Feature Cards list inside Current Active Tab */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-[10px] bg-brand-navy-50 border border-brand-navy-100 text-brand-navy-900 px-3 py-1 rounded-full font-black uppercase tracking-wider">
                Active Category Features
              </span>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-2.5 max-w-xl">
                {currentTabData.desc}
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {currentTabData.features.map((feature, fIdx) => (
                <div 
                  key={feature.id}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-brand-yellow-500/40 hover:bg-slate-50/50 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3 mb-3">
                    <h4 className="font-black text-base text-brand-navy-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-yellow-500"></span>
                      {feature.title}
                    </h4>
                    {feature.badge && (
                      <span className="text-[8px] sm:text-[9px] font-black bg-brand-navy-900 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider text-center shrink-0">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-semibold mb-3 leading-relaxed">
                    {feature.shortDesc}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {feature.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex gap-1.5 items-start text-[11px] font-semibold text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                        <span className="leading-tight">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Quick explanatory footer */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-yellow-500 shrink-0" />
                <span className="text-[10px] font-black uppercase text-brand-navy-900 leading-tight">
                  Standard Safety Guidelines and Legal compliance verified
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

          </div>

        </div>

        {/* ------------------- ADDITIONAL STATS CALL TO ACTION ------------------- */}
        <div className="mt-14 text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            All 19 core features have been fully mapped under the active Rydeon Protocol System.
          </p>
        </div>

      </div>
    </section>
  );
}
