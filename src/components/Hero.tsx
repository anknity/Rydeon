import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Check, Navigation, Bike, Car, Sparkles, Shield, AlertTriangle, 
  ShieldCheck, Heart, User, CheckCircle2, ChevronRight, RefreshCw, Star, 
  Volume2, PhoneIncoming, PhoneOff, Compass, ArrowRight, Info
} from 'lucide-react';
import { BookingState, PredefinedLandmark } from '../types';
import { landmarks, rideOptions, mockCaptains } from '../data';

export default function Hero() {
  const [booking, setBooking] = useState<BookingState>({
    step: 'idle',
    pickup: null,
    dropoff: null,
    mode: 'bike',
    priceEstimate: 0,
    captain: null,
    durationSeconds: 0,
    elapsedSeconds: 0,
    trackingPin: '',
    isSOSActive: false,
    sosAlertSent: false
  });

  const [matchingTime, setMatchingTime] = useState(0);
  const [preferFemaleOnly, setPreferFemaleOnly] = useState(true);
  const [fakeCallStep, setFakeCallStep] = useState<'none' | 'dialing' | 'connected' | 'ended'>('none');
  const [ratingVal, setRatingVal] = useState<number>(5);
  const [isTipped, setIsTipped] = useState<number | null>(null);
  const [rideLogs, setRideLogs] = useState<string[]>([]);
  const [gpsLoading, setGpsLoading] = useState(false);

  // Audio refs or state simulators
  const [alertBeepActive, setAlertBeepActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const calculateDistance = (p1: PredefinedLandmark, p2: PredefinedLandmark) => {
    const dx = p2.coordinates.x - p1.coordinates.x;
    const dy = p2.coordinates.y - p1.coordinates.y;
    return Math.round(Math.sqrt(dx*dx + dy*dy) * 0.14 * 10) / 10;
  };

  const distanceKm = booking.pickup && booking.dropoff 
    ? calculateDistance(booking.pickup, booking.dropoff) 
    : 0;

  useEffect(() => {
    if (booking.pickup && booking.dropoff) {
      const option = rideOptions.find(o => o.id === booking.mode) || rideOptions[0];
      const baseEstimate = distanceKm * option.pricePerKm;
      const calculatedPay = Math.max(40, Math.round(baseEstimate));
      setBooking(prev => ({ ...prev, priceEstimate: calculatedPay }));
    }
  }, [booking.pickup, booking.dropoff, booking.mode, distanceKm]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (booking.step === 'ongoing') {
      interval = setInterval(() => {
        setBooking(prev => {
          const nextElapsed = prev.elapsedSeconds + 1;
          const finished = nextElapsed >= prev.durationSeconds;
          return {
            ...prev,
            elapsedSeconds: nextElapsed,
            step: finished ? 'completed' : 'ongoing'
          };
        });

        const randomPoints = [
          "Departed Pickup Junction. Speed steady at 38km/h.",
          "Navigating high-visibility arterial bypass.",
          "Passing Rydeon Smart Safehouse Checkpoint. Safe-logs green.",
          "Ensuring comfortable braking. Speed limited to 40km/h.",
          "Entering dropoff area lane. Helmets checked.",
        ];
        const logIndex = Math.floor(Math.random() * randomPoints.length);
        setRideLogs(prevLogs => [...prevLogs.slice(-2), randomPoints[logIndex]]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [booking.step]);

  const handleGPSLocation = () => {
    setGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            setBooking(prev => ({ ...prev, pickup: landmarks[0] }));
            setGpsLoading(false);
          }, 1000);
        },
        (error) => {
          console.warn("GPS Access failed.", error);
          setTimeout(() => {
            setBooking(prev => ({ ...prev, pickup: landmarks[0] }));
            setGpsLoading(false);
          }, 1000);
        }
      );
    } else {
      setBooking(prev => ({ ...prev, pickup: landmarks[0] }));
      setGpsLoading(false);
    }
  };

  const toggleSOSAlarm = () => {
    const isNowActive = !booking.isSOSActive;
    setBooking(prev => ({ 
      ...prev, 
      isSOSActive: isNowActive,
      sosAlertSent: isNowActive ? true : prev.sosAlertSent
    }));

    if (isNowActive) {
      setAlertBeepActive(true);
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(650, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(950, ctx.currentTime + 1);
        osc.loop = true;

        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
      } catch (e) {
        console.warn("Audio Context failed.", e);
      }
    } else {
      setAlertBeepActive(false);
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch(err) {}
        oscRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch(err) {}
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleInitiateBooking = () => {
    if (!booking.pickup || !booking.dropoff) return;
    
    setBooking(prev => ({ ...prev, step: 'matching' }));
    setRideLogs(["Establishing secure routing request...", "Connecting encrypted safe-beacons..."]);

    let matchSecs = 0;
    const matchTimer = setInterval(() => {
      matchSecs += 1;
      setMatchingTime(matchSecs);

      if (matchSecs >= 3) {
        clearInterval(matchTimer);
        const compatibleCaptains = mockCaptains.filter(c => {
          if (booking.mode === 'bike') return c.vehicleModel.includes('Vespa');
          if (booking.mode === 'auto') return c.vehicleModel.includes('Auto');
          return c.vehicleModel.includes('SafeGuard');
        });

        const matchedCaptain = compatibleCaptains[0] || mockCaptains[0];
        const pinGenerated = Math.floor(1000 + Math.random() * 9000).toString();

        setBooking(prev => ({
          ...prev,
          step: 'found',
          captain: matchedCaptain,
          trackingPin: pinGenerated,
          durationSeconds: Math.max(10, Math.round(distanceKm * 4)),
          elapsedSeconds: 0
        }));
      }
    }, 1000);
  };

  const handleStartActiveRide = () => {
    setBooking(prev => ({ ...prev, step: 'ongoing' }));
    setRideLogs([
      "Secure Pin Verified.", 
      "Welcome onboard Rydeon. Defensive routing enabled."
    ]);
  };

  const handleResetRide = () => {
    setBooking({
      step: 'idle',
      pickup: null,
      dropoff: null,
      mode: 'bike',
      priceEstimate: 0,
      captain: null,
      durationSeconds: 0,
      elapsedSeconds: 0,
      trackingPin: '',
      isSOSActive: false,
      sosAlertSent: false
    });
    setRideLogs([]);
    setFakeCallStep('none');
    setIsTipped(null);
  };

  const handleFakeCall = (command: 'dial' | 'hangup') => {
    if (command === 'dial') {
      setFakeCallStep('dialing');
      setTimeout(() => {
        setFakeCallStep('connected');
      }, 1500);
    } else {
      setFakeCallStep('ended');
      setTimeout(() => {
        setFakeCallStep('none');
      }, 500);
    }
  };

  const fakeDialogues = [
    "[Safety Desk]: 'Hello! Active live tracking is active. Confirm all is well?'",
    "[Rider Response]: 'Yes, matched with Captain on route safely.'",
  ];

  return (
    <section className="relative bg-white pt-10 pb-20 overflow-hidden" id="home-section">
      {/* Decorative clean background mesh exactly like Rapido corporate aesthetics */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-slate-50/50 skew-x-12 origin-top-right -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Combined Title + Interactive Booking Deck (Clean Rapido Layout) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <h1 className="text-[#111116] tracking-tight leading-[1.1] font-extrabold">
                <span className="block text-4xl sm:text-[56px] font-black">India’s #1</span>
                <span className="block text-4xl sm:text-[56px] font-black mt-1 text-[#111116]">Ride-hailing App</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-semibold tracking-wide">
                Quick, Affordable rides at your doorstep with 100% physically vetted Captains.
              </p>
            </div>

            {/* LIVE SANDBOX DECK - Styled EXACTLY like the clean input boxes from reference image */}
            <div className="max-w-md bg-white space-y-5 transition-all duration-300">
              {/* STAGE 1: IDLE CAPTAIN SELECT */}
              {booking.step === 'idle' && (
                <div className="space-y-4">
                  
                  {/* Pickup Field */}
                  <div className="relative border border-slate-200 hover:border-slate-300 focus-within:border-brand-yellow-500 rounded-xl h-14 bg-white flex items-center transition-all px-4 group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                      <MapPin className="w-5 h-5 text-slate-900 stroke-[2.5]" />
                    </div>
                    <select
                      id="pickup-select"
                      value={booking.pickup?.id || ''}
                      onChange={(e) => {
                        const found = landmarks.find(l => l.id === e.target.value);
                        setBooking(prev => ({ ...prev, pickup: found || null }));
                      }}
                      className="w-full bg-transparent text-slate-800 h-full pl-8 pr-2 rounded-xl text-base font-semibold focus:outline-none cursor-pointer appearance-none"
                    >
                      <option value="">Enter Pickup Location</option>
                      {landmarks.map(l => (
                        <option key={`pickup-${l.id}`} value={l.id}>{l.name} ({l.popularity})</option>
                      ))}
                    </select>
                  </div>

                  {/* Dropoff Field */}
                  <div className="relative border border-slate-200 hover:border-slate-300 focus-within:border-brand-yellow-500 rounded-xl h-14 bg-white flex items-center transition-all px-4 group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                      <div className="w-4 h-4 rounded-full border-4 border-slate-900 bg-white"></div>
                    </div>
                    <select
                      id="dropoff-select"
                      value={booking.dropoff?.id || ''}
                      onChange={(e) => {
                        const found = landmarks.find(l => l.id === e.target.value);
                        setBooking(prev => ({ ...prev, dropoff: found || null }));
                      }}
                      className="w-full bg-transparent text-slate-800 h-full pl-8 pr-2 rounded-xl text-base font-semibold focus:outline-none cursor-pointer appearance-none"
                    >
                      <option value="">Enter Drop Location</option>
                      {landmarks.map(l => (
                        <option key={`dropoff-${l.id}`} value={l.id}>{l.name} ({l.popularity})</option>
                      ))}
                    </select>
                  </div>

                  {/* Fleet Selector (Clean Pill Buttons) */}
                  <div className="pt-2">
                    <span className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">
                      Select Fleet Category
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {rideOptions.map((opt) => {
                        const isSelected = booking.mode === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setBooking(prev => ({ ...prev, mode: opt.id }))}
                            id={`ride-${opt.id}`}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-[#111116] border-[#111116] text-white shadow-sm font-bold' 
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 font-semibold'
                            }`}
                          >
                            <span className="block text-xs mb-0.5">
                              {opt.id === 'bike' ? '🏍️ Scooter' : opt.id === 'auto' ? '🛺 Auto' : '🚗 Cab'}
                            </span>
                            <span className="text-[10px] block opacity-85">₹{opt.pricePerKm}/km</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Prefer Female Switch & Est Fare */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={preferFemaleOnly}
                        onChange={() => setPreferFemaleOnly(!preferFemaleOnly)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 h-4 w-4"
                      />
                      <span className="text-xs font-bold text-slate-600">Prefer Female Captain</span>
                    </label>

                    {booking.pickup && booking.dropoff && (
                      <span className="text-xs font-extrabold text-slate-900 bg-brand-yellow-500/20 px-2.5 py-1 rounded-full">
                        Fare: ₹{booking.priceEstimate} ({distanceKm} km)
                      </span>
                    )}
                  </div>

                  {/* Giant Yellow Book Button styled EXACTLY like the Rapido reference image */}
                  <button
                    onClick={handleInitiateBooking}
                    disabled={!booking.pickup || !booking.dropoff}
                    className={`w-full h-14 rounded-xl font-black text-xl tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      booking.pickup && booking.dropoff 
                        ? 'bg-brand-yellow-500 text-[#111116] hover:bg-[#fbcf25] active:scale-[0.98] shadow-md' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    <span>Book Ride</span>
                  </button>
                </div>
              )}

              {/* STAGE 2: SEARCHING / MATCHING (Interactive Sandbox) */}
              {booking.step === 'matching' && (
                <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-xl text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-brand-yellow-500/20 animate-pulse"></div>
                    <div className="absolute inset-x-0 w-20 h-20 rounded-full border-2 border-brand-yellow-500 animate-ping-slow"></div>
                    <Compass className="w-10 h-10 text-brand-yellow-500 animate-spin absolute inset-0 m-auto" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#111116]">Matching Safety Captain...</h3>
                    <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">Connecting you with certified on-duty pilots nearby.</p>
                  </div>
                </div>
              )}

              {/* STAGE 3: MATCHED / DISPLAY PIN */}
              {booking.step === 'found' && booking.captain && (
                <div className="p-6 border border-slate-150 rounded-2xl bg-white shadow-xl space-y-5">
                  <div className="flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                    <img src={booking.captain.photoUrl} className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow-500" alt="captain" />
                    <div className="flex-grow text-left">
                      <div className="flex justify-between items-baseline">
                        <span className="font-extrabold text-sm text-[#111116]">{booking.captain.name}</span>
                        <span className="text-[10px] font-bold bg-white border px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          ⭐ {booking.captain.rating}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold font-mono text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded mr-2 mt-1 inline-block">
                        {booking.captain.licensePlate}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{booking.captain.vehicleModel}</span>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-dashed border-brand-yellow-500 bg-brand-yellow-50/30 rounded-2xl text-center">
                    <span className="text-[9px] uppercase tracking-widest font-black text-slate-400 block mb-1">Rider match PIN</span>
                    <span className="text-3xl font-black tracking-[0.2em] text-[#111116]">{booking.trackingPin}</span>
                  </div>

                  <div className="flex gap-2.5">
                    <button onClick={handleResetRide} className="flex-1 h-12 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold text-xs uppercase cursor-pointer">Cancel</button>
                    <button onClick={handleStartActiveRide} className="flex-1 h-12 rounded-xl bg-[#111116] text-white hover:bg-zinc-850 font-black text-xs uppercase cursor-pointer">Start Ride</button>
                  </div>
                </div>
              )}

              {/* STAGE 4: ONGOING TRANSIT LOG */}
              {booking.step === 'ongoing' && booking.captain && (
                <div className="p-6 border border-slate-150 rounded-2xl bg-white shadow-xl space-y-4">
                  <div className="p-4 bg-slate-900 text-white rounded-2xl text-left">
                    <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#f8fafc]">Active Safe Commute tracking</span>
                      <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        On Track
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white/5 p-2 rounded-xl">
                        <span className="text-[9px] text-gray-400 block uppercase font-bold">Speed limit</span>
                        <div className="text-base font-extrabold text-white mt-0.5">38 km/h</div>
                      </div>
                      <div className="bg-white/5 p-2 rounded-xl">
                        <span className="text-[9px] text-gray-400 block uppercase font-bold">Secured ETA</span>
                        <div className="text-base font-extrabold text-brand-yellow-500 mt-0.5">
                          {Math.max(1, Math.round((booking.durationSeconds - booking.elapsedSeconds) / 6))} mins
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Distress Panic panel */}
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl space-y-3 text-left">
                    <h5 className="font-extrabold text-rose-950 text-xs flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />
                      <span>Patrol Dispatch Center</span>
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={toggleSOSAlarm}
                        className={`w-full py-2 px-3 border rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          booking.isSOSActive 
                            ? 'bg-red-600 text-white border-red-500 animate-pulse' 
                            : 'bg-white hover:bg-rose-100 text-red-600 border-rose-200'
                        }`}
                      >
                        🚨 {booking.isSOSActive ? 'Dispatched' : 'Patrol SOS'}
                      </button>
                      <button 
                        onClick={() => handleFakeCall(fakeCallStep === 'connected' ? 'hangup' : 'dial')}
                        className="w-full py-2 px-3 bg-white hover:bg-rose-100 border border-rose-200 text-rose-800 rounded-lg text-[11px] font-bold cursor-pointer"
                      >
                        📞 Fake Call
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => setBooking(prev => ({ ...prev, step: 'completed' }))}
                    className="w-full h-11 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold uppercase cursor-pointer"
                  >
                    Simulate Arrival Completion
                  </button>
                </div>
              )}

              {/* STAGE 5: COMPLETED */}
              {booking.step === 'completed' && booking.captain && (
                <div className="p-6 border border-slate-150 rounded-2xl bg-white shadow-xl text-center space-y-5">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-950">Arrived Safely!</h3>
                    <p className="text-xs text-slate-400 font-medium">Safe arrival verified. Thank you for riding!</p>
                  </div>
                  <button onClick={handleResetRide} className="w-full h-12 bg-brand-yellow-500 text-brand-navy-900 hover:bg-brand-yellow-600 font-black rounded-xl text-xs uppercase cursor-pointer">Done & Reset</button>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Crescent Mask illustrations matching Rapido reference exactly */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Elegant organic arched dome layout mimicking Rapido's mascot presentation cutout */}
            <div className="relative w-full max-w-[500px] aspect-[4/3] sm:aspect-square bg-slate-50 rounded-[48px] sm:rounded-b-[200px] sm:rounded-t-[200px] flex items-center justify-center overflow-hidden border border-slate-150 shadow-md">
              
              {/* Background Skyscrapers cityscape stylized vector silhouette */}
              <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542451313-a11c0ee151b1?auto=format&fit=crop&w=800&q=80')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-100/90 via-transparent to-transparent"></div>

              {/* Composite of scooter, auto and cab lined up beautifully running dynamic street-way */}
              <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 pb-12 space-y-4">
                
                {/* Visual title inside the graphic */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center bg-white/70 backdrop-blur-sm p-3 rounded-full border border-white/40 shadow-sm">
                  <span className="text-[10px] uppercase font-black text-slate-900 tracking-wider">⚡ rydeon live defense fleet</span>
                  <span className="bg-brand-yellow-400 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full select-none">Vetted Pilots</span>
                </div>

                {/* Scooter Row Card */}
                <div className="flex items-center gap-4 bg-white hover:bg-slate-50 transition-all duration-300 p-3.5 rounded-2xl shadow-md border border-slate-100 transform hover:-translate-y-1 hover:shadow-lg group">
                  <div className="w-14 h-14 rounded-xl bg-brand-yellow-500 flex items-center justify-center text-3xl font-bold shadow-inner select-none transition-transform group-hover:scale-105">
                    🛵
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-sm text-[#111116]">Specialized Bike Taxis</span>
                    <span className="text-xs text-slate-500 block font-semibold mt-0.5">Quick & convenient solo travel equipped with smart defense cameras.</span>
                  </div>
                </div>

                {/* Rickshaw Row Card */}
                <div className="flex items-center gap-4 bg-white hover:bg-slate-50 transition-all duration-300 p-3.5 rounded-2xl shadow-md border border-slate-100 transform hover:-translate-y-1 hover:shadow-lg group">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center text-3xl font-bold shadow-inner select-none transition-transform group-hover:scale-105 font-sans">
                    🛺
                  </div>
                  <div className="text-left font-sans">
                    <span className="block font-black text-sm text-[#111116]">Protective SafeCover Autos</span>
                    <span className="text-xs text-slate-500 block font-semibold mt-0.5">Physical driver enclosures with direct cloud command center panic logs.</span>
                  </div>
                </div>

                {/* Cab Row Card */}
                <div className="flex items-center gap-4 bg-white hover:bg-slate-50 transition-all duration-300 p-3.5 rounded-2xl shadow-md border border-slate-100 transform hover:-translate-y-1 hover:shadow-lg group">
                  <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center text-3xl font-bold shadow-inner select-none transition-transform group-hover:scale-105 font-sans">
                    🚗
                  </div>
                  <div className="text-left font-sans">
                    <span className="block font-black text-sm text-[#111116]">Premium SafeGuard Cabs</span>
                    <span className="text-xs text-slate-500 block font-semibold mt-0.5">Double-screen secure partition panels with constant real-time telemetry.</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
