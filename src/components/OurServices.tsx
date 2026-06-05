import React from 'react';
import { Bike, Car, Sparkles, Package, Globe, Train } from 'lucide-react';

export default function OurServices() {
  const services = [
    {
      title: "Bike-Taxi",
      subtitle: "Beat traffic, ride quicker",
      icon: <span className="text-4xl select-none leading-none">🏍️</span>,
      bg: "bg-amber-50/50"
    },
    {
      title: "Auto",
      subtitle: "Everyday autos, made easy",
      icon: <span className="text-4xl select-none leading-none">🛺</span>,
      bg: "bg-amber-50/50"
    },
    {
      title: "Cab",
      subtitle: "Comfort for every journey",
      icon: <span className="text-4xl select-none leading-none">🚗</span>,
      bg: "bg-amber-50/50"
    },
    {
      title: "Parcel",
      subtitle: "Quick, secure & insured deliveries",
      icon: <Package className="w-8 h-8 text-brand-navy-800" />,
      bg: "bg-zinc-50"
    },
    {
      title: "Travel and Stay",
      subtitle: "One app, entire journey",
      icon: <Globe className="w-8 h-8 text-brand-navy-800" />,
      bg: "bg-zinc-50"
    },
    {
      title: "Metro Ticket",
      subtitle: "Rides to and from the metro",
      icon: <Train className="w-8 h-8 text-brand-navy-800" />,
      bg: "bg-zinc-50"
    }
  ];

  return (
    <section className="py-20 bg-white" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Yellow underline bar */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-900 tracking-tight">
            Our Services
          </h2>
          <div className="w-24 h-1.5 bg-brand-yellow-500 mt-3 rounded-full"></div>
        </div>

        {/* 6 rectangular cards grid block matching image reference 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, i) => (
            <div 
              key={`srv-${i}`}
              className="flex items-center justify-between p-6 rounded-2xl bg-[#f8fafc]/80 hover:bg-[#f1f5f9] border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
              id={`service-card-${i}`}
            >
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-lg text-brand-navy-900 group-hover:text-brand-yellow-600 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold tracking-wide">
                  {srv.subtitle}
                </p>
              </div>
              
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300">
                {srv.icon}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
