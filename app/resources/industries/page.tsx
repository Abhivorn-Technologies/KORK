'use client';

import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HeartPulse, 
  ShoppingBag, 
  Cpu, 
  Wrench, 
  Code, 
  Factory, 
  Leaf, 
  GraduationCap, 
  Rocket, 
  HelpCircle as QuestionIcon,
  ArrowRight,
  CheckCircle,
  FileCheck
} from 'lucide-react';

const industries = [
  {
    icon: HeartPulse,
    title: 'Medical Devices & Healthcare',
    desc: 'Medical technologies involve complex assemblies, biosensors, regulatory documentation, and precise figures.',
    innovations: ['Surgical Instruments', 'Diagnostic Tools', 'Wearable Monitors', 'Digital Health Portals', 'Biotech Equipment'],
    challenges: 'High disclosure complexity, detailed surface shading, strict formatting rules, technology dependencies.'
  },
  {
    icon: ShoppingBag,
    title: 'Consumer Products & Devices',
    desc: 'Protecting both the functional mechanics and the visual brand appearance in highly competitive retail sectors.',
    innovations: ['Household Inventions', 'Sporting Gear', 'Smart Appliances', 'Lifestyle Accessories', 'Consumer Electronics'],
    challenges: 'Balancing utility vs. design filings, trade dress protection, logo specimens preparation, fast iterations.'
  },
  {
    icon: Wrench,
    title: 'Mechanical Engineering',
    desc: 'Mechanical designs require assemblies views, exploded diagrams, reference numerals, and moving part layouts.',
    innovations: ['Industrial Machinery', 'Hydraulic Components', 'Automotive Assemblies', 'Tooling Systems', 'Pneumatic Rigs'],
    challenges: 'Large figure sets, complex exploded perspectives, sectional views, claim mapping coordination.'
  },
  {
    icon: Cpu,
    title: 'Electrical & Electronic Systems',
    desc: 'From circuit block diagrams and microchips to embedded systems and complex wireless nodes.',
    innovations: ['IoT Edge Modules', 'Sensor Networks', 'Power Distribution Packs', 'Communication Interfaces', 'Control Boards'],
    challenges: 'System architecture drawings, circuit schematics, timing waveforms, multi-component tracking.'
  },
  {
    icon: Code,
    title: 'Software & Technology',
    desc: 'Software-enabled systems, algorithms, cloud platforms, and data analytics seeking intellectual property coverage.',
    innovations: ['Artificial Intelligence Models', 'SaaS Architectures', 'Mobile Applications', 'Security Protocols', 'Data Processing Nodes'],
    challenges: 'Flowcharts formatting, system workflow diagramming, non-tangible claims drafting coordination.'
  },
  {
    icon: Factory,
    title: 'Manufacturing & Industry',
    desc: 'Scale operational optimization with automated machinery, custom robotic cells, and materials handling.',
    innovations: ['Robotic Arms', 'Assembly Line Upgrades', 'Conveyor Automation', 'Safety Racks', 'Processing Controls'],
    challenges: 'Coordinating multiple related applications, long-term portfolio strategies, factory blueprint documentation.'
  },
  {
    icon: Leaf,
    title: 'Agriculture & Plant Innovations',
    desc: 'Support for plant breeders, AgTech developers, and farming equipment manufacturers seeking patents.',
    innovations: ['Hybrid Plant Varieties', 'Irrigation Systems', 'Farming Machinery', 'Crop Sensors', 'Automated Harvesters'],
    challenges: 'Plant patent botanical documentation, color photographic figures, field testing data compilation.'
  },
  {
    icon: GraduationCap,
    title: 'University Research & Academic',
    desc: 'Assisting academic labs and technology transfer offices to organize research data into patentable disclosures.',
    innovations: ['Scientific Discoveries', 'Laboratory Hardware', 'Advanced Engineering Research', 'Material Sciences'],
    challenges: 'Co-inventor tracking, technology transfer requirements, academic publishing timeline conflicts.'
  },
  {
    icon: Rocket,
    title: 'Startups & Emerging Companies',
    desc: 'Structured intellectual property planning to establish market value and attract early-stage venture funding.',
    innovations: ['New Product Launches', 'Patent Pending Staging', 'Brand Identity Packages', 'Portfolio Valuation'],
    challenges: 'Restricted budgets, priority filing selections, fast development cycles, investor document tracking.'
  }
];

const faqs = [
  {
    q: 'Do you work only with independent inventors?',
    a: 'No. We support independent inventors, early-stage startups, corporate innovation groups, research institutions, and busy patent attorneys/agents looking for drawing support.'
  },
  {
    q: 'Can you support highly technical or specialized inventions?',
    a: 'Yes. Our network draftsmen and patent professionals routinely support projects spanning complex mechanical systems, medical devices, IoT systems, and software configurations.'
  },
  {
    q: 'What if my invention spans multiple industries?',
    a: 'Many modern inventions cross traditional boundaries. We coordinate prior art searches and strategy reviews to determine the most effective, comprehensive protection pathway.'
  },
  {
    q: 'Do you support international patent protection?',
    a: 'Yes. We coordinate global patent filings, including PCT (Patent Cooperation Treaty) applications and national phase entries, through our registered patent professionals.'
  },
  {
    q: 'Do you support startups with limited resources?',
    a: 'Yes. Our Provisional Patent and Design Patent packages are specifically tailored to help startups lock in early priority dates while keeping initial costs manageable.'
  }
];

export default function IndustriesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative py-16 md:py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e3a8a_0%,transparent_70%)] opacity-40" />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-accent text-xs font-bold uppercase tracking-wider mb-2">
            Cross-Sector IP Support
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-5xl">
            Intellectual Property Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Across Diverse Industries</span>
          </h1>
          
          <p className="text-base text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
            From concept development to patent protection, KORK coordinates the services, workflows, and intellectual property professionals required to help innovators protect and commercialize their ideas.
          </p>

          <p className="text-sm text-slate-400 leading-relaxed max-w-5xl mx-auto">
            Whether you are an independent inventor, startup founder, research organization, engineering firm, or growing business, our platform provides structured support throughout the intellectual property lifecycle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact?type=discuss"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Discuss Your Innovation
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact?type=start"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border-2 border-white/20 hover:bg-white/20 shadow-sm transform hover:-translate-y-1 transition-all"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Engineering Precision 2-Column Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container-custom max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="space-y-6 flex flex-col justify-center text-left">
            <span className="text-xs font-black text-secondary uppercase tracking-widest block">Technical Competency</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Precision Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">In Every Detail</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
              From complex mechanical assemblies and circuitry to software architectures and biotech processes, our technical drafting teams understand the language of innovation. 
              Our integrated workflows ensure your sector-specific nuances are perfectly captured and formatted to USPTO standards.
            </p>
          </div>
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative h-full min-h-[300px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <img 
              src="/assets/images/engineering_blueprint.png" 
              alt="Engineering Blueprint Concept" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Industries We Serve
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Supporting engineering excellence and creative branding across 9 technical sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6, scale: 1.02 }}
                className="shine-card group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 hover:border-accent/30 shadow-sm hover:shadow-xl transition-shadow transition-colors duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 text-secondary dark:text-accent group-hover:scale-105 transition-transform">
                    <ind.icon size={22} />
                  </div>
                  <h3 className="text-base font-bold text-primary dark:text-white group-hover:text-secondary dark:group-hover:text-accent transition-colors">{ind.title}</h3>
                  <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-normal">{ind.desc}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/60 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Common innovations:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.innovations.map((inv, i) => (
                        <span key={i} className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold">
                          {inv}{i < ind.innovations.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-rose-400/80 uppercase tracking-wider block">Key Challenge:</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-normal">{ind.challenges}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW KORK SUPPORTS INDUSTRIES */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Structured Project Support
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              A unified system providing core support utilities for all sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-normal">
            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -4, scale: 1.02 }}
              className="shine-card p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-sm rounded-2xl flex items-start gap-3"
            >
              <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-primary dark:text-white text-sm">Patent Search Coordination</h4>
                <p className="text-slate-500 dark:text-slate-450 mt-1 leading-relaxed">Identify relevant prior art and evaluate patentability before investing budget in application packages.</p>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -4, scale: 1.02 }}
              className="shine-card p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-sm rounded-2xl flex items-start gap-3"
            >
              <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-primary dark:text-white text-sm">Patent Illustration Services</h4>
                <p className="text-slate-500 dark:text-slate-450 mt-1 leading-relaxed">Utility, design, plant, trademark, and trade dress figures drafted strictly in accordance with USPTO rules.</p>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -4, scale: 1.02 }}
              className="shine-card p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-sm rounded-2xl flex items-start gap-3"
            >
              <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-primary dark:text-white text-sm">Filing Coordination</h4>
                <p className="text-slate-500 dark:text-slate-450 mt-1 leading-relaxed">Coordinate provisional, non-provisional, design, and international applications through registered practitioners.</p>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -4, scale: 1.02 }}
              className="shine-card p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-sm rounded-2xl flex items-start gap-3"
            >
              <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-primary dark:text-white text-sm">Office Action Response Support</h4>
                <p className="text-slate-500 dark:text-slate-450 mt-1 leading-relaxed">Amend claims, revise drawing sheets, track responses, and coordinate with examiners during prosecution.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INDUSTRY-SPECIFIC INTELLECTUAL PROPERTY SOLUTIONS */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Custom Staged Solutions
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Solutions optimized for your unique stakeholder role.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-normal">
            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6, scale: 1.02 }}
              className="shine-card p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 shadow-sm space-y-2"
            >
              <h4 className="font-bold text-primary dark:text-white text-sm">For Inventors</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Structured guides, worksheets, and search tools designed to translate raw ideas into protected patent assets.</p>
            </motion.div>

            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6, scale: 1.02 }}
              className="shine-card p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 shadow-sm space-y-2"
            >
              <h4 className="font-bold text-primary dark:text-white text-sm">For Startups</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Cost-effective provisional hold applications, trademark lock-ins, and IP audit consultations to back funding pitches.</p>
            </motion.div>

            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6, scale: 1.02 }}
              className="shine-card p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 shadow-sm space-y-2"
            >
              <h4 className="font-bold text-primary dark:text-white text-sm">For Attorneys & Agents</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Outsource time-consuming CAD/vector illustration sheets drafting, drawings amendments, and intake coordination.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom max-w-3xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Industry FAQs
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Detailed answers regarding technical capabilities, cross-sector innovations, and startup support.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm"
              >
                <button suppressHydrationWarning                   onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
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
              Innovation Happens Across Every Industry
            </h2>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Protect your ideas with a structured intellectual property workflow designed to support inventors, startups, businesses, and innovation teams.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact?type=assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
            >
              Start Free Assessment
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact?type=discuss"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border border-white/20 hover:bg-white/20 transform hover:-translate-y-0.5 transition-all"
            >
              Discuss Your Innovation
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
