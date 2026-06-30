'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const HeroAnimation = dynamic(() => import('../components/HeroAnimation').then((mod) => mod.HeroAnimation), { ssr: false });
import { 
  FileText, Search, Scale, Lock, Users, TrendingUp, CheckCircle,
  HelpCircle, ArrowRight, User, LayoutTemplate, ShieldCheck, 
  Eye, Briefcase, Lightbulb, PenTool, Folders
} from 'lucide-react';
import { fadeUpReveal } from '@/lib/animations';

export default function HomePage() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const challengePoints = [
    'Unsure where to begin?',
    'Need guidance through the patent process?',
    'Looking for trusted patent professionals?',
    'Need USPTO-compliant patent drawings?',
    'Managing multiple vendors and deadlines?',
    'Seeking a single point of contact?'
  ];

  const serviceFlow = [
    { title: 'Inventor Services', desc: 'Idea evaluation, invention documentation, and patent readiness support.', icon: Lightbulb },
    { title: 'Patent Illustrations', desc: 'USPTO-compliant utility, design, plant patent, trademark, and trade dress illustrations.', icon: PenTool },
    { title: 'Patent Filing Services', desc: 'Coordinated through licensed U.S. patent attorneys and registered patent agents.', icon: Scale },
    { title: 'Patent Prosecution Support', desc: 'Office action coordination, drawing updates, and filing management.', icon: FileText },
    { title: 'IP Portfolio Management', desc: 'Ongoing support for intellectual property assets and future filings.', icon: Folders }
  ];

  const servicesOverview = [
    {
      title: 'Inventor Services',
      items: ['Patent Search Coordination', 'Invention Documentation Support', 'Patent Readiness Assessment', 'Innovation Review']
    },
    {
      title: 'Patent Illustration Services',
      items: ['Utility Patent Drawings', 'Design Patent Drawings', 'Plant Patent Illustrations', 'Trademark Illustrations', 'Trade Dress Illustrations']
    },
    {
      title: 'Patent Filing Services',
      items: ['Provisional Patent Applications', 'Utility Patent Applications', 'Design Patent Applications', 'Plant Patent Applications', 'PCT Applications']
    },
    {
      title: 'Patent Prosecution Services',
      items: ['Office Action Coordination', 'Amendment Support', 'Drawing Revisions', 'Filing Management']
    }
  ];

  const whyKorkCards = [
    { title: 'One Point of Contact', desc: 'Manage your intellectual property journey through a centralized service platform.', icon: User },
    { title: 'Structured Workflow', desc: 'A systematic process designed to improve communication, efficiency, and transparency.', icon: LayoutTemplate },
    { title: 'Patent Professional Network', desc: 'Access to trusted patent attorneys and registered patent agents.', icon: Users },
    { title: 'USPTO-Compliant Illustrations', desc: 'Professionally prepared patent figures developed to meet filing requirements.', icon: ShieldCheck },
    { title: 'Confidential Process', desc: 'Secure handling of invention information and NDA-supported engagement options.', icon: Lock },
    { title: 'Project Visibility', desc: 'Stay informed through project tracking, status updates, and client portal access.', icon: Eye },
    { title: 'Faster Coordination', desc: 'Reduce the complexity of managing multiple service providers independently.', icon: TrendingUp },
    { title: 'Long-Term Partnership', desc: 'Support beyond filing, including prosecution support and portfolio management.', icon: Briefcase }
  ];

  const industries = [
    'Medical Devices', 'Consumer Products', 'Mechanical Engineering',
    'Manufacturing', 'Electrical Systems', 'Software & Technology',
    'Agriculture', 'University Research', 'Startups & Entrepreneurs'
  ];

  const portalFeatures = [
    'Project Tracking', 'Secure File Upload', 'Deliverable Access',
    'Status Updates', 'Secure Messaging', 'Timeline Visibility', 'Support Requests'
  ];

  const faqs = [
    { q: 'What services does KORK InventRex provide?', a: 'KORK InventRex provides patent illustration services, inventor support services, patent filing coordination, office action support, and intellectual property workflow management through a network of patent professionals.' },
    { q: 'Does KORK InventRex provide legal advice?', a: 'No. Legal advice and patent representation are provided by licensed patent attorneys and registered patent agents. KORK InventRex coordinates and supports the overall patent process.' },
    { q: 'Can you help first-time inventors?', a: 'Yes. Our services are designed to support inventors at every stage of the intellectual property journey, including invention documentation, patent searches, illustrations, and filing coordination.' },
    { q: 'What types of patent drawings do you prepare?', a: 'We prepare utility patent drawings, design patent drawings, plant patent illustrations, trademark illustrations, and trade dress illustrations.' },
    { q: 'How do I get started?', a: 'You can submit your invention details through our intake process or schedule a consultation with our team.' },
    { q: 'Is my invention confidential?', a: 'Yes. We maintain strict confidentiality procedures and can provide NDA options before detailed invention discussions.' },
    { q: 'Do I need patent drawings before filing?', a: 'Many patent applications require drawings that clearly illustrate the invention. Proper illustrations can improve clarity and support the patent application process.' },
    { q: 'Can KORK help with patent filing?', a: 'Yes. KORK coordinates filing services through licensed U.S. patent attorneys and registered patent agents within our professional network.' }
  ];

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. HERO SECTION (Background completely intact per request) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-[#020617] text-[#ffffff]">
        
        {/* Subtle bright background gradient based on active index */}
        <motion.div 
          className="absolute inset-0 opacity-[0.15] mix-blend-screen"
          animate={{
            background: activeServiceIndex === 0 ? 'radial-gradient(circle at center, #06b6d4 0%, transparent 60%)' :
                        activeServiceIndex === 1 ? 'radial-gradient(circle at center, #10b981 0%, transparent 60%)' :
                        activeServiceIndex === 2 ? 'radial-gradient(circle at center, #d946ef 0%, transparent 60%)' :
                        'radial-gradient(circle at center, #f59e0b 0%, transparent 60%)'
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* 3D Animated Hero Graphics - Absolute Background Core */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.85] mix-blend-screen pointer-events-none z-0">
          <HeroAnimation activeIndex={activeServiceIndex} />
        </div>

        <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center space-y-8 mt-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/10 text-[#ffffff] text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <motion.div 
              className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]"
              animate={{
                backgroundColor: activeServiceIndex === 0 ? '#67e8f9' :
                                 activeServiceIndex === 1 ? '#6ee7b7' :
                                 activeServiceIndex === 2 ? '#f0abfc' :
                                 '#fcd34d',
                color: activeServiceIndex === 0 ? '#67e8f9' :
                       activeServiceIndex === 1 ? '#6ee7b7' :
                       activeServiceIndex === 2 ? '#f0abfc' :
                       '#fcd34d'
              }}
              transition={{ duration: 1 }}
            />
            Integrated IP & Patent Support Platform
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-[1.05] text-[#ffffff] max-w-5xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          >
            From Idea to<br />
            <motion.span 
              className="inline-block"
              animate={{
                color: activeServiceIndex === 0 ? '#67e8f9' :
                       activeServiceIndex === 1 ? '#6ee7b7' :
                       activeServiceIndex === 2 ? '#f0abfc' :
                       '#fcd34d'
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              Intellectual Property™
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-2xl leading-relaxed max-w-4xl drop-shadow-[0_5px_10px_rgba(0,0,0,0.9)] font-semibold"
          >
            <motion.div
              animate={{
                color: activeServiceIndex === 0 ? '#67e8f9' :
                       activeServiceIndex === 1 ? '#6ee7b7' :
                       activeServiceIndex === 2 ? '#f0abfc' :
                       '#fcd34d'
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              Transforming innovative ideas into protected intellectual property through patent illustrations, patent filing support, and a trusted network of intellectual property professionals.
            </motion.div>
          </motion.div>

          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg text-slate-300 max-w-4xl font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Whether you are an inventor, entrepreneur, startup, researcher, or established business, KORK InventRex provides a streamlined pathway from invention disclosure to intellectual property protection through coordinated patent services and technical expertise.
          </motion.p> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 pt-8 w-full sm:w-auto"
          >
            <Link
              href="/contact?type=meeting"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold text-[#ffffff] border backdrop-blur-lg shadow-2xl transition-all duration-700 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto ${
                activeServiceIndex === 0 ? 'bg-cyan-500/20 border-cyan-400/50 hover:bg-cyan-500/30 shadow-cyan-500/20' :
                activeServiceIndex === 1 ? 'bg-emerald-500/20 border-emerald-400/50 hover:bg-emerald-500/30 shadow-emerald-500/20' :
                activeServiceIndex === 2 ? 'bg-fuchsia-500/20 border-fuchsia-400/50 hover:bg-fuchsia-500/30 shadow-fuchsia-500/20' :
                'bg-amber-500/20 border-amber-400/50 hover:bg-amber-500/30 shadow-amber-500/20'
              }`}
            >
              Schedule a Consultation
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/client-portal"
              className={`inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-bold bg-[#ffffff] shadow-xl transition-all duration-700 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto ${
                activeServiceIndex === 0 ? 'text-cyan-950 hover:bg-cyan-50 hover:shadow-cyan-500/20' :
                activeServiceIndex === 1 ? 'text-emerald-950 hover:bg-emerald-50 hover:shadow-emerald-500/20' :
                activeServiceIndex === 2 ? 'text-fuchsia-950 hover:bg-fuchsia-50 hover:shadow-fuchsia-500/20' :
                'text-amber-950 hover:bg-amber-50 hover:shadow-amber-500/20'
              }`}
            >
              Submit Your Invention
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. THE CHALLENGE FACING INVENTORS */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Text */}
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center space-y-6 text-left"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-wider">
                The Challenge Facing Inventors
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary dark:text-white tracking-tight leading-tight">
                Innovation Shouldn’t Be Complicated
              </h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Many inventors have groundbreaking ideas but struggle to navigate the complex patent process. Finding reliable professionals, understanding filing requirements, preparing compliant drawings, and managing deadlines often become overwhelming.
            </p>
            
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-l-4 border-rose-500 shadow-sm mt-4">
              <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-semibold">
                At KORK InventRex, we simplify the process by providing one centralized platform where inventors can access coordinated intellectual property services and professional support.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {challengePoints.map((point, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -4, scale: 1.02 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="shine-card p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex items-start gap-3 hover:shadow-xl hover:border-rose-500/30 dark:hover:border-rose-500/30 transition-all duration-300"
              >
                <div className="h-8 w-8 shrink-0 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center mt-0.5">
                  <HelpCircle size={16} />
                </div>
                <span className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  {point}
                </span>
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>

      {/* 3. THE KORK SOLUTION */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/50 dark:border-slate-850 transition-colors duration-300">
        <div className="container-custom space-y-10">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary dark:text-accent text-xs font-bold uppercase tracking-wider border border-secondary/20">
              The KORK Solution
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              One Platform. Complete Intellectual Property Support.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              KORK InventRex brings together inventors, patent professionals, technical illustrators, and support services into a structured workflow designed to simplify the journey from concept to protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {serviceFlow.map((flow, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6, scale: 1.04 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="shine-card flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <flow.icon size={24} />
                </div>
                <h3 className="text-sm font-bold text-primary dark:text-white mb-2">{flow.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{flow.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES OVERVIEW */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom space-y-10">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
              Services Overview
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Comprehensive Intellectual Property Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesOverview.map((category, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="shine-card bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-primary dark:text-white mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY KORK */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e3a8a_0%,transparent_70%)] opacity-40" />
        <div className="container-custom relative z-10 space-y-10">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/20">
              Why KORK
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Why Inventors Choose KORK InventRex
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyKorkCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6, scale: 1.03 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:border-blue-400/50 transition-all duration-300"
              >
                <card.icon className="text-accent mb-4" size={24} />
                <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIES WE SUPPORT */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom space-y-10">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Supporting Innovation Across Industries
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Our services support inventors, startups, research organizations, and businesses operating across a broad range of technologies and industries.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
            {industries.map((ind, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -3, scale: 1.05 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 cursor-pointer"
              >
                {ind}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROFESSIONAL AFFILIATIONS & CLIENT PORTAL PREVIEW */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/50 dark:border-slate-850 transition-colors duration-300">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Affiliations */}
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              Professional Affiliations
            </div>
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Professional Engagement
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              KORK InventRex actively participates within the intellectual property community and works to build relationships that support inventors and intellectual property professionals. Memberships and professional affiliations help us remain connected to evolving industry practices and professional networks.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-8 pt-6">
              <div className="flex flex-col gap-2">
                <Image 
                  src="/napp_logo.jpg" 
                  alt="NAPP member logo reference" 
                  width={140} 
                  height={56} 
                  className="h-14 w-auto object-contain dark:brightness-125" 
                />
                <span className="text-[10px] text-slate-500 font-bold uppercase">National Association of Patent Practitioners</span>
              </div>
              <div className="flex flex-col gap-2">
                <Image 
                  src="/ipo_logo.jpg" 
                  alt="IPO logo reference" 
                  width={120} 
                  height={48} 
                  className="h-12 w-auto object-contain dark:brightness-125" 
                />
                <span className="text-[10px] text-slate-500 font-bold uppercase mt-1">Intellectual Property Owners Association</span>
              </div>
            </div>
          </motion.div>

          {/* Client Portal Preview */}
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" whileHover={{ y: -6 }} viewport={{ once: true, margin: "-100px" }}
            className="shine-card space-y-6 bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-secondary dark:text-accent text-xs font-bold uppercase tracking-wider border border-accent/20">
              Client Portal Preview
            </div>
            <h2 className="text-2xl font-extrabold text-primary dark:text-white tracking-tight">
              Stay Connected Throughout Your Project
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our secure client portal provides centralized access to project information, communications, files, and deliverables.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {portalFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <CheckCircle size={16} className="text-accent shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 8. FINAL CALL-TO-ACTION */}
      <section className="relative py-16 bg-blue-950 overflow-hidden text-white border-t border-slate-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#1e40af_0%,transparent_60%)] opacity-40" />
        <motion.div 
          variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 bg-white/5 backdrop-blur-sm border border-white/10 p-10 md:p-14 rounded-3xl"
        >
          <div className="flex-1 space-y-4 text-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Ready to Protect Your Innovation?
            </h2>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Whether you’re exploring a new invention, preparing a patent application, protecting a brand, or seeking intellectual property support, KORK’s guided assessment can help identify the right pathway for your project.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact?type=assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
            >
              Start Assessment
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact?type=meeting"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border border-white/20 hover:bg-white/20 transform hover:-translate-y-0.5 transition-all"
            >
              Schedule Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 9. HOME PAGE FAQs */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom max-w-4xl space-y-10">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-3"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 transition-colors shadow-sm"
              >
                <button
                  suppressHydrationWarning
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-base font-bold text-slate-900 dark:text-white">{faq.q}</span>
                  <span className={`shrink-0 text-xl font-mono text-slate-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                
                {activeFaq === index && (
                  <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
