import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Customised Software Development',
    description: "We turn cutting-edge ideas into robust expandable software that fits your company's needs perfectly.",
    points: ['Custom Architecture', 'Scalable Solutions', 'Modern Tech Stack'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4" />
      </svg>
    ),
    badge: 'CORE'
  },
  {
    title: 'Enterprise Solutions',
    description: 'We provide full-scale business solutions that boost your productivity and help your company achieve its highest goals.',
    points: ['Business Integration', 'Process Automation', 'Enterprise Security'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
      </svg>
    ),
    badge: 'SCALE'
  },
  {
    title: 'Cloud Solutions & DevOps',
    description: 'We set up secure, flexible, and smart cloud systems on AWS, GCP, and Azure with automated CI/CD pipelines.',
    points: ['Cloud Migration', 'AWS/Azure Pods', 'Containerization'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.1 9.1 4 4 0 0 0 7 17h10.5" />
      </svg>
    ),
    badge: 'CLOUD'
  },
  {
    title: 'Expert IT Consultancy',
    description: 'We guide you in picking the right software stack and architectural patterns to ensure long-term ROI.',
    points: ['Strategic Roadmaps', 'Technical Advisory', 'Security Audits'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
      </svg>
    ),
    badge: 'ADVISORY'
  },
  {
    title: 'Next-Gen Web Applications',
    description: 'Blazing fast, SEO-optimized web applications with Next.js, React, and micro-frontends designed for high traffic.',
    points: ['Ultra Fast TTFB', 'Responsive UI', 'PWA Capabilities'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    badge: 'WEB'
  },
  {
    title: 'iOS & Android App Development',
    description: 'We build fluid native and cross-platform mobile experiences that hook users and drive repeat engagements.',
    points: ['React Native / Flutter', 'Native Performance', 'Offline-First Storage'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01" />
      </svg>
    ),
    badge: 'MOBILE'
  },
  {
    title: 'MVP Product Development',
    description: 'We launch investor-ready MVPs within 4-6 weeks to test hypotheses and validate product-market fit fast.',
    points: ['Rapid Turnaround', 'Core Feature Set', 'Analytics Integrated'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    badge: 'MVP'
  },
  {
    title: 'UI/UX & Product Design',
    description: 'User-centric interface design systems in Figma that transform complex multi-step workflows into effortless journeys.',
    points: ['Wireframing & Prototypes', 'Design Systems', 'Micro-Interactions'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    badge: 'DESIGN'
  },
  {
    title: 'Dedicated Engineering Squads',
    description: 'Scale your technical capacity with pre-vetted senior software engineers, QA leads, and architects on demand.',
    points: ['Senior Engineers', 'Flexible Timezones', 'Direct Slack Access'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    badge: 'TEAM'
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Product Architecture',
    description: 'We audit your requirements, map system architecture, select the optimal tech stack, and define crystal-clear milestones.',
    color: '#0284c7',
  },
  {
    step: '02',
    title: 'High-Fidelity UI/UX & Prototyping',
    description: 'Interactive wireframes and design systems built in Figma with focus on maximum user retention and accessibility.',
    color: '#2563eb',
  },
  {
    step: '03',
    title: 'Agile Engineering & Continuous Testing',
    description: 'Two-week sprint delivery, automated CI/CD pipelines, strict code reviews, and comprehensive unit/integration testing.',
    color: '#7c3aed',
  },
  {
    step: '04',
    title: 'Production Launch & SLA Monitoring',
    description: 'Zero-downtime deployment, infrastructure auto-scaling setup, 24/7 logging, and continuous proactive support.',
    color: '#0d9488',
  },
]

// 🚀 DEVIONX SIGNATURE CARD WITH AMBIENT SHADOW & SPOTLIGHT
function DevionxPremiumCard({ children }) {
  const cardRef = useRef(null)

  const handleMouseMove = (event) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative flex h-full flex-col rounded-2xl bg-white border border-slate-200/90 p-7 lg:p-8 transition-all duration-400 ease-out 
      hover:-translate-y-2 hover:border-blue-400/60
      shadow-[0_2px_10px_rgba(15,23,42,0.03)]
      hover:shadow-[0_22px_45px_-12px_rgba(37,99,235,0.22),0_0_20px_-3px_rgba(59,130,246,0.12)]"
    >
      {/* DevionX Cursor Spotlight Follower */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(37,99,235,0.08), transparent 65%)',
        }}
      />

      {/* Top subtle neon line highlight on hover */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-blue-500/0 to-transparent transition-all duration-500 group-hover:via-blue-500/80" />

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  )
}

export default function ServicesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      {/* 🚀 SERVICES SECTION */}
      <section id="services" ref={ref} className="relative pt-24 pb-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Title Block */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-200/80 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              // WHAT WE DO
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              Comprehensive Services For{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600">
                High-Growth Digital Products
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              We design, build, and scale world-class software solutions tailored to your operational bottlenecks.
            </p>
          </motion.div>

          {/* Services Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service, index) => (
              <Link key={service.title} to="/services" className="block h-full no-underline">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                  className="h-full"
                >
                  <DevionxPremiumCard>
                    {/* Top Row: Icon & Tag */}
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2">
                        {service.icon}
                      </div>
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mb-2.5 text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-slate-500 font-normal">
                      {service.description}
                    </p>

                    {/* Feature points */}
                    <ul className="mb-6 flex flex-grow flex-col gap-2.5">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Bottom CTA footer */}
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold tracking-wider text-slate-400 transition-colors group-hover:text-blue-600">
                      <span>EXPLORE CAPABILITIES</span>
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </DevionxPremiumCard>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 PROCESS SECTION WITH SIGNATURE SHADOW */}
      <section className="py-24 relative overflow-hidden bg-slate-100/70 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">// HOW WE EXECUTE</span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
              Our Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Methodology</span>
            </h2>
          </div>

          {/* Central vertical connecting line */}
          <div className="absolute left-4 md:left-1/2 top-40 bottom-10 w-[2px] bg-slate-200 hidden md:block -translate-x-1/2" />

          <div className="space-y-10 md:space-y-16">
            {processSteps.map((step, index) => {
              const isLeft = index % 2 === 0
              return (
                <div
                  key={step.step}
                  className={`relative flex items-center md:justify-between w-full ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full md:w-[46%]"
                  >
                    {/* DevionX Ambient Shadow Process Card */}
                    <div className="group relative rounded-2xl bg-white p-7 border border-slate-200/80 
                      shadow-[0_4px_20px_rgba(15,23,42,0.03)]
                      hover:shadow-[0_20px_45px_-10px_rgba(37,99,235,0.25)] 
                      hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-white text-base shadow-md"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.step}
                        </div>
                        <div>
                          <div className="text-xs font-bold font-mono tracking-widest uppercase mb-1" style={{ color: step.color }}>
                            STAGE {step.step}
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Central Node Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-7 h-7 z-10">
                    <div
                      className="w-4 h-4 rounded-full border-[3px] border-white shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>

                  <div className="hidden md:block w-[46%]" />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}