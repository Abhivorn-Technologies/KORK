'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Send, Phone, Mail, MapPin, Linkedin, Facebook, Twitter, Shield, ArrowUp } from 'lucide-react';
import { saveEnquiry } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hide footer on the admin portal
  if (pathname.startsWith('/admin')) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const isFirebaseConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
      if (isFirebaseConfigured) {
        await addDoc(collection(db, 'newsletter'), {
          email,
          createdAt: new Date().toISOString(),
        });
      } else {
        // Mock fallback
        const existing = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        existing.push({ email, createdAt: new Date().toISOString() });
        localStorage.setItem('newsletter_subscribers', JSON.stringify(existing));
      }
      setSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter Subscription Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-blue-950 text-slate-400 border-t border-blue-900/50 transition-colors duration-300 pt-20 pb-8 overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 -mt-20 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 w-[300px] h-[300px] bg-cyan-900/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Brief & Newsletter */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventReX Logo" className="h-12 w-auto max-w-[200px]" />
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              From Idea to Intellectual Property™. Coordinating patent searches, high-quality illustrations, filing support, and trademark services for inventors and IP professionals.
            </p>

            {/* Affiliations / Logos */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Professional Affiliations
              </span>
              <div className="flex items-center gap-4 bg-slate-900/40 p-3 rounded-lg border border-slate-800/60 max-w-[280px]">
                <img
                  src="/napp_logo.jpg"
                  alt="NAPP Member Logo"
                  className="h-8 w-auto object-contain brightness-90 contrast-125 dark:brightness-110"
                />
                <div className="h-6 w-px bg-slate-800" />
                <img
                  src="/ipo_logo.jpg"
                  alt="IPO Member Logo"
                  className="h-8 w-auto object-contain brightness-90 contrast-125 dark:brightness-110"
                />
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Newsletter Subscription
              </h4>
              {subscribed ? (
                <div className="text-sm text-emerald-400 font-semibold flex items-center gap-1.5 animate-fade-in">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full" />
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm rounded-lg overflow-hidden border border-slate-800 bg-slate-900/60 focus-within:border-accent transition-colors">
                  <input
                    suppressHydrationWarning
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-transparent border-0 text-sm text-white placeholder-slate-500 focus:ring-0 focus:outline-none"
                  />
                  <button
                    suppressHydrationWarning
                    type="submit"
                    disabled={loading}
                    className="px-4 bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white flex items-center justify-center disabled:opacity-50 transition-opacity"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide relative pb-2 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-10 before:bg-accent">
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>How It Works</span>
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>Industries We Serve</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>Learning Center & Resources</span>
                </Link>
              </li>
              <li>
                <Link href="/client-portal" className="hover:text-white flex items-center gap-1.5 transition-colors text-accent font-semibold">
                  <span>Client Portal & Workspace</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Portfolio */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide relative pb-2 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-10 before:bg-accent">
              IP & Patent Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services/inventor-services" className="hover:text-white transition-colors block">
                  Inventor Services & Packages
                </Link>
              </li>
              <li>
                <Link href="/services/patent-illustrations" className="hover:text-white transition-colors block">
                  Patent Illustration Services
                </Link>
              </li>
              <li>
                <Link href="/services/patent-filing-support" className="hover:text-white transition-colors block">
                  Patent Filing & Prosecution Support
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors block text-slate-500 italic">
                  View All Services Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide relative pb-2 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-10 before:bg-accent">
              Support & Inquiries
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Support: 24 Hours<br />
                  Office Hours: 9 AM–6 PM ET
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <a href="tel:3303539850" className="hover:text-white transition-colors">
                  330-353-9850
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <a href="mailto:contact@korkinventrex.com" className="hover:text-white transition-colors">
                  contact@korkinventrex.com
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:-translate-y-1"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:-translate-y-1"
                aria-label="Facebook Page"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:-translate-y-1"
                aria-label="Twitter Profile"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="border-t border-slate-900 pt-8 pb-4">
          <div className="bg-slate-900/30 border border-slate-800/80 rounded-lg p-5 text-xs text-slate-500 leading-relaxed space-y-2">
            <span className="font-bold text-slate-300 block uppercase tracking-wider">
              Legal Disclaimer & Attorney Network Notice
            </span>
            <p>
              KORK InventReX is a specialized service platform providing patent illustrations, prior art searches, trademark graphics preparation, and general IP documentation support. <strong>KORK InventReX is not a law firm, does not act as a registered patent attorney or agent, and does not provide legal advice, legal opinions, or direct legal representation.</strong>
            </p>
            <p>
              Any filing, prosecution, or legal activities before the United States Patent and Trademark Office (USPTO) or other international patent registries are facilitated through our established network of independent, registered patent attorneys and practitioners. The use of our website or platform does not create an attorney-client relationship between you and KORK InventReX.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} KORK InventReX. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/nda-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              NDA Policy
            </Link>
            <Link href="/accessibility" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Accessibility
            </Link>
            <button
              suppressHydrationWarning
              onClick={scrollToTop}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:bg-accent hover:text-white transition-all shadow-md"
              title="Scroll to Top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
