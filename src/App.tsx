import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurServices from './components/OurServices';
import WhatWeOffer from './components/WhatWeOffer';
import SafetyEcosystem from './components/SafetyEcosystem';
import SafetyBuddy from './components/SafetyBuddy';
import CaptainPortal from './components/CaptainPortal';
import StatsAndMedia from './components/StatsAndMedia';
import FaqsAndFooter from './components/FaqsAndFooter';

// Dynamic sub-tabs matching user's multi-page requirements
import BookingWorkspace from './components/BookingWorkspace';
import SafetyCommand from './components/SafetyCommand';
import MemberProfile from './components/MemberProfile';

import { ShieldCheck, ArrowUp, LayoutGrid, Map, ShieldAlert, UserCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab ] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'booking' | 'safety' | 'profile'>('home');

  // Monitor scrolling to highlight navbar state correctly and show scroll-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Detect active section on scroll if we are on explore home landing page
      if (currentView === 'home') {
        const sections = ['home', 'services', 'features', 'safety', 'captain', 'community', 'faq'];
        const scrollPosition = window.scrollY + 180; // offset

        for (const section of sections) {
          const el = document.getElementById(`${section}-section`);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveTab(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Switch landing context back to Home before scroll triggers
    setCurrentView('home');
    
    setTimeout(() => {
      const element = document.getElementById(`${tabId}-section`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 80);
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
        onOpenBookingConsole={() => setCurrentView('booking')}
      />

      {/* Dynamic Sub-Console View Switcher (Thematic Yellow & Navy capsule selector bar) */}
      <div className="bg-brand-navy-905 bg-brand-navy-900/95 sticky top-[58px] z-40 border-b border-brand-yellow-500/15 py-3 shadow-md backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          
          <div className="flex items-center gap-2 text-left shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#cbd5e1]">Rydeon secure workflow dashboards:</span>
          </div>

          <div className="flex bg-brand-navy-950 p-1 rounded-2xl border border-white/5 gap-1 shadow-inner flex-nowrap overflow-x-auto max-w-full">
            {[
              { id: 'home', label: '🏠 Explorer Home', icon: LayoutGrid },
              { id: 'booking', label: '🗺️ Booking Console', icon: Map },
              { id: 'safety', label: '🛡️ Safety Patrol Desks', icon: ShieldAlert },
              { id: 'profile', label: '👤 Member Passport', icon: UserCheck }
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = currentView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentView(tab.id as any);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-black tracking-wide transition-all uppercase whitespace-nowrap cursor-pointer ${
                    isSelected 
                      ? 'bg-brand-yellow-500 text-brand-navy-900 font-extrabold shadow-md transform scale-[1.02]' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  id={`app-view-pill-selector-${tab.id}`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label.split(' ')[1] + ' ' + tab.label.split(' ')[2]}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Core Landings or Portal dashboard views with dynamic content switching */}
      <main className="flex-grow pt-[4px]">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            {/* 1. Integrated Hero Grid (Main headline + Live Interactive Booking Simulator with zero pink bias) */}
            <Hero />

            {/* 2. "Our Services" grid layout matching image reference 2 */}
            <OurServices />

            {/* 3. "What we offer" cards layout matching image reference 3 */}
            <WhatWeOffer />

            {/* 3.5. Premium Interactive Safety & Service Ecosystem (Highlighting all 19+ main specs) */}
            <SafetyEcosystem />

            {/* 4. Google Gemini Safety Chat Companion */}
            <SafetyBuddy />

            {/* 5. "Earn with Rydeon" banner and registration layouts matching image reference 4 */}
            <CaptainPortal />

            {/* 6. Continuous highlights stats and media operations trailer video cover */}
            <StatsAndMedia />

            {/* 7. FAQs and interactive footer links */}
            <FaqsAndFooter />
          </div>
        )}

        {currentView === 'booking' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 md:px-8 mt-4.5 bg-slate-50 rounded-3xl">
            <BookingWorkspace />
            <FaqsAndFooter />
          </div>
        )}

        {currentView === 'safety' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 md:px-8 mt-4.5 bg-slate-50 rounded-3xl">
            <SafetyCommand />
            <FaqsAndFooter />
          </div>
        )}

        {currentView === 'profile' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 md:px-8 mt-4.5 bg-slate-50 rounded-3xl">
            <MemberProfile />
            <FaqsAndFooter />
          </div>
        )}
      </main>

      {/* Persistent floating safe support checkup widgets */}
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
