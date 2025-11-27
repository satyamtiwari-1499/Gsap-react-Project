import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Battery, Wind, Zap, Award, Globe, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Helper Component: 3D Tilt Card ---
const TiltCard = ({ title, subtitle, icon: Icon, image }) => {
  const cardRef = useRef(null);

  // UPDATED: Check for touch capability to disable aggressive tilt on mobile
  const handleMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div 
      className="perspective-1000 w-full" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group transform-style-3d shadow-2xl"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 transform-style-3d translate-z-10 w-full">
          <div className="mb-4 bg-cyan-500/20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-cyan-500/30">
            <Icon className="text-cyan-400" size={20} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm md:text-base text-neutral-400 group-hover:text-white transition-colors">{subtitle}</p>
          
          <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 mt-0 group-hover:mt-4 opacity-0 group-hover:opacity-100">
            <p className="text-cyan-400 text-sm font-mono flex items-center gap-2">
              View Specs <ArrowRight size={14} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const About = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero Reveal
      const tl = gsap.timeline();
      tl.from(".hero-word", {
        y: 100,
        opacity: 0,
        rotateX: -45,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      })
      .from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 1
      }, "-=0.5");

      // Background Particle Float
      gsap.to(".bg-glow", {
        y: "-50px",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 2. Story Timeline Animation
      // UPDATED: Simplified animation for mobile
      gsap.utils.toArray(".milestone-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          x: 0, // removed X shift to prevent overflow on mobile
          y: 50,
          duration: 1,
          ease: "power3.out"
        });
      });

      // 3. Stats Counter Animation
      gsap.utils.toArray(".stat-number").forEach((stat) => {
        const targetValue = parseInt(stat.getAttribute("data-value"), 10);
        gsap.fromTo(stat, 
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            snap: { innerText: 1 }, 
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
            }
          }
        );
      });

      // 4. Team Stagger
      gsap.from(".team-card", {
        scrollTrigger: {
            trigger: ".team-section",
            start: "top 70%"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black min-h-screen text-white overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* --- Section 1: Hero --- */}
      <div className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20">
        {/* Ambient Background Effects */}
        <div className="bg-glow absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-cyan-600/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
        <div className="bg-glow absolute bottom-1/4 right-1/4 w-40 md:w-80 h-40 md:h-80 bg-blue-800/20 rounded-full blur-[60px] md:blur-[100px] pointer-events-none animation-delay-2000" />

        <div className="relative z-10 text-center max-w-5xl">
          <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-8 mb-6 perspective-500">
            {["INNOVATION", "SUSTAINABILITY", "ELECTRIFICATION"].map((word, i) => (
              <span key={i} className="hero-word inline-block font-black text-3xl md:text-7xl lg:text-8xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-600">
                {word}
              </span>
            ))}
          </div>
          
          <p className="hero-sub text-base md:text-2xl text-cyan-400/80 font-light tracking-wide max-w-2xl mx-auto border-l-2 border-cyan-500 pl-4 md:pl-6 text-left mt-8">
            Amster isn't just a car company. We are rewriting the physics of motion to build a cleaner, faster, and more intelligent future.
          </p>
        </div>

        <div className="absolute bottom-10 animate-bounce text-neutral-600">
            <ArrowRight className="rotate-90" size={24} />
        </div>
      </div>

      {/* --- Section 2: Our Story --- */}
      <div className="py-20 md:py-32 px-6 md:px-24 max-w-7xl mx-auto relative">
        <h2 className="text-xs md:text-sm font-mono text-cyan-400 mb-12 md:mb-16 uppercase tracking-[0.2em]">The Journey</h2>
        
        {/* UPDATED: Timeline CSS for mobile alignment */}
        <div className="relative border-l border-neutral-800 ml-2 md:ml-0 md:pl-0 space-y-16 md:space-y-24">
            {/* Timeline Item 1 */}
            <div className="milestone-card relative md:grid md:grid-cols-2 gap-12 items-center">
                <div className="hidden md:block text-right pr-12">
                    <h3 className="text-4xl font-bold mb-2">2020</h3>
                    <p className="text-neutral-400">Concept Phase</p>
                </div>
                {/* Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
                
                <div className="pl-8 md:pl-0">
                    <div className="bg-neutral-900/50 p-6 md:p-8 rounded-2xl border border-neutral-800 backdrop-blur-sm">
                        <div className="md:hidden text-cyan-400 font-bold mb-2 text-xl">2020</div>
                        <h4 className="text-xl md:text-2xl font-bold mb-4">The Spark</h4>
                        <p className="text-sm md:text-base text-neutral-400">A small team of engineers in a garage in Amsterdam sketched the first blueprints for a battery system that could outlast the industry standard by 40%.</p>
                    </div>
                </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="milestone-card relative md:grid md:grid-cols-2 gap-12 items-center">
                <div className="pl-8 md:text-right md:pr-12 order-1">
                    <div className="bg-neutral-900/50 p-6 md:p-8 rounded-2xl border border-neutral-800 backdrop-blur-sm">
                        <div className="md:hidden text-cyan-400 font-bold mb-2 text-xl">2023</div>
                        <h4 className="text-xl md:text-2xl font-bold mb-4">Prototype Alpha</h4>
                        <p className="text-sm md:text-base text-neutral-400">The "Amster One" achieved 0-60mph in 2.1 seconds on its first track day, shattering expectations and securing Series A funding.</p>
                    </div>
                </div>
                {/* Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-3 h-3 bg-white rounded-full"></div>
                <div className="hidden md:block pl-12 order-2">
                    <h3 className="text-4xl font-bold mb-2">2023</h3>
                    <p className="text-neutral-400">First Prototype</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- Section 3: Innovation --- */}
      <div className="bg-neutral-950 py-20 md:py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-20">
                <h2 className="text-3xl md:text-6xl font-bold mb-6">Engineered for <span className="text-cyan-400">Tomorrow</span></h2>
                <p className="text-neutral-400 max-w-xl text-base md:text-lg">Hover over the cards to explore our core technologies.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TiltCard 
                    title="Solid State Battery" 
                    subtitle="800 miles range. 15 min charge." 
                    icon={Battery}
                    image="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000"
                />
                <TiltCard 
                    title="Fluid Aerodynamics" 
                    subtitle="0.19 Drag Coefficient." 
                    icon={Wind}
                    image="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000"
                />
                <TiltCard 
                    title="Neural Pilot AI" 
                    subtitle="Level 4 Autonomous Driving." 
                    icon={Cpu}
                    image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000"
                />
            </div>
        </div>
      </div>

      {/* --- Section 4: Stats --- */}
      <div className="py-16 md:py-24 border-y border-neutral-900 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center relative z-10">
              {[
                  { icon: Award, label: "Awards Won", val: 14 },
                  { icon: Zap, label: "Models Planned", val: 5 },
                  { icon: Globe, label: "Countries", val: 22 },
                  { icon: Battery, label: "Patents", val: 156 }
              ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                      <item.icon className="text-cyan-500 mb-2 md:mb-4" size={24} />
                      <div className="text-4xl md:text-7xl font-black text-white mb-2 flex justify-center">
                          <span className="stat-number" data-value={item.val}>0</span>
                          <span>+</span>
                      </div>
                      <p className="text-neutral-500 uppercase tracking-widest text-[10px] md:text-sm">{item.label}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* --- Section 5: Team --- */}
      <div className="team-section py-20 md:py-32 px-6 md:px-24 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">Visionaries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { name: "Elena Vos", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" },
                { name: "Dr. Aris Thorne", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" },
                { name: "Sarah Jenkins", role: "Lead Design", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" }
            ].map((member, i) => (
                <div key={i} className="team-card group relative overflow-hidden rounded-xl">
                    <img 
                        src={member.img} 
                        alt={member.name} 
                        className="w-full h-80 md:h-96 object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl md:text-2xl font-bold text-white">{member.name}</h3>
                        <p className="text-cyan-400 text-sm md:text-base">{member.role}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* --- Section 6: CTA --- */}
      <div className="py-20 md:py-32 flex justify-center items-center bg-gradient-to-b from-black to-neutral-900 px-6">
          <div className="text-center">
              <h2 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 text-white tracking-tighter">
                  READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">FLY?</span>
              </h2>
              <button className="group relative px-8 py-3 md:px-12 md:py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  <span className="relative z-10 group-hover:text-black transition-colors text-sm md:text-base">PRE-ORDER MODEL X</span>
              </button>
          </div>
      </div>

    </div>
  );
};

export default About;