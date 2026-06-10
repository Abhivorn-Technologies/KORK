'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  FileText,
  Search,
  Scale,
  Lock,
  Compass,
  Briefcase,
  HelpCircle,
  ShieldCheck, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Award
} from 'lucide-react';
import { getFeaturedProducts, getTestimonials } from '@/lib/firebase';
import { Product, Testimonial } from '@/types';

// Custom Counter Hook/Component for animated counters
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
    return;
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-white tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 0.15], [30, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.15], [-20, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.15], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.8, 1]);

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, testimonialsData] = await Promise.all([
          getFeaturedProducts(6),
          getTestimonials()
        ]);
        setFeaturedProducts(productsData);
        setTestimonials(testimonialsData);
      } catch (err) {
        console.error('Error fetching landing page data:', err);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchData();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const challenges = [
    {
      q: 'Where do I start?',
      a: 'Navigating prior art databases and choosing the right patent application path is a major barrier for early-stage innovators.'
    },
    {
      q: 'Is my invention patentable?',
      a: 'Understanding whether your concept meets the legal thresholds of novelty and non-obviousness requires highly experienced analysis.'
    },
    {
      q: 'Who do I trust?',
      a: 'The IP ecosystem is flooded with predatory invention promoters. Finding verified, registered USPTO practitioners is challenging.'
    },
    {
      q: 'How much documentation is needed?',
      a: 'Filing a patent requires exact written specifications, claims drafting, and highly technical USPTO-compliant drawings.'
    },
    {
      q: 'How do I file?',
      a: 'Choosing between a provisional, non-provisional utility, design, or international PCT patent determines your global protection.'
    },
    {
      q: 'What happens after filing?',
      a: 'Responding to USPTO examiner rejections and objections (Office Actions) requires skilled claim amendments and illustration edits.'
    }
  ];

  const solutions = [
    {
      icon: Search,
      title: 'Inventor Services',
      description: 'We coordinate prior art searches, patentability assessments, and secure roadmap creation to align your idea for success.',
      href: '/services/inventor-services'
    },
    {
      icon: FileText,
      title: 'Patent Illustration Services',
      description: 'Our technical illustrators prepare high-precision utility, design, trademark, and plant drawings conforming strictly to USPTO MPEP standards.',
      href: '/services/patent-illustrations'
    },
    {
      icon: Scale,
      title: 'Patent Filing & Prosecution Support',
      description: 'We coordinate with independent, registered patent attorneys and agents to manage drafting, secure filing, and Office Action responses.',
      href: '/services/patent-filing-support'
    }
  ];

  const faqs = [
    {
      q: 'Is KORK InventReX a law firm?',
      a: 'No, KORK InventReX is not a law firm, does not act as a registered patent attorney or agent, and does not provide legal advice or direct legal representation. We are an intellectual property support platform providing prior art searches, USPTO-compliant technical drawings, and documentation preparation support. All legal services, including patent application drafting, official USPTO filing, and prosecution, are facilitated through our established network of independent, registered patent attorneys and practitioners.'
    },
    {
      q: 'What does USPTO stand for?',
      a: 'The USPTO stands for the United States Patent and Trademark Office, which is the federal agency responsible for examining and granting patent protections and trademark registrations in the United States.'
    },
    {
      q: 'How long does a prior art search take?',
      a: 'A standard comprehensive prior art search takes between 5 to 10 business days. We search US and international patent databases, published applications, and non-patent literature to help assess the novelty of your concept.'
    },
    {
      q: 'Can I file my patent application myself?',
      a: 'Yes, the USPTO allows inventors to file "pro se" (self-represented). However, because drafting claims is highly technical and formatting drawings requires specialized tools, working with independent, registered practitioners is highly recommended to avoid costly administrative rejections or lost rights.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-slate-50 text-slate-900">
        {/* Beautiful Light Mesh Overlay */}
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.08)_1.5px,transparent_1.5px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_100%)] opacity-80" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-200/40 to-blue-100/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-cyan-200/30 to-emerald-100/20 rounded-full blur-[100px] pointer-events-none" style={{ animationDelay: '1s' }} />

        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-secondary text-xs font-bold uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse-glow" />
              Integrated IP & Patent Support Platform
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
            >
              From Idea to<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                Intellectual Property™
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed max-w-2xl"
            >
              One platform coordinating patent searches, patent illustrations, patent filing support, trademark services, and intellectual property professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-base font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/15 transition-all transform hover:-translate-y-0.5"
              >
                Schedule Consultation
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/client-portal"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-base font-bold text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                Submit Your Invention
              </Link>
            </motion.div>
          </div>

          {/* Hero Graphic - Smooth Continuous Floating Animation */}
          <div className="lg:col-span-5 relative h-[400px] md:h-[500px] w-full flex items-center justify-center [perspective:1200px]">
            <motion.div
              animate={{ 
                y: [-20, 20, -20],
                rotateX: [15, 20, 15],
                rotateY: [-15, -10, -15]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: "easeInOut" 
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-4/5 md:w-full max-w-md mx-auto"
            >
              {/* Main Floating Object (Simulated 3D Blueprint/Document) */}
              <div className="relative rounded-2xl border border-white/40 bg-white/60 p-3 backdrop-blur-xl shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/40 before:to-transparent before:pointer-events-none">
                <div className="relative rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
                  {/* We use the blueprint image but style it cleanly as a floating document */}
                  <img 
                    src="/blueprint-1.png" 
                    alt="Patent Blueprint View" 
                    className="w-full h-auto object-cover opacity-90"
                    style={{ filter: 'brightness(1.05) contrast(1.1)' }}
                  />
                  
                  {/* Shimmer/Reflection effect on the document */}
                  <motion.div 
                    animate={{ 
                      x: ['-100%', '200%'],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                      delay: 1
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12"
                  />
                </div>
              </div>

              {/* Decorative Floating Elements (Seals/Badges) around the main object */}
              <motion.div
                animate={{ y: [10, -10, 10], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-white border border-slate-100 shadow-xl rounded-2xl p-4 flex items-center gap-3 backdrop-blur-md"
              >
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Protected</span>
                  <span className="text-[10px] text-slate-500">IP Secured</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-15, 15, -15], rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-6 bg-white border border-slate-100 shadow-xl rounded-2xl p-4 flex items-center gap-3 backdrop-blur-md"
              >
                <div className="bg-blue-100 text-secondary p-2 rounded-full">
                  <Award size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">USPTO Ready</span>
                  <span className="text-[10px] text-slate-500">100% Compliant</span>
                </div>
              </motion.div>

              {/* Dynamic Shadow under the floating object */}
              <motion.div
                animate={{ 
                  scale: [1, 0.8, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6, 
                  ease: "easeInOut" 
                }}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-blue-900/30 blur-2xl rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-gradient-to-r from-primary to-slate-900 py-12 border-y border-slate-800">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            <div className="flex flex-col items-center text-center p-4 border-r border-slate-800 last:border-0 max-sm:border-r-0">
              <Counter value={1200} suffix="+" />
              <span className="text-sm font-bold text-slate-450 uppercase tracking-wider mt-2">
                Patent Drawings Prepared
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-4 border-r border-slate-800 last:border-0 max-lg:border-r-0">
              <Counter value={450} suffix="+" />
              <span className="text-sm font-bold text-slate-450 uppercase tracking-wider mt-2">
                Searches Coordinated
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-4 border-r border-slate-800 last:border-0 max-sm:border-r-0">
              <Counter value={99} suffix=".4%" />
              <span className="text-sm font-bold text-slate-450 uppercase tracking-wider mt-2">
                USPTO Drawing Acceptance
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <Counter value={100} suffix="%" />
              <span className="text-sm font-bold text-slate-450 uppercase tracking-wider mt-2">
                Secure & NDA Protected
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THE CHALLENGE FACING INVENTORS */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-wider">
              The Path to Protection
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              The Challenge Facing Inventors
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Navigating the complex, fragmented patent system can feel overwhelming. Independent inventors face these critical questions at every step:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge, idx) => (
              <div
                key={challenge.q}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 hover:border-slate-200 dark:hover:border-slate-800 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4 text-left">
                  <div className="h-8 w-8 rounded-full bg-slate-250/70 dark:bg-slate-800 text-slate-600 dark:text-slate-350 flex items-center justify-center font-bold font-mono text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-primary dark:text-white">
                    {challenge.q}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {challenge.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE KORK INTEGRATED SOLUTION */}
      <section className="py-24 bg-light-gray dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
        <div className="container-custom space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary dark:text-accent text-xs font-bold uppercase tracking-wider">
              An End-to-End System
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              The KORK Integrated Solution
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              We consolidate the complex, fragmented intellectual property process into a single coordinated platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solutions.map((sol, idx) => (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col justify-between p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-150/60 dark:border-slate-850 shadow-card hover:shadow-card-hover hover:border-accent/40 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              >
                <div className="space-y-4 text-left">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 text-secondary dark:text-accent group-hover:scale-110 transition-transform duration-300">
                    <sol.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary dark:text-white group-hover:text-secondary dark:group-hover:text-accent transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                    {sol.description}
                  </p>
                </div>
                <div className="pt-6 text-left">
                  <Link
                    href={sol.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary dark:text-accent group-hover:gap-2.5 transition-all"
                  >
                    Explore Service
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coordination Value Box */}
          <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-slate-850 shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 max-w-4xl space-y-6 text-left">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                Cost & Time Optimization
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Why Coordination Saves Thousands of Dollars
              </h3>
              <p className="text-slate-305 leading-relaxed text-sm md:text-base">
                Filing a patent usually involves hiring separate providers: prior art searchers, CAD draftspersons for drawings, and drafting attorneys. Without synchronization, these components conflict—examiners reject poor drawings, attorneys rewrite applications due to late prior art reviews, and billing stacks up.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-850 text-left">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle size={16} className="text-accent" />
                    Unified Deadlines
                  </h4>
                  <p className="text-xs text-slate-400">All drawings, claims revisions, and inputs align automatically to guarantee submission milestones are met.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle size={16} className="text-accent" />
                    Zero Drawing Rejection
                  </h4>
                  <p className="text-xs text-slate-400">Illustrators coordinate with network practitioners to verify that design margins, fonts, and shading satisfy examiners.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle size={16} className="text-accent" />
                    Secure Workspace
                  </h4>
                  <p className="text-xs text-slate-400">Track files, revisions, NDA agreements, and attorney exchanges securely in one central client portal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AFFILIATIONS BAR */}
      <section className="bg-slate-50 dark:bg-slate-950 py-16 border-y border-slate-200/50 dark:border-slate-900 transition-colors duration-300">
        <div className="container-custom max-w-4xl text-center space-y-6">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
            Coordinating with Registered Patent Professionals & Serving Members of
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 opacity-75 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center">
              <img
                src="/napp_logo.jpg"
                alt="NAPP member logo reference"
                className="h-12 w-auto object-contain dark:brightness-125"
              />
              <span className="text-[9px] text-slate-500 font-bold uppercase mt-1 font-mono">National Association of Patent Practitioners</span>
            </div>
            <div className="h-8 w-px bg-slate-300 dark:bg-slate-800 hidden sm:block" />
            <div className="flex flex-col items-center">
              <img
                src="/ipo_logo.jpg"
                alt="IPO logo reference"
                className="h-10 w-auto object-contain dark:brightness-125"
              />
              <span className="text-[9px] text-slate-500 font-bold uppercase mt-2.5 font-mono">Intellectual Property Owners Association</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED INVENTOR PACKAGES */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-3 max-w-xl text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-secondary dark:text-accent text-xs font-bold uppercase tracking-wider">
                Clear Packages
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
                Featured Inventor Packages
              </h2>
              <p className="text-slate-650 dark:text-slate-400">
                Explore upfront packages coordinated with experienced patent specialists to launch your innovation.
              </p>
            </div>
            <div>
              <Link
                href="/services/inventor-services"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                View Packages Details
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-4 animate-pulse flex flex-col justify-between">
                  <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                  <div className="space-y-2 mt-4 flex-1">
                    <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                  <div className="h-10 w-28 bg-slate-200 dark:bg-slate-800 rounded mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 shadow-card hover:shadow-card-hover hover:border-accent/30 transition-all duration-300"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  
                  <div className="flex-1 p-6 space-y-3 flex flex-col justify-between text-left">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-primary dark:text-white leading-snug group-hover:text-secondary dark:group-hover:text-accent transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between">
                      <Link
                        href={`/services/inventor-services#${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary dark:text-accent"
                      >
                        View Package Details
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-light-gray dark:bg-slate-900/60 border-t border-slate-150/50 dark:border-slate-900 transition-colors duration-300 overflow-hidden">
          <div className="container-custom space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-500/10 text-secondary dark:text-accent">
                <MessageSquare size={20} />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
                Verified Client Reviews
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Read feedback from inventors and startup coordinators who built their patent roadmaps using our portal services.
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative px-4">
              <div className="bg-white dark:bg-slate-950 border border-slate-150/60 dark:border-slate-850 p-8 md:p-12 rounded-3xl relative shadow-md">
                {/* Quote details */}
                <div className="absolute top-6 left-6 text-slate-200 dark:text-slate-850 text-7xl font-serif leading-none pointer-events-none select-none">
                  “
                </div>

                <div className="relative z-10 space-y-6 text-left">
                  {/* Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{testimonials[activeTestimonial].review}"
                  </p>

                  {/* Profile info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                    <img
                      src={testimonials[activeTestimonial].photo}
                      alt={testimonials[activeTestimonial].clientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-primary dark:text-white">
                        {testimonials[activeTestimonial].clientName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {testimonials[activeTestimonial].companyName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial slider navigation */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-650 dark:text-slate-400 hover:bg-slate-50 hover:text-primary dark:hover:bg-slate-850 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-xs text-slate-500 font-bold">
                  {activeTestimonial + 1} / {testimonials.length}
                </span>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-650 dark:text-slate-400 hover:bg-slate-50 hover:text-primary dark:hover:bg-slate-850 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. FAQ SECTION */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container-custom max-w-4xl space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Clear answers regarding our support platform, illustration standards, and attorney network.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-150/70 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/40 rounded-xl overflow-hidden text-left"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left px-6 py-4.5 font-bold text-slate-900 dark:text-white flex items-center justify-between gap-4 transition-colors hover:text-secondary dark:hover:text-accent"
                >
                  <span>{faq.q}</span>
                  <span className="shrink-0 text-slate-400 font-mono">
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </button>
                
                {activeFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-650 dark:text-slate-350 border-t border-slate-150/40 dark:border-slate-850 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. CONTACT CTA SECTION */}
      <section className="relative py-20 bg-slate-950 overflow-hidden text-center text-white border-t border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e40af_0%,transparent_60%)] opacity-35" />
        <div className="container-custom relative z-10 max-w-3xl space-y-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Protect Your Innovation Today
          </h2>
          <p className="text-lg text-slate-350 max-w-xl mx-auto leading-relaxed">
            Coordinate with our specialists to review your idea, generate patent drawings, or connect with a registered practitioner.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
            >
              Start Free Consult
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
