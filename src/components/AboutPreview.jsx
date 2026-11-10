import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useScrollToTop } from '../hooks/useScrollToTop'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TechStack from '../components/TechStack'
import TeamSpotlight from '../components/TeamSpotlight'

// 🚀 PREMIUM NEON CARD COMPONENT 🚀
const PremiumCard = ({ children, className = "", glowColor = "#3b82f6" }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative group cursor-pointer ${className}`}
    >
      {/* 🚀 DARK GLOW LAYER (Jo hover par bahar niklegi) 🚀 */}
      <div 
        className="absolute inset-0 rounded-3xl transition-all duration-500 z-0"
        style={{
          background: glowColor,
          opacity: hovered ? 0.6 : 0, 
          filter: 'blur(25px)',
          transform: hovered ? 'scale(1.05) translateY(15px)' : 'scale(0.95) translateY(0)', 
        }}
      />
      
      {/* Main White Card */}
      <div 
        className="relative z-10 h-full bg-white border border-slate-200 rounded-3xl transition-all duration-300 overflow-hidden"
        style={{
          borderColor: hovered ? glowColor : '#e2e8f0',
          boxShadow: hovered ? `0 10px 40px -10px ${glowColor}50` : '0 4px 15px -3px rgba(0,0,0,0.03)',
        }}
      >
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </motion.div>
  )
}


const AboutCanvasBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 30%, rgba(59,130,246,0.06) 0%, rgba(248,250,252,0) 70%)' }} />
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="meshPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <motion.path d="M 0,0 L 100,50 L 200,0 M 0,100 L 100,50 L 200,100 M 0,200 L 100,150 L 200,200" stroke="rgba(59,130,246,0.12)" strokeWidth="0.6" fill="none" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.path d="M 50,0 L 50,200 M 150,0 L 150,200" stroke="rgba(6,182,212,0.1)" strokeWidth="0.5" fill="none" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.path d="M 0,50 L 200,50 M 0,150 L 200,150" stroke="rgba(168,85,247,0.08)" strokeWidth="0.5" fill="none" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#meshPattern)" />
      </svg>
    </div>
  )
}

export default function About() {
  useScrollToTop()
  const heroRef = useRef(null)
  const missionRef = useRef(null)
  const valuesRef = useRef(null)
  const statsRef = useRef(null)
  const storyRef = useRef(null)
  const techRef = useRef(null)
  const teamRef = useRef(null)

  const sectionInViewOptions = { once: true, amount: 0.12 }

  const isMissionInView = useInView(missionRef, sectionInViewOptions)
  const isValuesInView = useInView(valuesRef, sectionInViewOptions)
  const isStatsInView = useInView(statsRef, sectionInViewOptions)
  const isStoryInView = useInView(storyRef, sectionInViewOptions)
  const isTechInView = useInView(techRef, sectionInViewOptions)
  const isTeamInView = useInView(teamRef, sectionInViewOptions)

  const statCards = [
    { id: 1, number: '1+', label: 'Years of Excellence', sublabel: 'Building digital products since 2020', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', from: '#0284c7', to: '#2563eb', glow: 'rgba(2,132,199,0.08)', border: '#e2e8f0', hoverBorder: 'rgba(2,132,199,0.4)', bar: 85 },
    { id: 2, number: '25+', label: 'Projects Delivered', sublabel: 'Across web, mobile and enterprise', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', from: '#2563eb', to: '#4f46e5', glow: 'rgba(37,99,235,0.08)', border: '#e2e8f0', hoverBorder: 'rgba(37,99,235,0.4)', bar: 92 },
    { id: 3, number: '15+', label: 'Happy Clients', sublabel: 'Trusted by startups & enterprises', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', from: '#0891b2', to: '#0284c7', glow: 'rgba(8,145,178,0.08)', border: '#e2e8f0', hoverBorder: 'rgba(8,145,178,0.4)', bar: 78 },
    { id: 4, number: '2+', label: 'Countries Served', sublabel: 'Global reach across 4 continents', icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9m0-18c-2.5 2.4-4 5.6-4 9s1.5 6.6 4 9', from: '#6366f1', to: '#8b5cf6', glow: 'rgba(99,102,241,0.08)', border: '#e2e8f0', hoverBorder: 'rgba(99,102,241,0.4)', bar: 66 },
  ]

  const values = [
    { title: 'Innovation First', description: 'We lead with cutting-edge technology and creative thinking to solve complex challenges.', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', accent: 'from-cyan-500 to-blue-600', color: 'rgba(6,182,212,0.8)', glowColor: 'rgba(6,182,212,0.06)', side: 'left' },
    { title: 'Excellence Driven', description: 'Every project is crafted with meticulous attention to detail and commitment to quality.', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', accent: 'from-violet-500 to-purple-600', color: 'rgba(124,58,237,0.8)', glowColor: 'rgba(124,58,237,0.06)', side: 'right' },
    { title: 'Partnership Focused', description: 'We treat every client as a true partner, deeply invested in their success and long-term vision.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', accent: 'from-emerald-500 to-teal-600', color: 'rgba(16,185,129,0.8)', glowColor: 'rgba(16,185,129,0.06)', side: 'left' },
    { title: 'Agile & Adaptive', description: 'We move fast, iterate smart, and adapt to your evolving needs throughout the entire journey.', icon: 'M13 10V3L4 14h7v7l9-11h-7z', accent: 'from-amber-500 to-orange-600', color: 'rgba(217,119,6,0.8)', glowColor: 'rgba(217,119,6,0.06)', side: 'right' },
    { title: 'Client-Centric', description: 'Your goals drive every decision we make. Your satisfaction is our ultimate measure of success.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', accent: 'from-rose-500 to-pink-600', color: 'rgba(225,29,72,0.8)', glowColor: 'rgba(225,29,72,0.06)', side: 'left' },
    { title: 'Full Transparency', description: 'Open communication, honest timelines, and clear reporting - no surprises, ever.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', accent: 'from-sky-500 to-indigo-600', color: 'rgba(14,165,233,0.8)', glowColor: 'rgba(14,165,233,0.06)', side: 'right' },
  ]

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#f8fafc] pt-32 pb-10">
        <svg className="absolute inset-0 w-full h-full z-0" style={{ opacity: 0.05 }}>
          <defs>
            <pattern id="dotGridHero" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#cbd5e1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGridHero)" />
        </svg>
        <AboutCanvasBackground />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="space-y-6">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-8 text-center lg:text-left">
                  <span className="block text-slate-900">About</span>
                  <span className="block text-[0.8em] md:text-[0.84em]" style={{ backgroundImage: 'linear-gradient(to right, #0891B2, #2563EB, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    CRESCENT TECHWORKS INNOVATIONS LLP
                  </span>
                </h1>
                <p className="text-slate-600 text-lg font-medium md:text-left text-center">We're a passionate team of digital craftspeople dedicated to creating exceptional digital experiences. Our mission is to help businesses transform their ideas into reality through innovative technology solutions.</p>
                <div className="space-y-3 pt-2">
                  {['Innovation-driven approach', 'Agile development methodology', '24/7 support and maintenance'].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-[3px] text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      <span className="text-slate-700 text-base font-semibold leading-6">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
  { num: '25+', label: 'Expert Team Members', glow: '#f43f5e' }, // Rose
  { num: '1+', label: 'Years of Experience', glow: '#6366f1' }, // Indigo
  { num: '2+', label: 'Countries Served', glow: '#0ea5e9' }, // Sky
  { num: '15+', label: 'Happy Clients', glow: '#10b981' } // Emerald
].map((stat, i) => (
  <PremiumCard key={i} glowColor={stat.glow}>
    <div className="flex flex-col justify-center items-center p-6 h-[180px]">
      <div className="text-4xl font-black text-slate-900 mb-2">{stat.num}</div>
      <div className="text-sm text-center text-slate-600 font-bold">{stat.label}</div>
    </div>
  </PremiumCard>
))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section ref={missionRef} className="relative py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isMissionInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="relative group max-w-4xl">
            <div className="absolute inset-0 rounded-3xl transition-all duration-500 blur-[15px] z-0 opacity-0 group-hover:opacity-30" style={{ background: `linear-gradient(135deg, #EC4899, #A855F7, #06B6D4)` }} />
            <div className="relative z-10 bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 uppercase mb-5">Our Mission</h2>
              <p className="text-lg text-slate-700 leading-relaxed font-medium">
                To empower businesses with <span className="font-bold text-slate-900">innovative digital solutions</span> that not only meet their needs but <span className="text-blue-600 font-bold">exceed their expectations</span> - delivering measurable growth through technology.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section ref={valuesRef} className="relative py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
    <PremiumCard glowColor={value.color}>
      <div className="p-8 h-full flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
      </div>
    </PremiumCard>
  </motion.div>
))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section ref={statsRef} className="relative py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">By The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Numbers</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {statCards.map((card, index) => (
  <motion.div key={card.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
    <PremiumCard glowColor={card.from}>
      <div className="p-8 h-full">
        <span className="text-5xl font-black tracking-tight bg-clip-text text-transparent block mb-2" style={{ backgroundImage: `linear-gradient(135deg, ${card.from}, ${card.to})` }}>{card.number}</span>
        <div className="text-slate-900 font-bold text-lg mb-1">{card.label}</div>
        <div className="text-slate-500 text-sm font-medium">{card.sublabel}</div>
      </div>
    </PremiumCard>
  </motion.div>
))}
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section ref={storyRef} className="relative pt-10 pb-0 md:pt-16 md:pb-10 bg-[#f8fafc] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} transition={{ duration: 0.35 }} className="relative pl-8 md:pl-10">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent" />
              <p className="text-sm font-bold tracking-[0.3em] text-blue-600 uppercase mb-5">How It Started</p>
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-slate-900 leading-tight">Our <span style={{ backgroundImage: 'linear-gradient(to right, #0891b2, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Story</span></h2>
              <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-lg">
                <p>Founded in <span className="text-slate-900 font-bold">2022</span> by a group of passionate developers and designers, CRESCENT TECHWORKS INNOVATIONS LLP began with a simple vision: to craft high-performance digital experiences that truly matter to the people who use them.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <motion.div ref={teamRef} initial={{ opacity: 0, y: 20 }} animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="-mt-4 md:-mt-6">
        <TeamSpotlight />
      </motion.div>

      <Footer />
    </div>
  )
}