'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Target, Eye, ShieldCheck, CheckCircle2, 
  Layers, Users, Shield, Zap, Search, PenTool, FileText, 
  Briefcase, GraduationCap, Building, ChevronDown, Award
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const differences = [
    { title: 'One Integrated Platform', desc: 'Access multiple intellectual property services through a centralized workflow.', icon: Layers },
    { title: 'Technology-Enabled Processes', desc: 'Track projects, communicate with teams, and access deliverables through the client portal.', icon: Zap },
    { title: 'Professional Network', desc: 'Work with trusted patent attorneys, patent agents, illustrators, and intellectual property specialists.', icon: Users },
    { title: 'Structured Project Management', desc: 'Every project follows documented workflows, milestones, and quality review processes.', icon: Target },
    { title: 'Transparency', desc: 'Clients maintain visibility into project progress, communications, and deliverables.', icon: Eye },
    { title: 'Confidentiality', desc: 'Sensitive intellectual property information is handled through secure processes and NDA-supported workflows.', icon: ShieldCheck }
  ];

  const approach = [
    { title: 'Discover', desc: 'Understand the innovation, business objectives, and intellectual property goals.', icon: Search },
    { title: 'Evaluate', desc: 'Coordinate searches, assessments, and strategic planning.', icon: Target },
    { title: 'Develop', desc: 'Prepare drawings, documentation, and supporting materials.', icon: PenTool },
    { title: 'Protect', desc: 'Coordinate filing and intellectual property protection activities through trusted professionals.', icon: Shield },
    { title: 'Manage', desc: 'Support long-term intellectual property portfolio development and management.', icon: Layers }
  ];

  const whoWeServe = [
    { title: 'Independent Inventors', desc: 'Bringing ideas to market.', icon: Eye },
    { title: 'Startups', desc: 'Building innovation-driven businesses.', icon: Zap },
    { title: 'Small & Mid-Sized Businesses', desc: 'Protecting products, brands, and technologies.', icon: Building },
    { title: 'Patent Attorneys & Agents', desc: 'Providing support services and illustration solutions.', icon: Briefcase },
    { title: 'Universities & Research Institutions', desc: 'Supporting innovation commercialization efforts.', icon: GraduationCap },
    { title: 'Corporate Innovation Teams', desc: 'Managing intellectual property initiatives efficiently.', icon: Users }
  ];

  const values = [
    { title: 'Innovation', desc: 'Innovation is at the heart of everything we do. We are passionate about helping inventors, startups, researchers, and businesses transform ideas into protected intellectual property and bring new technologies to market. We believe every great innovation deserves the opportunity to be protected and realized.' },
    { title: 'Client-Centered Service', desc: 'Every innovation is unique, and so is every client. We focus on understanding individual goals, providing responsive support, and delivering a structured experience designed around the needs of inventors and innovation teams. Our success is measured by the success of our clients.' },
    { title: 'Collaboration', desc: 'Strong intellectual property protection requires collaboration among inventors, technical specialists, patent professionals, and support teams. We foster an environment where communication and teamwork drive better outcomes. Innovation moves forward when the right people work together.' },
    { title: 'Integrity & Transparency', desc: 'Trust is essential when protecting valuable ideas. We operate with honesty, professionalism, and accountability while maintaining clear communication throughout every stage of the process. We believe clients deserve transparency, reliability, and ethical business practices.' },
    { title: 'Confidentiality & Trust', desc: 'Intellectual property begins with ideas, and ideas deserve protection. We are committed to maintaining the confidentiality of client information through secure workflows, responsible information handling practices, and NDA-supported engagement options. Protecting client information is fundamental to protecting innovation.' },
    { title: 'Excellence', desc: 'We strive for excellence in every project, from patent illustrations and documentation support to workflow management and client communications. Continuous improvement drives our commitment to delivering high-quality services and experiences. Excellence is not an outcome; it is a standard we apply every day.' },
    { title: 'Accountability', desc: 'We take ownership of our responsibilities and are committed to delivering on our commitments. Structured workflows, project visibility, and milestone tracking help ensure that projects move forward efficiently and professionally. Accountability creates confidence and builds lasting relationships.' },
    { title: 'Continuous Improvement', desc: 'The intellectual property landscape continues to evolve, and so do we. We continuously evaluate our processes, technologies, and service offerings to improve the experience we provide to innovators and intellectual property professionals. Progress comes from learning, adapting, and improving.' }
  ];

  const faqs = [
    { q: 'Is KORK a law firm?', a: 'No. KORK InventReX is an intellectual property services platform. Legal services and representation are provided by licensed patent attorneys and registered patent agents.' },
    { q: 'Does KORK provide legal advice?', a: 'Legal advice is provided by licensed patent attorneys and registered patent agents. KORK coordinates support services and project workflows.' },
    { q: 'What industries does KORK support?', a: 'We support inventors, startups, businesses, research institutions, and innovation teams across a wide range of industries.' },
    { q: 'Can I use only one service?', a: 'Yes. Clients may engage KORK for individual services or complete lifecycle support.' },
    { q: 'What makes KORK different?', a: 'KORK combines intellectual property support services, professional networks, project management, and technology-enabled workflows into one integrated platform.' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative py-16 md:py-20 bg-white dark:bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#dbeafe_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,#1e3a8a_0%,transparent_70%)] opacity-80 dark:opacity-20" />
        
        <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-5xl text-slate-900 dark:text-white"
          >
            Simplifying the Journey From Idea to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 dark:from-cyan-400 dark:to-blue-400">Intellectual Property™</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl font-medium"
          >
            KORK InventReX was founded with a simple goal: to make intellectual property protection more accessible, organized, and transparent for inventors, startups, businesses, and innovation teams.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-5xl"
          >
            We believe innovators should spend more time building and less time navigating fragmented intellectual property processes. Through a structured platform, professional network, and technology-enabled workflows, KORK helps coordinate the services required to move ideas from concept to protection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link
              href="/client-portal"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-slate-900 dark:text-white bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transform hover:-translate-y-1 transition-all"
            >
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1: Who We Are */}
      <section className="py-20 bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Who We Are</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                KORK InventReX is an intellectual property services platform that helps innovators navigate the patent and trademark journey through coordinated support services, technical illustrations, workflow management, and access to trusted intellectual property professionals.
              </p>
              <p>
                Our platform brings together inventors, businesses, patent professionals, illustrators, and support teams through a centralized workflow designed to improve communication, visibility, and project management.
              </p>
            </div>
          </motion.div>
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80" 
              alt="Team collaborating" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 & 3: Mission & Vision */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="shine-card p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-all duration-300 flex gap-5"
          >
            <div className="w-14 h-14 shrink-0 rounded-xl bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Target size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                To simplify intellectual property protection by providing inventors, startups, businesses, and innovation teams with structured access to intellectual property services, professional networks, and technology-enabled workflows.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="shine-card p-8 rounded-2xl bg-[#0f172a] border border-slate-800 hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 flex gap-5"
          >
            <div className="w-14 h-14 shrink-0 rounded-xl bg-blue-800/20 text-blue-400 flex items-center justify-center">
              <Eye size={28} />
            </div>
            <div className="image-overlay-text">
              <h2 className="text-xl font-bold text-[#ffffff] mb-2">Our Vision</h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                To become a trusted one-stop intellectual property platform that helps innovators transform ideas into protected intellectual property through coordinated services, transparency, and professional collaboration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Why We Exist */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}className="text-center space-y-3 mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why We Exist</h2>
            <p className="text-lg text-slate-600">The intellectual property process can be overwhelming.</p>
          </motion.div>
          
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}whileHover={{ scale: 1.01 }}
            className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm transition-transform"
          >
            <p className="text-base font-semibold text-slate-900 mb-6">Many innovators face challenges such as:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                'Understanding where to begin',
                'Finding qualified professionals',
                'Managing multiple vendors',
                'Coordinating drawings and filings',
                'Tracking deadlines',
                'Organizing documentation',
                'Navigating Office Actions'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold">×</span>
                  </div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-blue-900 font-semibold text-sm">
                KORK was created to reduce this complexity by bringing these services together through one structured platform.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: What Makes KORK Different */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="container-custom">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}className="text-center space-y-3 mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">What Makes KORK Different</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differences.map((diff, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="shine-card p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex flex-col justify-between hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-900 dark:text-blue-400 flex items-center justify-center mb-4">
                  <diff.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{diff.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{diff.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Our Approach */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom max-w-6xl">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}className="text-center space-y-3 mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Approach</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {approach.map((step, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="shine-card p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex flex-col items-center text-center relative hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-all duration-300"
              >
                {idx !== approach.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-2 w-4 h-0.5 bg-slate-200 dark:bg-slate-700 z-10" />
                )}
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 shadow-sm">
                  <step.icon size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Who We Serve */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}className="text-center space-y-3 mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Who We Serve</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoWeServe.map((serve, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="shine-card relative overflow-hidden group p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-all duration-300 cursor-default"
              >
                {/* Ambient Background Splashes */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-all duration-500"></div>
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/20 dark:group-hover:bg-cyan-500/30 transition-all duration-500"></div>

                <div className="relative z-10 w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-[#ffffff] flex items-center justify-center mb-4 transition-colors">
                  <serve.icon size={20} />
                </div>
                <h3 className="relative z-10 text-lg font-bold text-slate-900 mb-2">{serve.title}</h3>
                <p className="relative z-10 text-sm text-slate-600">{serve.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Professional Engagement */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="container-custom max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left side: Content */}
            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}className="flex-1 space-y-4 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 mx-auto">
                <Award size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Professional Engagement
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
                KORK actively participates within the intellectual property community and values collaboration with inventors, patent professionals, industry organizations, and innovation ecosystems.
              </p>
            </motion.div>

            {/* Right side: Card */}
            <motion.div 
              variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}whileHover={{ y: -4, scale: 1.02 }}
              className="w-full md:w-[420px] shrink-0 shine-card p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-blue-400 transition-all"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Building size={20} className="text-blue-600" />
                Memberships & Affiliations
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-700 dark:text-slate-300 leading-snug">National Association of Patent Practitioners (NAPP)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-700 dark:text-slate-300 leading-snug">Additional industry affiliations as applicable</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Our Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}className="text-center max-w-3xl mx-auto space-y-3 mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Core Values</h2>
            <p className="text-base text-slate-600">
              At KORK InventReX, our values guide every client interaction, project workflow, and service we provide. We are committed to helping innovators navigate the intellectual property journey with professionalism, transparency, and confidence.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((val, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="shine-card p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex flex-col justify-between hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment & CTA */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container-custom max-w-4xl text-center space-y-12">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}className="space-y-4"
          >
            <h2 className="text-3xl font-extrabold text-slate-900">Our Commitment</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              KORK InventReX is committed to building a trusted platform where inventors, businesses, and intellectual property professionals can collaborate confidently, protect innovation effectively, and navigate the intellectual property journey with clarity and support.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}whileHover={{ scale: 1.02 }}
            className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-md hover:shadow-xl hover:border-blue-300 transition-all"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Ready to Simplify Your Intellectual Property Journey?
            </h2>
            <p className="text-base text-slate-600 mb-8 max-w-2xl mx-auto">
              Discover how KORK’s structured workflows, professional network, and technology-enabled platform can support your innovation goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact?type=assessment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-bold text-[#ffffff] bg-blue-800 hover:bg-slate-900 shadow-lg transition-transform hover:scale-105"
              >
                Start Assessment
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-bold text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 shadow-sm transition-transform hover:scale-105"
              >
                Schedule Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container-custom max-w-3xl">
          <motion.div 
            variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}className="text-center space-y-3 mb-10"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </motion.div>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  suppressHydrationWarning
                >
                  <span className="text-base font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown 
                    className={`text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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

      {/* FINAL CTA */}
      <section className="relative py-12 bg-blue-950 overflow-hidden text-white border-t border-slate-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#1e40af_0%,transparent_60%)] opacity-40" />
        <motion.div 
          variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-3xl"
        >
          <div className="flex-1 space-y-3 text-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Innovation Deserves Protection
            </h2>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Whether you’re exploring a new idea, preparing a patent application, protecting a brand, or managing an intellectual property portfolio, KORK is here to help simplify the journey.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/client-portal"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border border-white/20 hover:bg-white/20 transform hover:-translate-y-0.5 transition-all"
            >
              Schedule Consultation
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
