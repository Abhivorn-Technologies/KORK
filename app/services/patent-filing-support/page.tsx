'use client';

import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileCheck, 
  Globe, 
  AlertCircle, 
  RotateCcw, 
  HelpCircle as QuestionIcon,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Briefcase
} from 'lucide-react';

const filingServices = [
  {
    title: 'Utility Patent Applications',
    items: [
      { name: 'Provisional Applications', desc: 'Establish a priority filing date under patent pending status. Includes disclosure intake, review, and preliminary drawings.' },
      { name: 'Non-Provisional Applications', desc: 'Full application preparation including claim drafting coordination, descriptions assembly, and formal drawing packaging.' },
      { name: 'Continuation Applications', desc: 'File additional claims expanding on existing parent applications while maintaining original filing date.' },
      { name: 'Divisional Applications', desc: 'Coordinate separation of distinct inventions originally filed under a single application.' }
    ]
  },
  {
    title: 'Design & Plant Applications',
    items: [
      { name: 'Design Patent Applications', desc: 'Utility figures, precise lineweights, and perspective layouts tailored to ornamental design filings.' },
      { name: 'Plant Patent Applications', desc: 'Botanical descriptions and growth stage illustration packaging for agricultural innovations.' }
    ]
  },
  {
    title: 'International Filing Support',
    items: [
      { name: 'PCT Applications', desc: 'Coordinated Patent Cooperation Treaty filing to lock in international priority across 150+ countries.' },
      { name: 'National Phase Entry', desc: 'Manage translations and coordinate filings in individual countries through foreign associates.' },
      { name: 'International Portfolio Planning', desc: 'Devise long-term, budget-conscious strategies for global IP coverage.' }
    ]
  }
];

const officeActionServices = [
  { title: 'Office Action Review', desc: 'Evaluate examiner rejections or prior art citations with network patent professionals.' },
  { title: 'Amendment Support', desc: 'Coordinate updates to claims, technical descriptions, or specifications.' },
  { title: 'Drawing Revisions', desc: 'Prepare modified figures matching examiner objections (margins, shade weights, reference numbers).' },
  { title: 'Deadline Tracking', desc: 'Automatic monitoring of critical 3-month and 6-month USPTO response windows.' }
];

const faqs = [
  {
    q: 'What is patent prosecution?',
    a: 'Patent prosecution is the interaction process with the USPTO after a patent application has been filed. This includes replying to Office Actions, amending claims, and communicating with examiners until the patent is allowed or abandoned.'
  },
  {
    q: 'Does patent prosecution involve court appearances?',
    a: 'No. Patent prosecution occurs entirely before the USPTO and consists of written arguments and examiner interviews. It does not involve courtrooms, litigation, or lawsuits (which are separate patent litigation matters).'
  },
  {
    q: 'Can KORK represent me before the USPTO?',
    a: 'No. Formal representation before the USPTO is provided exclusively by registered patent attorneys or registered patent agents in KORK\'s network. KORK provides workflow coordination, documentation support, and technical illustrations.'
  },
  {
    q: 'Do you support international patent filings?',
    a: 'Yes, we coordinate PCT filings and subsequent national phase applications in target foreign jurisdictions through foreign associate attorneys.'
  },
  {
    q: 'Can you revise drawings during the examination phase?',
    a: 'Yes. Drawing revisions requested in USPTO objections or office actions are prepared by our illustrators and coordinated for attorney submission.'
  }
];

export default function PatentFilingSupportPage() {
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
            Attorney & Agent Coordinated Services
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-5xl"
          >
            Patent Filing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Prosecution Support</span>
          </motion.h1>
          
          <p className="text-base text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
            From provisional applications to international filings and office action support, KORK coordinates the resources required to move patent applications efficiently through the protection process.
          </p>

          {/* Legal Notice Callout */}
          <div className="bg-amber-950/20 border border-amber-900/30 rounded-2xl p-5 text-left text-xs text-amber-500 max-w-2xl mx-auto flex gap-3.5 mt-6">
            <AlertCircle size={24} className="shrink-0 text-amber-500 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block uppercase tracking-wider text-[10px]">Important Notice</span>
              <p className="leading-relaxed font-normal text-slate-300">
                Patent filing and prosecution services are performed exclusively by licensed patent attorneys and registered patent agents. KORK coordinates project workflows, illustrations, documentation, and client communications. KORK is not a law firm and does not provide legal advice.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact?type=filing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Start Project Assessment
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

      {/* FILING SERVICES GRID */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Filing Services Overview
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Coordinated assistance across provisional, non-provisional, design, and international applications.
            </p>
          </div>

          <div className="space-y-12">
            {filingServices.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-6">
                <h3 className="text-lg font-black text-secondary dark:text-accent border-b border-slate-100 dark:border-slate-850 pb-2">{cat.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx}
                      className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 space-y-2"
                    >
                      <h4 className="text-sm font-bold text-primary dark:text-white flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE ACTION SUPPORT */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Office Action Support & Drawing Revisions
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              When the USPTO issues an Office Action rejection, timely, correct responses are critical to save your filing date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {officeActionServices.map((svc, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -6, scale: 1.02 }}
                className="shine-card flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-sm"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-secondary to-accent text-white flex items-center justify-center shadow-md shadow-blue-500/10">
                  <RotateCcw size={18} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-primary dark:text-white">{svc.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAINTENANCE FEE TRACKING */}
      <section className="py-6 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="text-lg font-bold tracking-tight text-primary dark:text-white">Patent Maintenance & Portfolio Management</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Stay protected for the long term after issuance. We track mandatory maintenance fee deadlines at 3.5, 7.5, and 11.5 years, handle trademark renewals, and store all documents securely in your portal.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/contact?type=portfolio"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10 transition-all transform hover:-translate-y-0.5"
              >
                Request Portfolio Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY USE KORK FOR FILING */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom max-w-6xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Integrated Project Staging
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Why patent professionals and inventors coordinate filings through KORK.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="space-y-6 text-xs font-normal flex flex-col justify-center">
              <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-2 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-primary dark:text-white text-sm">One Central Platform</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Prior art searches, design vector figures, claims support, and e-filings, all managed in one secure workspace dashboard.</p>
              </div>
              
              <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-2 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-primary dark:text-white text-sm">Milestone Tracking</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Every document revision, invoice, attorney authorization, and submission ID is tracked clearly on the client portal timeline.</p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-2 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-primary dark:text-white text-sm">Strict NDA Compliance</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Encrypted document transfers, secure vault storage, and strict confidentiality agreements to protect trade secrets prior to publication.</p>
              </div>
            </div>

            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}className="relative h-full min-h-[300px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay z-10 pointer-events-none" />
              <img 
                src="/assets/images/patent_portfolio_secure.png" 
                alt="Secure Patent Portfolio" 
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 z-20 image-overlay-text">
                <p className="text-white text-lg font-bold tracking-tight">Enterprise-Grade Security</p>
                <p className="text-slate-300 text-xs leading-relaxed mt-2">
                  Your intellectual property is secured with state-of-the-art encryption protocols from the moment of disclosure to official USPTO issuance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-3xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Filing & Prosecution FAQs
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Clear information regarding patent prosecution boundaries, litigation, and agent representation.
            </p>
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
                  <div className="px-5 pb-4 pt-1 text-[11px] md:text-xs text-slate-500 dark:text-slate-400 border-t border-slate-50 dark:border-slate-855 leading-relaxed font-normal">
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
              Ready to Secure Your Filing?
            </h2>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Speak with an applications manager to coordinate your patent search, designs packaging, and attorney assignment today.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact?type=assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Start Free Assessment
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
