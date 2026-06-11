'use client';

import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart, Award, ArrowUpRight, ArrowRight, Scale, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'IP Integrity & Confidentiality',
      description: 'Your ideas are secure. Every project is backed by a strict NDA, stored on encrypted networks, and managed with absolute discretion.'
    },
    {
      icon: Heart,
      title: 'Coordinated Client Portal',
      description: 'We consolidate communications, file uploads, and drawing revisions inside a single secure sandbox workspace.'
    },
    {
      icon: Target,
      title: 'USPTO MPEP Compliance',
      description: 'Our technical drawings are drafted in strict accordance with the USPTO Manual of Patent Examining Procedure standards.'
    },
    {
      icon: Scale,
      title: 'Attorney Network Integration',
      description: 'We connect inventors with independent, registered patent attorneys and agents to facilitate drafting, filing, and prosecution.'
    }
  ];

  const leadership = [
    {
      name: 'Er. A. K. Ranganathan',
      role: 'Founder & Chief IP Strategist',
      bio: 'Over 25 years of experience coordinating patent searches, technical specifications, and inventor portfolios.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Mrs. Elena Rostova',
      role: 'Head of Patent Drawings (CAD & Illustration)',
      bio: 'Expert technical draftsperson specialized in USPTO-compliant utility, design, and complex mechanical assembly illustrations.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Mr. Suresh Kumar',
      role: 'Director of Platform Operations',
      bio: 'Manages client portal coordination, NDA integrations, database staging, and independent attorney network relations.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      linkedin: 'https://linkedin.com'
    }
  ];

  const timeline = [
    {
      year: '2011',
      title: 'Deskside Drafting Founding',
      description: 'KORK InventReX was founded in Coimbatore, India as a specialized mechanical and technical CAD drawing service desk.'
    },
    {
      year: '2016',
      title: 'Prior Art Search Coordination',
      description: 'Expanded capabilities to coordinate international prior art searches and comprehensive patentability reviews.'
    },
    {
      year: '2020',
      title: 'Secure Portal Development',
      description: 'Launched our proprietary, encrypted client workspace for safe, remote inventor-practitioner collaboration.'
    },
    {
      year: '2024',
      title: 'Attorney Network Expansion',
      description: 'Established formal coordination guidelines with independent registered USPTO patent attorneys and agents.'
    },
    {
      year: '2026',
      title: 'Launch of Unified Platform',
      description: 'Rebranded into a comprehensive, end-to-end IP platform coordinating search, illustrations, and filing support.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* Page Banner */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_60%)] opacity-35" />
        <div className="container-custom relative z-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            About KORK InventReX
          </h1>
          <p className="text-lg text-slate-350 max-w-2xl mx-auto">
            Discover the values, legacy, and experts behind our coordinated intellectual property platform.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-secondary dark:text-accent text-xs font-bold uppercase tracking-wider">
              Our Legacy
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight leading-tight">
              Pioneering Coordinated IP Excellence
            </h2>
            <div className="space-y-4 text-slate-650 dark:text-slate-400 leading-relaxed text-sm md:text-base">
              <p>
                Founded in 2011, KORK InventReX emerged with a single focus: to bridge the operational gap between creative inventors, technical illustrators, and patent attorneys. We realized that many rejections and delays occur simply because these three entities do not coordinate.
              </p>
              <p>
                From our initial roots in precise mechanical assembly CAD drawings, we have grown into a secure intellectual property platform. We coordinate prior art research, deliver USPTO MPEP-compliant patent illustrations, and facilitate filing support through our verified network of registered patent professionals.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl relative">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80"
                alt="Technical drawing tablet with blueprint lines"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
            {/* Visual float card */}
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-secondary to-accent text-white p-6 rounded-xl shadow-lg max-w-xs border border-blue-500/20 text-left">
              <span className="text-3xl font-black">15+</span>
              <h4 className="text-sm font-bold mt-1">Years of Drafting Experience</h4>
              <p className="text-[11px] text-blue-100 mt-1 leading-normal">Preparing drawings accepted by examiners across US and international registries.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Mission / Vision Cards */}
      <section className="py-20 bg-light-gray dark:bg-slate-900 transition-colors duration-300">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="shine-card bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-card hover:border-accent/30 flex gap-6 items-start transition-shadow transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-secondary dark:text-accent flex items-center justify-center shrink-0">
                <Target size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary dark:text-white">Our Mission</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  To democratize access to high-quality patent support services. We strive to provide inventors and startups with secure tools, compliant drawings, and expert coordination to minimize the cost of protecting their ideas.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="shine-card bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-card hover:border-accent/30 flex gap-6 items-start transition-shadow transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-accent flex items-center justify-center shrink-0">
                <Eye size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary dark:text-white">Our Vision</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  To build the most secure and intuitive digital workspace coordinating inventors and patent attorneys globally. We aim to reduce USPTO objection rates for drawings to absolute zero.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">Our Core Values</h2>
            <p className="text-slate-650 dark:text-slate-450">
              The foundational principles guiding every draft, database search, and attorney alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {values.map((v, idx) => (
              <motion.div 
                key={v.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="shine-card p-6 rounded-2xl bg-light-gray dark:bg-slate-900 border border-slate-100 dark:border-slate-850 space-y-3 hover:border-accent/30 transition-shadow transition-colors shadow-sm"
              >
                <div className="h-10 w-10 rounded-lg bg-secondary/10 dark:bg-accent/10 text-secondary dark:text-accent flex items-center justify-center">
                  <v.icon size={20} />
                </div>
                <h3 className="text-base font-bold text-primary dark:text-white">{v.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline component */}
      <section className="py-24 bg-light-gray dark:bg-slate-900 transition-colors duration-300">
        <div className="container-custom space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">Corporate History Timeline</h2>
            <p className="text-slate-650 dark:text-slate-450">
              A brief review of key developmental milestones since our inception.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative pl-6 md:pl-0">
            {/* Center line (only on desktop) */}
            <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-0.5 bg-slate-250 dark:bg-slate-850 -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Bullet marker */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-white dark:border-slate-900 shadow-md -translate-x-1/2 z-10" />

                  {/* Spacer for structure */}
                  <div className="w-full md:w-1/2 px-8" />
                  
                  {/* Content card */}
                  <div className="w-full md:w-1/2 px-8 text-left">
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-card">
                      <span className="text-xs font-bold text-accent font-mono uppercase tracking-wider">{item.year}</span>
                      <h3 className="text-lg font-bold text-primary dark:text-white mt-1">{item.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Grid */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">Our Leadership Team</h2>
            <p className="text-slate-650 dark:text-slate-450">
              Meet the CAD illustrators, operational specialists, and network coordinators powering KORK.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="shine-card group flex flex-col rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-950 shadow-card hover:shadow-card-hover hover:border-accent/30 transition-shadow transition-colors text-left"
              >
                <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-slate-900 text-xs font-bold shadow hover:bg-slate-100"
                    >
                      Connect on LinkedIn
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-primary dark:text-white leading-tight">
                      {member.name}
                    </h3>
                    <span className="text-xs text-accent font-bold uppercase tracking-wider block mt-1">
                      {member.role}
                    </span>
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed mt-3">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
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
              Get started by scheduling an initial consultation or submitting your idea for a prior art search review under a secure NDA.
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
