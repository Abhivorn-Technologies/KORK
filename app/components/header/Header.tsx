'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/helpers';

const navItems = [
  { label: 'Home', href: '/' },
  { 
    label: 'Services', 
    href: '/services',
    subItems: [
      { label: 'Inventor Services', href: '/services/inventor-services' },
      { label: 'Patent Illustrations', href: '/services/patent-illustrations' },
      { label: 'Patent Filing Support', href: '/services/patent-filing-support' }
    ]
  },
  { 
    label: 'Resources', 
    href: '/resources',
    subItems: [
      { label: 'Industries We Serve', href: '/resources/industries' }
    ]
  },
  { 
    label: 'About Us', 
    href: '/about',
    subItems: [
      { label: 'How It Works', href: '/about/how-it-works' }
    ]
  },
  { label: 'Client Portal', href: '/client-portal' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  // Hide header on the admin portal
  if (pathname.startsWith('/admin')) return null;

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header id="main-header" className="fixed top-3 md:top-5 left-0 right-0 z-50 w-[calc(100%-1.5rem)] max-w-7xl mx-auto rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 transition-all duration-300 shadow-lg shadow-blue-900/5">
      <div className="container-custom flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventRex Logo" className="h-10 w-auto max-w-[160px]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-1 text-sm font-semibold tracking-wide relative py-5 transition-colors duration-300',
                  isActive(item.href)
                    ? 'text-secondary dark:text-accent font-extrabold'
                    : 'text-secondary hover:text-blue-800 dark:text-slate-300 dark:hover:text-white font-bold'
                )}
              >
                {item.label}
                {item.subItems && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                
                {/* Active Indicator */}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              {/* Desktop Dropdown */}
              {item.subItems && (
                <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xl w-64 overflow-hidden py-2 relative before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-secondary before:to-accent">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={cn(
                          "block px-5 py-3 text-sm font-bold transition-colors",
                          pathname === sub.href 
                            ? "text-accent bg-slate-50 dark:bg-slate-800" 
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-secondary dark:hover:text-accent"
                        )}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
            suppressHydrationWarning
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
            <div className="container-custom py-6 space-y-2 flex flex-col">
              {navItems.map((item) => (
                <div key={item.href} className="flex flex-col">
                  {item.subItems ? (
                    <>
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'flex-1 text-base font-semibold py-2.5 px-3 rounded-lg transition-colors',
                            isActive(item.href)
                              ? 'bg-slate-100 text-secondary dark:bg-slate-900 dark:text-accent font-extrabold'
                              : 'text-secondary hover:bg-slate-50 hover:text-blue-800 dark:text-slate-300 dark:hover:bg-slate-900 font-bold'
                          )}
                        >
                          {item.label}
                        </Link>
                        <button 
                          onClick={() => setOpenMobileSubmenu(openMobileSubmenu === item.label ? null : item.label)}
                          className="p-2 mr-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                        >
                          <ChevronDown size={20} className={cn("transition-transform duration-300", openMobileSubmenu === item.label && "rotate-180")} />
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {(openMobileSubmenu === item.label || isActive(item.href)) && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col pl-4 mt-1 border-l-2 border-slate-100 dark:border-slate-800 ml-6 space-y-1 overflow-hidden"
                          >
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "text-sm font-semibold py-2.5 px-3 rounded-lg transition-colors",
                                  pathname === sub.href
                                    ? "text-accent bg-slate-50 dark:bg-slate-900/50"
                                    : "text-slate-600 dark:text-slate-400 hover:text-secondary dark:hover:text-accent hover:bg-slate-50 dark:hover:bg-slate-900/50"
                                )}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-base font-semibold py-2.5 px-3 rounded-lg transition-colors',
                        isActive(item.href)
                          ? 'bg-slate-100 text-secondary dark:bg-slate-900 dark:text-accent font-extrabold'
                          : 'text-secondary hover:bg-slate-50 hover:text-blue-800 dark:text-slate-300 dark:hover:bg-slate-900 font-bold'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
              
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full px-5 py-3.5 rounded-lg text-base font-bold text-white bg-gradient-to-r from-secondary to-accent shadow-md shadow-blue-500/10"
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
