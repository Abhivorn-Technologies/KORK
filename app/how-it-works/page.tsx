'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  Shield,
  Clock,
  Layers,
  CheckCircle,
  AlertTriangle,
  HelpCircle as QuestionIcon,
  Upload,
  MessageSquare,
  FileCheck,
  TrendingUp,
  UserCheck
} from 'lucide-react';

const steps = [
  { num: '1', title: 'Submit Your Invention', desc: 'Provide description, sketches, photos, CAD models, or existing materials in our portal.' },
  { num: '2', title: 'Confidential Review', desc: 'Secure intake roadmap setup. Optional NDA execution before sharing detailed files.' },
  { num: '3', title: 'Patent Search & Evaluation', desc: 'Prior art, patentability, and trademark screening coordination to evaluate landscape.' },
  { num: '4', title: 'Strategy Planning', desc: 'Identify optimal pathways: utility patent, design, plant, trademark, or international filings.' },
  { num: '5', title: 'Application Preparation', desc: 'Coordinate draft specifications, technical documentation sheets, and disclosure files.' },
  { num: '6', title: 'Patent Drawings', desc: 'Drafting of USPTO-compliant figures (utility line drawings, design surface shading).' },
  { num: '7', title: 'Attorney Coordination', desc: 'Assigned registered patent attorney or agent reviews claims, specifications, and issues authorization.' },
  { num: '8', title: 'Filing & Submission', desc: 'Application is officially submitted to the USPTO, PCT, or target international offices.' },
  { num: '9', title: 'Examination & Office Actions', desc: 'Deadlines tracking, drawing updates, and claim amendment coordination during patent prosecution.' },
  { num: '10', title: 'Portfolio Management', desc: 'Post-issuance maintenance fee monitoring, trademark renewals, and long-term asset tracking.' }
];

const timelineRanges = [
  { service: 'Patent Search &ability Assessment', duration: '5–10 Business Days', detail: 'Includes comprehensive US & International search reports.' },
  { service: 'Patent Drawings & Figures', duration: '2–7 Business Days', detail: 'Utility line drawings or design stippling/surface shading sheets.' },
  { service: 'Trademark Illustrations', duration: '1–3 Business Days', detail: 'Composite brand logo vectorization and specimen prep.' },
  { service: 'Utility Application Prep', duration: 'Varies by Complexity', detail: 'Coordinated specs documentation & claims drafting.' },
  { service: 'Design Application Prep', duration: 'Varies by Complexity', desc: 'Formal registration package assembly.' },
  { service: 'Office Action Response Support', duration: 'Deadline Dependent', detail: 'Based on the USPTO 3-month or 6-month response windows.' }
];

const faqs = [
  {
    q: 'Do I need an NDA before submitting my invention?',
    a: 'Yes, NDA-supported secure workflows are available upon request before any detailed drawings or descriptions are uploaded.'
  },
  {
    q: 'Do I need a patent search first?',
    a: 'While not legally mandatory, a prior art search is strongly recommended to identify conflicting patents before spending time and budget on formal applications.'
  },
  {
    q: 'Can I submit rough sketches instead of formal drawings?',
    a: 'Yes. We accept hand-drawn sketches, digital photos, and CAD exports as references. Our draftsmen will translate them into USPTO-compliant figures.'
  },
  {
    q: 'Will I be able to track my project\'s progress?',
    a: 'Absolutely. Every project includes interactive status tracking, milestone updates, direct developer messaging, and deliverables access in the Client Portal.'
  },
  {
    q: 'Who actually files the patent application?',
    a: 'Formal submissions to the USPTO are completed by licensed patent attorneys or registered patent agents in KORK\'s network.'
  },
  {
    q: 'Can I use only one service independently?',
    a: 'Yes. You can purchase illustration sheets, search coordination, or Office Action response support separately based on your specific requirements.'
  }
];

export default function HowItWorksPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 bg-slate-950 text-white overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e3a8a_0%,transparent_70%)] opacity-40" />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10 max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-accent text-xs font-bold uppercase tracking-wider">
            Structured Workflow Lifecycle
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            From Idea to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Intellectual Property™</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-350 leading-relaxed max-w-2xl mx-auto">
            A structured, transparent workflow that guides inventors from invention disclosure through patent protection, trademark registration, and long-term intellectual property management.
          </p>

          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
            Whether you are protecting your first invention or managing a growing portfolio, KORK coordinates the services, professionals, and project milestones required to move your innovation forward.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/contact?type=start"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10"
            >
              Start Your Project
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact?type=meeting"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE TRADITIONAL PROCESS IS FRAGMENTED */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-black text-rose-500 uppercase tracking-widest block">The Problem</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              The Traditional Process Is Fragmented
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Most inventors struggle to manage their IP projects because they must coordinate multiple independent providers independently, resulting in communication delays, format errors, and mounting costs.
            </p>
          </div>

          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            className="shine-card p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 space-y-4 shadow-lg"
          >
            <h3 className="text-sm font-bold text-primary dark:text-white uppercase tracking-wider">Independent Tasks to Coordinate:</h3>
            <div className="grid grid-cols-2 gap-3 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><AlertTriangle size={14} className="text-rose-500 shrink-0" /> Patent Searches</span>
              <span className="flex items-center gap-1.5"><AlertTriangle size={14} className="text-rose-500 shrink-0" /> Patent Drawings</span>
              <span className="flex items-center gap-1.5"><AlertTriangle size={14} className="text-rose-500 shrink-0" /> Patent Attorneys</span>
              <span className="flex items-center gap-1.5"><AlertTriangle size={14} className="text-rose-500 shrink-0" /> Trademark Files</span>
              <span className="flex items-center gap-1.5"><AlertTriangle size={14} className="text-rose-500 shrink-0" /> USPTO Deadlines</span>
              <span className="flex items-center gap-1.5"><AlertTriangle size={14} className="text-rose-500 shrink-0" /> Office Actions</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-800">
              KORK eliminates this friction by unifying technical drafting, searches, and agent filings under a single portal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE 10 STEP TIMELINE */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom space-y-20">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              The KORK Process
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Ten structured phases coordinating your concept from initial disclosure to long-term portfolio maintenance.
            </p>
          </div>

          {/* Visual Alternating Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Glowing Center Line (Hidden on mobile) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-accent/50 to-transparent -translate-x-1/2 rounded-full" />
            
            <div className="space-y-8 md:space-y-12">
              {steps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={step.num} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Mobile Line & Circle (Visible only on mobile) */}
                    <div className="md:hidden absolute left-4 top-0 bottom-[-2rem] w-0.5 bg-accent/20" />
                    <div className="md:hidden absolute left-4 top-6 w-3 h-3 rounded-full bg-accent -translate-x-1/2 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

                    {/* Empty Space for Alternating Layout */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Center Node (Visible only on desktop) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-accent items-center justify-center z-10 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                      <span className="text-white font-black text-xs">{step.num}</span>
                    </div>

                    {/* Content Card */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
                    >
                      <div className="shine-card p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <h3 className="text-lg font-black text-primary dark:text-white mb-2 flex items-center gap-2 justify-start md:justify-normal">
                          <span className="md:hidden text-accent text-sm">#{step.num}</span>
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                    
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT YOU WILL SEE INSIDE THE CLIENT PORTAL */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Project Transparency: Inside the Client Portal
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              No black boxes. Monitor all project elements directly through your dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs font-bold">
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="shine-card p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150/60 dark:border-slate-850 space-y-2 shadow-sm">
              <Upload size={20} className="mx-auto text-accent" />
              <h4 className="text-primary dark:text-white">Secure Uploads</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-normal">Submit photos, CAD files, or sketches safely.</p>
            </motion.div>

            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="shine-card p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150/60 dark:border-slate-850 space-y-2 shadow-sm">
              <MessageSquare size={20} className="mx-auto text-accent" />
              <h4 className="text-primary dark:text-white">Direct Messages</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-normal">Communicate with yourassigned illustrators and agents.</p>
            </motion.div>

            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="shine-card p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150/60 dark:border-slate-850 space-y-2 shadow-sm">
              <Clock size={20} className="mx-auto text-accent" />
              <h4 className="text-primary dark:text-white">Milestone Tracking</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-normal">Track draft sheets, approvals, and filing dates.</p>
            </motion.div>

            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="shine-card p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150/60 dark:border-slate-850 space-y-2 shadow-sm">
              <FileCheck size={20} className="mx-auto text-accent" />
              <h4 className="text-primary dark:text-white">Deliverables</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-normal">Download print-ready vector figures and reports.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TYPICAL TIMELINES TABLE */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom max-w-3xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Typical Project Turnaround Timelines
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              Standard lead times for illustration drafts, assessments, and filings.
            </p>
          </div>

          <div className="border border-slate-200/60 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-950 overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-100 dark:bg-slate-900 font-bold text-primary dark:text-white border-b border-slate-200/60 dark:border-slate-850">
                <tr>
                  <th className="px-6 py-4">Service Category</th>
                  <th className="px-6 py-4">Estimated Staging Timeline</th>
                  <th className="px-6 py-4">Scope Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {timelineRanges.map((time, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td className="px-6 py-4 font-bold text-primary dark:text-white">{time.service}</td>
                    <td className="px-6 py-4 text-secondary dark:text-accent font-semibold">{time.duration}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-normal">{time.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-400 italic text-center font-normal">
            *Actual turnaround timelines vary based on the specific mechanical or electrical complexity of the invention.
          </p>
        </div>
      </section>

      {/* SECTION 5: WHY INVENTORS PREFER STRUCTURED WORKFLOWS */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Benefits of Structured Workflows
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Why professional firms and startups align their patent projects with KORK.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-xs font-normal">
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="shine-card p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-2 shadow-sm">
              <h4 className="font-bold text-primary dark:text-white flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-500" /> Complete Visibility</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">No guesswork. Know exactly what views have been drafted and when files are scheduled for attorney review.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="shine-card p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-2 shadow-sm">
              <h4 className="font-bold text-primary dark:text-white flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-500" /> Lower Overhead</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Avoid managing separate CAD draftsmen, search portals, and legal intake boards independently.</p>
            </motion.div>

            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="shine-card p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-2 shadow-sm">
              <h4 className="font-bold text-primary dark:text-white flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-500" /> Data Security</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">All files are transferred and stored under encrypted connections, safeguarding proprietary innovation designs.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom max-w-3xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Timeline & Workflow FAQs
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Clear information regarding NDA policies, reference files, and project controls.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm"
              >
                <button
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-3xl"
        >
          <div className="flex-1 space-y-3 text-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Ready to Protect Your Innovation?
            </h2>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              From patent searches and illustrations to filing support and portfolio management, KORK provides a structured pathway through the intellectual property lifecycle.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact?type=start"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
            >
              Start My Assessment
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact?type=meeting"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border border-white/20 hover:bg-white/20 transform hover:-translate-y-0.5 transition-all"
            >
              Consultation
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
