import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, Zap } from 'lucide-react';

// Data for the Feature Cards
const featureCards = [
  {
    id: "01",
    title: "Aerodynamic Shell",
    category: "Design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    description: "Sculpted by wind, refined by physics. A drag coefficient of 0.19."
  },
  {
    id: "02",
    title: "Electric Core",
    category: "Power",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800&auto=format&fit=crop",
    description: "Next-gen solid state battery architecture with 800-mile range."
  },
  {
    id: "03",
    title: "Neural Network",
    category: "Intelligence",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    description: "Onboard AI processing for Level 5 autonomous navigation."
  }
];

const Home = () => {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setIsLoaded(true), 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 100; // Less particles on mobile for performance
    const connectionDistance = window.innerWidth < 768 ? 80 : 120;
    
    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
        this.baseAlpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (mouse.x != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const directionX = (dx / distance) * force * 2;
            const directionY = (dy / distance) * force * 2;
            this.x -= directionX;
            this.y -= directionY;
          }
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(6, 182, 212, ${this.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.2})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Ambient Glows - Adjusted for mobile */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-blue-900/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <header className="relative w-full h-screen flex items-center justify-center overflow-hidden px-4">
        
        {/* Parallax Background Layer */}
        <div 
          className="absolute inset-0 z-0 transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})` }}
        >
          <div className="w-full h-full relative">
            <img 
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2800&auto=format&fit=crop" 
              alt="Luxury Car Abstract" 
              className={`w-full h-full object-cover grayscale opacity-80 mix-blend-screen transition-all duration-[2000ms] ease-out transform ${isLoaded ? 'scale-100 opacity-80' : 'scale-110 opacity-0'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>
          </div>
        </div>

        {/* Particles Canvas */}
        <canvas 
          ref={canvasRef} 
          className={`absolute inset-0 z-5 transition-opacity duration-[2000ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Hero Text - Responsive Typography */}
        <div 
          className="relative z-10 text-center flex flex-col items-center w-full max-w-4xl"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Zap size={20} className={`text-cyan-400 fill-cyan-400 transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
            <h2 className={`text-xs md:text-sm font-bold tracking-[0.3em] md:tracking-[0.5em] text-cyan-400 uppercase transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              The Future of Mobility
            </h2>
          </div>
          
          {/* UPDATED: Dynamic text sizing */}
          <h1 className={`text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 transition-all duration-1000 delay-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            AMSTER
          </h1>
          
          <div className={`flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-8 transition-all duration-1000 delay-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button className="group relative px-8 py-3 bg-white text-black rounded-full font-bold overflow-hidden hover:scale-105 transition-transform flex items-center gap-2 w-full md:w-auto justify-center">
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative z-10 flex items-center gap-2">Explore Model S <ArrowDown size={18} /></span>
            </button>
            <button className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 transition-colors bg-black/50 backdrop-blur-md text-white">
              <Play size={18} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 flex flex-col items-center gap-2">
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
        </div>
      </header>

      {/* --- CONTENT SECTION --- */}
      <section className="relative z-10 bg-black py-20 md:py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-16 md:mb-24 text-center md:text-left">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Engineering <span className="text-cyan-400">perfection</span> in <br className="hidden md:block"/>every electron.
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-neutral-400 text-base md:text-lg leading-relaxed border-t border-neutral-800 pt-10">
              <p>
                Amster isn't just a vehicle; it's a kinetic sculpture powered by the world's most advanced solid-state energy cells. We've removed every inefficiency to create a pure driving experience.
              </p>
              <p>
                From our proprietary neural network that learns your driving style to the active aerodynamics that adapt to the wind in real-time, every system is designed for one purpose: progress.
              </p>
            </div>
          </div>
          
          {/* FEATURE CARDS - Stacked on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card) => (
                <div key={card.id} className="group relative h-[400px] md:h-[500px] bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                    
                    {/* Background Image */}
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ease-out" 
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Text Content */}
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-900 group-hover:from-cyan-400/20 group-hover:to-transparent transition-all duration-500">{card.id}</span>
                        <span className="text-[10px] uppercase tracking-widest text-cyan-400 border border-cyan-900/50 bg-cyan-900/10 px-3 py-1 rounded-full backdrop-blur-md">{card.category}</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{card.title}</h4>
                      <p className="text-neutral-400 text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                        {card.description}
                      </p>
                      
                      <div className="hidden md:block h-[2px] w-0 bg-cyan-400 mt-6 group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </section>    
    </div>
  );
};

export default Home;