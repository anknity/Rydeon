import React, { useState, useEffect } from 'react';
import { PhoneCall, ShieldCheck, Menu, X, ShieldAlert, User } from 'lucide-react';

interface NavbarProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
  onOpenBookingConsole?: () => void;
}

export default function Navbar({ onTabChange, activeTab, onOpenBookingConsole }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Layout size statically set to balanced 'm'
  const headerSize = 'm';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Services' },
    { id: 'features', label: 'What We Offer' },
    { id: 'safety', label: 'Safety Patrol' },
    { id: 'captain', label: 'Earn with Us' },
    { id: 'faq', label: 'FAQs' }
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute sizing attributes using headerSize variables
  const headerPaddingScrolled = {
    s: 'py-2',
    m: 'py-2.5',
    l: 'py-3.5',
  }[headerSize];

  const headerPaddingInitial = {
    s: 'py-3',
    m: 'py-4',
    l: 'py-5',
  }[headerSize];

  const logoBoxSize = {
    s: 'w-7.5 h-7.5 rounded-lg',
    m: 'w-9 h-9 rounded-xl',
    l: 'w-11 h-11 rounded-xl',
  }[headerSize];

  const logoIconSize = {
    s: 'w-4 h-4',
    m: 'w-5 h-5',
    l: 'w-6 h-6',
  }[headerSize];

  const logoTitleSize = {
    s: 'text-sm lg:text-base',
    m: 'text-base lg:text-lg xl:text-xl',
    l: 'text-lg lg:text-xl xl:text-2xl',
  }[headerSize];

  const logoSubtitleSize = {
    s: 'hidden',
    m: 'hidden xl:block text-[8.5px] lg:text-[9px]',
    l: 'hidden xl:block text-[9.5px] lg:text-[10px]',
  }[headerSize];

  const navItemPadding = {
    s: 'px-2.5 py-1 text-[10.5px]',
    m: 'px-3 py-1.5 text-[11px] xl:px-4 xl:py-2 xl:text-xs',
    l: 'px-3 py-1.5 text-xs xl:px-4.5 xl:py-2 xl:text-sm',
  }[headerSize];

  const navItemsBgGap = {
    s: 'gap-0.5 p-[2px]',
    m: 'gap-[3px] lg:gap-1 p-0.5',
    l: 'gap-1.5 p-1',
  }[headerSize];

  const sosBtnPadding = {
    s: 'px-2 py-1 text-[9.5px]',
    m: 'px-2.5 py-1.5 text-[10.5px] xl:px-3 text-xs',
    l: 'px-3 py-1.5 text-xs xl:px-4 xl:py-2 xl:text-sm',
  }[headerSize];

  const sosIconSize = {
    s: 'w-3 h-3',
    m: 'w-3.5 h-3.5',
    l: 'w-4 h-4',
  }[headerSize];

  const navContainerGapOuter = {
    s: 'gap-1.5 sm:gap-2.5',
    m: 'gap-2.5 sm:gap-3.5 lg:gap-4',
    l: 'gap-3.5 sm:gap-4.5 lg:gap-6',
  }[headerSize];

  const bookBtnPadding = {
    s: 'px-2.5 py-1 text-[10px]',
    m: 'px-3 py-1.5 text-xs xl:px-4.5 xl:py-2 xl:text-xs',
    l: 'px-3.5 py-2 text-xs xl:px-5 xl:py-2.5 xl:text-sm',
  }[headerSize];

  const bookIconSize = {
    s: 'w-3 h-3',
    m: 'w-3.5 h-3.5',
    l: 'w-4 h-4',
  }[headerSize];

  return (
    <>
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white border-b border-slate-100 shadow-md py-3' 
          : 'bg-white border-b border-transparent py-4'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300">
          
          {/* Rapido style Logo Capsule */}
          <div className="flex items-center shrink-0">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
              className="flex items-center group"
              id="navbar-logo"
            >
              <div className="bg-brand-yellow-500 hover:bg-[#fbcf25] text-[#111116] font-black text-xl sm:text-2xl px-6 py-2.5 rounded-full tracking-tighter flex items-center justify-center shadow-sm select-none transition-all duration-200 hover:scale-[1.02]">
                rydeon
              </div>
            </a>
          </div>

          {/* Desktop Nav Items - Clean, Title-Case, Centered with Bottom Indicator */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold select-none">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#111116] font-extrabold'
                      : 'text-slate-600 hover:text-[#111116]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute left-0 right-0 bottom-[-4px] h-[3px] bg-[#111116] rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3 transition-all duration-300 shrink-0 font-semibold">
            
            {/* Black capsule ride Booking Button mirroring "Download App" from reference */}
            <button 
              onClick={() => {
                if (onOpenBookingConsole) {
                  onOpenBookingConsole();
                } else {
                  handleNavClick('booking');
                }
              }}
              className="bg-[#111116] hover:bg-zinc-800 text-white rounded-full font-extrabold transition-all hover:scale-105 active:scale-95 px-5 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-1.5 shrink-0 shadow-lg shadow-black/10 cursor-pointer"
              id="nav-book-ride-btn"
            >
              <ShieldAlert className="w-4 h-4 text-brand-yellow-500" />
              <span>Book Ride</span>
            </button>

            {/* Mobile menu toggle with dark lines on clear white background */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-[#111116] hover:bg-slate-50 rounded-full transition-colors shrink-0 cursor-pointer"
              aria-label="Open navigation menu"
              id="mobile-menu-btn"
            >
              <Menu className="w-6.5 h-6.5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-In Navigation Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" id="mobile-menu-panel">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-[#111116]/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Sidebar Drawer styled matching the light corporate themes */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white border-l border-slate-150 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-yellow-500 text-black font-black text-base px-4 py-1.5 rounded-full select-none">
                    rydeon
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                  id="mobile-menu-close-btn"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation links inside drawer */}
              <nav className="flex flex-col gap-1.5 py-6">
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                        isActive
                          ? 'bg-brand-yellow-500 text-brand-navy-900 shadow-md'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                
                {/* Mobile direct profile passport */}
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all mt-2 flex items-center gap-2 ${
                    activeTab === 'profile'
                      ? 'bg-brand-yellow-500 text-brand-navy-900 shadow-md'
                      : 'text-brand-yellow-600 bg-brand-yellow-500/10 hover:bg-brand-yellow-500/20'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Rider Passport Profile</span>
                </button>
              </nav>
            </div>

            {/* Emergency Info Box inside drawer */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <a 
                href="tel:1091" 
                className="flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 py-3.5 px-4 rounded-xl font-bold"
                id="mobile-drawer-sos-call"
              >
                <PhoneCall className="w-5 h-5 text-red-500" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest font-extrabold -mb-0.5">Women Support Hub</div>
                  <div className="text-sm font-black">Call Helpline: 1091</div>
                </div>
              </a>
              <p className="text-center text-[10px] text-slate-400 font-semibold leading-normal">
                Our active defense command track operates 24/7/365.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
