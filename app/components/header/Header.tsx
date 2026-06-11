'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Briefcase, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Industries', href: '/industries' },
  { label: 'Resources', href: '/resources' },
  { label: 'Client Portal', href: '/client-portal' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header id="main-header" className="sticky top-3 md:top-5 z-50 w-[calc(100%-1.5rem)] max-w-7xl mx-auto rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 transition-all duration-300 shadow-lg shadow-blue-900/5">
      <div className="container-custom flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventReX Logo" className="h-10 w-auto max-w-[160px]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-semibold tracking-wide relative py-2 transition-colors duration-300',
                isActive(item.href)
                  ? 'text-secondary dark:text-accent font-extrabold'
                  : 'text-secondary hover:text-blue-800 dark:text-slate-300 dark:hover:text-white font-bold'
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Request Consultation
          </Link>
        </div>

        {/* Mobile Actions / Toggle */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden"
          >
            <div className="container-custom py-6 space-y-4 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-base font-semibold py-2 px-3 rounded-lg transition-colors',
                    isActive(item.href)
                      ? 'bg-slate-100 text-secondary dark:bg-slate-900 dark:text-accent font-extrabold'
                      : 'text-secondary hover:bg-slate-50 hover:text-blue-800 dark:text-slate-300 dark:hover:bg-slate-900 font-bold'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
              
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full px-5 py-3 rounded-lg text-base font-bold text-white bg-gradient-to-r from-secondary to-accent shadow-md shadow-blue-500/10"
              >
                Request Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
