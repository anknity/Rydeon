import React, { useState, useEffect, useRef } from 'react';
import { Send, Shield, Sparkles, AlertTriangle, ChevronRight, RefreshCw, Compass } from 'lucide-react';
import { ChatMessage } from '../types';

export default function SafetyBuddy() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I am **Aura-Sister**, your personal 24/7 Safety Travel Advisor & AI Companion. I am here to help you evaluate coordinates, plan secure late-night commutes, suggest safe routing paths, or guide you step-by-step through any uncomfortable situations on the road. Type anything below, or use the quick situational helpers!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest safety logs
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickAdvices = [
    {
      label: "Evaluate late-night Metro route",
      prompt: "State clear, actionable safety tips for traveling via metro link exchanges after 10:00 PM."
    },
    {
      label: "My ride stopped in dark lane",
      prompt: "Emergency: My cab has taken an unfamiliar road and stopped in a dark lane. What concrete, self-defence or assertive communication actions should I take immediately? Give me short bullet points."
    },
    {
      label: "Draft emergency alert SMS",
      prompt: "Draft an urgent but clear SOS SMS alert template including placeholders for vehicle number and location, which I can quick-copy and send to my emergency family contacts."
    },
    {
      label: "Ride taxi onboarding checkup",
      prompt: "Give me the checklist of safety features I should strictly check before sitting in a bike taxi or three-wheeler auto cab driver."
    }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorMessage('');
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/safety-buddy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed secure link verification.");
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.text || "I was unable to compile safety advice at this second. Rest assured, our emergency lines remain open.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Safety Buddy calling error:", err);
      setErrorMessage(err.message || "Failed to contact Safety Buddy backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-brand-navy-900 text-white relative" id="safety-section">
      {/* Immersive backing grid glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(253,191,21,0.06),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-yellow-500/10 border border-brand-yellow-500/30 px-3 py-1 rounded-full text-brand-yellow-400 font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Safety Guardian</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Aura Safety-Buddy
          </h2>
          <div className="w-16 h-1 bg-brand-yellow-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-base text-gray-400 max-w-xl mx-auto mt-4 font-medium">
            Powered by Google Gemini — Ask critical travel advice, check local route profiles, and prepare backup safety plans in seconds.
          </p>
        </div>

        {/* Modular Chat Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Quick-Click situations Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-brand-yellow-400 uppercase tracking-widest flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-yellow-500 animate-pulse" />
              <span>Situational Hotkeys</span>
            </h3>
            <p className="text-xs text-gray-400 leading-normal font-medium">
              Click any situation preset below to instantly retrieve verified AI protection plans or safe travel advice checklists.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              {quickAdvices.map((adv, i) => (
                <button
                  key={`adv-${i}`}
                  onClick={() => handleSendMessage(adv.prompt)}
                  disabled={loading}
                  className="w-full text-left p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-white/5 hover:border-brand-yellow-500/40 text-xs font-semibold text-gray-350 hover:text-white transition-all duration-300 flex items-center justify-between group disabled:opacity-50"
                  id={`preset-prompt-${i}`}
                >
                  <span className="line-clamp-2 mr-3">{adv.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-yellow-500 shrink-0 transform group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            {/* Helpline disclaimer box */}
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-white/10 space-y-2">
              <span className="text-[9px] font-black text-brand-yellow-500 uppercase tracking-widest block">Command Center Warning</span>
              <p className="text-[10.5px] text-gray-300/80 leading-normal font-medium">
                The AI Safety-Buddy provides preventative situational tips. In cases of active physical threat or immediate danger, always click the emergency SOS button on the Book Ride dashboard or dial 1091 (Police Help) immediately to trigger physical dispatch.
              </p>
            </div>
          </div>

          {/* MAIN CHAT CONSOLE */}
          <div className="lg:col-span-8 bg-slate-950/50 rounded-3xl border border-white/10 p-4 sm:p-6 shadow-2xl flex flex-col justify-between min-h-[500px]">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4 font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-gray-300 font-mono">AURA-SISTER V3.5 LIVE</span>
              </div>
              <span className="text-[10px] font-bold text-brand-yellow-400 uppercase tracking-widest">
                Gemini Grounding Guard
              </span>
            </div>

            {/* Scroll messages window */}
            <div className="flex-grow overflow-y-auto max-h-[340px] space-y-4 pr-1 mb-4 flex flex-col">
              {messages.map((msg) => {
                const isBot = msg.role === 'assistant';
                return (
                  <div 
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      isBot ? 'self-start' : 'self-end'
                    }`}
                  >
                    {/* Timestamp label */}
                    <span className={`text-[9px] text-gray-500 font-semibold mb-1 ${
                      isBot ? 'text-left' : 'text-right'
                    }`}>
                      {isBot ? 'Aura Sister' : 'You'} • {msg.timestamp}
                    </span>

                    {/* Chat Bubble card */}
                    <div className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed shadow-md ${
                      isBot 
                        ? 'bg-slate-900 border border-white/5 text-gray-200 text-left' 
                        : 'bg-brand-yellow-500 text-brand-navy-900 text-right font-bold'
                    }`}>
                      <div className="space-y-1.5 whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loader */}
              {loading && (
                <div className="self-start flex items-center gap-2 bg-slate-900 border border-white/5 p-3 rounded-2xl max-w-[80%] text-xs text-gray-400 font-bold animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-yellow-500" />
                  <span>Aura-Sister is formulating security recommendations...</span>
                </div>
              )}

              {/* Error log block */}
              {errorMessage && (
                <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-350 rounded-xl text-xs flex gap-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                  <div>
                    <strong className="block text-white font-extrabold mb-0.5">Integration Guard Warning:</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Submission Bar */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-2 bg-slate-900 border border-white/5 p-1.5 rounded-full"
            >
              <input
                type="text"
                id="safety-chat-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type travel concerns, night routes, safety inquiries..."
                className="flex-grow bg-transparent px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none placeholder-gray-500 font-semibold"
                disabled={loading}
              />
              <button
                type="submit"
                id="safety-chat-send-btn"
                disabled={!inputValue.trim() || loading}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shrink-0 ${
                  inputValue.trim() && !loading
                    ? 'bg-brand-yellow-500 text-brand-navy-900 hover:bg-brand-yellow-600 scale-103'
                    : 'bg-slate-800 text-gray-500 cursor-not-allowed shadow-none'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <span className="text-[9.5px] text-center text-gray-500 font-medium block mt-3">
              Encrypted Security Channel. Aura-Sister conversations are kept strictly confidential.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
