'use client';

import { useState } from 'react';
import Link from 'next/link';
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
      <section className="relative py-20 md:py-28 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10 max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-accent text-xs font-bold uppercase tracking-wider">
            Attorney & Agent Coordinated Services
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Patent Filing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Prosecution Support</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-350 leading-relaxed max-w-2xl mx-auto">
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
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/contact?type=filing"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10"
            >
              Start Project Assessment
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
              <div 
                key={idx} 
                className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-sm"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-secondary to-accent text-white flex items-center justify-center shadow-md shadow-blue-500/10">
                  <RotateCcw size={18} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-primary dark:text-white">{svc.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAINTENANCE FEE TRACKING */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-3xl space-y-8 text-center bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 border border-slate-850 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-xl pointer-events-none" />
          <h3 className="text-xl font-bold tracking-tight text-white">Patent Maintenance & Portfolio Management</h3>
          <p className="text-xs text-slate-350 leading-relaxed font-normal max-w-xl mx-auto">
            Stay protected for the long term after issuance. We track mandatory maintenance fee deadlines at 3.5, 7.5, and 11.5 years, handle trademark renewals, and store all documents securely in your portal.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=portfolio"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold text-slate-900 bg-accent hover:bg-white transition-colors"
            >
              Request Portfolio Review
            </Link>
          </div>
        </div>
      </section>

      {/* WHY USE KORK FOR FILING */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Integrated Project Staging
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Why patent professionals and inventors coordinate filings through KORK.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-xs font-normal">
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-2">
              <h4 className="font-bold text-primary dark:text-white">One Central Platform</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Prior art searches, design vector figures, claims support, and e-filings, all managed in one secure workspace dashboard.</p>
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-2">
              <h4 className="font-bold text-primary dark:text-white">Milestone Tracking</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Every document revision, invoice, attorney authorization, and submission ID is tracked clearly on the client portal timeline.</p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-2">
              <h4 className="font-bold text-primary dark:text-white">Attorney/Agent Network</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Direct matching with registered practitioners selected specifically based on the technical category of your invention.</p>
            </div>
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
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e40af_0%,transparent_60%)] opacity-35" />
        <div className="container-custom relative z-10 max-w-2xl space-y-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Ready to Protect Your Innovation?
          </h2>
          <p className="text-sm text-slate-350 leading-relaxed max-w-xl mx-auto">
            Speak with an applications manager to coordinate your patent search, designs packaging, and attorney assignment today.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/contact?type=assessment"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10"
            >
              Start Free Assessment
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

    </div>
  );
}
