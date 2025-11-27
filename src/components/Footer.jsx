import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Github, ArrowUpRight, Zap, Battery, Disc } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef(null);
  const magneticBtnRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // State for magnetic button transform
  const [btnTransform, setBtnTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  // --- 1. SCROLL REVEAL (IntersectionObserver) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  // --- 2. MAGNETIC BUTTON LOGIC ---
  const handleMouseMove = (e) => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setBtnTransform({
      x: x * 0.4, // Increased strength
      y: y * 0.4,
      rotateX: -y * 0.15,
      rotateY: x * 0.15, 
    });
  };

  const handleMouseLeave = () => {
    setBtnTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  return (
    <footer ref={footerRef} className="relative bg-black text-white pt-32 overflow-hidden selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* INLINE STYLES FOR ANIMATIONS */}
      <style>{`
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: scrollTicker 40s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .magnetic-content {
          transition: transform 0.1s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>

      {/* 1. HUGE CALL TO ACTION */}
      <div className={`container mx-auto px-6 md:px-24 mb-32 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="max-w-3xl text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <span className="h-[1px] w-12 bg-cyan-500 inline-block"></span>
            <span className="text-cyan-400 uppercase tracking-widest text-sm font-bold">Join the Revolution</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            READY TO <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600">TAKE FLIGHT?</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-xl mx-auto lg:mx-0">
            Experience the 0-60mph in 1.9s. Secure your production slot for the Amster Model S today.
          </p>
        </div>

        {/* MAGNETIC BUTTON */}
        <div className="perspective-1000">
          <Link to="/contact">
            <button 
              ref={magneticBtnRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="magnetic-content group relative w-64 h-64 rounded-full bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center gap-2 hover:border-cyan-500/50 transition-colors cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              style={{
                transform: `translate3d(${btnTransform.x}px, ${btnTransform.y}px, 0) rotateX(${btnTransform.rotateX}deg) rotateY(${btnTransform.rotateY}deg)`
              }}
            >
              {/* Button Glow on Hover */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <span className="text-3xl font-black ">RESERVE</span>
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 group-hover:text-white transition-colors">Production '25</span>
              <ArrowUpRight className="mt-2 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={32} />
            </button>
          </Link>
        </div>
      </div>

      {/* 2. NAVIGATION LINKS GRID */}
      <div 
        className={`container mx-auto px-6 md:px-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-neutral-900 pt-16 pb-24 relative z-10 transition-all duration-1000 delay-200 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        
        {/* Column 1: Brand */}
        <div className="col-span-2 md:col-span-1 pr-8">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="text-cyan-400 fill-cyan-400" size={24} />
            <h3 className="text-2xl font-black tracking-tight">AMSTER.</h3>
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed mb-6">
            Redefining the physics of motion with sustainable energy and autonomous intelligence.
          </p>
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-pointer">
                <Twitter size={16} />
             </div>
             <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-pointer">
                <Instagram size={16} />
             </div>
             <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-pointer">
                <Linkedin size={16} />
             </div>
          </div>
        </div>

        {/* Column 2: Models */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-8 border-b border-neutral-900 pb-4 inline-block">Vehicles</h4>
          <ul className="space-y-4 text-neutral-400 text-sm">
            <li><Link to="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Model S</Link></li>
            <li><Link to="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Model X (SUV)</Link></li>
            <li><Link to="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Roadster</Link></li>
            <li><Link to="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Commercial Fleet</Link></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-8 border-b border-neutral-900 pb-4 inline-block">Company</h4>
          <ul className="space-y-4 text-neutral-400 text-sm">
            <li><Link to="/about" className="hover:text-cyan-400 transition-colors">Our Vision</Link></li>
            <li><Link to="#" className="hover:text-cyan-400 transition-colors">Sustainability</Link></li>
            <li><Link to="#" className="hover:text-cyan-400 transition-colors">Investors</Link></li>
            <li><Link to="#" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

         {/* Column 4: Specs */}
         <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-8 border-b border-neutral-900 pb-4 inline-block">Performance</h4>
          <ul className="space-y-6">
            <li>
                <div className="flex items-center gap-2 text-white font-bold mb-1"><Battery size={16} className="text-cyan-400"/> 800 Miles</div>
                <div className="text-xs text-neutral-600 uppercase tracking-wider">Range per charge</div>
            </li>
            <li>
                <div className="flex items-center gap-2 text-white font-bold mb-1"><Disc size={16} className="text-cyan-400"/> 1.9 Seconds</div>
                <div className="text-xs text-neutral-600 uppercase tracking-wider">0-60 MPH</div>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. INFINITE TICKER (CSS ANIMATION) */}
      <div className="border-y border-neutral-900 bg-black/50 backdrop-blur-sm py-8 overflow-hidden relative group z-10">
        {/* Gradient fades on sides for polish */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

        {/* Ticker Container */}
        <div className="whitespace-nowrap flex gap-16 select-none animate-ticker w-max">
           <div className="flex gap-16 text-6xl md:text-[8rem]  leading-none text-transparent transition-all duration-500 group-hover:text-neutral-900/50" 
               style={{ WebkitTextStroke: '10px white' }}>
            <span>AMSTER MOTORS — ELECTRIC PERFORMANCE — ZERO EMISSIONS —</span>
            <span>AMSTER MOTORS — ELECTRIC PERFORMANCE — ZERO EMISSIONS —</span>
          </div>
          {/* Duplicate for infinite loop effect */}
          <div className="flex gap-16 text-6xl md:text-[8rem]  tracking-normal leading-none text-transparent transition-all duration-500 group-hover:text-neutral-900/50" 
               style={{ WebkitTextStroke: '10px white' }}>
            <span>AMSTER MOTORS — ELECTRIC PERFORMANCE — ZERO EMISSIONS —</span>
            <span>AMSTER MOTORS — ELECTRIC PERFORMANCE — ZERO EMISSIONS —</span>
          </div>
        </div>
      </div>

      {/* 4. COPYRIGHT */}
      <div className="bg-black py-8 text-center text-neutral-600 text-[11px] font-black uppercase tracking-[0.2em] relative z-10 flex flex-col md:flex-row justify-between items-center px-6 md:px-24">
        <span>© 2025 Amster Motors Inc.</span>
        <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Legal</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;