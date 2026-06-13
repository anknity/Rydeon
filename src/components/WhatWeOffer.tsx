import React from 'react';

export default function WhatWeOffer() {
  const offerings = [
    {
      title: "Quick Pickup",
      desc: "Pickups within minutes that help you save time on every ride. A Rydeon is always nearby when you need to get moving.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      title: "Best Fares",
      desc: "Affordable prices designed for everyday rides. Travel more, spend less without compromising on comfort.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      title: "Never Too Far",
      desc: "Present across 400+ cities and counting. Wherever you go, find a Rydeon ride close by.",
      image: "https://images.unsplash.com/photo-1518611507436-f9221403cca2?auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  return (
    <section className="py-12 bg-white" id="features-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Left Aligned Section Heading with signature Yellow underline bar */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-5xl font-black text-[#111116] tracking-tight">
            What we offer
          </h2>
          <div className="w-40 h-[5px] bg-brand-yellow-500 mt-3 rounded-full"></div>
        </div>

        {/* 3 custom columns layout matching reference image exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {offerings.map((off, idx) => (
            <div 
              key={`off-${idx}`}
              className="flex flex-col space-y-5 group"
              id={`offer-card-${idx}`}
            >
              {/* Image with beautiful rounded-3xl corners and smooth hover zoom zoom */}
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-slate-50 border border-slate-100 shadow-sm relative">
                <img 
                  src={off.image} 
                  alt={off.title}
                  className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-[1.03]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title & Description under the image, borderless/flat exactly like reference */}
              <div className="space-y-2 text-left">
                <h3 className="text-2xl font-black text-[#111116] tracking-tight leading-none">
                  {off.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                  {off.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

