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
          "Passing RydeOn Smart Safehouse Checkpoint. Safe-logs green.",
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
      "Welcome onboard RydeOn. Defensive routing enabled."
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
    <section className="relative bg-[#fafafa] pt-12 pb-20 overflow-hidden" id="home-section">
      {/* Absolute Decorative elements */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-[#f3f4f6] skew-x-12 origin-top-right -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Combined Title + Interactive Booking Deck */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-brand-yellow-500/10 text-brand-navy-800 border border-brand-yellow-500/30 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-yellow-600" />
                <span>India's Most Secure Travel Network for Women</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-extrabold text-brand-navy-900 leading-tight tracking-tight">
                India’s #1 <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy-800 to-brand-navy-900">
                  Ride-Hailing App
                </span>
              </h1>
              
              <p className="text-lg text-slate-500 font-semibold tracking-wide">
                Quick, Affordable rides at your doorstep with certified female Captains.
              </p>
            </div>

            {/* LIVE SANDBOX DECK - Replica of Image 1 booking box */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden transition-all duration-300">
              {/* Dynamic matching backdrop effect */}
              {booking.step === 'matching' && (
                <div className="absolute inset-0 bg-brand-navy-900/5 pointer-events-none animate-pulse"></div>
              )}

              {/* STAGE 1: IDLE CAPTAIN SELECT */}
              {booking.step === 'idle' && (
                <div className="space-y-5">
                  <div className="space-y-4">
                    
                    {/* Pickup Address Dropdown */}
                    <div>
                      <div className="relative font-semibold">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                        <select
                          id="pickup-select"
                          value={booking.pickup?.id || ''}
                          onChange={(e) => {
                            const found = landmarks.find(l => l.id === e.target.value);
                            setBooking(prev => ({ ...prev, pickup: found || null }));
                          }}
                          className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 text-slate-800 h-[56px] pl-10 pr-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-yellow-500 focus:border-transparent transition-all cursor-pointer accent-slate-100"
                        >
                          <option value="">Enter Pickup Location...</option>
                          {landmarks.map(l => (
                            <option key={`pickup-${l.id}`} value={l.id}>{l.name} ({l.popularity})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Dropoff Address Dropdown */}
                    <div>
                      <div className="relative font-semibold">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-yellow-500"></div>
                        <select
                          id="dropoff-select"
                          value={booking.dropoff?.id || ''}
                          onChange={(e) => {
                            const found = landmarks.find(l => l.id === e.target.value);
                            setBooking(prev => ({ ...prev, dropoff: found || null }));
                          }}
                          className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 text-slate-800 h-[56px] pl-10 pr-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-yellow-500 focus:border-transparent transition-all cursor-pointer"
                        >
                          <option value="">Enter Drop Location...</option>
                          {landmarks.map(l => (
                            <option key={`dropoff-${l.id}`} value={l.id}>{l.name} ({l.popularity})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Selective category pills: Bike, Auto, Cab */}
                  <div className="pt-2">
                    <span className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2.5">
                      Select Fleet Category
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {rideOptions.map((opt) => {
                        const isSelected = booking.mode === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setBooking(prev => ({ ...prev, mode: opt.id }))}
                            id={`ride-${opt.id}`}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              isSelected 
                                ? 'bg-brand-navy-900 border-brand-navy-900 text-white shadow-md' 
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                            }`}
                          >
                            <span className="block font-extrabold text-xs mb-0.5">{opt.id === 'bike' ? '🏍️ Bike' : opt.id === 'auto' ? '🛺 Auto' : '🚗 Cab'}</span>
                            <span className="text-[10px] font-bold opacity-80 block">₹{opt.pricePerKm}/km</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferences and Live Quote details */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferFemaleOnly}
                        onChange={() => setPreferFemaleOnly(!preferFemaleOnly)}
                        className="rounded border-slate-300 text-brand-navy-800 focus:ring-brand-navy-800 h-4 w-4"
                      />
                      <span className="text-xs font-bold text-slate-600">Prefer Female Captain</span>
                    </label>

                    {booking.pickup && booking.dropoff && (
                      <span className="text-xs font-extrabold text-brand-navy-900 bg-brand-yellow-500/20 px-2.5 py-1 rounded-full">
                        Est. Fare: ₹{booking.priceEstimate} ({distanceKm} km)
                      </span>
                    )}
                  </div>

                  {/* Yellow book button inspired directly by Rapido visual references */}
                  <button
                    onClick={handleInitiateBooking}
                    disabled={!booking.pickup || !booking.dropoff}
                    className={`w-full h-14 rounded-xl font-extrabold text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-200 ${
                      booking.pickup && booking.dropoff 
                        ? 'bg-brand-yellow-500 text-brand-navy-900 hover:bg-brand-yellow-600 active:scale-[0.98] shadow-lg shadow-brand-yellow-500/10' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    <span>Book secure Ride</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* STAGE 2: SEARCHING / MATCHING */}
              {booking.step === 'matching' && (
                <div className="py-6 text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-brand-yellow-500/20 animate-pulse"></div>
                    <div className="absolute inset-x-0 w-20 h-20 rounded-full border-2 border-brand-yellow-500 animate-ping-slow"></div>
                    <Compass className="w-10 h-10 text-brand-yellow-500 animate-spin absolute inset-0 m-auto" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-brand-navy-900">Matching Safety Companion...</h3>
                    <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">Connecting you with certified background-cleared on-duty pilots in the vicinity.</p>
                  </div>
                </div>
              )}

              {/* STAGE 3: MATCHED / DISPLAY PIN */}
              {booking.step === 'found' && booking.captain && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                    <img src={booking.captain.photoUrl} className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow-500" alt="captain" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-baseline">
                        <span className="font-extrabold text-sm text-brand-navy-900">{booking.captain.name}</span>
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

                  <div className="p-4 border-2 border-dashed border-brand-yellow-500/50 bg-brand-yellow-50/50 rounded-2xl text-center">
                    <span className="text-[9px] uppercase tracking-widest font-black text-slate-400 block mb-1">Step-Sit Secure PIN</span>
                    <span className="text-3xl font-black tracking-[0.2em] text-brand-navy-900">{booking.trackingPin}</span>
                    <p className="text-[10px] text-slate-400 font-medium mt-1 leading-normal">Double-check helper license plate before stating match code.</p>
                  </div>

                  <div className="flex gap-2.5">
                    <button onClick={handleResetRide} className="flex-1 h-12 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold text-xs uppercase">Cancel</button>
                    <button onClick={handleStartActiveRide} className="flex-1 h-12 rounded-xl bg-brand-yellow-500 text-brand-navy-900 hover:bg-brand-yellow-600 font-black text-xs uppercase">Start Commute</button>
                  </div>
                </div>
              )}

              {/* STAGE 4: ONGOING TRANSIT LOG */}
              {booking.step === 'ongoing' && booking.captain && (
                <div className="space-y-4">
                  <div className="p-4 bg-brand-navy-900 text-white rounded-2xl">
                    <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#f8fafc]">Active Safe Transit Stream</span>
                      <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        GPS On Track
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                        <span className="text-[9px] text-gray-400 block uppercase font-bold">Safe Speed</span>
                        <div className="text-base font-extrabold text-white mt-0.5">38 km/h</div>
                      </div>
                      <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                        <span className="text-[9px] text-gray-400 block uppercase font-bold">Secured ETA</span>
                        <div className="text-base font-extrabold text-brand-yellow-500 mt-0.5">
                          {Math.max(1, Math.round((booking.durationSeconds - booking.elapsedSeconds) / 6))} mins
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Distress Panic panel */}
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-3">
                    <h5 className="font-extrabold text-rose-900 text-xs flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />
                      <span>Distress Patrol Command Center Link</span>
                    </h5>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={toggleSOSAlarm}
                        className={`w-full py-2 px-3 border rounded-lg text-[11px] font-bold transition-all ${
                          booking.isSOSActive 
                            ? 'bg-red-600 text-white border-red-500 animate-pulse' 
                            : 'bg-white hover:bg-rose-100 text-red-600 border-rose-200'
                        }`}
                      >
                        🚨 {booking.isSOSActive ? 'Dispatched' : 'Patrol SOS'}
                      </button>

                      <button 
                        onClick={() => handleFakeCall(fakeCallStep === 'connected' ? 'hangup' : 'dial')}
                        className="w-full py-2 px-3 bg-white hover:bg-rose-100 border border-rose-200 text-rose-800 rounded-lg text-[11px] font-bold"
                      >
                        📞 Fake Safety Call
                      </button>
                    </div>

                    {booking.sosAlertSent && (
                      <span className="text-[9px] font-bold text-center block text-red-500 bg-white border border-red-100 p-1 rounded">
                        Emergency patrol alert dispatched. Our physical team is on target.
                      </span>
                    )}
                  </div>

                  {/* Fake call panel */}
                  {fakeCallStep === 'connected' && (
                    <div className="p-3 bg-brand-navy-900 text-white rounded-xl text-center text-xs space-y-1 animate-fade-in border border-white/10">
                      <p className="font-extrabold text-white animate-pulse">Connected to Safety Desk</p>
                      <p className="text-[10px] text-gray-300">"Safe logs are fully online, we are holding the track."</p>
                    </div>
                  )}

                  <button 
                    onClick={() => setBooking(prev => ({ ...prev, step: 'completed' }))}
                    className="w-full h-11 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold uppercase transition-all"
                  >
                    Simulate Arrival Completion
                  </button>
                </div>
              )}

              {/* STAGE 5: COMPLETED */}
              {booking.step === 'completed' && booking.captain && (
                <div className="py-4 text-center space-y-5">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-brand-navy-900">Arrived Safely!</h3>
                    <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">Safe arrival confirmed by Aura Command Room. Thank you, sister!</p>
                  </div>

                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} onClick={() => setRatingVal(s)}>
                        <Star className={`w-6 h-6 ${s <= ratingVal ? 'fill-brand-yellow-500 text-brand-yellow-500' : 'text-slate-200'}`} />
                      </button>
                    ))}
                  </div>

                  <button onClick={handleResetRide} className="w-full h-12 bg-brand-yellow-500 text-brand-navy-900 hover:bg-brand-yellow-600 font-black rounded-xl text-xs uppercase shadow-md shadow-brand-yellow-500/10">Done & Reset</button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Crescent Mask illustrations matching Image 1 */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* The elegant crescent/circular layout enclosing illustrative graphics of bike, auto, cab */}
            <div className="relative w-full max-w-[480px] aspect-square rounded-[120px] bg-gradient-to-tr from-brand-yellow-500/15 via-brand-yellow-500/5 to-transparent flex items-center justify-center overflow-hidden border border-brand-yellow-500/10">
              
              {/* Crescent inner overlay */}
              <div className="absolute inset-4 rounded-[100px] bg-slate-100 overflow-hidden shadow-inner flex flex-col justify-end p-6 relative">
                
                {/* Floating graphic elements mimicking Rapido's actual scooter / auto / cab */}
                <div className="space-y-4 mb-2 z-10">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-3.5 rounded-2xl border border-slate-200/60 shadow-lg flex items-center gap-3 transform -rotate-1 translate-x-2 transition-transform hover:translate-x-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-yellow-500 text-brand-navy-900 flex items-center justify-center shrink-0">
                      <Bike className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <span className="block font-black text-xs text-brand-navy-900">Bike-Taxi Command Shield</span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">Dual safe helmet protectors equipped</span>
                    </div>
                  </div>

                  <div className="bg-white/95 backdrop-blur-sm px-4 py-3.5 rounded-2xl border border-slate-200/60 shadow-lg flex items-center gap-3 transform rotate-1 -translate-x-1 transition-transform hover:translate-x-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-yellow-500/15 text-brand-navy-900 border border-brand-yellow-500/40 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5.5 h-5.5 text-brand-yellow-600" />
                    </div>
                    <div>
                      <span className="block font-black text-xs text-brand-navy-900">Auto SafeCover Enclosures</span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">Fitted with robust safety partitions</span>
                    </div>
                  </div>

                  <div className="bg-white/95 backdrop-blur-sm px-4 py-3.5 rounded-2xl border border-slate-200/60 shadow-lg flex items-center gap-3 transform -rotate-1 translate-x-4 transition-transform hover:translate-x-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Car className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <span className="block font-black text-xs text-brand-navy-900">Premium SafeGuard Cabs</span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">Live CCTV command link security</span>
                    </div>
                  </div>
                </div>

                {/* Cover graphic representing safe streets */}
                <img 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80" 
                  alt="Happy ride" 
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-transparent to-transparent"></div>
              </div>

              {/* Outside float info */}
              <div className="absolute top-6 left-6 bg-brand-yellow-500 text-brand-navy-900 font-black text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md z-15">
                ★ 400+ safe corridors
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
