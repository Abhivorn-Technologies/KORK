'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Shield, Zap, FileText, CheckCircle2, 
  HelpCircle, ChevronDown, PenTool, Layers, Target,
  Briefcase, GraduationCap, Building, Star
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';

export default function NAPPMemberPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const benefits = [
    {
      title: "15% Member Discount",
      desc: "NAPP members receive a 15% discount on standard patent illustration services.",
      icon: Star,
      bullets: [
        "Utility Patent Drawings",
        "Design Patent Drawings",
        "Plant Patent Illustrations",
        "Trademark Illustrations",
        "Trade Dress Illustrations"
      ]
    },
    {
      title: "Priority Scheduling",
      desc: "Qualifying NAPP member projects receive preferred scheduling within our production workflow.",
      icon: Zap,
      bullets: [
        "Faster project intake",
        "Priority revision handling",
        "Expedited review queue availability",
        "Deadline-sensitive support"
      ]
    },
    {
      title: "Dedicated Project Coordination",
      desc: "Receive structured project coordination throughout the illustration process.",
      icon: Shield,
      bullets: [
        "Streamlined intake",
        "Centralized communication",
        "Revision tracking",
        "Deliverable management",
        "Status updates"
      ]
    }
  ];

  const services = [
    { title: 'Utility Patent Illustrations', desc: 'USPTO-compliant utility patent drawings prepared from sketches, photographs, CAD files, prototypes, engineering documents, and invention disclosures.', icon: PenTool },
    { title: 'Design Patent Illustrations', desc: 'Professional design patent drawings focused on protecting ornamental product designs.', icon: Layers },
    { title: 'Plant Patent Illustrations', desc: 'Technical botanical illustrations prepared for plant patent applications.', icon: Target },
    { title: 'Trademark Illustrations', desc: 'Trademark drawing support for applicable trademark filings.', icon: FileText },
    { title: 'Trade Dress Illustrations', desc: 'Visual representations supporting trade dress protection strategies.', icon: Shield }
  ];

  const whyWorkWithUs = [
    { title: 'USPTO-Focused Quality', desc: 'Drawings are prepared to satisfy USPTO patent drawing requirements and prosecution expectations.', icon: CheckCircle2 },
    { title: 'Fast Turnaround', desc: 'Structured workflows help support time-sensitive filing schedules and office action deadlines.', icon: Zap },
    { title: 'Reliable Revision Support', desc: 'Responsive revision handling throughout the illustration process.', icon: FileText },
    { title: 'Confidential Project Handling', desc: 'Confidential invention materials are handled through secure project workflows and controlled access procedures.', icon: Shield }
  ];

  const supportedGroups = [
    "Patent Attorneys",
    "Patent Agents",
    "Solo Practitioners",
    "Boutique IP Firms",
    "Patent Prosecution Teams",
    "Independent Inventors",
    "Startup Founders",
    "University Innovation Programs"
  ];

  const faqs = [
    {
      q: "Who qualifies for NAPP member pricing?",
      a: "Active NAPP members are eligible for member pricing and program benefits."
    },
    {
      q: "Does the 15% discount apply to all KORK services?",
      a: "No. The NAPP member discount currently applies to patent illustration services and related drawing support services."
    },
    {
      q: "Does the discount apply to patent filing services?",
      a: "No. Patent filing and prosecution services are performed by independent licensed patent attorneys and registered patent agents. Separate fee structures apply."
    },
    {
      q: "Are office action revisions included?",
      a: "For projects originally illustrated by KORK InventReX, office action drawing revisions are provided without additional illustration charges. For externally prepared drawings, NAPP members receive the standard 15% member discount."
    },
    {
      q: "Can independent inventors use the program?",
      a: "Yes. NAPP member benefits are available to eligible members regardless of organization size."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-850 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#eff6ff_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,#1e3a8a_0%,transparent_70%)] opacity-80 dark:opacity-30" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-sm font-bold shadow-sm"
            >
              <img src="/napp_logo.jpg" alt="NAPP Logo" className="h-5 w-auto rounded-sm mix-blend-multiply dark:mix-blend-normal dark:brightness-125" />
              NAPP Member Exclusive
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
            >
              Exclusive Patent Illustration Benefits for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 dark:from-cyan-400 dark:to-blue-400">NAPP Members</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium"
            >
              Professional USPTO-compliant patent illustrations with preferred member pricing, priority scheduling, and dedicated project support.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base text-slate-500 dark:text-slate-500 leading-relaxed max-w-3xl mx-auto"
            >
              KORK InventReX supports patent attorneys, patent agents, independent inventors, and innovation professionals with high-quality patent drawings prepared to USPTO standards.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4 pt-6"
            >
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-blue-700 to-cyan-600 hover:opacity-95 shadow-lg shadow-blue-500/25 transform hover:-translate-y-1 transition-all">
                Request NAPP Pricing
                <ArrowRight size={18} />
              </Link>
              <Link href="/client-portal" className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-slate-900 dark:text-white bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transform hover:-translate-y-1 transition-all">
                Start Illustration Project
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. NAPP MEMBER BENEFITS */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300 border-b border-slate-200/50 dark:border-slate-850">
        <div className="container-custom space-y-10">
          <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">NAPP Member Benefits</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="shine-card flex flex-col p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <benefit.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-1 leading-relaxed">{benefit.desc}</p>
                <ul className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {benefit.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PATENT ILLUSTRATION SERVICES */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom space-y-10">
          <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">Patent Illustration Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -4, scale: 1.02 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="shine-card p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850 hover:shadow-xl hover:border-blue-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 shadow-sm">
                  <service.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OFFICE ACTION DRAWING SUPPORT */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#1e3a8a_0%,transparent_60%)] opacity-50" />
        <div className="container-custom relative z-10 space-y-10">
          <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Office Action Drawing Support</h2>
            <p className="text-base text-slate-300">Patent applications often require drawing revisions during prosecution.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ scale: 1.02 }} viewport={{ once: true, margin: "-50px" }} className="p-6 md:p-8 rounded-3xl bg-blue-900/30 border border-blue-500/30 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                <CheckCircle2 className="text-blue-400" /> KORK Illustrated Projects
              </h3>
              <p className="text-slate-300 leading-relaxed font-medium">
                For illustration projects originally prepared by KORK InventReX: Office Action drawing revisions are provided at <strong className="text-white">no additional illustration charge</strong>.
              </p>
            </motion.div>
            <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ scale: 1.02 }} viewport={{ once: true, margin: "-50px" }} className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-slate-700 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl font-bold text-slate-300 mb-3 flex items-center gap-3">
                <FileText className="text-slate-400" /> Externally Prepared Drawings
              </h3>
              <p className="text-slate-300 leading-relaxed font-medium">
                For drawings not originally prepared by KORK: NAPP members receive their <strong className="text-white">standard 15% discount</strong> on revision services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. WHY PATENT PROFESSIONALS WORK WITH KORK & WHO IT SUPPORTS */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-6 text-left">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight leading-tight">Why Patent Professionals Work With KORK</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyWorkWithUs.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-blue-600 dark:text-blue-400" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-8">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 md:p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-extrabold text-primary dark:text-white tracking-tight mb-6 text-center lg:text-left">Who This Program Supports</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {supportedGroups.map((group, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{group}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 6. FAQS */}
      <section className="pt-16 pb-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-850 transition-colors duration-300">
        <div className="container-custom max-w-4xl space-y-10">
          <motion.div variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 transition-colors shadow-sm"
              >
                <button
                  suppressHydrationWarning
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-base font-bold text-slate-900 dark:text-white pr-8">{faq.q}</span>
                  <ChevronDown 
                    className={`text-slate-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} 
                    size={20} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-base text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-850 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. IMPORTANT DISCLOSURE */}
      <section className="pb-16 pt-4 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="container-custom max-w-4xl">
          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/80 text-center border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Important Disclosure</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Patent filing and prosecution services are performed by independent licensed patent attorneys and registered patent agents. KORK InventReX is not a law firm, does not provide legal advice, and does not practice law.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-16 bg-white transition-colors duration-300">
        <div className="container-custom max-w-5xl">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ scale: 1.01 }} viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-800 transition-all"
          >
            <div className="flex-1 text-center lg:text-left space-y-3">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Professional Patent Illustrations for NAPP Members
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400">
                Receive preferred pricing, priority scheduling, and reliable USPTO-compliant illustration support for your next patent project.
              </p>
            </div>
            
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link href="/client-portal" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-md transform hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                Start Project
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm transform hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                Request Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
