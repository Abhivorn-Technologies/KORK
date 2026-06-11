'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Download, 
  FileText, 
  HelpCircle, 
  ArrowRight,
  CheckCircle,
  HelpCircle as QuestionIcon,
  ChevronRight,
  Award
} from 'lucide-react';
import { getBlogs } from '@/lib/firebase';
import { Blog } from '@/types';
import { useToast } from '@/components/common/Toast';
import { formatDate } from '@/utils/helpers';

const learningTopics = [
  { title: 'What Is a Patent?', desc: 'A legal grant by the USPTO giving inventors exclusive property rights to their inventions.', category: 'Patent Basics' },
  { title: 'Utility vs. Design Patents', desc: 'Utility patents protect the way an invention works; design patents protect its ornamental appearance.', category: 'Patent Strategy' },
  { title: 'What Is a Plant Patent?', desc: 'Protects the discovery or asexual reproduction of distinct and new varieties of plants.', category: 'Patent Basics' },
  { title: 'Patent Drawings Explained', desc: 'Required illustrations demonstrating the invention in visual format matching strict USPTO scales.', category: 'Drawings' },
  { title: 'Trademark vs. Patent', desc: 'Trademarks protect branding, logos, and slogans; patents protect utilitarian or design innovations.', category: 'Branding' },
  { title: 'Office Actions Explained', desc: 'Formal examiner rejection letters issued during prosecution, requiring timely response.', category: 'Prosecution' }
];

const inventorGuides = [
  { title: 'First-Time Inventor Guide', detail: 'A comprehensive, step-by-step roadmap explaining searches, drafting, and attorney coordination.' },
  { title: 'Patent Application Checklist', detail: 'All specifications, claims, fee documentation, and files required for USPTO e-filing.' },
  { title: 'Patent Drawing Requirements', detail: 'Line weights, margin scales, stippling methods, and reference numbering standards.' },
  { title: 'Common Filing Mistakes', detail: 'Learn the primary errors that trigger Office Action rejections and administrative re-filing delays.' }
];

const downloads = [
  { name: 'Invention Disclosure Worksheet', format: 'PDF (240 KB)', desc: 'Standard structure worksheets to document technical descriptions, novelty aspects, and target claim scopes.' },
  { name: 'Patent Drawing Submission Guide', format: 'PDF (1.2 MB)', desc: 'Detailed reference booklet outlining border margins, grid sizing, and perspective specifications.' },
  { name: 'Mutual NDA Request Template', format: 'DOCX (85 KB)', desc: 'Standard Non-Disclosure Agreement for inventors looking to execute mutual confidentiality holds.' },
  { name: 'Design Patent Figure Checklist', format: 'PDF (180 KB)', desc: 'Check sheet verifying stippling shading density, shading gradient, and views coverage.' }
];

const faqs = [
  {
    cat: 'Confidentiality',
    q: 'How does KORK protect my invention disclosure materials?',
    a: 'We implement Secure Sockets Layer (SSL) encryption for all database connections, manage restricted portal access keys, and offer mutual Non-Disclosure Agreements (NDA) before detailed sketches or descriptions are exchanged.'
  },
  {
    cat: 'Filing',
    q: 'What is the utility patent pending term?',
    a: 'Once your provisional patent application is submitted to the USPTO, you establish "Patent Pending" status for exactly 12 months. You must file a corresponding non-provisional application before this term expires.'
  },
  {
    cat: 'Drawings',
    q: 'Why are design drawings shaded with dashed lines?',
    a: 'Design patent drawings use solid black lines to illustrate claimed ornamental features, and broken or dashed lines to represent environment elements which are not part of the active design claim.'
  },
  {
    cat: 'Office Actions',
    q: 'What happens if I miss a USPTO response deadline?',
    a: 'Missing a response window (typically 3 months) will cause your application to become abandoned. You can purchase extensions up to 6 months, but prompt action is critical.'
  }
];

export default function ResourcesHubPage() {
  const { success } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getBlogs(3);
        setBlogs(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadBlogs();
  }, []);

  const triggerDownload = (fileName: string) => {
    success('Download Started', `"${fileName}" is preparing. Your download will start momentarily.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_60%)] opacity-35" />

        <div className="container-custom relative z-10 max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-accent text-xs font-bold uppercase tracking-wider">
            KORK Knowledge Hub
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Patent & Trademark <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Learning Center</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-350 leading-relaxed max-w-2xl mx-auto">
            Access inventor worksheets, download drafting checklists, read technical guides, and review USPTO requirements to build a solid IP foundation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="#downloads"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10"
            >
              Access Download Center
              <Download size={16} />
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              Read Strategy Blog
            </Link>
          </div>
        </div>
      </section>

      {/* PATENT LEARNING CENTER */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Intellectual Property Explained
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Clear, bite-sized introductory topics mapping basic patent vocabulary and prosecution steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningTopics.map((topic, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="shine-card p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 space-y-3 hover:border-accent/30 shadow-sm transition-shadow transition-colors"
              >
                <span className="text-[9px] font-extrabold text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-wider">
                  {topic.category}
                </span>
                <h3 className="text-sm font-bold text-primary dark:text-white pt-1">{topic.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{topic.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD CENTER */}
      <section id="downloads" className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="container-custom space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              IP Worksheets & Templates Center
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Download fillable worksheets, agreements templates, and compliance guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {downloads.map((doc, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="shine-card p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex items-start gap-4 shadow-sm"
              >
                <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 text-secondary dark:text-accent flex items-center justify-center">
                  <FileText size={22} />
                </div>
                
                <div className="space-y-2 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-bold text-primary dark:text-white leading-tight">{doc.name}</h3>
                    <span className="text-[9px] text-slate-400 font-mono tracking-tighter shrink-0">{doc.format}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">{doc.desc}</p>
                  <button 
                    onClick={() => triggerDownload(doc.name)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-secondary dark:text-accent hover:text-primary dark:hover:text-white transition-colors"
                  >
                    <Download size={12} />
                    Download File
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INVENTOR GUIDES */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Guides & Reference Checklists
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Actionable reference guides explaining patent drawing scales, standard errors, and filing checklists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inventorGuides.map((guide, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="shine-card flex gap-3.5 p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-sm"
              >
                <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-primary dark:text-white">{guide.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{guide.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BLOG POSTS */}
      {blogs.length > 0 && (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
          <div className="container-custom space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="space-y-3 max-w-xl">
                <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
                  Strategy & Education Articles
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Read the latest operational guidelines, USPTO examiner shifts, and drawings advice.
                </p>
              </div>
              <div>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow"
                >
                  Visit Blogs Hub
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((b, idx) => (
                <motion.div 
                  key={b.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="shine-card group flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-sm hover:shadow-lg hover:border-accent/30 transition-shadow transition-colors duration-300"
                >
                  <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <img src={b.thumbnail} alt={b.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">
                      {b.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 block font-mono">{formatDate(b.createdAt)}</span>
                      <h3 className="text-sm font-bold text-primary dark:text-white group-hover:text-secondary dark:group-hover:text-accent transition-colors line-clamp-2">
                        {b.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-normal line-clamp-2">
                        {b.excerpt}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-50 dark:border-slate-900">
                      <Link 
                        href={`/blogs/${b.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary dark:text-accent"
                      >
                        Read Article <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GENERAL FAQ HUB */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container-custom max-w-3xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Resources Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Clear responses regarding security protocols, pending terms, drawing shading, and response periods.
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
                    <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-wider shrink-0 font-extrabold">{faq.cat}</span>
                    <span>{faq.q}</span>
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
              Looking for a Specific Guide?
            </h2>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Contact our applications team to request custom templates, coordinate drawing guides, or schedule an initial filing assessment.
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
              href="/contact?type=meeting"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border border-white/20 hover:bg-white/20 transform hover:-translate-y-0.5 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
