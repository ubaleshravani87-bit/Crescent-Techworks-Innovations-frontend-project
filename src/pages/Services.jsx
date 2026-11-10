import { useScrollToTop } from '../hooks/useScrollToTop'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Monitor,
  Smartphone,
  PenTool,
  Cloud,
  Settings,
  Link2,
  BarChart,
  Lightbulb,
  Building,
  Search,
  Code,
  Rocket,
  Users,
  Zap,
  Clock,
  TrendingUp,
  Award,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
}

const services = [
  {
    title: 'Web Application Development',
    description: 'Custom web systems built with modern frameworks (React, Next.js, Node.js). Scalable, secure, and performance-optimized for real users.',
    icon: <Monitor className="w-6 h-6" />,
    features: ['React & Next.js Ecosystem', 'RESTful & GraphQL Architecture', 'Micro-frontends', 'Cloud Deployment'],
    color: '#2563EB',
  },
  {
    title: 'Mobile App Engineering',
    description: 'Native and cross-platform applications for iOS and Android. High-frame-rate user experiences with cutting-edge mobile toolchains.',
    icon: <Smartphone className="w-6 h-6" />,
    features: ['React Native & Flutter', 'Native iOS/Android Pods', 'Offline-First Data Sync', 'App Store Optimization'],
    color: '#0891B2',
  },
  {
    title: 'UI/UX & Product Design',
    description: 'Intuitive user journeys backed by research, Figma design systems, accessibility standards, and frictionless user conversion flows.',
    icon: <PenTool className="w-6 h-6" />,
    features: ['Design Systems & Tokens', 'Interactive Prototyping', 'User Research & Personas', 'Developer Handoff'],
    color: '#7C3AED',
  },
  {
    title: 'Cloud Architecture & Infrastructure',
    description: 'Scalable cloud infrastructure on AWS, Google Cloud, and Azure. Auto-scaling clusters with high availability and automated failovers.',
    icon: <Cloud className="w-6 h-6" />,
    features: ['AWS / GCP / Azure Architecture', 'Auto-scaling Clusters', '99.99% Uptime SLA', 'FinOps Cost Optimization'],
    color: '#0284C7',
  },
  {
    title: 'DevOps & CI/CD Automation',
    description: 'Automated deployment pipelines, Docker containerization, Kubernetes orchestration, and 24/7 telemetry monitoring.',
    icon: <Settings className="w-6 h-6" />,
    features: ['Docker & Kubernetes', 'GitHub Actions / GitLab CI', 'Infrastructure as Code (IaC)', 'Datadog & Grafana Monitoring'],
    color: '#4F46E5',
  },
  {
    title: 'API Engineering & System Integration',
    description: 'High-throughput REST and GraphQL APIs with robust caching, rate limiting, and seamless legacy enterprise data bridges.',
    icon: <Link2 className="w-6 h-6" />,
    features: ['High Concurrency APIs', 'Payment Gateways & ERPs', 'Token Authentication (JWT/OAuth)', 'Swagger / OpenAPI Docs'],
    color: '#DB2777',
  },
  {
    title: 'Data Intelligence & Dashboards',
    description: 'Transform complex data streams into actionable real-time insights with custom BI dashboards and automated analytics pipelines.',
    icon: <BarChart className="w-6 h-6" />,
    features: ['Data Pipeline ETL', 'Real-time WebSocket Feeds', 'Executive Dashboards', 'Predictive Modeling'],
    color: '#EA580C',
  },
  {
    title: 'Enterprise Security & Compliance',
    description: 'Rigorous penetration testing, static code analysis, and compliance hardening for GDPR, HIPAA, and SOC2 certified operations.',
    icon: <Award className="w-6 h-6" />,
    features: ['Vulnerability Assessment', 'Data Encryption at Rest & Transit', 'GDPR / HIPAA Protocols', 'Role-Based Access Control'],
    color: '#DC2626',
  },
  {
    title: 'Technology Advisory & Strategy',
    description: 'Strategic tech leadership, architectural audits, and digital transformation roadmaps to maximize your engineering runway.',
    icon: <Lightbulb className="w-6 h-6" />,
    features: ['Architecture Review', 'Tech Stack Evaluation', 'Sprint Velocity Auditing', 'Fractional CTO Guidance'],
    color: '#059669',
  },
]

const flipCardsData = [
  {
    title: 'Expert Engineering Pods',
    description: '25+ battle-tested professionals with deep full-stack, cloud, and UX expertise.',
    icon: Users,
    color: '#2563EB',
  },
  {
    title: 'Agile Velocity',
    description: 'Weekly sprint demos, real-time Slack channels, and zero communication lag.',
    icon: Zap,
    color: '#0891B2',
  },
  {
    title: 'Modern Toolchains',
    description: 'State-of-the-art frameworks and clean architecture that prevent future technical debt.',
    icon: Code,
    color: '#7C3AED',
  },
  {
    title: '24/7 SLA Support',
    description: 'Dedicated monitoring pods ensuring rapid resolution times for critical incidents.',
    icon: Clock,
    color: '#DB2777',
  },
  {
    title: 'Cost-Effective Scaling',
    description: 'Transparent deliverables with milestone-based billing and zero surprise invoices.',
    icon: TrendingUp,
    color: '#0D9488',
  },
  {
    title: 'Proven Track Record',
    description: '28+ successful products shipped with a 99.4% client satisfaction rate.',
    icon: Award,
    color: '#D97706',
  },
]

// 🚀 Tech Network Interactive Hero Diagram
const TechNetwork = () => {
  const nodes = [
    { label: 'Web Dev', icon: Monitor, color: '#2563EB', angle: 0 },
    { label: 'Mobile App', icon: Smartphone, color: '#0891B2', angle: 45 },
    { label: 'UI/UX', icon: PenTool, color: '#7C3AED', angle: 90 },
    { label: 'Cloud', icon: Cloud, color: '#0891B2', angle: 135 },
    { label: 'DevOps', icon: Settings, color: '#2563EB', angle: 180 },
    { label: 'API', icon: Link2, color: '#7C3AED', angle: 225 },
    { label: 'Data', icon: BarChart, color: '#2563EB', angle: 270 },
    { label: 'Consulting', icon: Lightbulb, color: '#0891B2', angle: 315 },
  ]

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center">
      <svg className="absolute w-[440px] h-[440px] overflow-visible z-0 pointer-events-none" viewBox="-220 -220 440 440">
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180
          const x = Math.cos(rad) * 150
          const y = Math.sin(rad) * 150

          return (
            <g key={n.label}>
              <line x1="0" y1="0" x2={x} y2={y} stroke={n.color} strokeWidth="1.2" strokeOpacity="0.25" />
              <line
                x1="0"
                y1="0"
                x2={x}
                y2={y}
                stroke={n.color}
                strokeWidth="1.8"
                strokeDasharray="4 16"
                className="animate-[pulse_3s_ease-in-out_infinite]"
              />
            </g>
          )
        })}
      </svg>

      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180
        const x = Math.cos(rad) * 150
        const y = Math.sin(rad) * 150
        const Icon = n.icon

        return (
          <div
            key={n.label}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px - 26px)`,
              top: `calc(50% + ${y}px - 26px)`,
            }}
            className="w-[52px] h-[52px] rounded-2xl bg-white border border-slate-200/90 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_12px_rgba(37,99,235,0.12)] flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110"
          >
            <Icon className="w-5 h-5" style={{ color: n.color }} />
          </div>
        )
      })}

      {/* Central Hub */}
      <div className="absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-[2px] shadow-[0_15px_35px_-5px_rgba(37,99,235,0.45)] z-20">
        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
          <Building className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    </div>
  )
}

// 🚀 DEVIONX SIGNATURE SERVICE CARD WITH DYNAMIC SHADOW
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 🚀 DEVIONX NEELI SHADOW: Diffused Ambient Glow Layer */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500 ease-out z-0 pointer-events-none"
        style={{
          background: service.color,
          filter: 'blur(35px)',
          opacity: isHovered ? 0.18 : 0,
          transform: isHovered ? 'scale(1.04) translateY(12px)' : 'scale(0.95) translateY(0)',
        }}
      />

      {/* Main Card */}
      <div
        className="relative z-10 h-full p-8 rounded-2xl bg-white border border-slate-200/90 flex flex-col justify-between transition-all duration-300 ease-out
        hover:border-blue-400/60 hover:-translate-y-2
        shadow-[0_2px_10px_rgba(15,23,42,0.02)]
        hover:shadow-[0_24px_50px_-12px_rgba(37,99,235,0.2)]"
      >
        {/* Top glowing line */}
        <div
          className="absolute top-0 left-8 right-8 h-[2px] transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        <div>
          {/* Icon */}
          <div
            className="mb-6 w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)`,
              boxShadow: isHovered ? `0 10px 20px -5px ${service.color}50` : 'none',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            {service.icon}
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
            {service.description}
          </p>

          {/* Features list */}
          <ul className="space-y-2.5 mb-8">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-xs sm:text-sm font-semibold text-slate-700">
                <svg className="w-4 h-4 mr-2.5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA link */}
        <Link
          to="/contact"
          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border"
          style={{
            background: isHovered ? service.color : '#f8fafc',
            color: isHovered ? '#ffffff' : '#334155',
            borderColor: isHovered ? service.color : '#e2e8f0',
          }}
        >
          <span>Discuss This Service</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

// 🚀 DEVIONX 3D FLIP CARD WITH COLORED AMBIENT SHADOW
const FlipCard = ({ card, index }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const Icon = card.icon

  return (
    <div
      className="relative w-full aspect-square max-w-[320px] mx-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      {/* 🚀 DevionX Ambient Shadow underneath */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"
        style={{
          background: card.color,
          filter: 'blur(30px)',
          opacity: isHovered || isFlipped ? 0.22 : 0,
          transform: isHovered || isFlipped ? 'scale(1.05) translateY(10px)' : 'scale(0.95)',
        }}
      />

      <motion.div
        className="w-full h-full relative"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          y: isHovered && !isFlipped ? -6 : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-7 flex flex-col items-center justify-center text-center bg-white border border-slate-200/90 shadow-sm"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white shadow-md"
            style={{ backgroundColor: card.color }}
          >
            <Icon className="w-7 h-7" />
          </div>
          <h3 className="text-slate-900 text-lg font-bold tracking-tight mb-2">{card.title}</h3>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mt-2">
            Click to Flip ↻
          </span>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-7 flex flex-col items-center justify-center text-center bg-slate-900 text-white shadow-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: card.color }} />
          <p className="text-slate-200 text-sm font-medium leading-relaxed">
            {card.description}
          </p>
          <span className="text-[11px] font-bold text-slate-400 mt-4">
            Click to Return
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default function Services() {
  useScrollToTop()

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="relative">
        {/* 🚀 HERO SECTION */}
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 text-center lg:text-left"
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-200/80 mb-6">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  // OUR SPECIALIZATIONS
                </span>
                
                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6">
                  Full-Cycle Digital{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600">
                    Engineering Services.
                  </span>
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0 mb-8">
                  From architecture formulation to cloud scale, we engineer scalable systems that deliver measurable business growth and high reliability.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  {['React & Next.js', 'Native Mobile', 'Cloud & DevOps', 'Enterprise Security'].map((chip) => (
                    <span
                      key={chip}
                      className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-xs"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right Interactive Tech Network */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-5 flex justify-center"
              >
                <TechNetwork />
              </motion.div>

            </div>
          </div>
        </section>

        {/* 🚀 MAIN SERVICES GRID */}
        <section className="relative z-10 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">// SERVICE CATALOG</span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
                Built For Performance, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Security & Scale</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* 🚀 WHY CHOOSE US (Flip Cards with DevionX Shadow) */}
        <section className="py-24 bg-white border-y border-slate-200/80 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">// ADVANTAGES</span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
                Why Companies <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Partner With Us</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {flipCardsData.map((card, index) => (
                <FlipCard key={card.title} card={card} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* 🚀 DEVIONX STYLE CTA BANNER */}
        <section className="py-24 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-10 sm:p-16 text-center text-white 
              shadow-[0_25px_60px_-15px_rgba(37,99,235,0.3)] border border-slate-800 overflow-hidden"
            >
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

              <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 mb-4 inline-block">
                // READY TO BUILD?
              </span>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6 text-white leading-tight">
                Let's Architect Your Next <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                  Digital Breakthrough.
                </span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Schedule a discovery call with our solutions architects to assess requirements, timelines, and technical scope.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-[0_10px_30px_rgba(37,99,235,0.45)] transition-all duration-300 hover:scale-105"
              >
                Schedule a Consultation
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}