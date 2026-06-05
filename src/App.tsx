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

import { ShieldCheck, ArrowUp } from 'lucide-react';

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

            {/* 5. "Earn with Rydeon" banner and registration layouts matching image reference 4 */}
            <CaptainPortal />

            {/* 6. Continuous highlights stats and media operations trailer video cover */}
            <StatsAndMedia />

            {/* 7. FAQs and interactive footer links */}
            <FaqsAndFooter currentView={currentView} onViewChange={setCurrentView} />
          </div>
        )}

        {currentView === 'booking' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 md:px-8 mt-4.5 bg-slate-50 rounded-3xl">
            <BookingWorkspace />
            <FaqsAndFooter currentView={currentView} onViewChange={setCurrentView} />
          </div>
        )}

        {currentView === 'safety' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 md:px-8 mt-4.5 bg-slate-50 rounded-3xl">
            <SafetyCommand />
            <FaqsAndFooter currentView={currentView} onViewChange={setCurrentView} />
          </div>
        )}

        {currentView === 'profile' && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 md:px-8 mt-4.5 bg-slate-50 rounded-3xl">
            <MemberProfile />
            <FaqsAndFooter currentView={currentView} onViewChange={setCurrentView} />
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
