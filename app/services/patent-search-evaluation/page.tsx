'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  BarChart, 
  Lightbulb, 
  TrendingUp, 
  Scale, 
  Map, 
  ArrowRight,
  CheckCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { fadeUpReveal, staggerContainer } from '@/lib/animations';

const faqs = [
  {
    q: 'Does a search guarantee patent approval?',
    a: 'No. Patentability determinations are made by patent examiners during examination.'
  },
  {
    q: 'How long does a search take?',
    a: 'Depends on complexity and technology area.'
  },
  {
    q: 'Do you search international patents?',
    a: 'Yes. Searches may include U.S. and international patent databases.'
  },
  {
    q: 'Can I proceed directly to filing after a search?',
    a: 'Yes, depending on the search findings and filing strategy.'
  },
  {
    q: 'Is an NDA available?',
    a: 'Yes. Confidentiality safeguards are available before detailed disclosure.'
  }
];

const steps = [
  { num: '01', title: 'Confidential Intake', desc: 'Submit invention overview and project details.' },
  { num: '02', title: 'Search Planning', desc: 'Define search objectives and technical categories.' },
  { num: '03', title: 'Database Screening', desc: 'Coordinate patent and literature searches.' },
  { num: '04', title: 'Search Analysis', desc: 'Review and organize search findings.' },
  { num: '05', title: 'Patentability Assessment', desc: 'Evaluate invention distinctions and filing readiness.' },
  { num: '06', title: 'Strategy Consultation', desc: 'Discuss findings and next-step recommendations.' }
];

const deliverables = [
  'Prior Art Search Report',
  'Patentability Assessment Summary',
  'Similar Reference Compilation',
  'Novelty Review Summary',
  'Filing Pathway Recommendations',
  'Innovation Readiness Findings'
];

export default function PatentSearchEvaluationPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative py-16 md:py-24 bg-slate-950 text-white overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e3a8a_0%,transparent_70%)] opacity-40" />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-accent text-xs font-bold uppercase tracking-wider mb-2"
          >
            Guided Insight
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl"
          >
            Patent Search & Evaluation
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium"
          >
            Make informed intellectual property decisions before investing in patent filings.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-slate-400 leading-relaxed max-w-3xl mx-auto"
          >
            KORK coordinates prior art searches, patentability assessments, innovation readiness reviews, and filing strategy evaluations to help inventors understand the strength and potential of their inventions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <Link
              href="/contact?type=search"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Request Search Assessment
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact?type=meeting"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border-2 border-white/20 hover:bg-white/20 shadow-sm transform hover:-translate-y-1 transition-all"
            >
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW INTRO */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/50 dark:border-slate-800 transition-colors">
        <div className="container-custom max-w-4xl text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
            Search & Evaluation Overview
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Before preparing drawings or filing a patent application, understanding the existing intellectual property landscape is critical. Our coordinated search and evaluation services help inventors identify similar technologies, assess novelty, evaluate filing pathways, and establish a strategic roadmap for protection.
          </p>
        </div>
      </section>

      {/* DETAILED SERVICES GRID */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Prior Art Search */}
            <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white">Prior Art Search</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Comprehensive search coordination across patent and non-patent literature sources to identify relevant references related to your invention.</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Search Scope</span>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>✓ United States Patents</li>
                  <li>✓ Published Patent Applications</li>
                  <li>✓ International Patent Databases</li>
                  <li>✓ WIPO Publications</li>
                  <li>✓ European Patent Office Records</li>
                  <li>✓ Technical Publications</li>
                  <li>✓ Industry Literature</li>
                  <li>✓ Public Product References</li>
                </ul>
              </div>
            </motion.div>

            {/* Patentability Assessment */}
            <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white">Patentability Assessment</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Evaluate whether your invention demonstrates potentially novel and distinguishable characteristics compared to existing technologies.</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assessment Includes</span>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>✓ Similarity Review</li>
                  <li>✓ Distinguishing Feature Analysis</li>
                  <li>✓ Novelty Evaluation</li>
                  <li>✓ Potential Filing Considerations</li>
                  <li>✓ Risk Identification</li>
                </ul>
              </div>
            </motion.div>

            {/* Innovation Readiness */}
            <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white">Innovation Readiness Assessment</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Determine whether your invention is sufficiently developed for patent filing or requires additional refinement.</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Evaluation Factors</span>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>✓ Technical Completeness</li>
                  <li>✓ Documentation Readiness</li>
                  <li>✓ Prototype Status</li>
                  <li>✓ Disclosure Quality</li>
                  <li>✓ Filing Preparedness</li>
                </ul>
              </div>
            </motion.div>

            {/* Competitive Landscape */}
            <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 }} className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white">Competitive Landscape Review</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Understand the intellectual property activity occurring within your technology sector.</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Review Areas</span>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>✓ Competitor Patent Activity</li>
                  <li>✓ Technology Trends</li>
                  <li>✓ Emerging Innovations</li>
                  <li>✓ Filing Patterns</li>
                  <li>✓ Market Position Insights</li>
                </ul>
              </div>
            </motion.div>

            {/* Design vs Utility */}
            <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }} className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center">
                <Scale size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white">Design vs Utility Assessment</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Determine the most appropriate filing strategy based on the characteristics of your invention.</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assessment Categories</span>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>✓ Utility Patent Considerations</li>
                  <li>✓ Design Patent Considerations</li>
                  <li>✓ Combined Filing Opportunities</li>
                  <li>✓ International Filing Considerations</li>
                </ul>
              </div>
            </motion.div>

            {/* Filing Strategy */}
            <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.5 }} className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-xl flex items-center justify-center">
                <Map size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white">Filing Strategy Consultation</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Coordinate the next steps in the intellectual property process based on search findings and invention objectives.</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Strategy Options</span>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>✓ Provisional Applications</li>
                  <li>✓ Non-Provisional Applications</li>
                  <li>✓ Design Patent Applications</li>
                  <li>✓ Plant Patent Applications</li>
                  <li>✓ PCT Applications</li>
                  <li>✓ Trademark Protection Considerations</li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DELIVERABLES & WORKFLOW */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200/50 dark:border-slate-800 transition-colors">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Deliverables */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
                Deliverables
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                What to expect from our Search Package:
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-sm">
              <ul className="space-y-4">
                {deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="text-accent shrink-0" size={20} />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Workflow */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
                Search & Evaluation Workflow
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Our structured process for assessing your invention.
              </p>
            </div>

            <div className="relative border-l-2 border-accent/35 ml-4 md:ml-6 space-y-8">
              {steps.map((step, idx) => (
                <motion.div 
                  variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  key={step.num} 
                  className="relative pl-6 md:pl-10"
                >
                  <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent text-white font-extrabold text-xs shadow shadow-blue-500/20 ring-4 ring-slate-50 dark:ring-slate-900/40">
                    {step.num}
                  </div>
                  <motion.div 
                    whileHover={{ x: 5, scale: 1.01 }}
                    className="space-y-1 p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 shadow-sm"
                  >
                    <h3 className="text-sm font-bold text-primary dark:text-white">{step.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{step.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
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
                  className="w-full text-left px-5 py-4 font-bold text-xs md:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:text-secondary dark:hover:text-accent transition-colors"
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
                  <div className="px-5 pb-4 pt-1 text-[11px] md:text-xs text-slate-500 dark:text-slate-400 border-t border-slate-50 dark:border-slate-850 leading-relaxed font-normal">
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
              Ready To Evaluate Your Invention?
            </h2>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Understand the intellectual property landscape before investing in drawings, applications, or prosecution services.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact?type=search"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Request Search Assessment
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
