'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  FileText, 
  UserCheck, 
  Layout, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { fadeUpReveal } from '@/lib/animations';

const packagesData = [
  {
    title: 'Idea Evaluation Package',
    bestFor: 'Inventors exploring whether their invention is worth pursuing.',
    includes: [
      'Initial consultation',
      'Invention review',
      'Patent search coordination',
      'Patentability assessment coordination',
      'Next-step recommendations'
    ],
    ctaText: 'Evaluate My Idea',
    ctaLink: '/contact?type=idea-evaluation'
  },
  {
    title: 'Provisional Patent Package',
    bestFor: 'Inventors seeking an early filing date while continuing product development.',
    includes: [
      'Invention intake',
      'Provisional application coordination',
      'Patent drawings (if required)',
      'Filing support',
      'Project tracking'
    ],
    ctaText: 'Start Provisional Filing',
    ctaLink: '/contact?type=provisional-patent'
  },
  {
    title: 'Utility Patent Package',
    bestFor: 'Inventors ready to pursue full patent protection.',
    includes: [
      'Application preparation coordination',
      'USPTO-compliant patent drawings',
      'Filing support',
      'Project tracking',
      'Attorney or agent coordination'
    ],
    ctaText: 'Protect My Invention',
    ctaLink: '/contact?type=utility-patent'
  },
  {
    title: 'Design Patent Package',
    bestFor: 'Protecting the visual appearance of a product.',
    includes: [
      'Design patent drawings',
      'Figure development',
      'Filing coordination',
      'Application support'
    ],
    ctaText: 'Protect My Design',
    ctaLink: '/contact?type=design-patent'
  },
  {
    title: 'Trademark Protection Package',
    bestFor: 'Businesses seeking brand protection.',
    includes: [
      'Trademark search coordination',
      'Trademark illustrations',
      'Filing coordination',
      'Registration monitoring'
    ],
    ctaText: 'Protect My Brand',
    ctaLink: '/contact?type=trademark-protection'
  },
  {
    title: 'Complete IP Launch Package',
    bestFor: 'Inventors launching a new product or company.',
    includes: [
      'Patent Search Coordination',
      'Utility Patent Filing Coordination',
      'Trademark Filing Coordination',
      'Patent Drawings',
      'Office Action Support Coordination',
      'Portfolio Tracking'
    ],
    ctaText: 'Launch & Protect My Innovation',
    ctaLink: '/contact?type=ip-launch'
  }
];

const steps = [
  { num: '1', title: 'Submit Your Invention' },
  { num: '2', title: 'Confidential Review' },
  { num: '3', title: 'Search & Evaluation' },
  { num: '4', title: 'Drawings & Documentation' },
  { num: '5', title: 'Patent Filing Coordination' },
  { num: '6', title: 'Office Action Support' },
  { num: '7', title: 'Portfolio Management' }
];

const faqs = [
  {
    q: 'Do I need an attorney to file a patent?',
    a: 'Patent applications are filed through licensed patent attorneys, registered patent agents, or by inventors acting on their own behalf. KORK coordinates the process and connects inventors with qualified professionals.'
  },
  {
    q: 'Can KORK file my patent?',
    a: 'KORK coordinates patent filing services through trusted patent attorneys and registered patent agents.'
  },
  {
    q: 'Do I need drawings?',
    a: 'Many patent applications require drawings. Our team prepares USPTO-compliant patent illustrations.'
  },
  {
    q: 'Can I sign an NDA before sharing my invention?',
    a: 'Yes. NDA-supported workflows are available.'
  },
  {
    q: 'What if I only need drawings?',
    a: 'You may purchase illustration services independently.'
  }
];

export default function InventorServicesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative py-16 md:py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e3a8a_0%,transparent_70%)] opacity-40" />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-accent text-xs font-bold uppercase tracking-wider mb-2"
          >
            Guided Inventor Pathway
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-5xl"
          >
            Turn Your Idea Into Protected <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Intellectual Property</span>
          </motion.h1>
          
          <p className="text-base text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
            Whether you are a first-time inventor, startup founder, researcher, or product developer, KORK provides a structured pathway from invention evaluation through patent protection and intellectual property management.
          </p>

          <p className="text-sm text-slate-400 leading-relaxed max-w-5xl mx-auto">
            Navigate the patent process with confidence through coordinated searches, illustrations, filing support, trademark services, and access to trusted patent professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact?type=start"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Start My IP Journey
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact?type=meeting"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border-2 border-white/20 hover:bg-white/20 shadow-sm transform hover:-translate-y-1 transition-all"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-850 py-5 transition-colors">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-500" /> Confidential Intake Process</span>
            <span className="flex items-center gap-1.5"><FileText size={16} className="text-emerald-500" /> NDA Available Upon Request</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-500" /> USPTO-Compliant Drawings</span>
            <span className="flex items-center gap-1.5"><UserCheck size={16} className="text-emerald-500" /> Trusted Patent Professional Network</span>
            <span className="flex items-center gap-1.5"><Layout size={16} className="text-emerald-500" /> Client Portal Tracking</span>
          </div>
        </div>
      </section>

      {/* SECTION 1: CHALLENGES */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-4xl space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Not Sure Where To Start?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Innovation shouldn't be stalled by complex processes and administrative friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary dark:text-white">Many inventors struggle with:</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0" />
                  <span>Determining if an invention is patentable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0" />
                  <span>Understanding which patent type to apply for</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0" />
                  <span>Finding reliable professionals and USPTO registered agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0" />
                  <span>Managing strict USPTO deadlines and formatting requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0" />
                  <span>Coordinating separate illustrators, searchers, and filing attorneys</span>
                </li>
              </ul>
            </div>
            
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-4 shadow-lg"
            >
              <h4 className="text-lg font-bold text-accent">The KORK Solution</h4>
              <p className="text-xs text-slate-350 leading-relaxed font-normal">
                We simplify the journey by offering one centralized platform. We handle prior art searches, prepare USPTO-compliant drawings, and coordinate application assemblies through our professional attorney and agent network. You get full visibility and a single point of contact.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-white transition-colors"
                >
                  Start Guided Assessment <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INVENTOR PACKAGES */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Inventor Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagesData.map((pkg, idx) => (
              <motion.div
                variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="shine-card group flex flex-col justify-between overflow-hidden rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-card hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-shadow duration-300 p-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primary dark:text-white group-hover:text-secondary dark:group-hover:text-accent transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Best for:</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pkg.bestFor}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 mt-6 pt-6 space-y-3 flex-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Includes:</span>
                  <ul className="space-y-2">
                    {pkg.includes.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    href={pkg.ctaLink}
                    className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10 transition-all group-hover:shadow-lg"
                  >
                    {pkg.ctaText}
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY INVENTORS CHOOSE KORK */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-5xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Why Inventors Choose KORK
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">1</div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary dark:text-white">One Point of Contact</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Coordinate multiple services through a single platform.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">2</div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary dark:text-white">Structured Workflow</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Every project follows defined milestones and review checkpoints.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">3</div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary dark:text-white">Professional Network</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Access trusted patent attorneys, patent agents, illustrators, and IP professionals.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">4</div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary dark:text-white">Client Portal</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Track project status, messages, deliverables, deadlines, and invoices.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">5</div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary dark:text-white">Confidential Operations</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Secure handling of sensitive invention disclosures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE KORK PROCESS */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors border-t border-slate-200/50 dark:border-slate-800">
        <div className="container-custom max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              The KORK Process
            </h2>
          </div>

          <div className="relative border-l-2 border-accent/35 ml-4 md:ml-6 space-y-8">
            {steps.map((step, idx) => (
              <motion.div 
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                key={step.num} 
                className="relative pl-6 md:pl-10"
              >
                {/* Step Marker */}
                <div className="absolute -left-[17px] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent text-white font-extrabold text-xs shadow shadow-blue-500/20 ring-4 ring-slate-50 dark:ring-slate-900/40">
                  {step.num}
                </div>
                <motion.div 
                  whileHover={{ x: 5, scale: 1.01 }}
                  className="shine-card flex items-center p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-150/60 dark:border-slate-850 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base font-bold text-primary dark:text-white">{step.title}</h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-3xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  suppressHydrationWarning
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:text-secondary dark:hover:text-accent transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <QuestionIcon size={16} className="text-accent shrink-0" />
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-slate-400">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <div className="px-5 pb-4 pt-1 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-50 dark:border-slate-850 leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-12 bg-blue-950 overflow-hidden text-white border-t border-slate-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#1e40af_0%,transparent_60%)] opacity-40" />
        <motion.div 
          variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-3xl"
        >
          <div className="flex-1 space-y-3 text-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Ready to Take the First Step?
            </h2>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Whether you need patent search coordination, filing support, trademark protection, or complete lifecycle support, KORK can help you identify the right path forward.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact?type=start"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Start My IP Journey
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact?type=meeting"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border border-white/20 hover:bg-white/20 shadow-sm transform hover:-translate-y-1 transition-all"
            >
              Schedule Consultation
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
