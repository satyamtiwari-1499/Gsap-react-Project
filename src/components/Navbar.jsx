import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
  const [animState, setAnimState] = useState('initial'); // initial -> drawing -> filled
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // 1. Initial Logo Animation & Scroll Detection
  useEffect(() => {
    const drawTimer = setTimeout(() => setAnimState('drawing'), 100);
    const fillTimer = setTimeout(() => setAnimState('filled'), 2100);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(drawTimer);
      clearTimeout(fillTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 2. Lock Body Scroll when Mobile Menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // 3. Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Logo SVG Styles (Kept from your original code)
  const getMainTextStyles = () => {
    const base = {
      fontFamily: 'system-ui',
      strokeWidth: 2,
      strokeDasharray: 600,
    };

    if (animState === 'initial') {
      return { ...base, fill: 'transparent', stroke: 'white', strokeDashoffset: 600 };
    }
    if (animState === 'drawing') {
      return { ...base, fill: 'transparent', stroke: 'white', strokeDashoffset: 0, transition: 'stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1)' };
    }
    if (animState === 'filled') {
      return { ...base, fill: 'white', stroke: 'transparent', strokeDashoffset: 0, strokeWidth: 0, transition: 'all 0.5s ease' };
    }
    return base;
  };

  const getDotStyles = () => {
    if (animState === 'filled') {
      return { display: 'inline-block', animation: 'bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' };
    }
    return { transform: 'scale(0)' };
  };

  const navLinks = [
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center transition-all duration-300 text-white
          ${isScrolled || isMenuOpen
            ? 'px-6 md:px-8 py-4 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'px-6 md:px-8 py-6 bg-transparent mix-blend-difference'
          }
        `}
      >
        <style>{`
          @keyframes bounce {
            0% { transform: scale(0); }
            80% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}</style>

        {/* --- BRAND NAME (SVG) --- */}
        <Link to="/" className="relative group cursor-pointer block z-50">
          <svg 
            viewBox="0 0 160 30" 
            className="h-6 md:h-8 w-auto overflow-visible transition-transform duration-300 group-hover:scale-105"
            aria-label="AMSTER."
          >
            {/* Glitch Effect Layers */}
            <text x="0" y="22" className="font-black tracking-tighter text-2xl uppercase select-none opacity-0 group-hover:opacity-80 transition-all duration-100 ease-linear" fill="cyan" style={{ fontFamily: 'system-ui', transform: 'translate(-2px, -2px)' }}>AMSTER.</text>
            <text x="0" y="22" className="font-black tracking-tighter text-2xl uppercase select-none opacity-0 group-hover:opacity-80 transition-all duration-100 ease-linear" fill="magenta" style={{ fontFamily: 'system-ui', transform: 'translate(2px, 2px)' }}>AMSTER.</text>
            
            {/* Main Text */}
            <text x="0" y="22" className="font-black tracking-tighter text-2xl uppercase select-none" style={getMainTextStyles()}>
              AMSTER<tspan style={getDotStyles()}>.</tspan>
            </text>
          </svg>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className="font-black hover:text-gray-300 transition-colors uppercase text-sm tracking-widest relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        
        {/* --- MOBILE TOGGLE BUTTON --- */}
        <button 
          className="block md:hidden z-50 p-2 -mr-2 text-white hover:text-cyan-400 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <div 
        className={`fixed inset-0 z-40 bg-black flex flex-col justify-center px-8 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{
               backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }} 
        />

        <div className="flex flex-col gap-8 relative z-10">
          {navLinks.map((item, index) => (
            <div 
              key={item.name}
              className={`transform transition-all duration-700 ease-out ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link 
                to={item.path} 
                className="group flex items-center gap-4 text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500 hover:to-cyan-400 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-sm font-mono text-cyan-500 opacity-50">0{index + 1}</span>
                {item.name}
              </Link>
              <div className="h-[1px] w-full bg-neutral-900 mt-4 group-hover:bg-cyan-900/50 transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Mobile Footer Info */}
        <div 
          className={`absolute bottom-10 left-8 right-8 flex justify-between items-end text-neutral-500 text-xs uppercase tracking-widest transition-all duration-1000 delay-300 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            <span>Berlin, DE</span>
            <span>est. 2024</span>
          </div>
          <div className="flex gap-4">
             <span className="flex items-center gap-1">TW <ArrowUpRight size={10} /></span>
             <span className="flex items-center gap-1">IG <ArrowUpRight size={10} /></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;