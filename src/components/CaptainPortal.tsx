import React, { useState } from 'react';
import { ShieldCheck, Coins, Smile, Award, Sparkles, Navigation, UserCheck, ArrowRight } from 'lucide-react';
import { CaptainApplication } from '../types';

export default function CaptainPortal() {
  // Earnings estimation states
  const [dailyTrips, setDailyTrips] = useState(8);
  const [dailyHours, setDailyHours] = useState(6);
  const [showAppliedForm, setShowAppliedForm] = useState(false);

  // Application flow states
  const [appForm, setAppForm] = useState<CaptainApplication>({
    name: '',
    phone: '',
    city: 'Bengaluru Core',
    vehicleType: 'Vespa SR-E',
    experienceYears: '2',
    hasLicense: true,
    agreedToSafetyBadge: true
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittingAlert, setSubmittingAlert] = useState(false);

  // Math earnings logic (realistic and inspiring)
  const averageTripFareEarn = 120; // in INR
  const baseCaptainCommission = 0.85; // Captain gets 85% of fare
  const dailyFuelSafetyBonus = 70; // extra cash allowance for safety compliance

  const dailyEarnings = Math.round((dailyTrips * averageTripFareEarn * baseCaptainCommission) + dailyFuelSafetyBonus);
  const weeklyEarnings = dailyEarnings * 6; // assuming 6 working days
  const monthlyEarnings = Math.round(weeklyEarnings * 4.3);

  const handleApplyNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.name.trim() || !appForm.phone.trim()) return;

    setSubmittingAlert(true);
    setTimeout(() => {
      setSubmittingAlert(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const scrollToEnroll = () => {
    setShowAppliedForm(true);
    setTimeout(() => {
      const element = document.getElementById('enroll-form-anchor');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section className="py-20 bg-[#fafafa]" id="captain-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* IMPACT BANNER INSPIRATION FROM IMAGE 4 */}
        <div className="bg-brand-navy-900 rounded-3xl overflow-hidden shadow-2xl relative border border-white/5 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left side column: High-res female pilot smiles image */}
            <div className="lg:col-span-5 h-[340px] lg:h-[480px] w-full relative bg-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&h=800&q=80" 
                alt="Smiling Female Commuter Pilots" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-navy-900/40 via-transparent to-brand-navy-900/10"></div>
            </div>

            {/* Right side details panel: Yellow theme button, no pink */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 text-white text-left">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Earn with RydeOn
              </h2>
              <div className="w-20 h-1.5 bg-brand-yellow-500 rounded-full"></div>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                Play on your own terms. Earn a high, flexible livelihood weekly, choose your optimal working slots, and lead your metropolis neighborhood as a trusted safety captain.
              </p>

              <div className="pt-4">
                <button
                  onClick={scrollToEnroll}
                  className="bg-brand-yellow-500 hover:bg-brand-yellow-600 text-brand-navy-900 h-14 px-8 rounded-xl font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-brand-yellow-500/15 cursor-pointer"
                >
                  <span>Start Earning →</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* HIGH-FIDELITY DETAILED REGISTRATION WORKSPACE */}
        {showAppliedForm && (
          <div id="enroll-form-anchor" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto pt-4 animate-fade-in">
            
            {/* EARNINGS SLIDER CALCULATOR */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <Coins className="w-6 h-6 text-brand-yellow-500 animate-bounce" />
                <div>
                  <h3 className="font-extrabold text-lg text-brand-navy-900">Flexible Earnings Estimator</h3>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Adjust hours & trips to calculate payouts</span>
                </div>
              </div>

              {/* Completed Trips Slider */}
              <div>
                <div className="flex justify-between items-baseline mb-2 font-semibold">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Completed Trips per day</span>
                  <span className="text-sm text-brand-navy-900 font-black">{dailyTrips} rides</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="18"
                  step="1"
                  value={dailyTrips}
                  onChange={(e) => setDailyTrips(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg cursor-pointer accent-brand-yellow-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                  <span>Part-Time (3)</span>
                  <span>Standard (8)</span>
                  <span>Pro Captain (18)</span>
                </div>
              </div>

              {/* Active Riding Hours Slider */}
              <div>
                <div className="flex justify-between items-baseline mb-2 font-semibold">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Active Riding Hours (Daily)</span>
                  <span className="text-sm text-brand-navy-900 font-black">{dailyHours} hours</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg cursor-pointer accent-brand-yellow-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                  <span>Flexible (2h)</span>
                  <span>Optimal (6h)</span>
                  <span>Full-Day (12h)</span>
                </div>
              </div>

              {/* Payout Display Stats */}
              <div className="bg-brand-navy-900 text-white p-5 rounded-2xl space-y-4 shadow-lg border border-white/5">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#f8fafc] block text-center">Estimated Earnings (85% Captain Payout)</span>
                
                <div className="grid grid-cols-2 gap-4 text-center divide-x divide-white/10">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-bold">Weekly Payout</span>
                    <div className="text-2xl font-black text-white mt-1">₹{weeklyEarnings}</div>
                    <span className="text-[9px] text-emerald-400 font-medium block mt-0.5">Paid every Tuesday</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-bold">Monthly Potential</span>
                    <div className="text-2xl font-black text-brand-yellow-500 mt-1">₹{monthlyEarnings}</div>
                    <span className="text-[9px] text-emerald-400 font-medium block mt-0.5">*Plus Captain Bonuses</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1 text-center font-medium">
                  <p className="text-[10px] text-slate-300">
                    ⚡ Includes complimentary E-Bike vehicle charging & physical safety patrol backup support.
                  </p>
                </div>
              </div>

              {/* Captain Key benefits list */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Smile className="w-5 h-5 text-brand-navy-900 mx-auto mb-1.5" />
                  <h4 className="font-extrabold text-xs text-brand-navy-900">Flexible Slots</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5 leading-normal">Ride only when convenient.</p>
                </div>
                <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Award className="w-5 h-5 text-brand-navy-900 mx-auto mb-1.5" />
                  <h4 className="font-extrabold text-xs text-brand-navy-900">Safety Shield</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5 leading-normal">Panic alerts, direct line checks.</p>
                </div>
                <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Sparkles className="w-5 h-5 text-brand-navy-900 mx-auto mb-1.5" />
                  <h4 className="font-extrabold text-xs text-brand-navy-900">Pro-Income</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5 leading-normal">Maximum payouts direct to wallet.</p>
                </div>
              </div>
            </div>

            {/* APPLICATION FORM & WIZARD */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4 mb-6">
                <UserCheck className="w-6 h-6 text-brand-navy-900" />
                <div>
                  <h3 className="font-extrabold text-lg text-brand-navy-900">Express Captain Enrollment</h3>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Enter brief details below to apply</span>
                </div>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleApplyNow} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Name field */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Your First Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shalini"
                        value={appForm.name}
                        onChange={(e) => setAppForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 h-[46px] px-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-yellow-500 transition-all font-semibold"
                      />
                    </div>

                    {/* Phone field */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98xxx xxxxx"
                        value={appForm.phone}
                        onChange={(e) => setAppForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 h-[46px] px-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-yellow-500 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* City selector */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Operational City
                      </label>
                      <select
                        value={appForm.city}
                        onChange={(e) => setAppForm(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 h-[46px] px-4 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-yellow-500 transition-all cursor-pointer font-semibold"
                      >
                        <option value="Bengaluru Core">Bengaluru Core</option>
                        <option value="Mumbai Suburban">Mumbai Suburban</option>
                        <option value="Delhi SafeCorridor">Delhi SafeCorridor</option>
                        <option value="Pune IT Junction">Pune IT Junction</option>
                      </select>
                    </div>

                    {/* Vehicle Type selector */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Vehicle Type
                      </label>
                      <select
                        value={appForm.vehicleType}
                        onChange={(e) => setAppForm(prev => ({ ...prev, vehicleType: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 h-[46px] px-4 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-yellow-500 transition-all cursor-pointer font-semibold"
                      >
                        <option value="Vespa SR-E">Pink Electric Scooter (Vespa)</option>
                        <option value="Bajaj Custom RE">Secure Auto Rickshaw (Bajaj RE)</option>
                        <option value="Hatchback Custom">SafeGuard Elite EV Hatchback</option>
                        <option value="Any Female-Rental">I would require rental scooter vehicle</option>
                      </select>
                    </div>
                  </div>

                  {/* Driving License confirmation checkbox */}
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 mt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={appForm.hasLicense}
                        onChange={() => setAppForm(prev => ({ ...prev, hasLicense: !prev.hasLicense }))}
                        className="rounded border-slate-300 text-brand-navy-900 focus:ring-brand-navy-900 mt-1 cursor-pointer"
                      />
                      <div className="text-xs font-semibold text-slate-600 leading-normal">
                        I declare that I possess a valid national physical driving license and legal authorization documentation on my vehicle.
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={appForm.agreedToSafetyBadge}
                        onChange={() => setAppForm(prev => ({ ...prev, agreedToSafetyBadge: !prev.agreedToSafetyBadge }))}
                        className="rounded border-slate-300 text-brand-navy-900 focus:ring-brand-navy-900 mt-1 cursor-pointer"
                      />
                      <div className="text-xs font-semibold text-slate-600 leading-normal">
                        I agree to undergo standard RydeOn forensic background validation and safety compliance checks.
                      </div>
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submittingAlert || !appForm.hasLicense || !appForm.agreedToSafetyBadge}
                    className={`w-full h-[52px] rounded-xl font-extrabold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                      appForm.hasLicense && appForm.agreedToSafetyBadge && !submittingAlert
                        ? 'bg-brand-yellow-500 text-brand-navy-900 hover:bg-brand-yellow-600 shadow-brand-yellow-500/10 cursor-pointer hover:scale-103 active:scale-97'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 shadow-none cursor-not-allowed'
                    }`}
                  >
                    <span>{submittingAlert ? 'Verifying Details...' : 'Submit Application'}</span>
                    <Navigation className="w-4 h-4 transform rotate-45" />
                  </button>
                </form>
              ) : (
                // REGISTER SUBMITTED SUCCESS FLOW
                <div className="text-center py-10 space-y-5 animate-fade-in" id="apply-success-card">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <ShieldCheck className="w-10 h-10" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-black text-brand-navy-900">Welcome Onboard!</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                      Your preliminary application was verified. Thank you for leading as safe companion driver!
                    </p>
                  </div>

                  {/* Submitting success checkup list */}
                  <div className="bg-slate-50 p-5 rounded-2xl text-left border border-slate-100 max-w-md mx-auto space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center border-b border-slate-200/50 pb-2">
                      ✓ Next-Step Verification Milestones
                    </span>
                    
                    <div className="space-y-2 font-semibold text-xs text-slate-600">
                      <p className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-500 font-extrabold flex items-center justify-center text-[10px]">1</span>
                        <span>Forensic details validation begins (takes 48 working hours).</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-500 font-extrabold flex items-center justify-center text-[10px]">2</span>
                        <span>Receive a call from local city hub manager to pick up standard helmets & jackets.</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mx-auto border border-slate-200 hover:bg-slate-50 text-slate-500 py-2 px-6 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                  >
                    <span>Submit Another Application</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
