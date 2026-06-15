'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle,
  HelpCircle as QuestionIcon,
  Layers,
  Users,
  ShieldCheck,
  Eye,
  Zap,
  FolderLock,
  Clock
} from 'lucide-react';
import AssessmentWizard from './components/AssessmentWizard';
import GeneralInquiryForm from './components/GeneralInquiryForm';
import PartnerForm from './components/PartnerForm';
import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';

const faqs = [
  {
    q: 'How quickly will someone contact me?',
    a: 'Most inquiries receive a response within one business day.'
  },
  {
    q: 'Is my invention confidential?',
    a: 'Yes. KORK follows confidentiality-focused workflows and NDA-supported engagement options are available.'
  },
  {
    q: 'Can I request an NDA before discussing my invention?',
    a: 'Yes. NDA information may be requested during project intake or consultation scheduling.'
  },
  {
    q: 'Do I need a completed invention before contacting KORK?',
    a: 'No. Many inventors contact us during the concept, prototype, or development stages.'
  },
  {
    q: 'What services does KORK provide?',
    a: 'KORK supports inventors and businesses through patent search coordination, patent illustrations, trademark support, patent filing coordination, office action support, and intellectual property project management.'
  },
  {
    q: 'Does KORK provide legal advice?',
    a: 'No. Legal advice and legal representation are provided by licensed patent attorneys and registered patent agents.'
  },
  {
    q: 'Can KORK file my patent?',
    a: 'Patent filing services are coordinated through trusted patent attorneys and registered patent agents.'
  },
  {
    q: 'What types of patent drawings do you provide?',
    a: 'We provide utility patent drawings, design patent drawings, plant patent illustrations, trademark illustrations, and trade dress illustrations.'
  },
  {
    q: 'Can I upload sketches or photos instead of formal drawings?',
    a: 'Yes. Sketches, photographs, CAD files, and written descriptions can often be used as starting materials.'
  },
  {
    q: 'Do you work with first-time inventors?',
    a: 'Yes. Many of our clients are navigating the intellectual property process for the first time.'
  },
  {
    q: 'Do you work with startups and businesses?',
    a: 'Yes. We support independent inventors, startups, universities, research institutions, and established businesses.'
  },
  {
    q: 'Do you support international clients?',
    a: 'Yes. KORK supports clients throughout the United States and internationally.'
  },
  {
    q: 'What happens after I submit my information?',
    a: 'Our team reviews your submission, evaluates project requirements, and contacts you regarding next steps or recommended services.'
  },
  {
    q: 'How can I track my project?',
    a: 'Active clients receive access to the KORK Workspace where project information, files, communications, and deliverables can be managed.'
  },
  {
    q: 'Can I use only one service?',
    a: 'Yes. Clients may use individual services or engage KORK for broader intellectual property support.'
  },
  {
    q: 'What if I’m not sure which service I need?',
    a: 'Use the assessment tool on this page and we will help identify the most appropriate pathway for your project.'
  }
];

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const scrollToAssessment = () => {
    const el = document.getElementById('assessment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* SECTION 1 - HERO */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_60%)] opacity-35" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container-custom relative z-10 max-w-4xl text-center space-y-6"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
          >
            Let’s Turn Your Innovation Into Protected <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Intellectual Property™</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-slate-350 leading-relaxed max-w-3xl mx-auto"
          >
            Whether you’re exploring a new invention, preparing a patent application, protecting a brand, or seeking intellectual property support, KORK InventRex is here to help guide your next steps.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-2"
          >
            <button
              suppressHydrationWarning
              onClick={scrollToAssessment}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
            >
              Start Assessment
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2 - INTELLIGENT PROJECT ASSESSMENT */}
      <section id="assessment" className="py-20 bg-slate-100 dark:bg-slate-900/40 relative">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
              Intelligent Project Assessment
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Guide us into the appropriate intake form based on your needs.
            </p>
          </div>
          <AssessmentWizard />
        </div>
      </section>

      {/* SECTION 3 - CONTACT INFORMATION */}
      <section className="py-16 bg-white dark:bg-slate-950 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="container-custom">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <div className="flex flex-col items-center text-center p-5 space-y-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-accent">
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
                <Mail size={20} />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Email</h4>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 group-hover:text-accent transition-colors">contact@korkinventrex.com</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 space-y-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-accent">
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
                <Phone size={20} />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Phone</h4>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 group-hover:text-accent transition-colors">330-353-9850</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 space-y-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-accent">
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
                <MapPin size={20} />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Service Area</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Supporting inventors, startups, businesses, patent professionals, and innovation teams throughout the United States and internationally.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-5 space-y-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-accent">
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
                <Clock size={20} />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Business Hours</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">Monday – Friday<br/>9:00 AM – 6:00 PM (EST)</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 & 5 - GENERAL INQUIRY & PARTNER */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* SECTION 4 - GENERAL INQUIRY */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">Still Have Questions?</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Need assistance with something not covered in our assessment process? Contact us regarding services, partnerships, intellectual property support, or general inquiries.
              </p>
            </div>
            <GeneralInquiryForm />
          </div>

          {/* SECTION 5 - PARTNER WITH KORK */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">Partner With KORK</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                We welcome opportunities to collaborate with intellectual property professionals, law firms, universities, research organizations, and innovation ecosystems.
              </p>
            </div>
            <PartnerForm />
          </div>

        </div>
      </section>

      {/* SECTION 6 - WHY WORK WITH KORK */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container-custom space-y-12">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <h2 className="text-3xl font-black text-primary dark:text-white tracking-tight">
              Why Work With KORK
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: 'One Platform', desc: 'Access multiple intellectual property services through one structured workflow.' },
              { icon: Users, title: 'Trusted Professional Network', desc: 'Work with patent attorneys, patent agents, illustrators, and intellectual property specialists.' },
              { icon: FolderLock, title: 'KORK Workspace', desc: 'Secure project tracking, communication, file management, and deliverable access.' },
              { icon: ShieldCheck, title: 'Confidentiality & Trust', desc: 'Secure handling of intellectual property information with NDA-supported workflows.' },
              { icon: Eye, title: 'Transparency', desc: 'Project visibility through milestones, updates, and centralized communication.' },
              { icon: Zap, title: 'Innovation-Focused', desc: 'Supporting inventors, startups, businesses, and innovation teams throughout the intellectual property lifecycle.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-accent hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent transition-all duration-300 shadow-sm">
                  <item.icon className="text-accent group-hover:text-white transition-colors" size={20} />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-accent transition-colors">{item.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40">
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
                  <div className="px-5 pb-4 pt-1 text-[11px] md:text-xs text-slate-500 dark:text-slate-400 border-t border-slate-50 dark:border-slate-855 leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
