'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/admin/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { isFirebaseConfigured } from '@/lib/firebase';
import { useToast } from '@/components/common/Toast';
import { Lock, Mail, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const { success, error: toastError } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);

    try {
      if (isFirebaseConfigured()) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        login(token);
        success('Access Authorized', 'Successfully authenticated using Firebase Security.');
      } else {
        // Mock credentials check
        if (email === 'admin@kork.com' && password === 'adminpassword') {
          login('mock-token');
          success('Access Authorized', 'Mock authentication matched successfully.');
        } else {
          toastError('Access Denied', 'Invalid credentials. Hint: use admin@kork.com / adminpassword');
        }
      }
    } catch (err: any) {
      console.error(err);
      toastError('Auth Error', err.message || 'Failed to authenticate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-slate-950 px-4 relative overflow-hidden font-sans">
      {/* Background Graphic details */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e40af_0%,transparent_60%)] opacity-20" />
      <div className="absolute top-10 left-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-white font-black text-xl shadow-lg shadow-blue-500/20">
            KI
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight pt-2">
            Kork Inventrex Terminal
          </h1>
          <p className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold">
            Administrative Control Center
          </p>
        </div>

        {/* Security Notification if Mock mode */}
        {!isFirebaseConfigured() && (
          <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4 flex gap-3 text-xs text-amber-500">
            <ShieldAlert size={20} className="shrink-0" />
            <div>
              <span className="font-bold block">Developer / Demo Mode</span>
              <span className="mt-0.5 leading-relaxed text-slate-400 block">
                Firebase is not configured. Access dashboard using default credentials:
                <br />
                <strong className="text-white">admin@kork.com</strong> / <strong className="text-white">adminpassword</strong>
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Terminal Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kork.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-accent rounded-xl text-xs text-white focus:outline-none placeholder-slate-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Terminal Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-accent rounded-xl text-xs text-white focus:outline-none placeholder-slate-600"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-blue-500/15 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Requesting Port Sync...
                </>
              ) : (
                'Access Terminal Core'
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
