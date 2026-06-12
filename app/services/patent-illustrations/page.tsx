'use client';

import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Layers, 
  Grid, 
  Bookmark, 
  HelpCircle as QuestionIcon,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Eye
} from 'lucide-react';

const illustrationServices = [
  {
    icon: Layers,
    title: 'Utility Patent Drawings',
    desc: 'B&W line drawings prepared to demonstrate the function, mechanics, structure, or electrical circuitry of your invention.',
    examples: ['Mechanical Assemblies', 'Electrical Circuits & Blocks', 'Medical Device Configurations', 'Consumer Product Assemblies', 'Flowcharts & Software Processes']
  },
  {
    icon: Grid,
    title: 'Design Patent Drawings',
    desc: 'High-precision perspective and orthographic drawings featuring precise line weights, stippling, and surface shading to protect visual appearance.',
    examples: ['Product Contours & Shapes', 'Surface Shading & Texture', 'Environmental (dashed) Lines', 'UI/UX Screengrabs & Icons', 'Orthographic Projection Views']
  },
  {
    icon: Sparkles,
    title: 'Plant Patent Illustrations',
    desc: 'Botanical diagrams and color photographic figures documenting novel plant varieties, growth stages, and distinguishing features.',
    examples: ['Color Photographic Sheets', 'Botanical Line Art', 'Microscopic Anatomy Details', 'Growth Cycle Comparisons']
  },
  {
    icon: Bookmark,
    title: 'Trademark Illustrations',
    desc: 'Clear visual representations and specimens of logos, stylized marks, and composite brand marks required for USPTO trademark applications.',
    examples: ['Logo Vector Drawings', 'Composite Word & Logo Marks', 'Stylized Letterform Specimens', 'Trade Dress Exhibits']
  },
  {
    icon: FileText,
    title: 'Trade Dress Illustrations',
    desc: 'Detailed drawings illustrating the unique non-functional packaging, product configurations, or shape of your brand assets.',
    examples: ['Packaging Box Geometry', 'Bottle & Enclosure Outlines', 'Retail Display Configurations', 'Trade Dress Outlines']
  }
];

const processSteps = [
  { step: '01', title: 'Project Intake', desc: 'Submit your rough sketches, photos, CAD files, or reference images through the upload center.' },
  { step: '02', title: 'File Review', desc: 'Our technical illustrators review your inputs to identify required views, scales, and line styles.' },
  { step: '03', title: 'Illustration Development', desc: 'Our draftsmen prepare vector figures conforming strictly to USPTO margin and font specifications.' },
  { step: '04', title: 'Quality Review', desc: 'A senior editor checks every figure against the MPEP guidelines to ensure compliance.' },
  { step: '05', title: 'Client Revisions', desc: 'Review draft sheets in your secure portal. Request amendments and updates directly on the dashboard.' },
  { step: '06', title: 'Final Delivery', desc: 'Download print-ready, scale-exact PDF sheets matching USPTO e-filing requirements.' }
];

const faqs = [
  {
    q: 'What file formats can be submitted for drawing inputs?',
    a: 'We accept sketches, digital photographs, 3D CAD files (STEP, IGES, SolidWorks, DWG, etc.), rough PDFs, and handwritten technical documents.'
  },
  {
    q: 'Can existing patent drawings be revised?',
    a: 'Yes, we regularly update and revise drawings to satisfy USPTO objections or office action requests.'
  },
  {
    q: 'Are revisions included in the pricing?',
    a: 'Standard revision procedures are built into our project workflows. Minor corrections to match your initial brief are included.'
  },
  {
    q: 'Can these illustrations support international patent filings?',
    a: 'Yes. Our figures are prepared to satisfy both USPTO and PCT (Patent Cooperation Treaty) standards, making them suitable for international filings at WIPO, EPO, JPO, and other foreign patent offices.'
  }
];

const galleries = [
  { title: 'Utility Figure Example', desc: 'Exploded mechanical assembly showing reference labels.', category: 'Utility Patent', img: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500&auto=format&fit=crop&q=80' },
  { title: 'Design Perspective Example', desc: 'Detailed surface shading demonstrating product contours.', category: 'Design Patent', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80' },
  { title: 'Trademark Specimen Example', desc: 'Composite trademark layout matching USPTO rules.', category: 'Trademark', img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&auto=format&fit=crop&q=80' }
];

export default function PatentIllustrationsPage() {
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
            USPTO-Compliant Drafting
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-5xl"
          >
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Intellectual Property</span> Drawings
          </motion.h1>
          
          <p className="text-base text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
            Accurate illustrations are an essential component of many intellectual property filings. KORK InventReX provides technical illustration services prepared to support utility, design, plant, trademark, and trade dress applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact?type=drawing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Request Drawing Support
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact?type=assessment"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border-2 border-white/20 hover:bg-white/20 shadow-sm transform hover:-translate-y-1 transition-all"
            >
              Start Free Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* DRAWING CATEGORIES */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Drawing Services & Capabilities
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Our draftsmen utilize advanced vector tools to compile professional sheets conforming to MPEP standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {illustrationServices.map((service, index) => (
              <div 
                key={index} 
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 hover:border-accent/20 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 text-secondary dark:text-accent">
                    <service.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-primary dark:text-white">{service.title}</h3>
                  <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-normal">{service.desc}</p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 mt-6 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Scope of drawings:</span>
                  <div className="flex flex-wrap gap-2">
                    {service.examples.map((ex, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-semibold shadow-sm">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE GALLERY MOCK */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Sample Illustration Gallery
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Clean line-weights, shading densities, and drawing margins prepared by our network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleries.map((gal, idx) => (
              <div 
                key={idx} 
                className="overflow-hidden rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900">
                  <img src={gal.img} alt={gal.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded">
                    {gal.category}
                  </span>
                </div>
                <div className="p-5 space-y-1">
                  <h4 className="text-xs font-bold text-primary dark:text-white">{gal.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{gal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Our Drafting Workflow
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Six stages designed to compile professional drawings with zero administrative delay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processSteps.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <div className="text-2xl font-black text-accent/50 font-mono mt-1 shrink-0">{item.step}</div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-primary dark:text-white">{item.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom max-w-3xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Drawing Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Detailed answers regarding reference formats, revision procedures, and compliant exports.
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
              Need Professional Patent Drawings?
            </h2>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Submit your rough sketch files, photographs, CAD details, or reference numbers through our portal, and we'll draft compliance-ready sheets.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact?type=drawing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Request Drawing Support
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact?type=assessment"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border border-white/20 hover:bg-white/20 shadow-sm transform hover:-translate-y-1 transition-all"
            >
              Start Project Assessment
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
