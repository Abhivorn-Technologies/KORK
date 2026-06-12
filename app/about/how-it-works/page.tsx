'use client';

import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/helpers';
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
  { 
    num: '1', 
    title: 'Submit Your Invention', 
    desc: 'Provide a description of your invention, innovation, product, design, or brand.',
    listTitle: 'Upload:',
    listItems: ['Sketches', 'Photos', 'CAD files', 'Technical documents', 'Existing patent materials'],
    outcome: null
  },
  { 
    num: '2', 
    title: 'Confidential Review', 
    desc: 'Our team reviews project requirements.',
    listTitle: 'Available Services:',
    listItems: ['NDA Requests', 'Secure Intake', 'Initial Assessment'],
    outcome: 'Project roadmap created.'
  },
  { 
    num: '3', 
    title: 'Patent Search & Evaluation', 
    desc: 'Coordinate professional search services.',
    listTitle: 'Includes:',
    listItems: ['Prior Art Search', 'Patentability Search', 'Landscape Search', 'Trademark Screening'],
    outcome: 'Determine potential protection pathways.'
  },
  { 
    num: '4', 
    title: 'Strategy & Protection Planning', 
    desc: 'Identify the most appropriate path:',
    listTitle: '',
    listItems: ['Utility Patent', 'Design Patent', 'Plant Patent', 'Trademark', 'Trade Dress', 'International Filing'],
    outcome: 'Recommended protection strategy.'
  },
  { 
    num: '5', 
    title: 'Application Preparation', 
    desc: 'Coordinate preparation of filing materials.',
    listTitle: 'May include:',
    listItems: ['Patent Specifications', 'Technical Documentation', 'Disclosure Materials', 'Supporting Information'],
    outcome: 'Application package development begins.'
  },
  { 
    num: '6', 
    title: 'Patent Drawings & Illustrations', 
    desc: '',
    listTitle: 'KORK prepares:',
    listItems: ['Utility Patent Drawings', 'Design Patent Drawings', 'Plant Patent Illustrations', 'Trademark Illustrations', 'Trade Dress Illustrations'],
    outcome: 'USPTO-compliant figures ready for submission.'
  },
  { 
    num: '7', 
    title: 'Attorney & Agent Coordination', 
    desc: 'Applications requiring professional representation are coordinated through trusted patent attorneys and registered patent agents.',
    listTitle: 'May include:',
    listItems: ['Filing Review', 'Claims Review', 'Legal Analysis', 'Filing Authorization'],
    outcome: 'Application prepared for filing.'
  },
  { 
    num: '8', 
    title: 'Filing & Submission', 
    desc: 'Patent professionals complete submission activities.',
    listTitle: 'May include:',
    listItems: ['USPTO Filing', 'Trademark Filing', 'PCT Filing', 'National Phase Filing'],
    outcome: 'Application officially submitted.'
  },
  { 
    num: '9', 
    title: 'Examination & Office Actions', 
    desc: '',
    listTitle: 'During USPTO review:',
    listItems: ['Office Action Tracking', 'Drawing Updates', 'Amendment Coordination', 'Response Coordination'],
    outcome: 'Application continues through examination.'
  },
  { 
    num: '10', 
    title: 'Protection & Portfolio Management', 
    desc: '',
    listTitle: 'After registration or issuance:',
    listItems: ['Portfolio Tracking', 'Maintenance Monitoring', 'Trademark Renewals', 'Patent Maintenance Support'],
    outcome: 'Long-term IP management.'
  }
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
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative py-16 md:py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e3a8a_0%,transparent_70%)] opacity-40" />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-accent text-xs font-bold uppercase tracking-wider mb-2">
            Structured Workflow Lifecycle
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-5xl">
            From Idea to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Intellectual Property™</span>
          </h1>
          
          <p className="text-base text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
            A structured, transparent workflow that guides inventors from invention disclosure through patent protection, trademark registration, and long-term intellectual property management.
          </p>

          <p className="text-sm text-slate-400 leading-relaxed max-w-5xl mx-auto">
            Whether you are protecting your first invention or managing a growing portfolio, KORK coordinates the services, professionals, and project milestones required to move your innovation forward.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact?type=start"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Start Your Project
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

      {/* SECTION 1: THE TRADITIONAL PROCESS IS FRAGMENTED */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <span className="text-xs font-black text-rose-500 uppercase tracking-widest block">The Problem</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white tracking-tight">
                The Traditional Process Is Fragmented
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Most inventors struggle to manage their IP projects because they must coordinate multiple independent providers independently, resulting in communication delays, format errors, and mounting costs.
              </p>
            </div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="shine-card p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 space-y-4 shadow-sm"
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
            </motion.div>
          </div>

          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative h-full min-h-[300px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group"
          >
            <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
            <img 
              src="/assets/images/how_it_works_blueprint.png" 
              alt="Workflow Blueprint Concept" 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20 image-overlay-text">
              <p className="text-white text-xs font-bold tracking-widest uppercase">The Solution: KORK Unified Pathway</p>
              <p className="text-slate-300 text-[10px] leading-relaxed mt-1">
                KORK eliminates friction by unifying technical drafting, searches, and agent filings under a single structured portal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLUEPRINT SCHEMATIC */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors">
        <div className="container-custom max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              The KORK Process
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Ten structured phases coordinating your concept from initial disclosure to long-term portfolio maintenance.
            </p>
          </div>

          {/* Blueprint Container */}
          <div className="relative w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-12 shadow-xl overflow-hidden group">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Corner Crosshairs */}
            <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-slate-300 dark:border-slate-700 pointer-events-none" />
            <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-slate-300 dark:border-slate-700 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-slate-300 dark:border-slate-700 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-slate-300 dark:border-slate-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-16">
              
              {/* Top HUD (Heads Up Display) */}
              <div className="w-full bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-8 min-h-[220px] flex flex-col justify-center relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-5 pointer-events-none">
                  <span className="text-[150px] font-black font-mono leading-none text-slate-900 dark:text-white">
                    {steps[activeStep].num.padStart(2, '0')}
                  </span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] font-mono tracking-widest uppercase rounded shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                      Phase {steps[activeStep].num.padStart(2, '0')}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                      System Status: Online
                    </span>
                  </div>
                  <motion.h3 
                    key={`title-${activeStep}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight"
                  >
                    {steps[activeStep].title}
                  </motion.h3>
                  <motion.div 
                    key={`content-${activeStep}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-3xl"
                  >
                    {steps[activeStep].desc && (
                      <p className="text-slate-700 dark:text-slate-300 font-medium text-sm md:text-base leading-snug mb-3">
                        {steps[activeStep].desc}
                      </p>
                    )}
                    
                    {(steps[activeStep].listTitle || steps[activeStep].listItems?.length > 0) && (
                      <div className="mb-4">
                        {steps[activeStep].listTitle && (
                          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mr-2">
                            {steps[activeStep].listTitle}
                          </span>
                        )}
                        <span className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {steps[activeStep].listItems.join(' • ')}
                        </span>
                      </div>
                    )}

                    {steps[activeStep].outcome && (
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-200 dark:border-emerald-500/20">
                        <CheckCircle size={14} className="shrink-0" />
                        Outcome: {steps[activeStep].outcome}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full">
                {/* Instructional Helper */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 animate-pulse shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Click on any phase number to explore details
                  </div>
                </div>

                {/* Interactive Node Grid */}
              <div className="relative w-full max-w-4xl mx-auto">
                {/* Connecting Vector Line (Desktop) */}
                <div className="absolute top-[28px] left-6 right-6 h-px bg-slate-200 dark:bg-slate-800 hidden sm:block pointer-events-none">
                  <div 
                    className="h-full bg-accent transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-12 sm:gap-y-0 relative z-10">
                  {steps.map((step, idx) => {
                    const isActive = activeStep === idx;
                    const isPassed = idx <= activeStep;
                    return (
                      <div 
                        key={step.num}
                        className="flex flex-col items-center relative cursor-pointer group"
                        onMouseEnter={() => setActiveStep(idx)}
                        onClick={() => setActiveStep(idx)}
                      >
                        {/* Node */}
                        <div className={cn(
                          "w-14 h-14 rounded-lg bg-white dark:bg-slate-900 border-2 flex items-center justify-center transition-all duration-300 relative z-10 shadow-sm",
                          isActive 
                            ? "border-accent shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-110 rotate-45" 
                            : isPassed 
                              ? "border-slate-400 dark:border-slate-500" 
                              : "border-slate-200 dark:border-slate-800 group-hover:border-slate-400"
                        )}>
                          <span className={cn(
                            "font-mono font-bold transition-all duration-300",
                            isActive ? "text-accent dark:text-white text-lg -rotate-45" : isPassed ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400"
                          )}>
                            {step.num.padStart(2, '0')}
                          </span>
                        </div>
                        
                        {/* Node Label */}
                        <span className={cn(
                          "mt-6 text-[10px] md:text-xs font-mono text-center leading-tight px-2 transition-all duration-300 uppercase tracking-widest",
                          isActive ? "text-accent font-bold" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                        )}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              </div>

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
