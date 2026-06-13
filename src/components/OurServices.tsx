import React from 'react';

// Custom high-fidelity illustrations exactly mimicking the reference design style
const BikeTaxiIllustration = () => (
  <div className="relative w-28 h-20 flex items-center justify-end scale-110 sm:scale-125 transform transition-transform duration-300 group-hover:scale-115 shrink-0 select-none">
    <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-md">
      {/* Wheels */}
      <circle cx="28" cy="58" r="14" fill="#111116" stroke="#fbcf25" strokeWidth="3" />
      <circle cx="28" cy="58" r="6" fill="#fff" />
      
      <circle cx="92" cy="58" r="14" fill="#111116" stroke="#fbcf25" strokeWidth="3" />
      <circle cx="92" cy="58" r="6" fill="#fff" />
      
      {/* Frame */}
      <path d="M28 58 L45 35 L75 35 L92 58" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Body parts (Yellow/White) */}
      <path d="M42 35 L78 35 L88 52 L32 52 Z" fill="#fbcf25" />
      <path d="M50 35 L72 35 L78 48 L44 48 Z" fill="#ffffff" />
      
      {/* Seat */}
      <path d="M52 28 C52 28, 62 25, 78 28 L82 35 L50 35 Z" fill="#111116" />
      
      {/* Handlebars */}
      <path d="M28 58 L38 20 L48 18" stroke="#111116" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M38 20 L30 24" stroke="#111116" strokeWidth="4" strokeLinecap="round" />
      <circle cx="48" cy="18" r="4" fill="#fbcf25" />
    </svg>
  </div>
);

const AutoIllustration = () => (
  <div className="relative w-28 h-20 flex items-center justify-end scale-110 sm:scale-125 transform transition-transform duration-300 group-hover:scale-115 shrink-0 select-none">
    <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-md">
      {/* Wheels */}
      <circle cx="35" cy="60" r="10" fill="#111116" />
      <circle cx="85" cy="60" r="10" fill="#111116" />
      
      {/* Rickshaw Cab Green Body */}
      <path d="M35 55 L85 55 C90 55, 93 50, 93 42 L93 30 L45 30 L35 42 Z" fill="#10b981" />
      
      {/* Rickshaw Hood Yellow/Cream */}
      <path d="M45 30 L93 30 L93 20 C90 14, 45 14, 45 20 Z" fill="#fbcf25" />
      
      {/* Seat details */}
      <rect x="70" y="38" width="18" height="6" fill="#111116" rx="1" />
      
      {/* Front lights */}
      <path d="M32 45 L32 52" stroke="#111116" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="46" r="3" fill="#fbcf25" />
      
      {/* Windows */}
      <rect x="52" y="24" width="16" height="15" fill="#f8fafc" rx="2" />
      <rect x="73" y="24" width="14" height="15" fill="#f8fafc" rx="2" />
      <rect x="42" y="24" width="6" height="15" fill="#f1f5f9" rx="1" />
    </svg>
  </div>
);

const CabIllustration = () => (
  <div className="relative w-28 h-20 flex items-center justify-end scale-110 sm:scale-125 transform transition-transform duration-300 group-hover:scale-115 shrink-0 select-none">
    <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-md">
      {/* Wheels */}
      <circle cx="35" cy="58" r="11" fill="#111116" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="35" cy="58" r="5" fill="#fff" />
      <circle cx="85" cy="58" r="11" fill="#111116" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="85" cy="58" r="5" fill="#fff" />
      
      {/* Car body */}
      <path d="M20 48 L22 36 C24 32, 28 30, 36 30 L45 20 C50 16, 75 16, 80 20 L92 32 C98 32, 102 36, 102 42 L102 48 C102 52, 98 54, 95 54 L25 54 C21 54, 20 52, 20 48 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      
      {/* Yellow brand accent strip */}
      <path d="M30 46 L92 46 C95 46, 98 42, 98 42 L90 34 L32 34 Z" fill="#fbcf25" />
      
      {/* Windows */}
      <path d="M46 22 L62 22 L62 30 L42 30 Z" fill="#334155" />
      <path d="M66 22 L78 22 L86 30 L66 30 Z" fill="#334155" />
      
      {/* Headlight lamp */}
      <path d="M19 41 Q17 43, 19 45 Z" fill="#fbcf25" stroke="#fbcf25" strokeWidth="1" />
    </svg>
  </div>
);

const ParcelIllustration = () => (
  <div className="relative w-28 h-20 flex items-center justify-end scale-110 sm:scale-125 transform transition-transform duration-300 group-hover:scale-115 shrink-0 select-none">
    <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-md">
      {/* Bottom shadow */}
      <ellipse cx="60" cy="68" rx="30" ry="6" fill="#000" opacity="0.08" />
      
      {/* Box left face */}
      <path d="M30 35 L60 50 L60 75 L30 60 Z" fill="#ca8a04" />
      
      {/* Box right face */}
      <path d="M60 50 L90 35 L90 60 L60 75 Z" fill="#eab308" />
      
      {/* Box top face */}
      <path d="M30 35 L60 20 L90 35 L60 50 Z" fill="#fef08a" />
      
      {/* Warning safety stripes */}
      <path d="M30 52 L60 67 L60 72 L30 57 Z" fill="#111116" />
      <path d="M30 42 L60 57 L60 62 L30 47 Z" fill="#111116" />
      <path d="M60 67 L90 52 L90 57 L60 72 Z" fill="#111116" />
      <path d="M60 57 L90 42 L90 47 L60 62 Z" fill="#111116" />
      
      {/* Shipping invoice label */}
      <polygon points="52,32 68,40 74,37 58,29" fill="#ffffff" />
    </svg>
  </div>
);

const TravelIllustration = () => (
  <div className="relative w-28 h-20 flex items-center justify-end scale-110 sm:scale-125 transform transition-transform duration-300 group-hover:scale-115 shrink-0 select-none">
    <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-md">
      {/* Sea circle */}
      <ellipse cx="60" cy="66" rx="42" ry="7" fill="#38bdf8" opacity="0.6" />
      
      {/* Sand island */}
      <ellipse cx="60" cy="62" rx="35" ry="10" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
      
      {/* Palm tree */}
      <path d="M50 62 Q45 42, 52 26" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M52 26 Q35 22, 38 35" stroke="#15803d" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M52 26 Q68 22, 65 35" stroke="#15803d" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M52 26 Q55 10, 48 12" stroke="#15803d" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M52 26 Q40 14, 38 20" stroke="#15803d" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M52 26 Q65 14, 62 20" stroke="#15803d" strokeWidth="3" strokeLinecap="round" fill="none" />
      
      {/* Travelers Suitcase */}
      <rect x="70" y="42" width="18" height="15" fill="#0284c7" rx="3" />
      <path d="M74 42 L74 38 L84 38 L84 42" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="73" cy="58" r="2" fill="#111116" />
      <circle cx="85" cy="58" r="2" fill="#111116" />
    </svg>
  </div>
);

const MetroIllustration = () => (
  <div className="relative w-28 h-20 flex items-center justify-end scale-110 sm:scale-125 transform transition-transform duration-300 group-hover:scale-115 shrink-0 select-none">
    <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-md">
      {/* Tracks */}
      <line x1="15" y1="62" x2="105" y2="62" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      
      {/* Metro protective tube arc */}
      <path d="M100 62 Q100 20, 50 20 Q15 20, 15 48" stroke="#fbcf25" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
      
      {/* Train */}
      <path d="M30 58 L90 58 C95 58, 100 55, 101 44 L101 38 C101 32, 95 32, 90 32 L30 32 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      
      {/* Brand accent rail */}
      <rect x="30" y="48" width="70" height="4" fill="#fbcf25" />
      
      {/* Windows */}
      <rect x="36" y="36" width="12" height="8" fill="#334155" rx="1.5" />
      <rect x="52" y="36" width="12" height="8" fill="#334155" rx="1.5" />
      <rect x="68" y="36" width="12" height="8" fill="#334155" rx="1.5" />
      <path d="M86 36 L96 36 C98 36, 100 40, 99 46 L95 46 Z" fill="#111116" />
    </svg>
  </div>
);

export default function OurServices() {
  const services = [
    {
      title: "Bike-Taxi",
      subtitle: "Beat traffic, ride quicker",
      illustration: <BikeTaxiIllustration />
    },
    {
      title: "Auto",
      subtitle: "Everyday autos, made easy",
      illustration: <AutoIllustration />
    },
    {
      title: "Cab",
      subtitle: "Comfort for every journey",
      illustration: <CabIllustration />
    },
    {
      title: "Parcel",
      subtitle: "Quick, secure & insured deliveries",
      illustration: <ParcelIllustration />
    },
    {
      title: "Travel and Stay",
      subtitle: "One app, entire journey",
      illustration: <TravelIllustration />
    },
    {
      title: "Metro Ticket",
      subtitle: "Rides to and from the metro",
      illustration: <MetroIllustration />
    }
  ];

  return (
    <section className="py-12 bg-white" id="services-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Left Aligned Section Heading with signature Yellow underline bar under first word */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-5xl font-black text-[#111116] tracking-tight">
            Our Services
          </h2>
          <div className="w-32 h-[5px] bg-brand-yellow-500 mt-3 rounded-full"></div>
        </div>

        {/* 6 rectangular cards grid with spacious layout and clean gray-50 style backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((srv, i) => (
            <div 
              key={`srv-${i}`}
              className="flex items-center justify-between p-7 sm:p-8 rounded-[24px] bg-[#f5f6f9] hover:bg-[#ebecf1] border border-transparent hover:border-slate-200/80 transition-all duration-300 group min-h-[145px]"
              id={`service-card-${i}`}
            >
              {/* Text Layout */}
              <div className="space-y-1.5 text-left pr-3">
                <h3 className="font-extrabold text-xl sm:text-2xl text-[#111116] tracking-tight leading-tight">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed max-w-[160px] sm:max-w-[185px]">
                  {srv.subtitle}
                </p>
              </div>
              
              {/* Custom SVG Illustration Container */}
              <div className="shrink-0 flex items-center justify-center">
                {srv.illustration}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

