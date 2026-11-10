import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScrollToTop } from '../hooks/useScrollToTop'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TechStack from '../components/TechStack'
import TeamSpotlight from '../components/TeamSpotlight'

// ✨ Sleek Interactive Card (DevionX / Octalogic Style)
const BentoCard = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(37,99,235,0.14)] hover:border-blue-400/50 transition-all duration-300 p-7 lg:p-8 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ✨ Subtle Mesh & Geometric Background
const SubtleMeshBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div
      className="absolute inset-0 opacity-80"
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 50% 15%, rgba(59,130,246,0.06) 0%, rgba(248,250,252,0) 75%)',
      }}
    />
    <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotPattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#cbd5e1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotPattern)" />
    </svg>
  </div>
)

export default function About() {
  useScrollToTop()

  const heroRef = useRef(null)
  const pillarsRef = useRef(null)
  const valuesRef = useRef(null)
  const statsRef = useRef(null)
  const timelineRef = useRef(null)

  const isPillarsInView = useInView(pillarsRef, { once: true, margin: "-80px" })
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-80px" })
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-80px" })

  const stats = [
    { num: '28+', label: 'Products Shipped', sublabel: 'Web applications, SaaS & mobile apps', color: 'from-blue-600 to-cyan-500' },
    { num: '15+', label: 'Global Clients', sublabel: 'From high-growth startups to enterprise', color: 'from-indigo-600 to-blue-500' },
    { num: '25+', label: 'In-House Engineers', sublabel: 'Designers, full-stack devs & architects', color: 'from-cyan-600 to-teal-500' },
    { num: '99.4%', label: 'Client Satisfaction', sublabel: 'Agile sprints with transparent timelines', color: 'from-purple-600 to-indigo-500' },
  ]

  const pillars = [
    {
      code: '// 01 ARCHITECTURE',
      title: 'Production-Grade Engineering',
      desc: 'We do not build flimsy prototypes. We build high-throughput, clean-coded systems designed to scale seamlessly with your traffic.',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      code: '// 02 VELOCITY',
      title: 'Rapid Sprints & Zero Red-Tape',
      desc: 'Weekly milestone demos, automated CI/CD pipelines, and dedicated project managers who talk directly in your Slack/Discord channel.',
      icon: (
        <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      code: '// 03 UI/UX HARMONY',
      title: 'Human-Centric Digital Craft',
      desc: 'Intuitive user journeys backed by Figma design systems, micro-interactions, and accessibility standards that convert visitors to customers.',
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
  ]

  const values = [
    {
      title: 'Innovation First',
      description: 'We explore modern toolchains, AI integration, and state-of-the-art frameworks to keep your product ahead of the competition.',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    },
    {
      title: 'Excellence Driven',
      description: 'Every commit undergoes thorough code reviews, automated unit testing, and design scrutiny before hitting staging.',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    },
    {
      title: 'Partnership Mindset',
      description: 'We do not view ourselves as an outsourced vendor. We act as your co-builders, advising on architecture, cost, and UX strategy.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      title: 'Agile & Adaptive',
      description: 'Requirements shift as markets change. Our flexible sprint models pivot quickly without derailing roadmap milestones.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      title: 'Full Transparency',
      description: 'Honest timelines, clear burndown charts, and transparent billing. No hidden fees or unexpected delays.',
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    },
    {
      title: 'Client-Centric Results',
      description: 'Code is only as valuable as the revenue and user satisfaction it delivers. Your business KPIs remain our target.',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    },
  ]

  const milestones = [
    { year: '2022', title: 'The Genesis', desc: 'Crescent Techworks was founded with a small squad of engineers focused on high-quality custom web applications.' },
    { year: '2023', title: 'Global Footprint', desc: 'Expanded delivery across multiple international clients, adopting cloud-native architectures and React Native mobile stacks.' },
    { year: 'Present', title: '25+ Strong Studio', desc: 'Delivering end-to-end full lifecycle engineering, AI-ready workflows, and dedicated product development squads.' },
  ]

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* 🚀 HERO SECTION (Lumyx & DevionX Hybrid) */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <SubtleMeshBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill Tag */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                ABOUT CRESCENT TECHWORKS INNOVATIONS
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6"
            >
              We Build The Software That Powers{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600">
                Modern Brands.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-10"
            >
              From agile startups to market leaders, we partner with visionary teams to turn complex ideas into robust, high-performance websites and digital products.
            </motion.p>

            {/* Value Highlights Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              {[
                'Enterprise-Grade Code',
                'Agile Sprint Velocity',
                'Zero Technical Debt',
                'Dedicated Engineering Pods',
              ].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs"
                >
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🚀 STATS SECTION (Bento Metric Bar) */}
      <section ref={statsRef} className="relative py-12 -mt-10 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <BentoCard className="text-center">
                  <div className={`text-4xl sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${item.color} mb-2`}>
                    {item.num}
                  </div>
                  <div className="text-slate-900 font-bold text-base mb-1">{item.label}</div>
                  <div className="text-slate-500 text-xs font-medium leading-relaxed">{item.sublabel}</div>
                </BentoCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 OUR PILLARS / WHY CHOOSE US (Octalogic Style) */}
      <section ref={pillarsRef} className="py-20 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">// ENGINEERING STANDARDS</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-2">
              How We Deliver <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Uncompromising Quality</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isPillarsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <BentoCard className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                        {pillar.icon}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-400 tracking-widest">{pillar.code}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </BentoCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 MISSION STATEMENT BANNER (High-Contrast Minimalist) */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-10 sm:p-16 text-white shadow-2xl overflow-hidden">
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl">
              <span className="inline-block text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-4">
                // OUR CORE MISSION
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-6 text-white">
                "To empower ambitious organizations with digital infrastructure that doesn't just meet specifications, but drives real competitive advantage."
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                We believe great software is born at the intersection of empathetic design, bulletproof architecture, and rapid agile execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 CORE VALUES GRID */}
      <section ref={valuesRef} className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">// OUR PHILOSOPHY</span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
              Principles That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Guide Every Sprint</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, index) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <BentoCard className="h-full">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/80 flex items-center justify-center text-blue-600 mb-5">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={val.icon} />
                    </svg>
                  </div>
                  <h3 className="text-slate-900 font-bold text-lg mb-2">{val.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
                </BentoCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 MILESTONE & STORY TIMELINE (Lumyx Style) */}
      <section ref={timelineRef} className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Story Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">// OUR EVOLUTION</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                From a Bold Vision to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Global Tech Partner.</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Founded in 2022, <strong className="text-slate-900">CRESCENT TECHWORKS INNOVATIONS LLP</strong> set out to bridge the gap between creative design agencies and hardcore software engineering firms.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Today, our studio includes designers, cloud engineers, and product managers working hand-in-hand with founders and enterprise leaders across 2+ countries.
              </p>
            </div>

            {/* Right Timeline Cards */}
            <div className="lg:col-span-7 space-y-6">
              {milestones.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.45, delay: idx * 0.12 }}
                  className="flex items-start gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 transition-colors"
                >
                  <div className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-mono font-bold text-sm tracking-wide shrink-0">
                    {item.year}
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 🚀 TECH STACK INTEGRATION */}
      <section className="bg-[#f8fafc]">
        <TechStack />
      </section>

      {/* 🚀 TEAM SPOTLIGHT INTEGRATION */}
      <section className="bg-white">
        <TeamSpotlight />
      </section>

      <Footer />
    </div>
  )
}