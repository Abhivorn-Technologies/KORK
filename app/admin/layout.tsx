'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Inbox, 
  Settings as SettingsIcon, 
  LogOut, 
  User,
  Menu,
  X,
  Briefcase,
  MessageSquare,
  Folder
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { isFirebaseConfigured } from '@/lib/firebase';
import { AdminAuthContext } from './AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Check authentication
    if (isFirebaseConfigured()) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const allowedAdmins = ['contact@korkinventrex.com', 'kayasree@korkinventrex.com'];
          const userEmail = user.email?.toLowerCase().trim() || '';
          
          if (allowedAdmins.includes(userEmail)) {
            setIsAuthenticated(true);
          } else {
            // Logged in user is not an authorized administrator. Sign them out.
            auth.signOut().then(() => {
              setIsAuthenticated(false);
              if (!isLoginPage) {
                router.push('/admin/login');
              }
            });
          }
        } else {
          setIsAuthenticated(false);
          if (!isLoginPage) {
            router.push('/admin/login');
          }
        }
      });
      return () => unsubscribe();
    } else {
      // Mock Fallback: check session storage / cookies
      const mockSession = sessionStorage.getItem('admin_authenticated') === 'true';
      setIsAuthenticated(mockSession);
      if (!mockSession && !isLoginPage) {
        router.push('/admin/login');
      }
    }
    return;
  }, [pathname, isLoginPage, router]);

  const login = (token: string) => {
    if (!isFirebaseConfigured()) {
      sessionStorage.setItem('admin_authenticated', 'true');
    }
    setIsAuthenticated(true);
    router.push('/admin/dashboard');
  };

  const logout = async () => {
    if (isFirebaseConfigured()) {
      await auth.signOut();
    } else {
      sessionStorage.removeItem('admin_authenticated');
    }
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  // Prevent flash of unauthenticated content
  if (isAuthenticated === null && !isLoginPage) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white font-mono text-xs">
        <span className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin mr-3" />
        LOADING ADMIN CORE...
      </div>
    );
  }

  // If we are on the login page, just render children directly
  if (isLoginPage) {
    return (
      <AdminAuthContext.Provider value={{ isAuthenticated: !!isAuthenticated, login, logout }}>
        {children}
      </AdminAuthContext.Provider>
    );
  }

  // If authenticated, show administrative sidebar layout
  const adminNavs = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products Management', href: '/admin/products', icon: Package },
    { label: 'Blog Articles', href: '/admin/blogs', icon: FileText },
    { label: 'Inquiries & Leads', href: '/admin/enquiries', icon: Inbox },
    { label: 'Client Projects', href: '/admin/client-projects', icon: Briefcase },
    { label: 'Client Messages', href: '/admin/messages', icon: MessageSquare },
    { label: 'Document Control', href: '/admin/documents', icon: Folder },
    { label: 'Website Settings', href: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated: !!isAuthenticated, login, logout }}>
      <div className="flex h-screen bg-slate-100 dark:bg-slate-950 overflow-hidden text-slate-800 dark:text-slate-200 transition-colors">
        
        {/* Mobile Header */}
        <div className="flex lg:hidden items-center justify-between w-full h-16 bg-slate-900 border-b border-slate-850 px-4 absolute top-0 z-30">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventRex Logo" className="h-10 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar Container */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 lg:static z-25 w-64 bg-slate-900 border-r border-slate-850 text-slate-400 p-6 flex flex-col justify-between transform transition-transform lg:transform-none',
            isSidebarOpen ? 'translate-x-0 pt-20 lg:pt-6' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <div className="space-y-8">
            {/* Logo Header */}
            <div className="hidden lg:flex flex-col items-center pb-6 border-b border-slate-800">
              <Link href="/admin/dashboard">
                <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventRex Logo" className="w-40 h-auto max-h-16 object-contain cursor-pointer mb-2" />
              </Link>
              <div className="flex flex-col text-center">
                <span className="text-[9px] font-semibold text-accent uppercase mt-1 leading-none tracking-wider">Control Panel</span>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-1">
              {adminNavs.map((nav) => {
                const isNavActive = pathname === nav.href;
                return (
                  <Link
                    key={nav.href}
                    href={nav.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all',
                      isNavActive
                        ? 'bg-slate-800 text-white border border-slate-700 shadow'
                        : 'hover:bg-slate-850 hover:text-white border border-transparent'
                    )}
                  >
                    <nav.icon size={16} className={isNavActive ? 'text-accent' : ''} />
                    <span>{nav.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User profile / Logout */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-accent shrink-0">
                <User size={18} />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate leading-tight">Admin Terminal</h4>
                <span className="text-[10px] text-slate-500 font-mono tracking-tighter truncate block mt-0.5">{auth.currentUser?.email || 'kayasree@korkinventrex.com'}</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-rose-950/20 hover:text-rose-400 border border-transparent hover:border-rose-950/30 transition-all text-left"
            >
              <LogOut size={16} />
              <span>Sign Out Panel</span>
            </button>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 pt-20 lg:pt-10">
          <div className="max-w-6xl mx-auto space-y-8">
            {children}
          </div>
        </main>

      </div>
    </AdminAuthContext.Provider>
  );
}
