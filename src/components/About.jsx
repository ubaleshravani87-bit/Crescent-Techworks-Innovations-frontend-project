import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

// --- 1. TEXT ANIMATION COMPONENT (Word by Word Hover) ---
const AnimatedText = ({ text, className = "" }) => {
  return (
    <span className={`inline ${className}`}>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300 hover:-translate-y-2 hover:text-cyan-400 hover:scale-110 cursor-pointer"
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
};

// --- 2. 3D TILT CARD COMPONENT (Mouse ke saath jhukega) ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
};

// --- 3. BACKGROUND CANVAS (Particles + Mouse Spotlight) ---
const AboutCanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const particleCount = window.innerWidth < 768 ? 30 : 80;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#020817'; 
      ctx.fillRect(0, 0, width, height);

      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
        gradient.addColorStop(1, 'rgba(2, 8, 23, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 180, 255, 0.3)';
        ctx.fill();

        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const maxDist = 180;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = 0.1 * (1 - dist / maxDist);
            ctx.strokeStyle = `rgba(100, 180, 255, ${alpha})`;
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const coreValues = [
  {
    title: "Innovation First",
    desc: "We lead with cutting-edge technology and creative thinking to solve complex challenges.",
    icon: (
      <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bgColor: "bg-cyan-50 border-cyan-200", dotColor: "bg-cyan-400"
  },
  {
    title: "Excellence Driven",
    desc: "Every project is crafted with meticulous attention to detail and commitment to quality.",
    icon: (
      <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    bgColor: "bg-purple-50 border-purple-200", dotColor: "bg-purple-400"
  },
  {
    title: "Partnership Focused",
    desc: "We treat every client as a true partner, deeply invested in their success and long-term vision.",
    icon: (
      <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    bgColor: "bg-emerald-50 border-emerald-200", dotColor: "bg-emerald-400"
  },
  {
    title: "Agile & Adaptive",
    desc: "We move fast, iterate smart, and adapt to your evolving needs throughout the entire journey.",
    icon: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bgColor: "bg-orange-50 border-orange-200", dotColor: "bg-orange-400"
  }
];

export default function About() {
  const coreValuesRef = useRef(null);
  const isInView = useInView(coreValuesRef, { once: false, margin: "-250px" });

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center bg-[#020817] overflow-hidden"
    >
      {/* PAGE LOAD CURTAIN REVEAL */}
      <motion.div 
        initial={{ y: 0 }} 
        animate={{ y: "-100%" }} 
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="fixed inset-0 bg-[#020817] z-50 pointer-events-none"
      />

      <AboutCanvasBackground />

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12 inline-block cursor-pointer"
          >
            <h1 className="text-4xl md:text-7xl font-black leading-tight tracking-tight mb-12">
              <span className="block text-white mb-4 drop-shadow-md">
                <AnimatedText text="About" />
              </span>
              
              {/* 🚀 EXACT 3D BLOCK TEXT (With Gloss & Shadow) 🚀 */}
              <span 
                className="block relative animate-gradient"
                style={{
                  backgroundImage: 'linear-gradient(180deg, #67e8f9 0%, #3b82f6 50%, #1e3a8a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: `
                    0px 1px 0px #1e3a8a,
                    0px 2px 0px #1e3a8a,
                    0px 3px 0px #1e3a8a,
                    0px 4px 0px #1e3a8a,
                    0px 5px 0px #1e3a8a,
                    0px 6px 0px #1e3a8a,
                    0px 7px 0px #1e3a8a,
                    0px 8px 0px #172554,
                    0px 9px 0px #172554,
                    0px 10px 0px #172554,
                    0px 15px 20px rgba(0,0,0,0.8)
                  `,
                }}
              >
                <AnimatedText text="Crescent Techworks" />
              </span>
            </h1>
          </motion.div>

          <div className="space-y-6 text-blue-100 text-lg md:text-xl leading-relaxed">
            <p>
              <AnimatedText text="We are a premier web and app development studio dedicated to crafting exceptional digital experiences that drive real business results." />
            </p>
            <p className="max-w-2xl mx-auto text-blue-200/80">
              <AnimatedText text="Founded with a vision to transform ideas into powerful digital solutions, we combine cutting-edge technology with creative innovation to build websites and applications that stand out." />
            </p>
          </div>

          {/* 3D TILT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <TiltCard className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-white/10">
              <div className="text-5xl font-black text-cyan-400 mb-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">1+</div>
              <div className="text-white font-medium text-lg">Years Experience</div>
            </TiltCard>
            
            <TiltCard className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-white/10">
              <div className="text-5xl font-black text-pink-400 mb-3 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]">20+</div>
              <div className="text-white font-medium text-lg">Projects Delivered</div>
            </TiltCard>
            
            <TiltCard className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-white/10">
              <div className="text-5xl font-black text-purple-400 mb-3 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">15+</div>
              <div className="text-white font-medium text-lg">Happy Clients</div>
            </TiltCard>
          </div>

          {/* MISSION STATEMENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative overflow-hidden mt-20 p-10 rounded-3xl bg-black/40 border border-blue-800/30 backdrop-blur-md group hover:border-cyan-500/50 transition-all duration-500"
          >
            <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
            <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-lg text-blue-100/90 leading-relaxed max-w-4xl mx-auto">
              <AnimatedText text="To empower businesses with innovative digital solutions that not only meet their needs but exceed their expectations — delivering measurable growth through technology." />
            </p>
          </motion.div>

          {/* 3D GLOWING BUTTON */}
          <div className="mt-16 flex justify-center relative">
            <div className="absolute inset-0 bg-blue-500 blur-[50px] opacity-40 group-hover:opacity-70 transition-opacity"></div>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden group inline-flex items-center justify-center px-10 py-4 rounded-full text-white font-black text-xl shadow-[0_10px_40px_rgba(37,99,235,0.5)] transition-all duration-300 border border-blue-400/50"
              style={{
                backgroundImage: 'linear-gradient(90deg, #2563EB, #06b6d4, #2563EB)',
                backgroundSize: '200% auto',
                animation: 'gradient 3s linear infinite', 
              }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
              <span className="relative z-10 flex items-center gap-2">
                Find out how
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </motion.a>
          </div>

        </div>

        {/* OUR CORE VALUES SECTION */}
        <div className="bg-[#f8fafc] py-24 px-6 relative mt-20 rounded-t-[50px]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Values</span>
              </h2>
            </div>

            <div ref={coreValuesRef} className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 hidden md:block"></div>

              <div className="space-y-20">
                {coreValues.map((value, index) => {
                  const isLeft = index % 2 === 0;
                  const delay = index * 4.0; 

                  return (
                    <div key={index} className={`relative flex items-center md:justify-between w-full ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.9 }}
                        transition={{ duration: 2.0, delay: isInView ? delay : 0, ease: "easeOut" }}
                        className="w-full md:w-[45%]"
                      >
                        <div className={`p-8 rounded-2xl bg-white border ${value.bgColor.split(' ')[1]} shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative group flex flex-col items-center text-center`}>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${value.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                            {value.icon}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                          <p className="text-slate-500 leading-relaxed text-sm">{value.desc}</p>
                        </div>
                      </motion.div>

                      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-6 h-6">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ delay: isInView ? delay + 0.8 : 0, type: "spring" }}
                          className={`w-3 h-3 rounded-full ${value.dotColor} shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
                        ></motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}