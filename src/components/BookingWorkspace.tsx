import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Navigation, Bike, Car, Sparkles, Shield, ShieldCheck, 
  AlertTriangle, PhoneIncoming, Star, HelpCircle, Eye, Info, 
  Map, Activity, Volume2, Mic, Check, RotateCcw, Award, Globe, Heart
} from 'lucide-react';
import { PredefinedLandmark, RideMode } from '../types';
import { landmarks, rideOptions, mockCaptains } from '../data';

export default function BookingWorkspace() {
  // Navigation workflow state machine
  const [activeStage, setActiveStage] = useState<'plan' | 'match' | 'embark' | 'transit' | 'feedback'>('plan');
  
  // Form selections coordinate
  const [pickup, setPickup] = useState<PredefinedLandmark | null>(landmarks[0]);
  const [dropoff, setDropoff] = useState<PredefinedLandmark | null>(landmarks[1]);
  const [rideMode, setRideMode] = useState<RideMode>('bike');
  const [securityLevel, setSecurityLevel] = useState<'v1' | 'v2' | 'v3'>('v2');
  const [shareContact, setShareContact] = useState<string>('My Mother (+91 98111 22233)');
  
  // Custom companion patrol trigger
  const [patrolDispatched, setPatrolDispatched] = useState(false);
  const [audioMeterActive, setAudioMeterActive] = useState(false);
  const [audioVolume, setAudioVolume] = useState<number>(10);
  const [micError, setMicError] = useState<string | null>(null);

  // Simulated metrics
  const [customPin, setCustomPin] = useState('8832');
  const [etaMins, setEtaMins] = useState(3);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [transitLogs, setTransitLogs] = useState<string[]>([
    'Secure Pin code KA-03 verified.',
    'Tracking initiated at Aura Command Room.'
  ]);

  const [rating, setRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  // Audio analysis references
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Safe distance calculation
  const getDistanceKm = () => {
    if (!pickup || !dropoff) return 0;
    const dx = dropoff.coordinates.x - pickup.coordinates.x;
    const dy = dropoff.coordinates.y - pickup.coordinates.y;
    return Math.round(Math.sqrt(dx*dx + dy*dy) * 0.15 * 10) / 10;
  };

  const distanceKm = getDistanceKm();
  const activeOption = rideOptions.find(o => o.id === rideMode) || rideOptions[0];
  const fareBase = Math.max(40, Math.round(distanceKm * activeOption.pricePerKm));
  const securityPremium = securityLevel === 'v3' ? 45 : securityLevel === 'v2' ? 15 : 0;
  const totalPrice = fareBase + securityPremium;

  // Cleanup microphone resources on transition
  const stopAudioEstimator = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setAudioMeterActive(false);
  };

  // Web Audio microphone stress simulator
  const startAudioEstimator = async () => {
    try {
      setMicError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = mediaStream;
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(mediaStream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      setAudioMeterActive(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        // Map average into safe scale of 0-100
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setAudioVolume(normalized || 5);
        if (normalized > 85) {
          // Trigger automatic panic notification block!
          setPatrolDispatched(true);
        }
        if (streamRef.current) {
          requestAnimationFrame(checkVolume);
        }
      };
      
      requestAnimationFrame(checkVolume);
    } catch (e) {
      console.warn("Microphone access declined or failed.", e);
      setMicError("Microphone blocked. Utilizing simulated decibel analyzer.");
      setAudioMeterActive(true);
      // Fallback manual interval simulation
      let direction = 1;
      const runFallback = () => {
        setAudioVolume(prev => {
          let next = prev + (Math.random() * 15 * direction);
          if (next > 45) { direction = -1; }
          if (next < 8) { direction = 1; }
          return Math.min(80, Math.max(5, Math.round(next)));
        });
        if (streamRef.current === null && audioMeterActive) {
          setTimeout(runFallback, 800);
        }
      };
      runFallback();
    }
  };

  // Matchmaking delay simulation
  const startMatchRadar = () => {
    setActiveStage('match');
    setTimeout(() => {
      setCustomPin(Math.floor(1000 + Math.random() * 9000).toString());
      setActiveStage('embark');
    }, 3800);
  };

  // Embark to actual journey simulation
  const startJourney = () => {
    setActiveStage('transit');
    setSecondsLeft(25); // Faster simulation for showcase
    setTransitLogs([
      '⚡ Step-Sit Secure PIN Verified.',
      '🛣️ Guided GPS corridor initialized.',
      '👁️ Command staff holding active vision check'
    ]);
  };

  // Transit state timer ticks
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeStage === 'transit' && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setActiveStage('feedback');
            stopAudioEstimator();
            return 0;
          }
          return prev - 1;
        });

        // Tick random logistical safe logs
        const milestoneLogs = [
          "📍 Cleared Metro-Tech Safe Zone Checkpoint 3.",
          "🛡️ Dynamic route verified. Forward traffic normal.",
          "🛵 Safe speed telemetry holding steady at 37km/h.",
          "🌟 Smart-Safehouse check-in successful. All beacons green.",
          "🔒 Real-time voice pattern status checking clear."
        ];
        const randomLog = milestoneLogs[Math.floor(Math.random() * milestoneLogs.length)];
        setTransitLogs(prev => [...prev.slice(-3), randomLog]);
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [activeStage, secondsLeft]);

  // Clean elements on destroy
  useEffect(() => {
    return () => {
      stopAudioEstimator();
    };
  }, []);

  const resetAllWorkflow = () => {
    setActiveStage('plan');
    setPickup(landmarks[0]);
    setDropoff(landmarks[1]);
    setRideMode('bike');
    setSecurityLevel('v2');
    setPatrolDispatched(false);
    setFeedbackSubmitted(false);
    setUserComment('');
    stopAudioEstimator();
  };

  const matchedCaptain = mockCaptains[rideMode === 'bike' ? 0 : rideMode === 'auto' ? 1 : 2] || mockCaptains[0];

  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-3xl border border-slate-200 shadow-xl overflow-hidden mt-8 mb-12">
      
      {/* Upper Interactive Dashboard Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-black text-brand-yellow-600 bg-brand-yellow-500/10 px-3 py-1 rounded-full border border-brand-yellow-500/20 inline-block mb-2">Live Portal Simulator</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-900 tracking-tight">Active Booking Console</h2>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Experience raw forensic security matching, checkpoint tracking, and stress alerts firsthand.</p>
        </div>

        {/* Action resets */}
        <div className="flex gap-2.5">
          <button 
            onClick={resetAllWorkflow}
            className="flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Workflow</span>
          </button>
          <div className="flex items-center gap-1 bg-brand-navy-900 border border-white/10 px-3.5 py-1.5 rounded-xl shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10.5px] font-mono text-emerald-400 font-extrabold tracking-wide uppercase">Command Desk Online</span>
          </div>
        </div>
      </div>

      {/* Progress horizontal steps mapping */}
      <div className="mb-10 block">
        <div className="grid grid-cols-5 text-center divide-x divide-slate-100 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm">
          {[
            { tag: 'plan', label: '1. Plan Route' },
            { tag: 'match', label: '2. Search Shield' },
            { tag: 'embark', label: '3. Secure PIN' },
            { tag: 'transit', label: '4. Live Escort' },
            { tag: 'feedback', label: '5. Safe Arrival' }
          ].map((item, index) => {
            const activeMatches = {
              plan: ['plan'],
              match: ['match'],
              embark: ['embark'],
              transit: ['transit'],
              feedback: ['feedback']
            }[activeStage];

            const isActive = activeMatches.includes(item.tag);
            const isCompleted = index < ['plan', 'match', 'embark', 'transit', 'feedback'].indexOf(activeStage);

            return (
              <div 
                key={item.tag}
                className={`py-2 px-1 text-[11px] font-black transition-all ${
                  isActive 
                    ? 'text-brand-navy-900 bg-brand-yellow-500/20 rounded-xl' 
                    : isCompleted 
                      ? 'text-emerald-500' 
                      : 'text-slate-400'
                }`}
              >
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main double column grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Map & System Telemetry Visual Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-navy-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 text-white relative">
            
            {/* Mock Vector Grid Map Background */}
            <div className="h-[360px] bg-slate-950 flex flex-col justify-between p-4 relative overflow-hidden" id="booking-radar-view">
              
              {/* Radial sonar line overlay for matching stage */}
              {activeStage === 'match' && (
                <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 border-2 border-brand-yellow-500/35 rounded-full animate-ping text-center flex items-center justify-center">
                    <div className="w-44 h-44 border border-brand-yellow-500/20 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 border border-dashed border-brand-yellow-500/40 rounded-full animate-spin-slow"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid abstract design */}
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-[0.06] pointer-events-none">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white"></div>
                ))}
              </div>

              {/* Dynamic Coordinate Map Coordinates layout */}
              {pickup && (
                <div 
                  className="absolute bg-emerald-500 border-2 border-white text-white p-1 rounded-lg text-[9.5px] font-bold z-10 flex items-center gap-1 shadow-md transition-all duration-700"
                  style={{ left: `${pickup.coordinates.x}%`, top: `${pickup.coordinates.y}%` }}
                >
                  <MapPin className="w-2.5 h-2.5 text-white" />
                  <span>Pickup</span>
                </div>
              )}

              {dropoff && (
                <div 
                  className="absolute bg-brand-yellow-500 border-2 border-brand-navy-900 text-brand-navy-900 p-1 rounded-lg text-[9.5px] font-black z-10 flex items-center gap-1 shadow-md transition-all duration-700"
                  style={{ left: `${dropoff.coordinates.x}%`, top: `${dropoff.coordinates.y}%` }}
                >
                  <MapPin className="w-2.5 h-2.5 text-brand-navy-900" />
                  <span>Dropoff</span>
                </div>
              )}

              {/* Animated scooter tracking item during transit */}
              {activeStage === 'transit' && pickup && dropoff && (
                <div 
                  className="absolute bg-white border-2 border-brand-yellow-500 text-brand-navy-900 p-1.5 rounded-full z-15 shadow-2xl transition-all duration-500"
                  style={{ 
                    // Interpolate coordinates over time left
                    left: `${pickup.coordinates.x + ((dropoff.coordinates.x - pickup.coordinates.x) * ((25 - secondsLeft) / 25))}%`, 
                    top: `${pickup.coordinates.y + ((dropoff.coordinates.y - pickup.coordinates.y) * ((25 - secondsLeft) / 25))}%` 
                  }}
                >
                  <Bike className="w-4.5 h-4.5 text-brand-navy-900 animate-bounce" />
                </div>
              )}

              {/* Absolute Top Map Details Tag */}
              <div className="relative z-10 flex justify-between items-center bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 w-full shadow-inner">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-brand-yellow-400" />
                  <span className="text-[10px] font-black tracking-widest uppercase text-gray-200">Aura Live Geographic Layer</span>
                </div>
                <div className="text-[9.5px] font-mono text-[#cbd5e1] font-bold">128-Bit Cryptographic SSL</div>
              </div>

              {/* System Warning/Distress Dispatch Display */}
              {patrolDispatched ? (
                <div className="absolute inset-x-4 top-1/3 bg-red-950/95 border border-red-500/40 p-4 rounded-2xl text-center shadow-2xl animate-bounce z-20 space-y-2">
                  <div className="flex justify-center items-center gap-1.5 text-red-500">
                    <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider">Patrol Intercept Initiated</span>
                  </div>
                  <p className="text-[10px] text-gray-300">Rydeon Dispatch Unit KA-07 has redirected to your current safe-point. Hold tight, sister.</p>
                </div>
              ) : null}

              {/* Map Footer status */}
              <div className="relative z-10 bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block">Routing Coordinates</span>
                  <span className="font-mono text-[10.5px] text-white">X:{pickup?.coordinates.x} Y:{pickup?.coordinates.y} → X:{dropoff?.coordinates.x} Y:{dropoff?.coordinates.y}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block text-right">Distance Estimate</span>
                  <span className="font-black text-[11.5px] text-brand-yellow-500">{distanceKm} Kms</span>
                </div>
              </div>

            </div>

            {/* Simulated Live Audio Stream (Decibel level metric) */}
            <div className="p-4 bg-[#0a0f1d] border-t border-white/5 space-y-3 font-semibold text-xs text-slate-300">
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-yellow-400" />
                  <span className="font-extrabold uppercase text-[10.5px] tracking-wider text-slate-300">Acoustic Audio SafeCheck</span>
                </div>

                <button 
                  onClick={audioMeterActive ? stopAudioEstimator : startAudioEstimator}
                  className={`px-3 py-1.5 rounded-full text-[9px] uppercase font-black tracking-widest transition-all cursor-pointer ${
                    audioMeterActive 
                      ? 'bg-rose-600 text-white animate-pulse' 
                      : 'bg-brand-yellow-500 text-brand-navy-900 hover:bg-brand-yellow-600'
                  }`}
                >
                  {audioMeterActive ? '🛑 Disconnect Mic' : '🎙️ Link Micro Check'}
                </button>
              </div>

              {mIdValue(micError)}

              {audioMeterActive ? (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex justify-between text-[9px] text-slate-400 uppercase">
                    <span>Stress Level Decibels Meter</span>
                    <span className={audioVolume > 70 ? 'text-rose-500 animate-pulse font-black' : 'text-slate-300'}>
                      {audioVolume}% {audioVolume > 70 ? '(HI PRESSURE)' : '(NORMAL)'}
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden flex" id="volume-mic-grid">
                    <div 
                      className={`h-full transition-all duration-100 ${
                        audioVolume > 75 
                          ? 'bg-rose-500 animate-pulse' 
                          : audioVolume > 40 
                            ? 'bg-brand-yellow-500' 
                            : 'bg-emerald-500'
                      }`} 
                      style={{ width: `${audioVolume}%` }}
                    ></div>
                  </div>
                  <p className="text-[9.5px] text-slate-400 leading-normal font-normal">
                    🎙️ Our AI monitors high-intensity sounds. High stress patterns (above 85%) automatically trigger safety patrol intercepts. Try generating a loud clap!
                  </p>
                </div>
              ) : (
                <p className="text-[10px] text-slate-500 text-left font-medium">
                  Connect microphone to engage Rydeon Acoustic AI verification. Any audio analysis processes entirely client-side for true privacy safeguards.
                </p>
              )}

            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form Workflows & Substeps (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl min-h-[500px] flex flex-col justify-between">
          
          {/* STAGE 1: PLAN ROUTE FORM */}
          {activeStage === 'plan' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Map className="w-5 h-5 text-brand-navy-900" />
                <h3 className="font-extrabold text-brand-navy-900 text-base">Select Route & Safety Level</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pickup Address Select */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Where can we match you?</label>
                  <select 
                    value={pickup?.id || ''} 
                    onChange={(e) => {
                      const found = landmarks.find(l => l.id === e.target.value);
                      setPickup(found || null);
                    }}
                    className="w-full bg-slate-5.0 hover:bg-slate-100 border border-slate-200 text-slate-800 h-[50px] px-3 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-yellow-500 focus:border-transparent transition-all cursor-pointer font-semibold"
                  >
                    {landmarks.map(l => (
                      <option key={`pk-${l.id}`} value={l.id}>{l.name} ({l.popularity})</option>
                    ))}
                  </select>
                </div>

                {/* Dropoff Address Select */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Where is your final safe destination?</label>
                  <select 
                    value={dropoff?.id || ''} 
                    onChange={(e) => {
                      const found = landmarks.find(l => l.id === e.target.value);
                      setDropoff(found || null);
                    }}
                    className="w-full bg-slate-5.0 hover:bg-slate-100 border border-slate-200 text-slate-800 h-[50px] px-3 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-yellow-500 focus:border-transparent transition-all cursor-pointer font-semibold"
                  >
                    {landmarks.map(l => (
                      <option key={`dp-${l.id}`} value={l.id}>{l.name} ({l.popularity})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selection of Category */}
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center sm:text-left">Choose secure Transit Vehicle</span>
                <div className="grid grid-cols-3 gap-4">
                  {rideOptions.map(opt => {
                    const isSelected = rideMode === opt.id;
                    const emoji = opt.id === 'bike' ? '🏍️' : opt.id === 'auto' ? '🛺' : '🚗';
                    const name = opt.id === 'bike' ? 'Bike' : opt.id === 'auto' ? 'Auto' : 'Cab';
                    return (
                      <button
                        key={`sel-${opt.id}`}
                        onClick={() => setRideMode(opt.id)}
                        className={`py-5 px-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 shadow-sm ${
                          isSelected 
                            ? 'bg-brand-navy-900 text-white border-brand-navy-900 shadow-md transform scale-[1.02]' 
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center justify-center gap-1.5 font-extrabold text-sm sm:text-base">
                          <span>{emoji}</span>
                          <span>{name}</span>
                        </span>
                        <span className={`block text-xs sm:text-sm font-bold opacity-90 ${isSelected ? 'text-brand-yellow-400' : 'text-slate-500'}`}>
                          ₹{opt.pricePerKm}/km
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vetting Security Escort Level Selection */}
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Configure Vetting Escort Level</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'v1', name: 'V1 Standard Premium', desc: 'Vetted partner Captains + live GPS coordinates checking.', surcharge: '₹0' },
                    { id: 'v2', name: 'V2 Escort Guard', desc: 'V1 + Automatic verification calls every 1.5 mins.', surcharge: '+₹15' },
                    { id: 'v3', name: 'V3 Maximum Patrol', desc: 'V2 + Continuous nearby motorcycle patrol escort.', surcharge: '+₹45' }
                  ].map(sec => {
                    const isActive = securityLevel === sec.id;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => setSecurityLevel(sec.id as any)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isActive 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                            : 'bg-[#fafafa] hover:bg-slate-150 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-extrabold text-[11px] block">{sec.name}</span>
                            <span className="text-[9.5px] px-1.5 py-0.5 bg-brand-yellow-500 text-brand-navy-900 rounded font-black">{sec.surcharge}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1.5 leading-normal font-semibold font-sans">{sec.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Emergency sharing contacts choice */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Auto-Share Route tracking Link with</label>
                <select 
                  value={shareContact} 
                  onChange={(e) => setShareContact(e.target.value)}
                  className="w-full bg-slate-5.0 hover:bg-slate-100 border border-slate-200 text-slate-800 h-[50px] px-3 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer font-semibold"
                >
                  <option value="My Mother (+91 98111 22233)">My Mother (+91 98111 22233)</option>
                  <option value="Sister Shweta (+91 99313 88123)">Sister Shweta (+91 99313 88123)</option>
                  <option value="Partner Vikram (+91 95412 11090)">Partner Vikram (+91 95412 11090)</option>
                  <option value="Safety Helpline Command Unit (Direct link)">Safety Helpline Command Unit (Direct link)</option>
                </select>
              </div>

              {/* Pricing Quote & Match proceed button */}
              <div className="bg-brand-navy-900 rounded-2xl p-4.5 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-gray-400 block pb-0.5">Simulated Safety Tariff Quote</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-brand-yellow-500">₹{totalPrice}</span>
                    <span className="text-[11px] text-[#94a3b8] font-bold">({distanceKm} Kms checked route)</span>
                  </div>
                </div>

                <button 
                  onClick={startMatchRadar}
                  className="bg-brand-yellow-500 hover:bg-brand-yellow-600 text-brand-navy-900 font-extrabold uppercase py-3 px-8 rounded-xl tracking-wider text-xs flex items-center gap-1.5 shadow-md shadow-brand-yellow-500/10 cursor-pointer w-full sm:w-auto justify-center active:scale-97"
                >
                  <span>Request Safe Matching</span>
                  <Navigation className="w-3.5 h-3.5 transform rotate-45" />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: RADAR SEARCH ANIMATION */}
          {activeStage === 'match' && (
            <div className="text-center py-16 space-y-6 animate-fade-in flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-brand-yellow-500/10 border-2 border-brand-yellow-500/30 rounded-full flex items-center justify-center animate-pulse">
                <ShieldCheck className="w-12 h-12 text-brand-yellow-500 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-brand-navy-900 uppercase tracking-tight">Vetting V3 Safe-Shield Captain</h3>
                <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
                  Scanning for nearby vetted on-duty female partners and family-verified safety pilots. Synchronizing emergency desk linkages...
                </p>
              </div>

              {/* Progress feedback updates container */}
              <div className="p-4 bg-[#fafafa] rounded-2xl border border-slate-200/80 text-left font-mono text-[10px] text-slate-600 max-w-md w-full space-y-1.5 shadow-inner">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>[0.8s] Establishing SSL coordinate beacons... Ok.</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>[1.5s] Performing facial log integrity checklist on local pilots... Done.</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>[2.8s] Locking physical guard escort coordinate blocks... Standby.</span>
                </p>
              </div>
            </div>
          )}

          {/* STAGE 3: EMBARK WITH PIN */}
          {activeStage === 'embark' && matchedCaptain && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-extrabold text-brand-navy-900 text-base">Match Verification & Embarkation</h3>
                <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">Approved</span>
              </div>

              {/* Captain Credentials Panel */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 bg-[#fafafa] border rounded-2xl">
                <img src={matchedCaptain.photoUrl} className="w-16 h-16 rounded-full object-cover border-4 border-brand-yellow-500 shadow-md shrink-0" alt="captain" />
                
                <div className="flex-grow space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-brand-navy-900 text-base">{matchedCaptain.name}</span>
                    <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
                      ⭐ {matchedCaptain.rating} ({matchedCaptain.completedRides} rides)
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-1 font-semibold text-xs">
                    <span className="bg-brand-navy-900 text-white font-mono px-2 py-0.5 rounded">
                      {matchedCaptain.licensePlate}
                    </span>
                    <span className="text-slate-500 pt-0.5">{matchedCaptain.vehicleModel}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Certified background validation: Registered 2024 Bengaluru City Hub.</p>
                </div>
              </div>

              {/* PIN Code Verification block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 border-2 border-dashed border-brand-yellow-500/50 bg-brand-yellow-500/5 rounded-2xl text-center flex flex-col justify-center">
                  <span className="text-[9.5px] uppercase tracking-widest font-black text-slate-400 block mb-1">Verify matched companion code</span>
                  <span className="text-4xl font-extrabold tracking-[0.2em] text-brand-navy-900">{customPin}</span>
                  <span className="text-[9.5px] text-slate-400 leading-normal font-medium mt-1">Provide this match code to the Captain only. Do not share over phone.</span>
                </div>

                {/* Pre commute checklist card */}
                <div className="p-4 bg-[#eff6ff] border border-blue-200 rounded-2xl space-y-2.5">
                  <h4 className="font-extrabold text-[11px] text-blue-900 uppercase">Commute Checklist Guidelines:</h4>
                  
                  <div className="space-y-1.5 font-semibold text-xs text-blue-800">
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Are you wearing both available Helmets?</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Has SMS route tracking link sent to {shareContact.split(' ')[0]}?</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Plexiglass barrier securely in place?</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Transition action buttons */}
              <div className="flex gap-4 pt-2">
                <button 
                  onClick={resetAllWorkflow}
                  className="flex-1 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 font-extrabold uppercase rounded-xl text-xs"
                >
                  Cancel Booking
                </button>
                <button 
                  onClick={startJourney}
                  className="flex-1 py-3 bg-brand-yellow-500 hover:bg-brand-yellow-600 text-brand-navy-900 font-black uppercase rounded-xl text-xs shadow-md active:scale-98"
                >
                  Start Trip Commute
                </button>
              </div>

            </div>
          )}

          {/* STAGE 4: TRANSIT LIVE */}
          {activeStage === 'transit' && matchedCaptain && (
            <div className="space-y-5 animate-fade-in text-left">
              <div className="flex justify-between items-center border-b pb-3.5">
                <div>
                  <span className="text-[9.5px] uppercase tracking-widest font-black text-brand-yellow-600">Simulating On Road Journey</span>
                  <h3 className="font-black text-brand-navy-900 text-base">V3 Secured Physical Escort Mode</h3>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold font-sans">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  <span>Active Live Telemetry</span>
                </div>
              </div>

              {/* Live coordinates display stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-[#fafafa] border border-slate-200/80 p-3 rounded-2xl">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Average Speed</span>
                  <div className="text-xl font-extrabold text-brand-navy-900 font-mono mt-0.5">38 km/h</div>
                </div>
                <div className="bg-[#fafafa] border border-slate-200/80 p-3 rounded-2xl">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Safeguard ETA</span>
                  <div className="text-xl font-extrabold text-brand-yellow-600 font-mono mt-0.5">~3 Minutes</div>
                </div>
                <div className="bg-[#fafafa] border border-slate-200/80 p-3 rounded-2xl col-span-2 sm:col-span-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Corridor check</span>
                  <div className="text-xl font-extrabold text-emerald-500 font-sans mt-0.5">100% CLEAR</div>
                </div>
              </div>

              {/* Real-time event log tracker */}
              <div className="p-4 bg-[#0f172a] text-white rounded-2xl space-y-2 font-mono text-[10.5px]">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block border-b border-white/5 pb-2">✓ Safepath Event Stream Logs</span>
                <div className="space-y-1.5 select-none text-slate-300">
                  {transitLogs.map((log, idx) => (
                    <p key={`log-${idx}`} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">►</span>
                      <span>{log}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Security controls trigger */}
              <div className="p-4 bg-rose-50 border border-rose-200/80 rounded-2xl space-y-3 mt-1.5">
                <div className="flex items-center gap-1.5 text-rose-900">
                  <AlertTriangle className="w-5 h-5 text-red-500 animate-bounce" />
                  <div>
                    <h4 className="font-extrabold text-xs">Direct Patrol Command Center Intercept</h4>
                    <span className="text-[9.5px] text-slate-500 block">Instantly ping nearby motorcycle backup to physical coordinates</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button 
                    onClick={() => setPatrolDispatched(prev => !prev)}
                    className={`py-2 px-4 rounded-xl border text-xs font-black uppercase transition-all cursor-pointer ${
                      patrolDispatched 
                        ? 'bg-rose-600 text-white border-rose-600 animate-pulse' 
                        : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    🚨 {patrolDispatched ? 'Patrol On Route' : 'SOS Patrol'}
                  </button>
                  <button 
                    onClick={() => {
                      alert("Press OK to trigger pre-recorded safety desk voice response call.");
                      setPatrolDispatched(true);
                    }}
                    className="py-2 px-4 bg-white hover:bg-rose-100 border border-rose-200 text-rose-900 font-extrabold uppercase rounded-xl text-xs cursor-pointer"
                  >
                    📞 Fake Call Check
                  </button>
                </div>
              </div>

              {/* Instant trigger simulation button */}
              <button 
                onClick={() => {
                  stopAudioEstimator();
                  setActiveStage('feedback');
                }}
                className="w-full py-3 bg-brand-navy-900 hover:bg-[#111827] text-white rounded-xl text-xs uppercase font-black tracking-widest mt-2 cursor-pointer shadow-md"
              >
                Simulate Successful Destination Arrival
              </button>

            </div>
          )}

          {/* STAGE 5: COMPLETED FEEDBACK */}
          {activeStage === 'feedback' && matchedCaptain && (
            <div className="space-y-6 animate-fade-in text-center py-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-black text-brand-navy-900">Journey Finished Safely!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Green arrival status received and confirmed by Aura Command Room. Your automatic sharing links have been safely closed down.
                </p>
              </div>

              {!feedbackSubmitted ? (
                <div className="p-5.5 bg-[#fafafa] rounded-2xl border border-slate-200 text-left space-y-4 max-w-md mx-auto shadow-inner">
                  <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block text-center">Safety Rating Report</span>
                  
                  {/* Rating Stars selectable */}
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button 
                        key={s} 
                        type="button"
                        onClick={() => setRating(s)}
                        className="transform transition-transform hover:scale-115 cursor-pointer"
                      >
                        <Star className={`w-8 h-8 ${s <= rating ? 'fill-brand-yellow-500 text-brand-yellow-500' : 'text-slate-200'}`} />
                      </button>
                    ))}
                  </div>

                  {/* Feedback checkup logs text input */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Any direct safety feedback about {matchedCaptain.name}?</label>
                    <textarea 
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      placeholder="e.g. Helmet was pristine. Defensive speed followed beautifully. Highly friendly driver."
                      className="w-full bg-white border border-slate-200 p-3 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-yellow-500 min-h-[70px]"
                    />
                  </div>

                  <button 
                    onClick={() => setFeedbackSubmitted(true)}
                    className="w-full py-2.5 bg-brand-navy-900 text-white font-extrabold uppercase rounded-xl text-xs tracking-wider cursor-pointer"
                  >
                    Submit Secure Report
                  </button>
                </div>
              ) : (
                <div className="p-5.5 bg-emerald-50 border border-emerald-100 rounded-2xl text-left max-w-md mx-auto space-y-3 animate-fade-in animate-pulse">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Award className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="font-extrabold text-xs">Certified safe travel score loaded!</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                    Thank you, sister! Your feedback has been verified and registered directly into our Rydeon Safety Hub databases. You have earned **₹25 Safe Rider Points** cashback!
                  </p>
                </div>
              )}

              {/* Complete and Return options */}
              <button 
                onClick={resetAllWorkflow}
                className="mx-auto border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs uppercase px-8 py-2.5 rounded-full block cursor-pointer transition-colors shadow-sm"
              >
                Book Another Safe Commute
              </button>

            </div>
          )}

          {/* Core Brand Safety stamp footer for credibility */}
          <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between text-slate-400 text-[10.5px]">
            <span className="flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <span>Certified forensic background cleared</span>
            </span>
            <span className="font-mono">Checked KA-2026 Core Protocols</span>
          </div>

        </div>

      </div>

    </div>
  );
}

// Clean mIdValue helper to support robust syntax
function mIdValue(val: string | null) {
  if (!val) return null;
  return (
    <div className="p-2 bg-red-950/25 border border-red-500/20 text-red-400 text-[10px] rounded animate-pulse">
      {val}
    </div>
  );
}
