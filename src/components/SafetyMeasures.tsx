import React from 'react';
import { HeartHandshake, Umbrella, Headphones, MessageSquare, Star } from 'lucide-react';

export default function SafetyMeasures() {
  return (
    <div 
      className="bg-[#fdbf15] text-slate-950 rounded-[32px] p-8 sm:p-12 md:p-16 border border-yellow-600/10 shadow-lg mt-8 text-left relative overflow-hidden"
      id="safety-measures-yellow-section"
    >
      {/* Dynamic ambient backdrop elements mimicking high premium design */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* 2x2 Clean Layout mimicking the Rapido reference screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 relative z-10">
        
        {/* Row 1 / Col 1: Main Pillar "Measures to ensure..." */}
        <div className="space-y-6 flex flex-col justify-start">
          <div className="w-16 h-16 rounded-2xl bg-slate-950/5 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 duration-300">
            {/* Custom hands centering citizen using HeartHandshake or similar styling */}
            <HeartHandshake className="w-10 h-10 text-slate-950 stroke-[1.8]" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#111116] tracking-tight leading-tight">
            Measures to ensure the well-being of both, our Captains and Customers.
          </h3>
        </div>

        {/* Row 1 / Col 2: Insurance Protection Block */}
        <div className="space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-950/5 flex items-center justify-center transition-transform hover:scale-105 duration-300">
            <Umbrella className="w-10 h-10 text-slate-950 stroke-[1.8]" />
          </div>
          <div className="space-y-3">
            <h4 className="text-xl sm:text-2xl font-bold text-[#111116] tracking-tight">
              Insurance
            </h4>
            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed max-w-md">
              Insurance can be claimed for any accident that occurs during the ride covering OPD treatment, hospitalisation, and accidental benefit with a maximum sum insured of ₹5 Lakh. It can be claimed as soon as the ride is completed.
            </p>
          </div>
        </div>

        {/* Row 2 / Col 1: Customer Support Desk */}
        <div className="space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-950/5 flex items-center justify-center transition-transform hover:scale-105 duration-300">
            <Headphones className="w-10 h-10 text-slate-950 stroke-[1.8]" />
          </div>
          <div className="space-y-3">
            <h4 className="text-xl sm:text-2xl font-bold text-[#111116] tracking-tight">
              24 x 7 Customer Support
            </h4>
            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed max-w-md">
              Both, our captains and customers can report any kind of issues to Rydeon through the 24*7 support channel. Our dedicated response team operates around the clock to assist you with active trips.
            </p>
          </div>
        </div>

        {/* Row 2 / Col 2: Two-way Rating system */}
        <div className="space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-950/5 flex items-center justify-center relative transition-transform hover:scale-105 duration-300">
            <MessageSquare className="w-10 h-10 text-slate-950 stroke-[1.8]" />
            <Star className="w-4 h-4 text-slate-950 fill-slate-950 absolute" />
          </div>
          <div className="space-y-3">
            <h4 className="text-xl sm:text-2xl font-bold text-[#111116] tracking-tight">
              Two-way Rating System
            </h4>
            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed max-w-md">
              Post the ride, both parties can give a rating to each other and any rating below 3 is flagged instantly for review, guaranteeing that mutual respect and safe conduct are maintained on every route.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
