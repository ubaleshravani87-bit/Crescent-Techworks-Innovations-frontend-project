import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

// ✨ Sleek Section Header Badge (Octalogic & DevionX Inspired)
const Badge = ({ text }) => (
  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 backdrop-blur-md mb-6">
    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
    {text}
  </span>
);

// ✨ Word-by-Word Interactive Text
const AnimatedText = ({ text, className = "" }) => {
  return (
    <span className={`inline ${className}`}>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="inline-block transition-transform duration-200 hover:-translate-y-1 hover:text-cyan-300 cursor-default"
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
};

// ✨ DevionX Style Spotlight Tilt Card
const SpotlightTiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseClientX = e.clientX - rect.left;
    const mouseClientY = e.clientY - rect.top;
    x.set(mouseClientX / rect.width - 0.5);
    y.set(mouseClientY / rect.height - 0.5);
    setMousePos({ x: mouseClientX, y: mouseClientY, isHovered: true });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.18)] ${className}`}
    >
      {/* Dynamic Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: mousePos.isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.12), transparent 70%)`,
        }}
      />
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

// ✨ Interactive Interactive Canvas Particles (Fixed Resize & Memory)
const AboutCanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width, height;
    let mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const count = window.innerWidth < 768 ? 25 : 60;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.5 + 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle mouse radial highlight
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        gradient.addColorStop(0, "rgba(56, 189, 248, 0.12)");
        gradient.addColorStop(1, "rgba(2, 6, 23, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(125, 211, 252, 0.4)";
        ctx.fill();

        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

const coreValues = [
  {
    tag: "01 // VISION",
    title: "Innovation First",
    desc: "We engineer cutting-edge technology and intelligent architecture to turn complex bottlenecks into growth engines.",
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    borderGlow: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
  },
  {
    tag: "02 // CRAFT",
    title: "Excellence Driven",
    desc: "Every pixel, API endpoint, and state management cycle is sculpted with meticulous quality and zero technical debt.",
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138z" />
      </svg>
    ),
    borderGlow: "hover:border-purple-500/50 hover:shadow-purple-500/10",
  },
  {
    tag: "03 // CULTURE",
    title: "Partnership Focused",
    desc: "We embed ourselves as your dedicated engineering arm, fiercely invested in your milestones, runway, and long-term ROI.",
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    borderGlow: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
  },
  {
    tag: "04 // SPEED",
    title: "Agile & Adaptive",
    desc: "Rapid sprint iterations, rapid CI/CD deployment, and elastic scalability to stay ahead of dynamic market demands.",
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    borderGlow: "hover:border-blue-500/50 hover:shadow-blue-500/10",
  },
];

const stats = [
  { value: "1+", label: "Years of High-Pace Growth", detail: "Delivering modern web & cloud platforms", color: "from-cyan-400 to-blue-500" },
  { value: "28+", label: "Products Shipped", detail: "Web, native mobile & enterprise SaaS", color: "from-blue-400 to-indigo-500" },
  { value: "15+", label: "Happy Global Clients", detail: "Startups to established business enterprises", color: "from-purple-400 to-pink-500" },
];

export default function AboutSection() {
  const valuesRef = useRef(null);
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative min-h-screen bg-[#030712] text-slate-100 overflow-hidden py-24 md:py-32 selection:bg-cyan-500 selection:text-black">
      {/* Background Ambient Glow & Particles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none" />
      <AboutCanvasBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* HERO TITLE BLOCK */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Badge text="Who We Are • Crescent Techworks" />
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6">
              Engineering Digital Products That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Outperform Expectations.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
              <AnimatedText text="We are a modern software engineering studio. We combine architectural rigor with fluid UI/UX design to build web platforms, mobile apps, and scalable digital ecosystems." />
            </p>
          </motion.div>
        </div>

        {/* STATS BENTO ROW (DevionX Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:mt-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <SpotlightTiltCard>
                <div className={`text-5xl lg:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-3`}>
                  {stat.value}
                </div>
                <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
                <div className="text-slate-400 text-sm">{stat.detail}</div>
              </SpotlightTiltCard>
            </motion.div>
          ))}
        </div>

        {/* MISSION STATEMENT CARD (Octalogic Style Banner) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 lg:mt-20 relative rounded-3xl p-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 shadow-[0_0_50px_rgba(37,99,235,0.12)]"
        >
          <div className="relative rounded-[22px] bg-[#070e1e]/90 p-8 sm:p-12 md:p-16 backdrop-blur-2xl border border-slate-800/80 overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-4xl mx-auto text-center space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">// MISSION STATEMENT</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug">
                "To empower bold companies with high-performance digital systems that elevate brand equity, automate complexities, and unlock measurable revenue."
              </h2>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-transform duration-200 hover:scale-105"
                >
                  Start Your Project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CORE VALUES BENTO GRID */}
        <div ref={valuesRef} className="mt-28">
          <div className="text-center mb-16">
            <Badge text="Principles We Live By" />
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Engineering Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, index) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`group relative rounded-2xl bg-slate-900/60 border border-slate-800 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900/90 hover:shadow-xl ${val.borderGlow}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center transition-transform group-hover:scale-110">
                    {val.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">{val.tag}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {val.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-normal">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}