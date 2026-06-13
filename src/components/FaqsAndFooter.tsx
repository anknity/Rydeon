import React, { useState } from 'react';
import { ChevronDown, Plus, Mail, ArrowRight, ShieldCheck, Instagram, Linkedin, Heart, Check, Info } from 'lucide-react';
import { faqs } from '../data';

interface FaqsAndFooterProps {
  currentView?: string;
  onViewChange?: (view: any) => void;
}

export default function FaqsAndFooter({ currentView, onViewChange }: FaqsAndFooterProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailValue, setEmailValue] = useState('');
  const [newsSubmitted, setNewsSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue.trim()) return;
    setNewsSubmitted(true);
    setTimeout(() => {
      setEmailValue('');
    }, 2000);
  };

  return (
    <section className="bg-white pt-16 pb-12" id="faq-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQ layout - displayed ONLY on the FAQ page tab view for a cohesive and clean experience */}
        {currentView === 'faq' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start animate-fade-in">
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-block bg-brand-yellow-500/10 text-brand-navy-900 border border-brand-yellow-500/30 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
                Common Inquiries
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111116] tracking-tight leading-tight">
                Safety Curiosities & Guidelines
              </h2>
              <p className="text-slate-500 font-semibold text-sm leading-relaxed">
                Find answers regarding pilot background clearances, late-night booking procedures, SOS alarm response times, and vehicle specifications.
              </p>

              <a 
                href="mailto:support@rydeon.safe" 
                className="inline-flex items-center gap-2 bg-brand-navy-900 hover:bg-brand-navy-800 text-brand-yellow-500 py-3.5 px-6 rounded-full font-black text-xs uppercase tracking-wider transition-all hover:scale-103 active:scale-97 shadow-md cursor-pointer"
                id="faq-support-btn"
              >
                <span>Speak to Support</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={`faq-${index}`} 
                    className={`border border-slate-200/80 rounded-2xl overflow-hidden transition-all ${
                      isOpen ? 'bg-amber-50/10 border-brand-yellow-500/30' : 'bg-slate-50 hover:bg-slate-100/50'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left transition-colors focus:outline-none cursor-pointer"
                      id={`faq-btn-${index}`}
                    >
                      <span className="font-extrabold text-sm sm:text-base text-[#111116] pr-4">
                        {faq.question}
                      </span>
                      <div className={`w-9 h-9 border border-slate-200 rounded-xl bg-white flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 border-brand-yellow-500/30 text-brand-yellow-600' : 'text-slate-500'
                      }`}>
                        <ChevronDown className="w-4.5 h-4.5" />
                      </div>
                    </button>
                    
                    {/* Accordion body panels */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-650 text-xs sm:text-sm font-semibold leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA newsletter box */}
        <div className="bg-brand-navy-900 rounded-[32px] p-8 sm:p-16 relative overflow-hidden text-center lg:text-left border border-white/5 shadow-xl select-none mb-16">
          {/* Subtle decoration elements */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-yellow-500/5 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-15 space-y-4 lg:col-span-7">
              <span className="inline-block bg-brand-yellow-500 text-brand-navy-900 font-extrabold text-[9px] uppercase tracking-widest px-3.5 py-1 rounded-full text-center">
                Weekly Safety Bulletins
              </span>
              <h2 className="text-2xl sm:text-4xl text-white font-extrabold tracking-tight">
                Get Late-Night Safe Route Updates
              </h2>
              <p className="text-slate-300 font-medium text-xs sm:text-sm max-w-md mx-auto lg:mx-0 leading-relaxed">
                Receive weekly maps updates, alerts on active pilot safety zones, and discount codes directly to your inbox. Zero spam.
              </p>
            </div>

            <div className="lg:col-span-5 w-full">
              {!newsSubmitted ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:ml-auto w-full">
                  <input
                    type="email"
                    id="newsletter-email"
                    required
                    placeholder="Enter email address"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="flex-grow h-12 bg-white/5 border border-white/10 text-white font-semibold rounded-full px-6 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow-500 transition-all placeholder-gray-500"
                  />
                  <button 
                    type="submit"
                    id="newsletter-submit"
                    className="h-12 px-6 bg-brand-yellow-500 hover:bg-brand-yellow-600 text-brand-navy-900 font-black uppercase text-xs tracking-wider rounded-full shrink-0 transition-all shadow-md cursor-pointer active:scale-95 text-center flex items-center justify-center"
                  >
                    <span>Subscribe</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-900/30 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-left max-w-md mx-auto" id="newsletter-success">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-white">Registered Success!</h5>
                    <p className="text-[10px] text-gray-300">You are securely signed up to local corridor alerts.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Elegant Footer block */}
        <footer className="pt-16 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-left">
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow-500 flex items-center justify-center shadow-md">
                <ShieldCheck className="w-5 h-5 text-brand-navy-900" />
              </div>
              <span className="text-xl font-black text-brand-charcoal">Ryde<span className="text-brand-yellow-500">on</span></span>
            </div>
            
            <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-sm">
              We are on a direct mission to reclaim public transport structures for women, merging convenient mobility with comprehensive, background-cleared safety checklists. Active across major urban centers.
            </p>

            {/* Social channels */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-yellow-600 hover:border-brand-yellow-500/40 hover:bg-amber-50/10 transition-all">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-yellow-600 hover:border-brand-yellow-500/40 hover:bg-amber-50/10 transition-all">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-extrabold uppercase tracking-widest text-xs text-brand-charcoal">Active Corridors</h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-semibold">
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">Bengaluru Hubs</a></li>
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">Mumbai Lanes</a></li>
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">Delhi corridors</a></li>
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">Pune IT exchanges</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-extrabold uppercase tracking-widest text-xs text-brand-charcoal">Safety Compliance</h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-semibold">
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">Forensic Verification</a></li>
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">Safety helmets audits</a></li>
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">Police hotline link</a></li>
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">No peak surges policy</a></li>
              </ul>
            </div>

            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="font-extrabold uppercase tracking-widest text-xs text-brand-charcoal">Legal Framework</h4>
              <ul className="space-y-2.5 text-xs text-[#52525b] font-semibold">
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">Privacy policy log</a></li>
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">Driver License terms</a></li>
                <li><a href="#" className="hover:text-brand-yellow-600 transition-colors">Terms of service</a></li>
              </ul>
            </div>
          </div>
        </footer>

        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-400 font-semibold flex items-center justify-center gap-1">
            <span>© 2026 Rydeon Mobility. Made with care for safe commutes.</span>
          </p>
          <div className="flex gap-6 text-[11px] text-slate-450 font-bold">
            <a href="#" className="hover:text-brand-yellow-600 transition-colors">Privacy Log</a>
            <a href="#" className="hover:text-brand-yellow-600 transition-colors">General Terms</a>
          </div>
        </div>

      </div>
    </section>
  );
}
