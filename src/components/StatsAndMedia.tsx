import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Navigation, Award, Users, Play, Pause, AlertTriangle } from 'lucide-react';

export default function StatsAndMedia() {
  // Stats counters state
  const [riders, setRiders] = useState(0);
  const [miles, setMiles] = useState(0);
  const [captains, setCaptains] = useState(0);
  const [score, setScore] = useState(0);

  // Trigger counters dynamic increments on loading
  useEffect(() => {
    let riderTarget = 50;
    let milesTarget = 12;
    let capTarget = 15;
    let scoreTarget = 99.9;

    let rCount = 0;
    let mCount = 0;
    let cCount = 0;
    let sCount = 0;

    const timer = setInterval(() => {
      let updated = false;
      if (rCount < riderTarget) { rCount += 1; setRiders(rCount); updated = true; }
      if (mCount < milesTarget) { mCount += 0.3; setMiles(Math.round(mCount * 10) / 10); updated = true; }
      if (cCount < capTarget) { cCount += 0.4; setCaptains(Math.round(cCount * 10) / 10); updated = true; }
      if (sCount < scoreTarget) { sCount += 2.5; setScore(Math.min(99.9, Math.round(sCount * 10) / 10)); updated = true; }

      if (!updated) clearInterval(timer);
    }, 45);

    return () => clearInterval(timer);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-brand-charcoal text-white py-24 relative overflow-hidden" id="community-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* About Section text block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-3">
            <div className="inline-block bg-white/5 border border-brand-yellow-500/25 px-5 py-2 rounded-full backdrop-blur-md">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow-500">About RydeOn</span>
            </div>
          </div>
          <div className="lg:col-span-9 space-y-6">
            <h2 className="text-2xl sm:text-4xl text-white font-extrabold tracking-tight leading-snug">
              Cities belong to women just as much as anyone else. Yet, safety concerns and high transit costs restrict their urban mobility. Inspired by the utility of Rapido, RydeOn builds a dedicated commute sanctuary—where technical precision meets compassionate female protection on the go.
            </h2>
          </div>
        </div>

        {/* Dynamic numerical counter grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="space-y-4 border-l border-brand-yellow-500/20 pl-6">
            <div className="flex items-baseline gap-0.5">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">{riders}</span>
              <span className="text-3xl font-bold text-brand-yellow-500">K+</span>
            </div>
            <div className="h-px bg-white/10 w-full"></div>
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-brand-yellow-500">Active Riders</h4>
              <p className="text-gray-400 text-xs mt-1 font-semibold">Verified female commuters zipping securely every month.</p>
            </div>
          </div>

          <div className="space-y-4 border-l border-brand-yellow-500/20 pl-6">
            <div className="flex items-baseline gap-0.5">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">{miles}</span>
              <span className="text-3xl font-bold text-brand-yellow-500">M+</span>
            </div>
            <div className="h-px bg-white/10 w-full"></div>
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-brand-yellow-500">Safe Kms Logged</h4>
              <p className="text-gray-400 text-xs mt-1 font-semibold">Transit logs supervised without a single physical failure report.</p>
            </div>
          </div>

          <div className="space-y-4 border-l border-brand-yellow-500/20 pl-6">
            <div className="flex items-baseline gap-0.5">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">{captains}</span>
              <span className="text-3xl font-bold text-brand-yellow-500">K+</span>
            </div>
            <div className="h-px bg-white/10 w-full"></div>
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-brand-yellow-500">Female Captains</h4>
              <p className="text-gray-400 text-xs mt-1 font-semibold">Women earning dignified independent livelihoods with scooters.</p>
            </div>
          </div>

          <div className="space-y-4 border-l border-brand-yellow-500/20 pl-6">
            <div className="flex items-baseline gap-0.5">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">{score}</span>
              <span className="text-3xl font-bold text-brand-yellow-500">%</span>
            </div>
            <div className="h-px bg-white/10 w-full"></div>
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-brand-yellow-500">Direct Satisfaction</h4>
              <p className="text-gray-400 text-xs mt-1 font-semibold">Commuters reporting high comfort & zero anxiety on travel routes.</p>
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE BRAND MEDIA PANEL AND EMERGENCY SIMULATOR PRESETS */}
        <div className="relative rounded-[32px] overflow-hidden border border-brand-yellow-500/15 shadow-2xl h-[440px] group bg-slate-950 flex items-center justify-center">
          
          {/* Cover image or loop video simulator */}
          {isPlaying ? (
            <div className="absolute inset-0 bg-brand-charcoal animate-fade-in flex flex-col justify-center items-center text-center p-6 space-y-4">
              <div className="relative w-20 h-20 rounded-full border-4 border-brand-yellow-500/20 flex items-center justify-center bg-black/40">
                <span className="absolute inset-x-0 w-20 h-20 rounded-full border border-brand-yellow-500 animate-ping inline-block"></span>
                <Navigation className="w-10 h-10 text-brand-yellow-500 animate-bounce" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl font-extrabold text-white">RydeOn Safety Patrol Video Loop</h4>
                <p className="text-sm font-medium text-brand-yellow-500">"Guiding her secure route checkouts with physical motorcycle details"</p>
              </div>

              <button 
                onClick={() => setIsPlaying(false)}
                className="bg-brand-yellow-500 hover:bg-brand-yellow-600 font-extrabold text-xs uppercase tracking-widest text-brand-navy-900 py-2 px-6 rounded-full flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Pause className="w-4 h-4 fill-brand-navy-900" />
                <span>Pause Presentation video</span>
              </button>
            </div>
          ) : (
            <>
              {/* High quality cover representing safe late commuting */}
              <img 
                src="https://images.unsplash.com/photo-1473177104440-ffee2f37e098?auto=format&fit=crop&w=1200&q=80" 
                alt="Women commute happily" 
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

              {/* Centered Large Pulsing Play Button */}
              <div className="relative text-center z-15">
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="w-24 h-24 rounded-full bg-brand-yellow-500/20 hover:bg-brand-yellow-500/40 border border-brand-yellow-500/30 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg shadow-brand-yellow-500/15 cursor-pointer animate-pulse"
                  id="media-play-btn"
                >
                  <div className="w-16 h-16 bg-brand-yellow-500 rounded-full flex items-center justify-center text-brand-navy-900">
                    <Play className="w-8 h-8 fill-brand-navy-900 translate-x-0.5" strokeWidth={3} />
                  </div>
                </button>
                
                <h4 className="text-lg font-black tracking-wide text-white mt-4 uppercase">Watch Command Operations Trailer</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto font-medium">Click to visualize our real-time GPS checkups, verification portals and helmet safety protocols.</p>
              </div>
            </>
          )}

          {/* Bottom-left quick badge */}
          <div className="absolute bottom-6 left-6 z-15 flex items-center gap-2 bg-slate-900/85 border border-brand-yellow-500/15 px-4 py-2 rounded-full backdrop-blur-md">
            <Award className="w-5 h-5 text-brand-yellow-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f8fafc]">Awarded Best Women Mobility App 2026</span>
          </div>
        </div>

      </div>
    </section>
  );
}
