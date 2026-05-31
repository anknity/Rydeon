import React from 'react';

export default function WhatWeOffer() {
  const offerings = [
    {
      title: "Quick Pickup",
      desc: "Pickups within minutes that help you save time on every ride. A Rydeon is always nearby when you need to get moving safely.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      title: "Best Fares",
      desc: "Affordable prices designed for everyday commutes. Travel more, spend less without compromising on premium security or comfort.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      title: "Never Too Far",
      desc: "Present across major metropolitan districts and counting. Wherever you need safe transit, find a verified helper partner close by.",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  return (
    <section className="py-20 bg-slate-50" id="features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Yellow underline bar */}
        <div className="mb-14 text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-900 tracking-tight">
            What we offer
          </h2>
          <div className="w-24 h-1.5 bg-brand-yellow-500 mt-3 rounded-full"></div>
        </div>

        {/* 3 custom cards layout corresponding exactly to Image 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((off, idx) => (
            <div 
              key={`off-${idx}`}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              id={`offer-card-${idx}`}
            >
              <div>
                {/* Visual cover image */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100">
                  <img 
                    src={off.image} 
                    alt={off.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card text details */}
                <div className="p-6 space-y-2.5">
                  <h3 className="text-xl font-black text-brand-navy-900">
                    {off.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                    {off.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
