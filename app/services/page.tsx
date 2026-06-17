'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  PenTool, 
  Scale, 
  XCircle, 
  CheckCircle, 
  CheckCircle2, 
  ArrowRight,
  FileSearch
} from 'lucide-react';
import { fadeUpReveal } from '@/lib/animations';

const serviceCategories = [
  {
    id: 'inventor-services',
    title: 'Inventor Services',
    icon: Search,
    desc: 'Helping innovators evaluate, organize, and prepare their inventions for intellectual property protection.',
    href: '/services/inventor-services',
    buttonText: 'Explore Inventor Services',
    items: [
      'Invention Documentation Support',
      'Patent Search Coordination',
      'Prior Art Research Coordination',
      'Patent Readiness Assessment',
      'Innovation Evaluation'
    ]
  },
  {
    id: 'patent-search-evaluation',
    title: 'Patent Search & Evaluation Services',
    icon: FileSearch,
    desc: 'Helping innovators assess novelty, patent readiness, prior art, and filing strategy before investing in intellectual property protection.',
    href: '/services/patent-search-evaluation',
    buttonText: 'Explore Search Services',
    items: [
      'Patent Search Coordination',
      'Prior Art Research',
      'Patentability Assessment',
      'Competitive Landscape Review',
      'Innovation Readiness Assessment',
      'Design vs. Utility Assessment',
      'Filing Strategy Consultation'
    ]
  },
  {
    id: 'patent-illustrations',
    title: 'Patent Illustration Services',
    icon: PenTool,
    desc: 'Professional intellectual property illustrations prepared to support patent, trademark, and trade dress applications.',
    href: '/services/patent-illustrations',
    buttonText: 'Explore Illustration Services',
    items: [
      'Utility Patent Drawings',
      'Design Patent Drawings',
      'Plant Patent Illustrations',
      'Trademark Illustrations',
      'Trade Dress Illustrations'
    ]
  },
  {
    id: 'patent-filing',
    title: 'Patent Filing & Prosecution Support',
    icon: Scale,
    desc: 'Patent filing and prosecution support coordinated through licensed U.S. patent attorneys and registered patent agents.',
    href: '/services/patent-filing-support',
    buttonText: 'Explore Filing Services',
    items: [
      'Patent Application Preparation Support',
      'Filing Coordination',
      'Office Action Support',
      'Amendment Coordination',
      'Patent Portfolio Management'
    ]
  }
];

const steps = [
  { num: '1', title: 'Invention Intake' },
  { num: '2', title: 'Search & Evaluation' },
  { num: '3', title: 'Documentation & Illustrations' },
  { num: '4', title: 'Attorney Coordination' },
  { num: '5', title: 'Application Filing' },
  { num: '6', title: 'Office Action Support' },
  { num: '7', title: 'Portfolio Management' }
];

const industries = [
  'Consumer Products',
  'Medical Devices',
  'Mechanical Systems',
  'Electrical Systems',
  'Software Technologies',
  'Manufacturing',
  'Agricultural Innovations',
  'Research Institutions',
  'Startups'
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_60%)] opacity-35 pointer-events-none" />
        <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center space-y-6 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Intellectual Property Services <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Designed Around Inventors</span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
              KORK InventReX simplifies the intellectual property journey by bringing patent support services, technical illustrations, filing coordination, and patent professionals together through one structured platform.
            </p>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-3xl mx-auto mt-2">
              Whether you are exploring an idea, preparing a patent application, or managing an existing portfolio, our services are designed to support every stage of the innovation lifecycle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. THREE SERVICE CATEGORIES */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container-custom space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              One Platform. Four Service Categories.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {serviceCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.div 
                  key={idx}
                  variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  className="shine-card flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-800 transition-all"
                >
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon size={28} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed min-h-[60px]">
                        {category.desc}
                      </p>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Services Include</span>
                      <ul className="space-y-2">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-8">
                    <Link
                      href={category.href}
                      className="inline-flex items-center justify-center gap-1.5 w-full px-2 py-3.5 rounded-lg text-[10px] xl:text-xs font-bold whitespace-nowrap text-white bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 transition-colors shadow-md"
                    >
                      {category.buttonText}
                      <ArrowRight size={14} className="shrink-0" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WHY USE ONE INTEGRATED PLATFORM */}
      <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
        <div className="container-custom space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Why Use One Integrated Platform?
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Traditional patent projects often require inventors to coordinate with multiple providers independently.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Without Coordination */}
            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="shine-card bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-8 space-y-6 text-left"
            >
              <div className="flex items-center gap-2 text-rose-500 font-bold">
                <XCircle size={22} />
                <span className="text-lg">Without Coordination</span>
              </div>
              <p className="text-sm font-medium text-slate-500">Multiple service providers</p>
              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-2.5 items-start">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <p>Separate communication channels</p>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <p>Duplicate information requests</p>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <p>Limited project visibility</p>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <p>Increased administrative burden</p>
                </li>
              </ul>
            </motion.div>

            {/* With KORK */}
            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="shine-card bg-slate-900 text-white border border-slate-800 rounded-2xl p-8 space-y-6 relative overflow-hidden text-left shadow-xl"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-2 text-cyan-400 font-bold relative z-10">
                <CheckCircle size={22} />
                <span className="text-lg">With KORK InventReX</span>
              </div>
              <p className="text-sm font-medium text-slate-400 relative z-10">One Point of Contact</p>
              <ul className="space-y-4 text-sm text-slate-300 relative z-10">
                <li className="flex gap-2.5 items-center">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <p>Structured Project Workflow</p>
                </li>
                <li className="flex gap-2.5 items-center">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <p>Centralized Communication</p>
                </li>
                <li className="flex gap-2.5 items-center">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <p>Secure File Management</p>
                </li>
                <li className="flex gap-2.5 items-center">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <p>Coordinated Service Delivery</p>
                </li>
                <li className="flex gap-2.5 items-center">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <p>Ongoing Project Visibility</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. OUR SERVICE WORKFLOW */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors border-b border-slate-200/50 dark:border-slate-800">
        <div className="container-custom max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Our Service Workflow
            </h2>
          </div>

          <div className="relative border-l-2 border-cyan-400/30 ml-4 md:ml-6 space-y-8">
            {steps.map((step, idx) => (
              <motion.div 
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                key={step.num} 
                className="relative pl-6 md:pl-10"
              >
                {/* Step Marker */}
                <div className="absolute -left-[17px] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-extrabold text-xs shadow shadow-blue-500/20 ring-4 ring-slate-50 dark:ring-slate-900/40">
                  {step.num}
                </div>
                <motion.div 
                  whileHover={{ x: 5, scale: 1.01 }}
                  className="shine-card flex items-center p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base font-bold text-slate-800 dark:text-white">Step {step.num}: {step.title}</h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES SUPPORTED */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom max-w-5xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Industries Supported
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((ind, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
              >
                <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug">{ind}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-16 bg-white transition-colors duration-300 border-t border-slate-100 dark:border-slate-900">
        <div className="container-custom max-w-5xl">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ scale: 1.01 }} viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-800 transition-all"
          >
            <div className="flex-1 text-center lg:text-left space-y-3">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Ready to Start Your Intellectual Property Journey?
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400">
                Use KORK’s guided project assessment to identify the services best suited for your invention, business, or intellectual property goals.
              </p>
            </div>
            
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link href="/contact?type=assessment" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-md transform hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                Start Assessment
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm transform hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
