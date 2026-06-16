'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  UploadCloud,
  Download,
  FileText,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  Send,
  HelpCircle as QuestionIcon,
  LogOut,
  Lock,
  Mail,
  X,
  CheckCircle,
  Eye,
  Layers,
  Bell,
  FolderOpen,
  Users,
  Building2,
  Microscope,
  Briefcase,
  ChevronDown,
  Star,
  Zap,
  Globe,
  Shield,
  ArrowRight,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { useToast } from '@/components/common/Toast';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, query, where, orderBy, onSnapshot, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '@/firebase/config';
import { isFirebaseConfigured } from '@/lib/firebase';

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const portalFaqs = [
  {
    q: 'How do I access the client portal?',
    a: 'Clients receive secure login credentials after project onboarding. Once your project is initiated, KORK will provide your access credentials via email.',
  },
  {
    q: 'Can I upload invention documents?',
    a: 'Yes. The portal supports secure document uploads including invention disclosures, photos, sketches, CAD files, office actions, and technical documents.',
  },
  {
    q: 'Can I track project progress?',
    a: 'Yes. Active projects include real-time status tracking and milestone visibility from intake through completion.',
  },
  {
    q: 'Can I communicate with the project team?',
    a: 'Yes. The portal provides secure communication channels for project updates, document requests, support inquiries and general project coordination with the KORK team.',
  },
  {
    q: 'Can I access completed deliverables?',
    a: 'Yes. Deliverables remain available through the portal for authorized users including patent drawings, search reports, and application documents.',
  },
  {
    q: 'Is my information secure?',
    a: 'KORK implements security measures designed to protect confidential project information and intellectual property materials including secure authentication and encrypted communications.',
  },
  {
    q: 'Can multiple team members access the same project?',
    a: 'Access permissions may be configured depending on project requirements. Contact KORK to discuss multi-user access for your project.',
  },
];

// ─── Section Benefits ──────────────────────────────────────────────────────────
const benefits = [
  { icon: Shield, label: 'Secure File Sharing', desc: 'SSL-encrypted uploads and downloads for all project files.' },
  { icon: Eye, label: 'Project Visibility', desc: 'Full transparency into every stage of your IP project.' },
  { icon: Clock, label: 'Timeline Tracking', desc: 'Monitor deadlines and key milestones in real time.' },
  { icon: Layers, label: 'Centralized Coordination', desc: 'One hub for all project communications and documents.' },
  { icon: Download, label: 'Deliverable Access', desc: 'Retrieve completed work products when ready.' },
  { icon: BarChart3, label: 'Milestone Monitoring', desc: 'Track progress from initial intake through completion.' },
  { icon: MessageSquare, label: 'Support Requests', desc: 'Submit inquiries directly through the portal.' },
  { icon: Calendar, label: 'Activity History', desc: 'Full chronological log of all project activity.' },
];

// ─── Dashboard Features ────────────────────────────────────────────────────────
const dashboardFeatures = [
  { icon: LayoutDashboard, title: 'Project Snapshot', desc: 'View all active and completed projects in one location.' },
  { icon: Bell, title: 'Recent Activity', desc: 'Monitor project updates, messages, and deliverables.' },
  { icon: Zap, title: 'Notifications', desc: 'Receive alerts regarding milestones, document requests, and project progress.' },
  { icon: Calendar, title: 'Upcoming Deadlines', desc: 'Track important project dates and filing-related milestones.' },
];

// ─── Project Management Features ───────────────────────────────────────────────
const projectFeatures = [
  { icon: BarChart3, title: 'Project Status Tracking', desc: 'Monitor project progress in real time.' },
  { icon: CheckCircle, title: 'Milestone Visibility', desc: 'Track key project phases from intake through completion.' },
  { icon: Calendar, title: 'Timeline Management', desc: 'View upcoming tasks and project activities.' },
  { icon: FolderOpen, title: 'Deliverable Monitoring', desc: 'Know when work products are ready for review.' },
];

// ─── Who Uses Portal ───────────────────────────────────────────────────────────
const userTypes = [
  { icon: Star, title: 'Independent Inventors', desc: 'Track invention and patent projects.' },
  { icon: Zap, title: 'Startups', desc: 'Manage multiple intellectual property initiatives.' },
  { icon: Building2, title: 'Businesses', desc: 'Coordinate innovation and portfolio activities.' },
  { icon: Briefcase, title: 'Patent Attorneys & Agents', desc: 'Collaborate efficiently on active projects.' },
  { icon: Microscope, title: 'Research Organizations', desc: 'Manage technology development projects.' },
];

// ─── Deliverable Examples ──────────────────────────────────────────────────────
const deliverableExamples = [
  { title: 'Patent Drawings', desc: 'Utility, Design, Plant, Trademark, and Trade Dress Illustrations' },
  { title: 'Search Reports', desc: 'Patent search and research deliverables' },
  { title: 'Application Documents', desc: 'Project-related filing documentation' },
  { title: 'Revision Files', desc: 'Updated versions and amendments' },
];

// ─── Security Features ─────────────────────────────────────────────────────────
const securityFeatures = [
  'Secure Authentication',
  'Controlled Access Permissions',
  'Confidential Document Storage',
  'Encrypted Communications',
  'Activity Tracking',
];

// ─── Support Categories ────────────────────────────────────────────────────────
const supportCategories = [
  'Technical Support',
  'Project Questions',
  'Document Requests',
  'Billing Questions',
  'General Inquiries',
];

export default function ClientPortalPage() {
  const { success, error: toastError } = useToast();

  // ── Auth State ────────────────────────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientProfile, setClientProfile] = useState<any>(null);

  // ── Login Modal ───────────────────────────────────────────────────────────
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'request'>('login');

  // ── Dashboard Tab ─────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'messages' | 'upload' | 'deliverables'>('dashboard');

  // ── Dynamic States ────────────────────────────────────────────────────────
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);

  // ── FAQ ───────────────────────────────────────────────────────────────────
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // ── Support Ticket ────────────────────────────────────────────────────────
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketLoading, setTicketLoading] = useState(false);

  // ── Password Change ───────────────────────────────────────────────────────
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  // ── Scroll tracking for header ────────────────────────────────────────────
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Lock body scroll when modal open ─────────────────────────────────────
  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showLoginModal]);

  // 1. Firebase Auth State
  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'client_projects', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setIsAuthenticated(true);
            setClientProfile(docSnap.data());
            setShowLoginModal(false);
          } else {
            setIsAuthenticated(false);
            setClientProfile(null);
            const userEmail = user.email?.toLowerCase().trim() || '';
            const isAdminEmail = ['contact@korkinventrex.com', 'kayasree@korkinventrex.com'].includes(userEmail);
            if (isAdminEmail) {
              toastError('Access Denied', 'Administrator accounts cannot log in to the Client Portal.');
            } else {
              toastError('Access Denied', 'Your account profile does not exist in the client database.');
            }
            await signOut(auth);
          }
        } catch (err: any) {
          setIsAuthenticated(false);
          setClientProfile(null);
          toastError('Database Error', err.message || 'Could not load your client profile.');
          await signOut(auth);
        }
      } else {
        setIsAuthenticated(false);
        setClientProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Sync projects
  useEffect(() => {
    if (!isAuthenticated) return;
    if (!isFirebaseConfigured()) {
      setActiveProjects([
        { id: 'proj-1', title: 'Utility Drawing Set (Inlet Valve)', progress: 75, status: 'Draft Review', deadline: 'June 22, 2026', phase: 'Step 6: Patent Drawings' },
        { id: 'proj-2', title: 'Prior Art Patentability Search', progress: 100, status: 'Completed', deadline: 'June 12, 2026', phase: 'Step 3: Search & Evaluation' },
        { id: 'proj-3', title: 'Provisional Filing Coordination', progress: 40, status: 'Assembly', deadline: 'July 10, 2026', phase: 'Step 5: Application Preparation' },
      ]);
      return;
    }
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const projectsColRef = collection(db, 'client_projects', userId, 'projects');
    const q = query(projectsColRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setActiveProjects(snapshot.docs.map(d => ({
        id: d.id,
        title: d.data().projectName || 'Active IP Project',
        progress: d.data().progress || 0,
        status: d.data().phase || 'Initial Consultation',
        deadline: d.data().deadline || 'TBD',
        phase: d.data().phase || 'Initial Consultation',
      })));
    }, () => {
      setActiveProjects([
        { id: 'proj-1', title: 'Utility Drawing Set (Inlet Valve)', progress: 75, status: 'Draft Review', deadline: 'June 22, 2026', phase: 'Step 6: Patent Drawings' },
        { id: 'proj-2', title: 'Prior Art Patentability Search', progress: 100, status: 'Completed', deadline: 'June 12, 2026', phase: 'Step 3: Search & Evaluation' },
        { id: 'proj-3', title: 'Provisional Filing Coordination', progress: 40, status: 'Assembly', deadline: 'July 10, 2026', phase: 'Step 5: Application Preparation' },
      ]);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  // 3. Sync messages
  useEffect(() => {
    if (!isAuthenticated) return;
    if (!isFirebaseConfigured()) {
      setMessages([
        { sender: 'support', text: 'Welcome to your secure KORK portal. We are reviewing your provisional disclosure materials.', time: '10:02 AM' },
        { sender: 'client', text: 'Thank you. Did you receive the revised vector assembly sketch?', time: '11:15 AM' },
        { sender: 'support', text: 'Yes, the file is currently with our draftsmen. Compliant figures are being drafted.', time: '11:22 AM' },
      ]);
      return;
    }
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const q = query(collection(db, 'messages'), where('clientId', '==', userId), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(d => ({
        sender: d.data().sender,
        text: d.data().text,
        time: d.data().timestamp ? new Date(d.data().timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
      })));
    }, () => {
      setMessages([
        { sender: 'support', text: 'Welcome to your secure KORK portal.', time: '10:02 AM' },
      ]);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  // 4. Sync documents
  useEffect(() => {
    if (!isAuthenticated) return;
    if (!isFirebaseConfigured()) {
      setUploadedFiles([
        { name: 'inlet_valve_schematic.step', size: '4.2 MB', type: 'CAD Model', date: 'June 08, 2026', status: 'Secured', fileUrl: '', typeGroup: 'inbound' },
        { name: 'provisional_disclosure_notes.docx', size: '124 KB', type: 'Word Doc', date: 'June 08, 2026', status: 'Secured', fileUrl: '', typeGroup: 'inbound' },
      ]);
      return;
    }
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const q = query(collection(db, 'documents'), where('clientId', '==', userId), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUploadedFiles(snapshot.docs.map(d => ({
        id: d.id,
        name: d.data().fileName,
        size: d.data().size,
        type: d.data().fileName.split('.').pop()?.toUpperCase() + ' File',
        date: d.data().date,
        status: 'Secured',
        fileUrl: d.data().fileUrl,
        typeGroup: d.data().type,
      })));
    }, () => {
      setUploadedFiles([
        { name: 'inlet_valve_schematic.step', size: '4.2 MB', type: 'CAD Model', date: 'June 08, 2026', status: 'Secured', fileUrl: '', typeGroup: 'inbound' },
      ]);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  // 5. Hide global nav in dashboard
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isAuthenticated) {
      document.body.classList.add('portal-dashboard-active');
    } else {
      document.body.classList.remove('portal-dashboard-active');
    }
    return () => { document.body.classList.remove('portal-dashboard-active'); };
  }, [isAuthenticated]);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    if (!isFirebaseConfigured()) {
      setLoading(false);
      toastError('System Offline', 'Firebase connection is not configured.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      success('Secure Authentication Succeeded', 'Welcome to your secure IP client workspace.');
    } catch (err: any) {
      toastError('Authentication Failed', err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isFirebaseConfigured()) await signOut(auth);
    setIsAuthenticated(false);
    setClientProfile(null);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const currentMsg = newMessage;
    setNewMessage('');
    if (!isFirebaseConfigured()) {
      setMessages(prev => [...prev, { sender: 'client', text: currentMsg, time: 'Just Now' }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'support', text: `Received: "${currentMsg}". Our team will respond shortly.`, time: 'Just Now' }]);
      }, 1500);
      return;
    }
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    try {
      await addDoc(collection(db, 'messages'), { clientId: userId, sender: 'client', text: currentMsg, timestamp: new Date().toISOString() });
      success('Message Transmitted', 'Your message has been synced.');
    } catch (err: any) {
      toastError('Failed to send', err.message);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) { toastError('Selection Required', 'Please choose a file first.'); return; }
    const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB';
    const currentFile = selectedFile;
    setSelectedFile(null);
    if (!isFirebaseConfigured()) {
      setUploadedFiles(prev => [{ name: currentFile.name, size: sizeMB, type: currentFile.name.split('.').pop()?.toUpperCase() + ' File', date: 'Today', status: 'Secured', fileUrl: '', typeGroup: 'inbound' }, ...prev]);
      success('Upload Initialized', `"${currentFile.name}" transmitted to secure storage.`);
      return;
    }
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    try {
      success('Upload Initialized', `Transmitting "${currentFile.name}"...`);
      const fileRef = ref(storage, `project_documents/${userId}/${currentFile.name}`);
      const snapshot = await uploadBytes(fileRef, currentFile);
      const fileUrl = await getDownloadURL(snapshot.ref);
      await addDoc(collection(db, 'documents'), { clientId: userId, fileName: currentFile.name, fileUrl, type: 'inbound', size: sizeMB, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) });
      success('Upload Complete', `"${currentFile.name}" secured successfully.`);
    } catch (err: any) {
      toastError('Upload Failed', err.message);
    }
  };

  const handleDownload = (file: any) => {
    if (file.fileUrl) { window.open(file.fileUrl, '_blank'); }
    else { success('File Decrypted', `"${file.name}" secure download packaging starting.`); }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg) return;
    const generatedRef = Math.floor(100000 + Math.random() * 900000).toString();
    if (!isFirebaseConfigured()) {
      success('Support Ticket Created', `Ticket reference #${generatedRef} has been logged.`);
      setTicketSubject(''); setTicketMsg('');
      return;
    }
    const userId = auth.currentUser?.uid;
    if (!userId) { toastError('Authentication Required', 'You must be logged in.'); return; }
    setTicketLoading(true);
    try {
      await addDoc(collection(db, 'support_tickets'), { ticketId: generatedRef, clientId: userId, clientName: clientProfile?.name || 'Authorized Client', clientEmail: clientProfile?.email || auth.currentUser?.email || '', subject: ticketSubject, message: ticketMsg, status: 'Open', createdAt: new Date().toISOString() });
      success('Support Ticket Created', `Ticket reference #${generatedRef} logged.`);
      setTicketSubject(''); setTicketMsg('');
    } catch (err: any) {
      toastError('Submission Failed', err.message);
    } finally {
      setTicketLoading(false);
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) { toastError('Password Mismatch', 'Passwords do not match.'); return; }
    if (newPassword.length < 6) { toastError('Weak Password', 'Minimum 6 characters required.'); return; }
    setChangingPassword(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No active session.');
      await updatePassword(user, newPassword);
      if (isFirebaseConfigured()) await updateDoc(doc(db, 'client_projects', user.uid), { needsPasswordChange: false });
      setClientProfile((prev: any) => prev ? { ...prev, needsPasswordChange: false } : null);
      success('Password Updated', 'Welcome to your workspace!');
    } catch (err: any) {
      toastError('Change Failed', err.message);
    } finally {
      setChangingPassword(false);
    }
  };

  const openLoginModal = (mode: 'login' | 'request' = 'login') => {
    setLoginMode(mode);
    setShowLoginModal(true);
  };

  const deliverables = uploadedFiles.filter(f => f.typeGroup === 'outbound');
  const clientUploads = uploadedFiles.filter(f => f.typeGroup === 'inbound' || !f.typeGroup);

  // ─────────────────────────────────────────────────────────────────────────────
  // PASSWORD CHANGE SCREEN
  // ─────────────────────────────────────────────────────────────────────────────
  if (isAuthenticated && clientProfile?.needsPasswordChange === true) {
    return (
      <div className="flex h-screen w-full bg-slate-950 font-sans overflow-hidden items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_50%)] opacity-30" />
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventRex Logo" className="h-10 w-auto object-contain" />
            <div>
              <h2 className="text-sm font-black text-accent uppercase tracking-tight font-mono">Security Reset Required</h2>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Please set a new secure password before accessing your workspace.</p>
            </div>
          </div>
          <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={16} />
                <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Minimum 6 characters" className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl text-white focus:outline-none placeholder-slate-500 transition-all text-xs" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Confirm New Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={16} />
                <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter new password" className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl text-white focus:outline-none placeholder-slate-500 transition-all text-xs" />
              </div>
            </div>
            <button type="submit" disabled={changingPassword} className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary to-accent text-white font-black tracking-wide shadow-lg disabled:opacity-50 flex items-center justify-center text-xs">
              {changingPassword ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Updating...</> : 'Set Password & Access Portal'}
            </button>
          </form>
          <div className="text-center pt-2 border-t border-slate-800">
            <button onClick={handleLogout} className="text-[10px] text-rose-500 hover:text-rose-400 font-bold uppercase tracking-wider transition-colors">Cancel & Disconnect</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DASHBOARD (authenticated)
  // ─────────────────────────────────────────────────────────────────────────────
  if (isAuthenticated) {
    const clientName = clientProfile?.name || 'Authorized Client';
    const clientProject = activeProjects.length > 0 ? activeProjects[0].title : 'Active Project';

    return (
      <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-slate-950 text-slate-200 font-sans flex flex-col lg:flex-row relative">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 lg:overflow-y-auto">
          <div className="space-y-8">
            <div className="flex flex-col items-center pb-6 border-b border-slate-800">
              <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventRex Logo" className="w-40 h-auto max-h-16 object-contain mb-2" />
              <span className="text-[8px] font-semibold text-accent uppercase mt-1 tracking-wider font-mono">Workspace v1.2</span>
            </div>
            <nav className="space-y-1 text-xs">
              {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Workspace Dashboard' },
                { id: 'projects', icon: Clock, label: 'Active Projects Tracker' },
                { id: 'messages', icon: MessageSquare, label: 'Secure Messaging' },
                { id: 'upload', icon: UploadCloud, label: 'Document Upload Center' },
                { id: 'deliverables', icon: FileText, label: 'Completed Deliverables' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold transition-all border ${activeTab === tab.id ? 'bg-slate-800 border-slate-700 text-white shadow' : 'border-transparent text-slate-450 hover:bg-slate-800 hover:text-white'}`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-800 text-[10px] space-y-4">
            <div className="flex flex-col text-slate-400">
              <span className="font-bold text-[10px] text-white leading-tight truncate">{clientName}</span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5 truncate">{clientProject}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="font-bold">Encryption Active</span>
            </div>
            <button onClick={handleLogout} className="w-full text-left font-bold text-rose-500 hover:text-rose-400 transition-colors flex items-center gap-2">
              <LogOut size={14} /><span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-extrabold text-accent tracking-tight uppercase font-mono">KORK CLIENT CONSOLE</h2>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">Secure Workspace Session</p>
              </div>
              <div className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">IP PORT STATUS: SECURE_SYNC</div>
            </div>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Active IP Projects', value: activeProjects.length, tab: 'projects', cta: 'View Project Milestones' },
                    { label: 'Compliant Deliverables', value: deliverables.length, tab: 'deliverables', cta: 'Download Documents' },
                    { label: 'Assigned Professionals', value: '1 Atty / 1 Draftsman', tab: 'messages', cta: 'Open Message Feed' },
                  ].map((card, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{card.label}</span>
                      <span className="text-2xl font-black text-white mt-2">{card.value}</span>
                      <button onClick={() => setActiveTab(card.tab as any)} className="text-[10px] text-accent hover:text-white font-bold flex items-center gap-1 mt-4 transition-colors">
                        {card.cta} <ArrowUpRight size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">Active IP Projects Progress</h3>
                    <div className="space-y-4">
                      {activeProjects.map(proj => (
                        <div key={proj.id} className="space-y-1.5 text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-slate-300">{proj.title}</span>
                            <span className="text-accent">{proj.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-secondary to-accent" style={{ width: `${proj.progress}%` }} />
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-500">
                            <span>{proj.phase}</span>
                            <span>Deadline: {proj.deadline}</span>
                          </div>
                        </div>
                      ))}
                      {activeProjects.length === 0 && <div className="text-center text-xs text-slate-400 py-4">No active projects linked.</div>}
                    </div>
                  </div>
                  <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">Upload Center Quick Access</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">Securely upload sketches, CAD drawings, or examiner objections to your assigned team.</p>
                    </div>
                    <button onClick={() => setActiveTab('upload')} className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-900 text-xs text-white font-bold flex items-center justify-center gap-2 transition-all">
                      <UploadCloud size={16} /> Open Upload Dashboard
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">Active Projects Milestones Tracker</h3>
                <div className="space-y-6">
                  {activeProjects.map(proj => (
                    <div key={proj.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                          <span className="text-[10px] text-slate-500 font-bold block mt-1 font-mono">{proj.id} // {proj.phase}</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${proj.status === 'Completed' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' : 'bg-blue-950/40 text-blue-400 border border-blue-900/30'}`}>{proj.status}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">Milestone Progress</span>
                          <span>{proj.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-secondary to-accent" style={{ width: `${proj.progress}%` }} />
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        <span>Target Milestone Deadline</span>
                        <span>{proj.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col h-[550px] justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">Secure Chat Feed with Support Team</h3>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 text-xs">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`max-w-[80%] rounded-2xl p-4 space-y-1 leading-relaxed ${msg.sender === 'client' ? 'bg-accent/10 border border-accent/20 text-slate-200 ml-auto' : 'bg-slate-950/60 border border-slate-800 text-slate-300'}`}>
                      <p>{msg.text}</p>
                      <span className="text-[9px] text-slate-500 block font-mono text-right">{msg.time}</span>
                    </div>
                  ))}
                  {messages.length === 0 && <div className="text-center text-xs text-slate-400 py-12">No messages yet. Send a message to start.</div>}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-3 pt-4 border-t border-slate-800">
                  <input type="text" placeholder="Type a secure message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} className="flex-1 px-4 bg-slate-950 border border-slate-800 focus:border-accent rounded-xl text-xs text-white focus:outline-none py-2.5" />
                  <button type="submit" className="p-3 rounded-xl bg-gradient-to-r from-secondary to-accent text-white flex items-center justify-center shadow">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            )}

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="space-y-8">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">Secure Document & CAD Upload Center</h3>
                  <form onSubmit={handleFileUpload} className="space-y-4">
                    <div className="border-2 border-dashed border-slate-800 hover:border-accent/40 bg-slate-950/40 hover:bg-slate-950 rounded-2xl p-8 text-center space-y-3 transition-colors relative cursor-pointer">
                      <input type="file" onChange={e => { if (e.target.files && e.target.files.length > 0) setSelectedFile(e.target.files[0]); }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                      <UploadCloud size={32} className="mx-auto text-slate-500" />
                      <div className="text-xs font-bold text-slate-300">{selectedFile ? `Selected: ${selectedFile.name}` : 'Drag & drop or click to choose files'}</div>
                      <p className="text-[10px] text-slate-500">STEP, IGES, SolidWorks, DWG, PDF, PNG, JPG accepted. Max 25MB.</p>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-accent text-xs text-white font-bold flex items-center gap-1.5 shadow">
                        <UploadCloud size={14} /> Upload Selected File
                      </button>
                    </div>
                  </form>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">Secure File Registry</h3>
                  <div className="divide-y divide-slate-800">
                    {clientUploads.map((file, idx) => (
                      <div key={file.id || idx} className="py-4 flex justify-between items-center text-xs first:pt-0 last:pb-0">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-white">{file.name}</h4>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase">{file.type} // {file.size}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] text-slate-500 font-mono">{file.date}</span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono bg-emerald-950/45 text-emerald-400 border border-emerald-900/30">{file.status}</span>
                        </div>
                      </div>
                    ))}
                    {clientUploads.length === 0 && <div className="text-center text-xs text-slate-400 py-8">No files uploaded yet.</div>}
                  </div>
                </div>
              </div>
            )}

            {/* Deliverables Tab */}
            {activeTab === 'deliverables' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">Completed Deliverables Library</h3>
                <div className="divide-y divide-slate-800">
                  {deliverables.map((file, idx) => (
                    <div key={file.id || idx} className="py-4 flex justify-between items-center text-xs first:pt-0">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-white">{file.name}</h4>
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">{file.type} // {file.size}</span>
                      </div>
                      <button onClick={() => handleDownload(file)} className="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-accent rounded-lg flex items-center gap-1.5 font-bold transition-all text-[11px]">
                        <Download size={14} /> Download
                      </button>
                    </div>
                  ))}
                  {deliverables.length === 0 && <div className="text-center text-xs text-slate-400 py-12">No completed deliverables available yet.</div>}
                </div>
              </div>
            )}

            {/* Support Section (always visible) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">Submit Support Request</h3>
                <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                    <input type="text" required value={ticketSubject} onChange={e => setTicketSubject(e.target.value)} placeholder="e.g. Inquire about Design Shading update" className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-accent rounded-xl text-xs text-white focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Details</label>
                    <textarea required rows={3} value={ticketMsg} onChange={e => setTicketMsg(e.target.value)} placeholder="Describe your inquiry..." className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-accent rounded-xl text-xs text-white focus:outline-none resize-none" />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" disabled={ticketLoading} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-accent text-xs text-white font-bold flex items-center gap-1.5 shadow disabled:opacity-50">
                      {ticketLoading ? <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />Submitting...</> : 'Submit Support Ticket'}
                    </button>
                  </div>
                </form>
              </div>
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">Portal FAQs</h3>
                <div className="space-y-2 text-xs">
                  {portalFaqs.slice(0, 4).map((faq, idx) => (
                    <div key={idx} className="border border-slate-800 rounded-xl overflow-hidden">
                      <button suppressHydrationWarning onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full text-left px-4 py-2.5 font-bold text-[11px] text-slate-300 flex items-center justify-between gap-3 hover:text-white transition-colors">
                        <span className="flex items-center gap-1.5"><QuestionIcon size={14} className="text-accent" /> {faq.q}</span>
                        <span>{activeFaq === idx ? '−' : '+'}</span>
                      </button>
                      {activeFaq === idx && <p className="px-4 pb-3 pt-0.5 text-[10px] text-slate-500 leading-relaxed border-t border-slate-800">{faq.a}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // MARKETING LANDING PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── LOGIN MODAL ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setShowLoginModal(false)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-md"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Top gradient bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#1e40af] via-[#06b6d4] to-[#1e40af]" />

                {/* Close button */}
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors z-10"
                >
                  <X size={16} className="text-slate-600" />
                </button>

                <div className="p-8 space-y-6">
                  {/* Logo + Header */}
                  <div className="flex flex-col items-center text-center space-y-3">
                    <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventRex Logo" className="h-10 w-auto object-contain" />
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        {loginMode === 'login' ? 'Welcome Back' : 'Request Access'}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        {loginMode === 'login'
                          ? 'Sign in to your secure KORK client portal'
                          : 'Contact us to receive your portal credentials'}
                      </p>
                    </div>
                  </div>

                  {/* Mode tabs */}
                  <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                    <button
                      onClick={() => setLoginMode('login')}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${loginMode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Client Login
                    </button>
                    <button
                      onClick={() => setLoginMode('request')}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${loginMode === 'request' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Request Access
                    </button>
                  </div>

                  {/* Login Form */}
                  {loginMode === 'login' && (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Secure Username</label>
                        <div className="relative group">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#06b6d4] transition-colors" size={16} />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="client@example.com"
                            suppressHydrationWarning
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/20 rounded-xl text-slate-900 focus:outline-none placeholder-slate-400 transition-all text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Secure Password</label>
                        <div className="relative group">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#06b6d4] transition-colors" size={16} />
                          <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            suppressHydrationWarning
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/20 rounded-xl text-slate-900 focus:outline-none placeholder-slate-400 transition-all text-sm"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        suppressHydrationWarning
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1e40af] to-[#06b6d4] hover:opacity-95 text-white font-black tracking-wide shadow-lg shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center transition-all transform hover:-translate-y-0.5 text-sm"
                      >
                        {loading ? (
                          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Authenticating...</>
                        ) : (
                          'Secure Authentication Login'
                        )}
                      </button>
                    </form>
                  )}

                  {/* Request Access Panel */}
                  {loginMode === 'request' && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                            <Mail size={18} className="text-[#1e40af]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">How to Get Access</p>
                            <p className="text-xs text-slate-500">Contact KORK to initiate your project</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Clients receive secure login credentials after project onboarding is complete. Contact KORK InventRex to begin a project and receive your portal credentials.
                        </p>
                      </div>
                      <div className="space-y-2">
                        {[
                          { icon: CheckCircle, text: 'Initiate your IP project with KORK' },
                          { icon: CheckCircle, text: 'Complete the onboarding process' },
                          { icon: CheckCircle, text: 'Receive secure credentials via email' },
                          { icon: CheckCircle, text: 'Log in and access your workspace' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-xs text-slate-600">
                            <item.icon size={14} className="text-[#06b6d4] shrink-0" />
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/contact"
                        onClick={() => setShowLoginModal(false)}
                        className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1e40af] to-[#06b6d4] text-white font-black tracking-wide shadow-lg text-center text-sm hover:opacity-95 transition-all transform hover:-translate-y-0.5"
                      >
                        Contact KORK to Get Started
                      </Link>
                    </div>
                  )}

                  <div className="text-center pt-1">
                    <button onClick={() => setShowLoginModal(false)} className="text-[11px] text-slate-400 hover:text-slate-600 font-semibold transition-colors">
                      ← Return to Client Portal Page
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PAGE CONTENT ────────────────────────────────────────────────────── */}
      <div className="w-full bg-white font-sans">

        {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
        <section className="relative py-16 pt-28 md:py-20 md:pt-32 bg-white overflow-hidden border-b border-slate-100">
          {/* Background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#dbeafe_0%,transparent_70%)] opacity-80" />

          <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  Client Portal
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  Manage Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                    Intellectual Property
                  </span>{' '}
                  Projects in One Place
                </h1>
                <p className="text-base text-slate-700 leading-relaxed max-w-xl font-medium">
                  Track project progress, securely share documents, submit support requests, receive project updates, and access deliverables through KORK's centralized client portal.
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xl border-l-4 border-blue-500 pl-4">
                The KORK Client Portal provides a secure environment for inventors, startups, businesses, patent professionals, and innovation teams to manage intellectual property projects from intake through completion.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLoginModal('login')}
                  id="hero-client-login-btn"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
                >
                  <Lock size={16} />
                  Client Login
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLoginModal('request')}
                  id="hero-request-access-btn"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-slate-900 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm transform hover:-translate-y-1 transition-all"
                >
                  <Globe size={16} />
                  Request Portal Access
                </motion.button>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-slate-200">
                {[
                  { value: 'Secure', label: 'Encrypted Storage' },
                  { value: 'Real-Time', label: 'Project Tracking' },
                  { value: '24/7', label: 'Portal Access' },
                ].map((stat, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="text-lg font-black text-blue-700">{stat.value}</div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Portal Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-3xl" />

                {/* Mock portal UI card */}
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Header bar */}
                  <div className="bg-slate-800/60 px-5 py-3.5 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <ShieldCheck size={12} className="text-emerald-400" />
                      SECURE SESSION ACTIVE
                    </div>
                  </div>

                  {/* Mock sidebar + content */}
                  <div className="flex h-72">
                    {/* Sidebar */}
                    <div className="w-40 bg-slate-900/60 border-r border-white/5 p-4 space-y-2 shrink-0">
                      {[
                        { icon: LayoutDashboard, label: 'Dashboard', active: true },
                        { icon: Clock, label: 'Projects', active: false },
                        { icon: MessageSquare, label: 'Messages', active: false },
                        { icon: UploadCloud, label: 'Upload', active: false },
                        { icon: FileText, label: 'Deliverables', active: false },
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[10px] font-bold ${item.active ? 'bg-blue-600/20 text-[#06b6d4] border border-blue-500/20' : 'text-slate-500'}`}>
                          <item.icon size={12} />
                          {item.label}
                        </div>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 space-y-3">
                      <div className="text-[10px] font-black text-[#06b6d4] uppercase tracking-widest font-mono">KORK CLIENT CONSOLE</div>
                      <div className="grid grid-cols-3 gap-2">
                        {[{ n: '3', l: 'Active Projects' }, { n: '2', l: 'Deliverables' }, { n: '5', l: 'Messages' }].map((c, i) => (
                          <div key={i} className="bg-slate-800/60 rounded-lg p-2.5 border border-white/5">
                            <div className="text-lg font-black text-white">{c.n}</div>
                            <div className="text-[8px] text-slate-500 uppercase tracking-wide mt-0.5">{c.l}</div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: 'Utility Drawing Set', pct: 75 },
                          { label: 'Prior Art Search', pct: 100 },
                          { label: 'Provisional Filing', pct: 40 },
                        ].map((p, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-[9px] text-slate-400">
                              <span>{p.label}</span>
                              <span className="text-[#06b6d4]">{p.pct}%</span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${p.pct}%` }}
                                transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-[#1e40af] to-[#06b6d4]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </section>

        {/* ── SECTION 1: WHY USE ────────────────────────────────────────────── */}
        <section className="py-14 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-10 space-y-3"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why Use The Client Portal?</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Managing intellectual property projects often involves multiple documents, communications, deadlines, and deliverables. The KORK Client Portal centralizes project information so clients can stay informed throughout every stage of the process.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group shine-card p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-blue-500/30 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-blue-900 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <b.icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">{b.label}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 2: DASHBOARD OVERVIEW ─────────────────────────────────── */}
        <section className="py-14 bg-slate-50 border-t border-b border-slate-200">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-10 space-y-3"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="shine-card p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-blue-900 flex items-center justify-center mb-4">
                    <f.icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: PROJECT MANAGEMENT ─────────────────────────────────── */}
        <section className="py-14 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Project Management</h2>
                <p className="text-slate-500 leading-relaxed">Each project receives a dedicated workspace with comprehensive tracking tools to keep you informed at every milestone.</p>
                <div className="space-y-3">
                  {projectFeatures.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="shine-card flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-blue-900 flex items-center justify-center shrink-0">
                        <f.icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{f.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Active Projects Tracker</h3>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono bg-emerald-50 text-emerald-600 border border-emerald-100">LIVE</span>
                  </div>
                  {[
                    { label: 'Utility Drawing Set — Inlet Valve', pct: 75, phase: 'Step 6: Patent Drawings', deadline: 'Jun 22, 2026', status: 'Draft Review' },
                    { label: 'Prior Art Patentability Search', pct: 100, phase: 'Step 3: Search & Evaluation', deadline: 'Jun 12, 2026', status: 'Completed' },
                    { label: 'Provisional Filing Coordination', pct: 40, phase: 'Step 5: Application Prep', deadline: 'Jul 10, 2026', status: 'Assembly' },
                  ].map((p, i) => (
                    <div key={i} className="space-y-2 pb-4 border-b border-slate-50 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-slate-800 leading-tight">{p.label}</span>
                        <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${p.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>{p.status}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.2, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-[#1e40af] to-[#06b6d4]"
                        />
                      </div>
                      <div className="flex justify-between text-[9px] text-slate-400">
                        <span>{p.phase}</span>
                        <span>Deadline: {p.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: DOCUMENT MANAGEMENT ────────────────────────────────── */}
        <section className="py-14 bg-slate-50 border-t border-b border-slate-200">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-10 space-y-3"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Secure Document Management</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Upload Center */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="shine-card p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-accent flex items-center justify-center shadow-md">
                    <UploadCloud size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Upload Center</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4 font-medium">Securely upload:</p>
                <div className="space-y-2">
                  {['Invention Disclosures', 'Photos & Sketches', 'CAD Files', 'Office Actions', 'Technical Documents', 'Supporting Materials'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Document Library */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <div className="shine-card p-8 rounded-2xl bg-[#0f172a] border border-slate-800 hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-800/20 text-blue-400 flex items-center justify-center">
                      <FolderOpen size={22} />
                    </div>
                    <h3 className="text-lg font-black text-white">Document Library</h3>
                  </div>
                  <p className="text-sm text-slate-400 mb-4 font-medium">Access:</p>
                  <div className="space-y-2">
                    {['Drawings & Reports', 'Project Files', 'Completed Deliverables', 'Filing Documents'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-slate-300 image-overlay-text">
                        <CheckCircle size={14} className="text-blue-400 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <ShieldCheck size={18} className="text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Version Tracking</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Maintain organized records of all revisions and updates.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: COMMUNICATION CENTER ───────────────────────────────── */}
        <section className="py-14 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Mock Chat UI */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-xl border border-slate-800">
                  <div className="bg-slate-800/60 px-5 py-3.5 border-b border-white/5 flex items-center gap-3">
                    <MessageSquare size={16} className="text-blue-400" />
                    <span className="text-xs font-bold text-white">Secure Project Messaging</span>
                    <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="p-5 space-y-4">
                    {[
                      { sender: 'support', text: 'Welcome to your KORK portal. Your drawings are in progress.', time: '10:02 AM' },
                      { sender: 'client', text: 'Great! Can you confirm receipt of the CAD files?', time: '10:15 AM' },
                      { sender: 'support', text: 'Confirmed. Files are secured and under review.', time: '10:18 AM' },
                    ].map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.4 }}
                        className={`max-w-[80%] rounded-2xl p-3.5 space-y-1 ${msg.sender === 'client' ? 'bg-blue-600/20 border border-blue-500/20 ml-auto text-slate-900' : 'bg-white border border-slate-200 text-slate-800'}`}
                      >
                        <p className="text-xs leading-relaxed">{msg.text}</p>
                        <span className="text-[9px] font-mono text-right block opacity-50">{msg.time}</span>
                      </motion.div>
                    ))}
                    <div className="flex gap-2 pt-2 border-t border-white/5">
                      <div className="flex-1 px-3 py-2 bg-slate-800/60 border border-white/10 rounded-xl text-[10px] text-slate-400">Type a secure message...</div>
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
                        <Send size={13} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-5"
              >
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Communication Center</h2>
                <p className="text-slate-600 leading-relaxed">Communicate with KORK project support personnel through a centralized messaging system designed for secure IP project coordination.</p>
                <div className="space-y-3">
                  {[
                    { title: 'Project Support Messaging', desc: 'Direct communication with your assigned KORK team.' },
                    { title: 'Document Requests', desc: 'Request specific files and materials through the portal.' },
                    { title: 'Status Updates', desc: 'Receive real-time notifications on project progress.' },
                    { title: 'Organized History', desc: 'All communication logged and accessible chronologically.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all">
                      <CheckCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: DELIVERABLES CENTER ────────────────────────────────── */}
        <section className="py-14 bg-slate-50 border-t border-b border-slate-200">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-10 space-y-3"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Deliverables Center</h2>
              <p className="text-slate-600 leading-relaxed">Access completed project outputs including all work products delivered throughout your IP project lifecycle.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverableExamples.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="shine-card group p-6 rounded-2xl border border-slate-100 bg-white hover:border-blue-500/30 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-secondary to-accent flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md">
                    <FileText size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{d.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{d.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: SUPPORT CENTER ──────────────────────────────────────── */}
        <section className="py-14 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-5"
              >
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Support Center</h2>
                <p className="text-slate-500 leading-relaxed">Need assistance? Submit support requests directly through the portal and receive timely responses from the KORK team.</p>
                <div className="space-y-3">
                  {supportCategories.map((cat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-blue-900 flex items-center justify-center shrink-0">
                        <CheckCircle size={15} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{cat}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-5"
              >
                <h3 className="text-lg font-black text-slate-900">Submit a Support Request</h3>
                <p className="text-sm text-slate-500">Log in to the portal to submit tickets directly to the KORK support team.</p>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                    <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-400">e.g. Drawing revision request</div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Details</label>
                    <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-400 h-20">Describe your request...</div>
                  </div>
                  <button
                    onClick={() => openLoginModal('login')}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1e40af] to-[#06b6d4] text-white font-black text-sm tracking-wide shadow-md hover:opacity-95 transition-all transform hover:-translate-y-0.5"
                  >
                    Login to Submit Request
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 8: SECURITY ───────────────────────────────────────────── */}
        <section className="py-14 bg-slate-50 border-t border-b border-slate-200">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-10 space-y-3"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Security & Confidentiality</h2>
              <p className="text-slate-600 leading-relaxed">KORK recognizes the importance of protecting intellectual property information. The portal implements multiple layers of security to safeguard your confidential materials.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="shine-card p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Shield size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Security Features</h3>
                </div>
                <div className="space-y-3">
                  {securityFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                      <ShieldCheck size={16} className="text-blue-600 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="shine-card p-8 rounded-2xl bg-[#0f172a] border border-slate-800 hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-800/20 text-blue-400 flex items-center justify-center">
                    <FileText size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white image-overlay-text">NDA Support</h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm image-overlay-text">NDA-supported workflows are available for eligible projects. KORK implements security measures designed to protect confidential project information and intellectual property materials throughout the project lifecycle.</p>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xs text-slate-400 leading-relaxed image-overlay-text">
                    <span className="text-blue-400 font-bold">Portal Communications Notice:</span> Communications submitted through the portal are directed to KORK InventRex personnel for project coordination purposes. Legal advice and attorney-client communications are provided separately by licensed patent attorneys when applicable.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 9: WHO USES THE PORTAL ────────────────────────────────── */}
        <section className="py-14 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-10 space-y-3"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Who Uses The Client Portal?</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {userTypes.map((u, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="shine-card group p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-blue-500/30 hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform shadow-md">
                    <u.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">{u.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{u.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ───────────────────────────────────────────────────── */}
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="container-custom max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 space-y-3"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            </motion.div>

            <div className="space-y-3">
              {portalFaqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-slate-50 transition-colors"
                    suppressHydrationWarning
                  >
                    <span className="text-base font-bold text-slate-900">{faq.q}</span>
                    <ChevronDown
                      className={`text-slate-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`}
                      size={20}
                    />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
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

        {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
        <section className="relative py-12 bg-blue-950 overflow-hidden text-white border-t border-slate-900/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#1e40af_0%,transparent_60%)] opacity-40" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-3xl"
          >
            <div className="flex-1 space-y-3 text-left">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                Stay Connected Throughout Your Intellectual Property Journey
              </h2>
              <p className="text-base text-slate-300 max-w-xl leading-relaxed">
                The KORK Client Portal provides transparency, organization, and visibility throughout every stage of the intellectual property process.
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-xl pt-2 border-t border-white/10">
                <span className="text-slate-300 font-semibold">Portal Communications Notice —</span> Communications submitted through the portal are directed to KORK InventRex personnel for project coordination purposes. Legal advice and attorney-client communications are provided separately by licensed patent attorneys and registered patent agents when applicable.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openLoginModal('login')}
                id="cta-client-login-btn"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
              >
                <Lock size={16} />
                Client Login
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openLoginModal('request')}
                id="cta-request-access-btn"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-white/10 border border-white/20 hover:bg-white/20 transform hover:-translate-y-0.5 transition-all"
              >
                <Globe size={16} />
                Request Portal Access
              </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
