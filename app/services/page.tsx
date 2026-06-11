'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Scale, 
  CheckCircle, 
  ArrowRight, 
  Send,
  Workflow,
  Sparkles,
  Lock,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { saveEnquiry } from '@/lib/firebase';
import { useToast } from '@/components/common/Toast';

interface ServiceDetail {
  id: string;
  title: string;
  icon: any;
  tagline: string;
  description: string;
  benefits: string[];
  process: string[];
  features: string[];
}

const servicesData: ServiceDetail[] = [
  {
    id: 'inventor-services',
    title: 'Inventor Services & Roadmaps',
    icon: Search,
    tagline: 'Prior art searches, patentability assessments, and concept alignment.',
    description: 'We coordinate intensive global database searches to find prior art before you spend on official filing. Our team organizes patentability reports to map out the strength, novelty, and commercial viability of your design.',
    benefits: [
      'Identifies potential filing bottlenecks before drafting begins',
      'Provides US and international patent database comparisons',
      'Translates technical concepts into clear innovation categories',
      'Establishes a solid baseline for drafting attorneys to write claims'
    ],
    process: [
      'Intake & Confidentiality Assurance (NDA)',
      'Global Patent Database Screening',
      'Non-Patent Literature Search',
      'Patentability Report & Consultation'
    ],
    features: ['US & International Patents', 'Literature & Publications', 'Novelty Analysis', '45-Min Attorney-Prep Session']
  },
  {
    id: 'patent-illustrations',
    title: 'Patent Illustration Services',
    icon: FileText,
    tagline: 'USPTO-compliant utility, design, plant, and trademark drawings.',
    description: 'Our specialized CAD illustrators prepare scale-exact black and white line drawings or design shading sheets. We format all drawings strictly to the guidelines defined in the USPTO MPEP manual to prevent objections.',
    benefits: [
      'Reduces risk of examiner objections to absolute zero',
      'Supports utility drawing schematics and assembly callouts',
      'Features design patent shading, perspective views, and line weights',
      'Delivers high-resolution vector PDFs ready for direct submission'
    ],
    process: [
      'Blueprint / Sketch Import & Review',
      'Draft Line Drawing Preparation',
      'Surface Shading & Perspectives Edit',
      'MPEP Compliance Check & Scale Audit'
    ],
    features: ['Utility Drawings', 'Design Patent Shading', 'Exploded Assemblies', 'Flowcharts & Schematics']
  },
  {
    id: 'patent-filing-support',
    title: 'Patent Filing & Prosecution',
    icon: Scale,
    tagline: 'Filing coordination, office action support, and independent attorney matchmaking.',
    description: 'We coordinate with independent registered patent attorneys and agents to compile, draft, and submit provisional, non-provisional, design, or PCT applications. All filings are tracked inside your client dashboard.',
    benefits: [
      'Direct coordination with registered USPTO practitioners',
      'Simplifies provisional and non-provisional drafting paths',
      'Expedites response documentation for examiner Office Actions',
      'Maintains complete portfolio tracking and renewal updates'
    ],
    process: [
      'Filing Strategy & Matching',
      'Draft Compilation & Client Review',
      'Official Submission Tracking',
      'Office Action Response & Revisions'
    ],
    features: ['Provisional Applications', 'Non-Provisional Utility', 'Design Patents', 'Office Action Drafting']
  }
];

export default function ServicesPage() {
  const { success, error: toastError } = useToast();
  const [activeTab, setActiveTab] = useState<string>('inventor-services');
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    servicePillar: 'inventor-services',
    message: '',
    ndaRequired: true
  });

  const currentService = servicesData.find(s => s.id === activeTab) || servicesData[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toastError('Validation Failed', 'Please fill in name, email, and project details.');
      return;
    }
    setLoading(true);

    try {
      await saveEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: `[Services Page: ${formData.servicePillar}] [NDA Required: ${formData.ndaRequired}] ${formData.message}`
      });

      success('Consultation Requested!', 'Our coordinator will contact you under secure NDA guidelines.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        servicePillar: 'inventor-services',
        message: '',
        ndaRequired: true
      });
    } catch (err) {
      console.error(err);
      toastError('Submission Error', 'Failed to request consultation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* Banner */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_60%)] opacity-35" />
        <div className="container-custom relative z-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Our Service Pillars
          </h1>
          <p className="text-lg text-slate-350 max-w-2xl mx-auto">
            Democratizing patent protection with coordinated searches, high-precision drawings, and filing support.
          </p>
        </div>
      </section>

      {/* Comparison Section (Without vs With KORK) */}
      <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
        <div className="container-custom space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">Pipeline Analysis</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white tracking-tight">
              Without Coordination vs. With KORK
            </h2>
            <p className="text-sm text-slate-555 dark:text-slate-400">
              See how integrating your prior art search, CAD drawing drafting, and filing representation saves time and money.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Without Coordination */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="shine-card bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-8 space-y-6 text-left"
            >
              <div className="flex items-center gap-2 text-rose-500 font-bold">
                <XCircle size={22} />
                <span>The Legacy Fragmented Pipeline</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-2.5 items-start">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <p><strong>Separated Providers:</strong> You hire one desk to search, another illustrator to draw, and an attorney to draft. They do not talk to each other.</p>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <p><strong>Objections & Rework:</strong> Drawings drafted without practitioner input fail MPEP guidelines, triggering expensive USPTO objections and revisions.</p>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <p><strong>Escalated Costs:</strong> Inconsistencies force attorneys to rewrite specifications, resulting in duplicate hourly bills and missed priority deadlines.</p>
                </li>
              </ul>
            </motion.div>

            {/* With KORK */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="shine-card bg-slate-900 text-white border border-slate-800 rounded-2xl p-8 space-y-6 relative overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-2 text-accent font-bold relative z-10">
                <CheckCircle size={22} />
                <span>The KORK Integrated Solution</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-300 relative z-10">
                <li className="flex gap-2.5 items-start">
                  <span className="text-accent font-bold shrink-0">✓</span>
                  <p><strong>Unified Portal:</strong> Track all drawings, database queries, and communications in a single, highly encrypted dashboard.</p>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-accent font-bold shrink-0">✓</span>
                  <p><strong>Pre-Checked Drawings:</strong> Illustrators coordinate directly with drafting practitioners to ensure figures meet USPTO specifications before filing.</p>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-accent font-bold shrink-0">✓</span>
                  <p><strong>Transparent Pricing:</strong> Upfront fixed-cost inventor packages replace open-ended attorney billable hours, saving thousands.</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Layout */}
      <section className="py-20 bg-light-gray dark:bg-slate-900 transition-colors duration-300">
        <div className="container-custom space-y-12">
          
          {/* Top Tab Buttons */}
          <div className="space-y-4 text-center">
            <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
              Core Pillars
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {servicesData.map((svc) => {
                const Icon = svc.icon;
                const isSelected = svc.id === activeTab;
                return (
                  <motion.button
                    key={svc.id}
                    onClick={() => setActiveTab(svc.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-sm font-bold transition-all whitespace-nowrap lg:whitespace-normal shrink-0 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-secondary to-blue-700 text-white border-transparent shadow-lg shadow-blue-500/10'
                        : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-150/60 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    <Icon size={18} className={isSelected ? 'text-white' : 'text-slate-400'} />
                    <span>{svc.title}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Full Width Active Tab Content */}
          <div className="text-left w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {/* Service Banner details */}
                <div className="space-y-4 border-b border-slate-200/50 dark:border-slate-800 pb-8">
                  <span className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={14} className="animate-pulse" />
                    IP Platform Capability
                  </span>
                  <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight">
                    {currentService.title}
                  </h2>
                  <p className="text-base font-bold text-secondary dark:text-accent">
                    {currentService.tagline}
                  </p>
                  <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                    {currentService.description}
                  </p>
                </div>

                {/* Benefits & Process side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Benefits */}
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="shine-card space-y-4 p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-150/60 dark:border-slate-850 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-primary dark:text-white flex items-center gap-2">
                      <CheckCircle size={18} className="text-emerald-500" />
                      Key Benefits
                    </h3>
                    <ul className="space-y-3 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                      {currentService.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                          <span className="leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Process */}
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="shine-card space-y-4 p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-150/60 dark:border-slate-850 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-primary dark:text-white flex items-center gap-2">
                      <Workflow size={18} className="text-accent" />
                      Coordination Workflow
                    </h3>
                    <ol className="space-y-4 text-xs md:text-sm text-slate-600 dark:text-slate-400 relative pl-4 border-l border-slate-200 dark:border-slate-800 ml-2">
                      {currentService.process.map((step, i) => (
                        <li key={i} className="relative leading-relaxed">
                          <span className="absolute -left-[21px] top-0.5 h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-500">
                            {i + 1}
                          </span>
                          <span className="font-bold text-primary dark:text-white">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                </div>

                {/* Features Tagged */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="shine-card relative overflow-hidden flex flex-col items-center text-center space-y-5 p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 shadow-xl"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                  <h3 className="relative z-10 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <Sparkles size={16} className="text-cyan-400" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      Pillar Deliverables & Formats
                    </span>
                    <Sparkles size={16} className="text-blue-400" />
                  </h3>
                  <div className="relative z-10 flex flex-wrap justify-center gap-3">
                    {currentService.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 text-cyan-50 shadow-[0_0_15px_rgba(34,211,238,0.15)] flex items-center gap-2 hover:bg-cyan-400/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all cursor-default"
                      >
                        <CheckCircle size={14} className="text-cyan-400" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Service Inquiry Form */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="shine-card bg-slate-900 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden border border-slate-800 shadow-xl max-w-3xl mx-auto mt-16"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 space-y-6 text-center">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">
                        Consultation Request
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Connect with a platform coordinator under secure confidentiality safeguards.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-accent rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-0 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@example.com"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-accent rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-0 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone (Optional)</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="330-353-9850"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-accent rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-0 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Select IP Service</label>
                        <select
                          name="servicePillar"
                          value={formData.servicePillar}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-accent rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-0 text-white"
                        >
                          <option value="inventor-services">Inventor Services & Roadmaps</option>
                          <option value="patent-illustrations">Patent Illustration Drawings</option>
                          <option value="patent-filing-support">Filing & Prosecution Support</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 space-y-1.5 pt-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Invention / Drawing Specifications</label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Provide a general high-level description of your concept or drawing needs. Do not share raw patent claims until NDA is signed."
                          className="w-full bg-slate-950 border border-slate-800 focus:border-accent rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-0 text-white resize-none"
                        />
                      </div>

                      {/* NDA Checkbox */}
                      <div className="sm:col-span-2 flex items-center gap-2 py-1">
                        <input
                          type="checkbox"
                          id="ndaRequired"
                          name="ndaRequired"
                          checked={formData.ndaRequired}
                          onChange={handleCheckboxChange}
                          className="rounded bg-slate-950 border-slate-800 text-accent focus:ring-0 focus:outline-none w-4 h-4"
                        />
                        <label htmlFor="ndaRequired" className="text-xs text-slate-400 cursor-pointer flex items-center gap-1.5 selection:bg-transparent">
                          <Lock size={12} className="text-accent" />
                          Require mutual NDA review prior to full technical disclosure
                        </label>
                      </div>

                      <div className="sm:col-span-2 pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10 disabled:opacity-50 transition-opacity"
                        >
                          {loading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Submitting Request...
                            </>
                          ) : (
                            <>
                              Request Platform Consultation
                              <Send size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  );
}
