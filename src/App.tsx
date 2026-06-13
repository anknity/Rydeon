import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurServices from './components/OurServices';
import WhatWeOffer from './components/WhatWeOffer';
import CaptainPortal from './components/CaptainPortal';
import StatsAndMedia from './components/StatsAndMedia';
import FaqsAndFooter from './components/FaqsAndFooter';

// Dynamic sub-tabs matching user's multi-page requirements
import BookingWorkspace from './components/BookingWorkspace';
import SafetyCommand from './components/SafetyCommand';
import MemberProfile from './components/MemberProfile';

import { ShieldCheck, ArrowUp, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab ] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentView, setCurrentView] = useState<string>('home');

  // Monitor scrolling to show scroll-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentView(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between selection:bg-brand-yellow-500 selection:text-brand-navy-900" id="main-app-container">
      
      {/* Premium safety alert banner styled in high-contrast professional navy/yellow checkmark */}
      <div className="bg-brand-navy-900 text-brand-yellow-500 text-center py-2 px-4 text-xs font-black tracking-wide flex items-center justify-center gap-1.5 z-50 relative shadow-sm border-b border-brand-yellow-500/20">
        <ShieldCheck className="w-4 h-4 fill-brand-yellow-500 text-brand-navy-900 shrink-0 animate-pulse" />
        <span>Rydeon has deployed physical Safety Patrol Units along key transit loops. Travel confidently around the clock!</span>
      </div>

      {/* Main navigation header */}
      <Navbar 
        onTabChange={handleTabChange} 
        activeTab={activeTab} 
        onOpenBookingConsole={() => handleTabChange('booking')}
      />

      {/* Core Landings or Portal dashboard views with dynamic content switching */}
      <main className="flex-grow pt-[4px]">
        
        {/* PAGE 1: HOME */}
        {currentView === 'home' && (
          <div className="animate-fade-in">
            {/* 1. Hero banner with landing context */}
            <Hero />

            {/* 2. Specialized Fleet Services restored to Home screen */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-6" id="home-services-fleet">
              <OurServices />
            </div>

            {/* 3. What We Offer / Safeguards Blueprint restored to Home screen */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="home-offers-safeguards">
              <WhatWeOffer />
            </div>

            {/* Premium Bento Navigation Hub on Home page so users can easily see/find other separate pages */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-widest font-black text-brand-yellow-600 bg-brand-yellow-500/10 px-3.5 py-1.5 rounded-full border border-brand-yellow-500/20 inline-block mb-3">Explore Rydeon Ecosystem</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-navy-900 tracking-tight">Our Safe Core Operations</h2>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Select any quadrant below inside our secure network to load the page immediately</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Our Specialized Fleet",
                    desc: "Explore Bike, Auto Cover, and Premium Cab safety details.",
                    btnText: "Explore Fleet",
                    view: "services",
                    color: "border-emerald-500/20 hover:border-emerald-500/60 hover:shadow-emerald-500/5",
                    badge: "Verified Fleet",
                    emoji: "🛵"
                  },
                  {
                    title: "Security & Features",
                    desc: "Interactive review of on-board panic buttons and protective plexiglass.",
                    btnText: "Review Safeguards",
                    view: "features",
                    color: "border-brand-yellow-500/20 hover:border-brand-yellow-500/60 hover:shadow-brand-yellow-500/5",
                    badge: "Multi-Tier Vetting",
                    emoji: "🛡️"
                  },
                  {
                    title: "Safety Patrol Command",
                    desc: "Check active live corridors and monitor real-time security logs.",
                    btnText: "Open Console",
                    view: "safety",
                    color: "border-blue-500/20 hover:border-blue-500/60 hover:shadow-blue-500/5",
                    badge: "24/7 Monitored",
                    emoji: "🚨"
                  },
                  {
                    title: "Member Safe Passport",
                    desc: "Manage your registered coordinates, safety scoring and check-ins.",
                    btnText: "View Passport",
                    view: "profile",
                    color: "border-slate-400/20 hover:border-slate-400/60 hover:shadow-slate-500/5",
                    badge: "Rider ID Cleared",
                    emoji: "👤"
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`bg-white rounded-3xl p-6 border transition-all duration-350 hover:shadow-xl flex flex-col justify-between ${item.color} group`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-3xl">{item.emoji}</span>
                        <span className="text-[9px] uppercase font-black text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{item.badge}</span>
                      </div>
                      <h3 className="text-base font-black text-brand-navy-900 leading-tight group-hover:text-brand-yellow-600 transition-colors">{item.title}</h3>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed block mt-1">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => handleTabChange(item.view)}
                      className="mt-6 w-full py-2.5 bg-brand-navy-900 text-white hover:bg-brand-navy-800 text-xs font-bold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 group-hover:bg-brand-yellow-500 group-hover:text-brand-navy-900"
                    >
                      <span>{item.btnText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Captain registration driver */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-12">
              <div className="bg-brand-navy-900 text-white rounded-3xl p-8 border border-white/5 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-2 text-left">
                  <span className="text-[10px] uppercase font-black text-brand-yellow-500 tracking-wider">Earn with rydeon</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Become a Certified Safe Captain</h3>
                  <p className="text-xs text-slate-300 max-w-xl font-medium">Join 15,000+ female and vetted safety partners. Work flexibly, earn industry-leading payouts, and help make Indian city transit 100% safe for all women.</p>
                </div>
                <button
                  onClick={() => handleTabChange('captain')}
                  className="bg-brand-yellow-500 hover:bg-brand-yellow-600 text-brand-navy-900 font-extrabold uppercase text-xs px-6 py-3.5 rounded-full tracking-wider transition-all cursor-pointer shadow-md shrink-0 active:scale-95 flex items-center gap-1.5"
                >
                  <span>Apply as Captain</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2: SERVICES */}
        {currentView === 'services' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="py-8 text-center max-w-3xl mx-auto px-4 mb-4">
              <span className="text-[10px] uppercase tracking-widest font-black text-brand-yellow-600 bg-brand-yellow-500/10 px-3 py-1 rounded-full border border-brand-yellow-500/20 inline-block mb-2">Secure Vehicle Fleet</span>
              <h1 className="text-3xl sm:text-5xl font-black text-brand-navy-900 tracking-tight">Designed to Shield Women</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1.5 leading-relaxed">Choose transit modes managed by 100% certified background cleared professionals, physical safety partition grids, and 24/7 command centre alarms.</p>
            </div>
            <OurServices />
          </div>
        )}

        {/* PAGE 3: WHAT WE OFFER / FEATURES */}
        {currentView === 'features' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="py-8 text-center max-w-3xl mx-auto px-4 mb-4">
              <span className="text-[10px] uppercase tracking-widest font-black text-brand-yellow-600 bg-brand-yellow-500/10 px-3 py-1 rounded-full border border-brand-yellow-500/20 inline-block mb-2">Safeguards Blueprint</span>
              <h1 className="text-3xl sm:text-5xl font-black text-brand-navy-900 tracking-tight">Safety Layers In Action</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1.5 leading-relaxed">From live on-trip voice stress decibel tracking to physical escort patrol modules dispatched immediately, explore how we build trust around the clock.</p>
            </div>
            <WhatWeOffer />
          </div>
        )}

        {/* PAGE 4: SAFETY PATROL */}
        {currentView === 'safety' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SafetyCommand />
          </div>
        )}

        {/* PAGE 5: CAPTAIN PORTAL */}
        {currentView === 'captain' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <CaptainPortal />
          </div>
        )}

        {/* PAGE 6: FAQs & RESOURCES */}
        {currentView === 'faq' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-10">
              <StatsAndMedia />
            </div>
          </div>
        )}

        {/* PAGE 7: BOOKING CONSOLE */}
        {currentView === 'booking' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <BookingWorkspace />
          </div>
        )}

        {/* PAGE 8: PASSENGER PASSPORT */}
        {currentView === 'profile' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <MemberProfile />
          </div>
        )}
      </main>

      {/* Global persistent FaqsAndFooter component at the bottom of all pages */}
      <FaqsAndFooter 
        currentView={currentView} 
        onViewChange={handleTabChange} 
      />

      {/* Floating back-to-top button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brand-navy-900 hover:bg-brand-navy-800 border-2 border-brand-yellow-500/20 text-brand-yellow-500 flex items-center justify-center shadow-2xl transition-all hover:scale-108 active:scale-95 cursor-pointer animate-fade-in"
          title="Scroll back to top"
          id="floating-scroll-top-btn"
        >
          <ArrowUp className="w-5 h-5 stroke-[3]" />
        </button>
      )}
    </div>
  );
}
