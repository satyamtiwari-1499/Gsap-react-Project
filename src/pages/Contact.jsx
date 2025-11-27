import React, { useEffect, useState } from 'react';
import { 
  Send, 
  MapPin, 
  Mail, 
  ArrowUpRight, 
  Zap
} from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: 'partnership', // partnership, support, fleet
    message: ''
  });
  
  const [activeField, setActiveField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Transmission Received"); 
      setFormState({ name: '', email: '', type: 'partnership', message: '' });
    }, 2000);
  };

  // Helper for staggered text reveal
  const AnimatedText = ({ text, delayOffset = 0, className = "" }) => (
    <div className={`overflow-hidden inline-flex ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={`inline-block transition-transform duration-1000 ease-out will-change-transform ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
          }`}
          style={{ transitionDelay: `${delayOffset + (i * 0.05)}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      <style>{`
        @keyframes grid-scroll {
          0% { background-position: 0px 0px; }
          100% { background-position: 0px 100px; }
        }
        .animate-grid {
          animation: grid-scroll 20s linear infinite;
        }
      `}</style>

      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 animate-grid opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} 
      />
      
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[50vw] h-[300px] md:h-[50vw] bg-cyan-900/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[40vw] h-[300px] md:h-[40vw] bg-blue-900/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none mix-blend-screen" />

      {/* --- MAIN LAYOUT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 lg:pt-32 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

        {/* --- LEFT COLUMN: CONTEXT & INFO --- */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          
          {/* Header Section */}
          <div className="mb-12">
            <div className={`flex items-center gap-2 text-cyan-500 mb-6 tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase opacity-80 transition-opacity duration-1000 ${mounted ? 'opacity-80' : 'opacity-0'}`}>
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"/>
              System Status: Online
            </div>
            
            {/* UPDATED: Typography resizing */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 flex flex-col items-start">
              <AnimatedText text="GET" delayOffset={0.2} />
              <div className="text-white bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                <AnimatedText text="IN" delayOffset={0.35} />
              </div>
              <div className="text-cyan-400">
                <AnimatedText text="TOUCH" delayOffset={0.45} />
              </div>
            </h1>
            
            <div 
              className={`transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-md border-l-2 border-cyan-900/50 pl-6">
                Initiate a connection with our engineering fleet. Whether for partnership inquiries or technical support, our frequencies are open.
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6 md:space-y-8">
            
            {/* HQ */}
            <div 
              className={`info-item group p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-700 delay-700 rounded-sm relative overflow-hidden ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-cyan-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 mb-1">Global Coordinates</h3>
                  <p className="text-white font-medium">Innovation District, Sector 7</p>
                  <p className="text-neutral-500 text-sm">Berlin, 10115, DE</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div 
              className={`info-item group p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-700 delay-[800ms] rounded-sm relative overflow-hidden ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-cyan-400">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 mb-1">Digital Uplink</h3>
                  <p className="text-white font-medium break-all">hello@amster.ev</p>
                  <p className="text-neutral-500 text-sm">Response time: &lt; 2hrs</p>
                </div>
              </div>
            </div>

            {/* Socials / Extra */}
            <div className={`info-item flex gap-4 pt-4 transition-all duration-700 delay-[900ms] ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {['LinkedIn', 'Twitter/X', 'GitHub'].map((social) => (
                <a key={social} href="#" className="text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 hover:text-cyan-400 transition-colors flex items-center gap-1">
                  {social} <ArrowUpRight size={10} />
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* --- RIGHT COLUMN: INTERACTIVE FORM --- */}
        <div className={`lg:col-span-7 mt-8 lg:mt-0 transition-all duration-1000 delay-500 ease-out ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <div className="bg-neutral-900/40 backdrop-blur-md border border-white/10 p-6 md:p-12 relative rounded-sm overflow-hidden">
            
            {/* HUD Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50" />

            <div className="mb-8 flex items-center justify-between">
               <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                 <Zap size={24} className="text-cyan-400" />
                 INITIATE TRANSMISSION
               </h2>
               <div className="hidden md:flex gap-2">
                 <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                 <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                 <span className="w-1 h-1 bg-neutral-600 rounded-full" />
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="relative group">
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase text-xs font-bold tracking-widest ${activeField === 'name' || formState.name ? '-top-5 text-cyan-400' : 'top-3 text-neutral-500'}`}>
                    Identifier
                  </label>
                  <input 
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent border-b border-neutral-700 py-3 text-base md:text-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] bg-cyan-400 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase text-xs font-bold tracking-widest ${activeField === 'email' || formState.email ? '-top-5 text-cyan-400' : 'top-3 text-neutral-500'}`}>
                    Frequency (Email)
                  </label>
                  <input 
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent border-b border-neutral-700 py-3 text-base md:text-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] bg-cyan-400 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </div>

              {/* Inquiry Type (Radio Custom) */}
              <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Target Sector</span>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {['partnership', 'support', 'fleet'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormState({...formState, type})}
                        className={`px-4 py-2 md:px-6 md:py-3 border text-xs md:text-sm uppercase tracking-wider transition-all duration-300 relative overflow-hidden group flex-grow md:flex-grow-0 ${
                          formState.type === type 
                          ? 'border-cyan-500 text-black bg-cyan-500 font-bold' 
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 bg-neutral-900/50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
              </div>

              {/* Message */}
              <div className="relative group">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase text-xs font-bold tracking-widest ${activeField === 'message' || formState.message ? '-top-5 text-cyan-400' : 'top-3 text-neutral-500'}`}>
                  Message Data
                </label>
                <textarea 
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  className="w-full bg-transparent border-b border-neutral-700 py-3 text-base md:text-lg focus:outline-none focus:border-cyan-400 transition-colors text-white resize-none"
                />
                 <div className="absolute bottom-0 left-0 h-[1px] bg-cyan-400 w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </div>

              {/* Submit Button */}
              <button 
                disabled={isSubmitting}
                className="w-full group relative h-14 md:h-16 bg-white text-black font-black text-xs md:text-sm uppercase tracking-[0.2em] overflow-hidden flex items-center justify-center hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Hover Background Fill */}
                <div className="absolute inset-0 bg-neutral-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-3">
                  {isSubmitting ? 'UPLOADING...' : 'TRANSMIT DATA'} 
                  {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
                </span>
                
                {/* Tech Line Decor */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
              </button>

            </form>
          </div>
        </div>

      </div>

      {/* Decorative Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full h-10 md:h-12 bg-neutral-900/80 backdrop-blur border-t border-white/5 flex items-center justify-between px-6 text-[8px] md:text-[10px] uppercase tracking-widest text-neutral-500 z-20">
        <div className="flex gap-4">
          <span>SECURE UPLINK ESTABLISHED</span>
          <span className="hidden md:inline text-cyan-900">///</span>
          <span className="hidden md:inline">ENCRYPTION: AES-256</span>
        </div>
        <div className="flex gap-4">
          <span>AMSTER.EV © 2024</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;