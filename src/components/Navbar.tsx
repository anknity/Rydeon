import React, { useState, useEffect } from 'react';
import { PhoneCall, ShieldCheck, Menu, X, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
  onOpenBookingConsole?: () => void;
}

export default function Navbar({ onTabChange, activeTab, onOpenBookingConsole }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize header size mode from localStorage or defaulted to balanced 'm'
  const [headerSize, setHeaderSize] = useState<'s' | 'm' | 'l'>(() => {
    const saved = localStorage.getItem('rydeon-header-size');
    return (saved as 's' | 'm' | 'l') || 'm';
  });

  const changeHeaderSize = (size: 's' | 'm' | 'l') => {
    setHeaderSize(size);
    localStorage.setItem('rydeon-header-size', size);
  };

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
    { id: 'safety', label: 'Safety-Buddy' },
    { id: 'captain', label: 'Earn with Us' },
    { id: 'faq', label: 'FAQs' }
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll to element
    const element = document.getElementById(`${id}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
          ? `bg-brand-navy-900 border-b border-brand-yellow-500/20 shadow-lg backdrop-blur-md ${headerPaddingScrolled}` 
          : `bg-brand-navy-900/90 border-b border-transparent ${headerPaddingInitial}`
      }`}>
        <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${navContainerGapOuter}`}>
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
              className="flex items-center gap-1.5 group"
              id="navbar-logo"
            >
              <div className={`${logoBoxSize} bg-brand-yellow-500 flex items-center justify-center shadow-md shadow-brand-yellow-500/20 group-hover:scale-105 transition-all duration-300`}>
                <ShieldCheck className={`${logoIconSize} text-brand-navy-900 transition-all duration-300`} />
              </div>
              <div>
                <span className={`${logoTitleSize} font-black text-white tracking-tight transition-all duration-300`}>
                  Ryde<span className="text-brand-yellow-500">on</span>
                </span>
                <span className={`${logoSubtitleSize} font-bold text-slate-300 tracking-wider uppercase transition-all duration-300`}>
                  India's Secure Ride-Hailing
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Items */}
          <div className={`hidden lg:flex items-center ${navItemsBgGap} bg-brand-navy-800 p-0.5 rounded-full border border-white/5 transition-all duration-300`}>
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`rounded-full font-bold tracking-wide transition-all duration-200 ${navItemPadding} ${
                    isActive
                      ? 'bg-brand-yellow-500 text-brand-navy-900 shadow-md shadow-brand-yellow-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 transition-all duration-300 shrink-0">
            
            {/* Sizing Controller Capsule (Custom Sizing Prompt Solution) */}
            <div className="flex items-center bg-brand-navy-800/80 border border-white/10 rounded-full p-0.5 shrink-0" id="header-scale-controller-container">
              <button 
                onClick={() => changeHeaderSize('s')}
                className={`flex items-center justify-center rounded-full text-[10px] font-black transition-all duration-200 cursor-pointer ${
                  headerSize === 's' 
                    ? 'bg-brand-yellow-500 text-brand-navy-900 font-black shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                } ${
                  headerSize === 's' ? 'w-6.5 h-6.5' : 'w-5.5 h-5.5'
                }`}
                title="Compact Size Layout"
                id="header-scale-s"
              >
                A-
              </button>
              <button 
                onClick={() => changeHeaderSize('m')}
                className={`flex items-center justify-center rounded-full text-[10px] font-black transition-all duration-200 cursor-pointer ${
                  headerSize === 'm' 
                    ? 'bg-brand-yellow-500 text-brand-navy-900 font-extrabold shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                } ${
                  headerSize === 'm' ? 'w-6.5 h-6.5' : 'w-5.5 h-5.5'
                }`}
                title="Standard Balanced Layout"
                id="header-scale-m"
              >
                A
              </button>
              <button 
                onClick={() => changeHeaderSize('l')}
                className={`flex items-center justify-center rounded-full text-[10px] font-black transition-all duration-200 cursor-pointer ${
                  headerSize === 'l' 
                    ? 'bg-brand-yellow-500 text-brand-navy-900 font-black shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                } ${
                  headerSize === 'l' ? 'w-6.5 h-6.5' : 'w-5.5 h-5.5'
                }`}
                title="Spacious Elegant Layout"
                id="header-scale-l"
              >
                A+
              </button>
            </div>

            {/* Quick Emergency Hotline Call */}
            <a 
              href="tel:1091" 
              className={`hidden sm:flex items-center gap-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-500 hover:text-white rounded-full border border-red-500/30 transition-all duration-300 font-bold group shrink-0 ${sosBtnPadding}`}
              title="Speak to Emergency Women Helpline immediately"
              id="nav-sos-call"
            >
              <PhoneCall className={`${sosIconSize} text-red-500 group-hover:animate-bounce transition-all`} />
              <span className="hidden xl:inline">SOS Help: 1091</span>
              <span className="xl:hidden">SOS: 1091</span>
            </a>

            {/* Quick ride click */}
            <button 
              onClick={() => {
                if (onOpenBookingConsole) {
                  onOpenBookingConsole();
                } else {
                  handleNavClick('home');
                }
              }}
              className={`bg-brand-yellow-500 hover:bg-brand-yellow-600 text-brand-navy-900 rounded-full font-black transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 shrink-0 ${bookBtnPadding}`}
              id="nav-book-ride-btn"
            >
              <ShieldAlert className={`${bookIconSize} transition-all`} />
              <span>Book Ride</span>
            </button>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1 text-white hover:text-brand-yellow-500 hover:bg-white/5 rounded-full transition-colors shrink-0"
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
            className="fixed inset-0 bg-brand-navy-900/80 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Sidebar Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-brand-navy-900 border-l border-white/5 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-yellow-500 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-brand-navy-900" />
                  </div>
                  <span className="text-lg font-black text-white">Ryde<span className="text-brand-yellow-500">on</span></span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  id="mobile-menu-close-btn"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation links inside drawer */}
              <nav className="flex flex-col gap-3 py-8">
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold tracking-wide transition-all ${
                        isActive
                          ? 'bg-brand-yellow-500 text-brand-navy-900'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Emergency Info Box inside drawer */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              {/* Scale Control inside Mobile menu */}
              <div className="p-3 bg-slate-800/40 rounded-xl border border-white/5 space-y-1.5">
                <span className="text-[9.5px] font-black text-brand-yellow-400 uppercase tracking-widest block text-center">Header Density</span>
                <div className="flex items-center justify-between p-0.5 bg-slate-950 rounded-lg" id="mobile-scale-controller">
                  <button 
                    onClick={() => changeHeaderSize('s')}
                    className={`flex-grow py-1.5 rounded text-[10.5px] font-extrabold transition-all text-center ${headerSize === 's' ? 'bg-brand-yellow-500 text-brand-navy-900' : 'text-gray-400'}`}
                  >
                    Mini
                  </button>
                  <button 
                    onClick={() => changeHeaderSize('m')}
                    className={`flex-grow py-1.5 rounded text-[10.5px] font-extrabold transition-all text-center ${headerSize === 'm' ? 'bg-brand-yellow-500 text-brand-navy-900' : 'text-gray-400'}`}
                  >
                    Standard
                  </button>
                  <button 
                    onClick={() => changeHeaderSize('l')}
                    className={`flex-grow py-1.5 rounded text-[10.5px] font-extrabold transition-all text-center ${headerSize === 'l' ? 'bg-brand-yellow-500 text-brand-navy-900' : 'text-gray-400'}`}
                  >
                    Cozy
                  </button>
                </div>
              </div>

              <a 
                href="tel:1091" 
                className="flex items-center justify-center gap-3 bg-red-950/50 hover:bg-red-900/70 border border-red-500/30 text-red-400 py-3.5 px-4 rounded-xl font-bold"
                id="mobile-drawer-sos-call"
              >
                <PhoneCall className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest font-bold -mb-0.5">National Helpdesk</div>
                  <div className="text-sm font-extrabold">Emergency Ring: 1091</div>
                </div>
              </a>
              <p className="text-center text-[10px] text-gray-400 font-medium font-semibold">
                Our command centre operates 24/7/365 to track every rider.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
