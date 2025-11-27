import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Crosshair, Maximize2 } from 'lucide-react';

const projects = [
  { 
    id: "01", 
    title: "Model S Plaid", 
    category: "Flagship Vehicle", 
    year: "2024",
    img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000",
    stats: "1.9s 0-60"
  },
  { 
    id: "02", 
    title: "Supercharger V4", 
    category: "Infrastructure", 
    year: "2025",
    img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1000",
    stats: "350kW Charging"
  },
  { 
    id: "03", 
    title: "Neural Pilot", 
    category: "Autonomous AI", 
    year: "BETA",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000",
    stats: "Level 5 Autonomy"
  },
  { 
    id: "04", 
    title: "Giga Factory", 
    category: "Manufacturing", 
    year: "2023",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    stats: "1M Units/Year"
  },
];

const Work = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleItems(prev => new Set([...prev, entry.target.dataset.id]));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white pt-20 md:pt-32 px-6 md:px-24 pb-12 md:pb-24 overflow-hidden selection:bg-cyan-500 selection:text-black font-sans">

      {/* CSS Animations */}
      <style>{`
        @keyframes revealChar {
          from { opacity: 0; transform: translateY(100%) rotateX(-90deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .char-anim { animation: revealChar 1s cubic-bezier(0.2, 1, 0.3, 1) forwards; opacity: 0; }
        .spin-slow { animation: spinSlow 10s linear infinite; }
        .pulse-fast { animation: pulseGlow 2s ease-in-out infinite; }
        
        .scroll-reveal { opacity: 0; transform: translateY(50px); transition: all 1s cubic-bezier(0.2, 1, 0.3, 1); }
        .scroll-reveal.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* Background Ambience */}
      <div className="fixed top-20 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-cyan-900/10 rounded-full blur-[60px] md:blur-[120px] pointer-events-none" />
      
      {/* Page Header */}
      <div className="mb-20 md:mb-32 relative z-10">
        
        <div
          data-id="header-tag"
          className={`flex items-center gap-4 mb-6 animate-on-scroll scroll-reveal transition-all duration-1000 ${
            visibleItems.has('header-tag') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="h-[1px] w-8 md:w-12 bg-cyan-500 inline-block"></span>
          <span className="text-cyan-400 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold">The Archive</span>
        </div>
        
        {/* UPDATED: Clamp font size and handle wrapping */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase text-white leading-[0.9] overflow-hidden">
          <div className="flex flex-wrap gap-x-2 md:gap-x-4 mb-0 md:mb-2">
            {"INNOVATION".split("").map((char, i) => (
              <span key={i} className="char-anim inline-block origin-bottom" style={{ animationDelay: `${i * 0.05}s` }}>{char}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-2 md:gap-x-4 text-neutral-800">
             {"PROTOCOL".split("").map((char, i) => (
              <span key={i + 100} className="char-anim inline-block origin-bottom" style={{ animationDelay: `${0.5 + i * 0.05}s` }}>{char}</span>
            ))}
          </div>
        </h1>
      </div>

      {/* Gallery Grid */}
      {/* UPDATED: gap-y reduced for mobile, md:translate applied only on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-32 relative z-10">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            data-id={`project-${project.id}`}
            className={`animate-on-scroll project-card group cursor-pointer ${index % 2 === 1 ? 'md:translate-y-24' : ''} scroll-reveal ${visibleItems.has(`project-${project.id}`) ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] rounded-sm mb-6 border border-neutral-800 group-hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-cyan-500 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-cyan-500 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-bottom border-cyan-500 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-bottom border-cyan-500 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Image */}
              <div className="w-full h-full overflow-hidden">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
                />
              </div>
              
              {/* Hover Overlay - hidden on mobile touches usually, but visible on active state */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-4 md:p-6 pointer-events-none">
                 <div className="flex justify-between items-start text-[10px] md:text-xs font-mono text-cyan-400">
                   <span>COORD: {800 + index * 20}.{45 + index}</span>
                   <Crosshair size={20} className="spin-slow" />
                 </div>

                 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100"></div>

                 <div className="flex justify-between items-end">
                   <div>
                       <span className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Status</span>
                       <div className="flex items-center gap-2 text-white font-bold text-sm">
                           <span className="w-2 h-2 bg-green-500 rounded-full pulse-fast"></span>
                           Operational
                       </div>
                   </div>
                   <div className="text-right">
                       <span className="block text-2xl md:text-4xl font-black text-white">{project.year}</span>
                   </div>
                 </div>
              </div>
            </div>
            
            {/* Info */}
            <div className="flex justify-between items-end border-b border-neutral-800 pb-4 group-hover:border-cyan-500 transition-colors duration-500">
              <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] md:text-xs font-mono text-cyan-400 px-2 py-0.5 border border-cyan-900 bg-cyan-900/20 rounded">
                        {project.id}
                    </span>
                    <span className="text-[10px] md:text-xs font-mono text-neutral-500 tracking-widest uppercase">
                        {project.category}
                    </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:translate-x-2 transition-transform duration-500">
                    {project.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-4">
                  <span className="hidden lg:block text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    [{project.stats}]
                  </span>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-700 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:text-black transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight size={20} />
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / More Link */}
      <div
        data-id="footer-btn"
        className={`mt-20 md:mt-32 text-center animate-on-scroll scroll-reveal transition-all duration-1000 ${
          visibleItems.has("footer-btn")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20"
        }`}
      >
        <button className="group relative px-8 py-3 md:px-12 md:py-4 bg-neutral-900 text-white font-bold tracking-widest uppercase text-xs md:text-sm border border-neutral-800 overflow-hidden hover:border-cyan-500 transition-colors">
          <div className="absolute inset-0 w-full h-full bg-cyan-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

          <span className="relative z-10 flex items-center gap-2">
            View Full Archive <Maximize2 size={14} />
          </span>
        </button>
      </div>

    </div>
  );
};

export default Work;