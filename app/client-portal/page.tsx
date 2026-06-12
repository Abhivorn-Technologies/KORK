'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Layers, 
  MessageSquare, 
  UploadCloud, 
  Download, 
  FileText,
  Clock, 
  HelpCircle,
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowUpRight,
  Send,
  CheckCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { useToast } from '@/components/common/Toast';

const portalFaqs = [
  { q: 'How do I obtain secure login credentials?', a: 'Authorized clients receive login credentials via email once project onboarding is finalized.' },
  { q: 'What types of files can I upload in the Upload Center?', a: 'You can upload CAD files (STEP, IGES, SolidWorks), vector drawings, hand sketches, photographs, PDFs, and Office Action letters.' },
  { q: 'Is my uploaded information encrypted?', a: 'Yes. KORK utilizes industry-standard SSL encryption and restricted access controls for all data transfers and document libraries.' },
  { q: 'Can I add team members to my workspace?', a: 'Yes. Account administrators can request workspace access grants for engineers, stakeholders, or patent agents.' }
];

export default function ClientPortalPage() {
  const { success, error: toastError } = useToast();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Workspace navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'messages' | 'upload' | 'deliverables'>('dashboard');

  // Messages State
  const [messages, setMessages] = useState<{ sender: 'client' | 'support'; text: string; time: string }[]>([
    { sender: 'support', text: 'Welcome to your secure KORK portal. We are reviewing your provisional disclosure materials.', time: '10:02 AM' },
    { sender: 'client', text: 'Thank you. Did you receive the revised vector assembly sketch?', time: '11:15 AM' },
    { sender: 'support', text: 'Yes, the file is currently with our draftsmen. Compliant figures are being drafted.', time: '11:22 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Upload State
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string; date: string; status: string }[]>([
    { name: 'inlet_valve_schematic.step', size: '4.2 MB', type: 'CAD Model', date: 'June 08, 2026', status: 'Secured' },
    { name: 'provisional_disclosure_notes.docx', size: '124 KB', type: 'Word Doc', date: 'June 08, 2026', status: 'Secured' }
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Active projects list
  const [activeProjects, setActiveProjects] = useState([
    { id: 'proj-1', title: 'Utility Drawing Set (Inlet Valve)', progress: 75, status: 'Draft Review', deadline: 'June 22, 2026', phase: 'Step 6: Patent Drawings' },
    { id: 'proj-2', title: 'Prior Art Patentability Search', progress: 100, status: 'Completed', deadline: 'June 12, 2026', phase: 'Step 3: Search & Evaluation' },
    { id: 'proj-3', title: 'Provisional Filing Coordination', progress: 40, status: 'Assembly', deadline: 'July 10, 2026', phase: 'Step 5: Application Preparation' }
  ]);

  // Support Ticket state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Load custom inquiries from local storage as active projects to make it reactive
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEnquiries = JSON.parse(localStorage.getItem('mock_enquiries') || '[]');
      if (savedEnquiries.length > 0) {
        const mappedProjects = savedEnquiries.map((enq: any, idx: number) => ({
          id: enq.id || `proj-enq-${idx}`,
          title: enq.message ? (enq.message.length > 30 ? enq.message.substring(0, 30) + '...' : enq.message) : 'Custom Consultation Staging',
          progress: 15,
          status: 'Confidential Intake',
          deadline: 'TBD',
          phase: 'Step 2: Confidential Review'
        }));
        setActiveProjects(prev => [...mappedProjects, ...prev]);
      }
    }
  }, [isAuthenticated]);

  // Hide the global header and footer ONLY when logged into the dashboard
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isAuthenticated) {
      document.body.classList.add('portal-dashboard-active');
    } else {
      document.body.classList.remove('portal-dashboard-active');
    }
    return () => {
      document.body.classList.remove('portal-dashboard-active');
    };
  }, [isAuthenticated]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      if (email === 'client@kork.com' && password === 'clientpassword') {
        setIsAuthenticated(true);
        success('Secure Authentication Succeeded', 'Welcome to your secure IP client workspace.');
      } else {
        toastError('Authentication Failed', 'Invalid credentials. Hint: use client@kork.com / clientpassword, or enter sandbox mode.');
      }
    }, 1200);
  };

  const enterSandboxMode = () => {
    setIsAuthenticated(true);
    success('Workspace Staging Active', 'Logged in using Sandbox/Demo credentials.');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'client', text: newMessage, time: 'Just Now' }]);
    const currentMsg = newMessage;
    setNewMessage('');
    
    // Auto mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'support', 
        text: `Received message: "${currentMsg}". Our applications engineer has been updated in queue.`, 
        time: 'Just Now' 
      }]);
      success('Message Transmitted', 'Your secure message has been queued for developer response.');
    }, 1500);
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toastError('Selection Required', 'Please choose a file to upload first.');
      return;
    }
    
    const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB';
    const newFile = {
      name: selectedFile.name,
      size: sizeMB,
      type: selectedFile.name.split('.').pop()?.toUpperCase() + ' File' || 'Document',
      date: 'Today',
      status: 'Scanning...'
    };
    
    setUploadedFiles(prev => [newFile, ...prev]);
    setSelectedFile(null);
    success('Upload Initialized', `Transmitting "${newFile.name}" to secure storage.`);

    // Mock scan complete
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(f => f.name === newFile.name ? { ...f, status: 'Secured' } : f));
      success('Security Scan Complete', `"${newFile.name}" has been encrypted and scanned successfully.`);
    }, 2500);
  };

  const triggerDownload = (fileName: string) => {
    success('File Decrypted', `"${fileName}" is ready. Secure download packaging starting.`);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg) return;
    success('Support Ticket Created', `Ticket reference #${Math.floor(100000 + Math.random() * 900000)} has been logged.`);
    setTicketSubject('');
    setTicketMsg('');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full bg-slate-950 font-sans overflow-hidden">
        
        {/* LEFT SIDE: Info Section (Dark Mode) */}
        <div className="relative hidden md:flex w-1/2 lg:w-[55%] h-full flex-col justify-center p-12 lg:p-20 overflow-hidden">
          {/* Animated Background Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_50%)] opacity-30" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 space-y-12 max-w-lg">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-accent text-xs font-bold uppercase tracking-wider">
                Authorized Access Only
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Secure Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Workspace</span>
              </h1>
              <p className="text-base text-slate-350 leading-relaxed">
                Log in to coordinate filings, review secure CAD drawings, and communicate directly with your assigned intellectual property professionals.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-950 border border-blue-900/50 text-accent">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Military-Grade Encryption</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">All design files, sketches, and communications are secured via SSL and restricted database rules.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-950 border border-blue-900/50 text-accent">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Real-Time Milestone Tracking</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">Monitor the exact status of your prior art searches, illustrations, and patent application drafting.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-950 border border-blue-900/50 text-accent">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Direct Professional Access</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">Submit secure support tickets and chat directly with applications engineers and draftsmen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form (Light Mode) */}
        <div className="relative w-full md:w-1/2 lg:w-[45%] h-full bg-white flex flex-col justify-center items-center p-6 sm:p-12">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-sm space-y-5"
          >
            {/* Logo */}
            <div className="flex flex-col items-center text-center space-y-4 pb-1">
              <Link href="/">
                <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventReX Logo" className="h-9 w-auto object-contain cursor-pointer" />
              </Link>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Sign in to your client portal</p>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Secure Username</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@kork.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl text-slate-900 focus:outline-none placeholder-slate-400 transition-all shadow-sm text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl text-slate-900 focus:outline-none placeholder-slate-400 transition-all shadow-sm text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white font-black tracking-wide shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center transition-all transform hover:-translate-y-0.5 text-xs"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Authenticating Port...
                  </>
                ) : (
                  'Secure Authentication Login'
                )}
              </button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200" />
              <span className="flex-shrink mx-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            <button
              onClick={enterSandboxMode}
              className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-bold text-xs transition-all flex justify-center items-center gap-2 group shadow-sm"
            >
              Access Sandbox Mode <ArrowUpRight size={14} className="text-slate-400 group-hover:text-accent transition-colors" />
            </button>
            
            <div className="text-center pt-2">
              <Link href="/" className="text-[9px] text-slate-500 hover:text-accent font-bold uppercase tracking-wider transition-colors">
                &larr; Return to Homepage
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col lg:flex-row relative">
      {/* Sidebar navigation */}
      <aside className="w-full lg:w-64 bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex flex-col items-center pb-6 border-b border-slate-800">
            <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventReX Logo" className="w-40 h-auto max-h-16 object-contain cursor-pointer mb-2" />
            <div className="flex flex-col text-center">
              <span className="text-[8px] font-semibold text-accent uppercase mt-1 leading-none tracking-wider font-mono">Workspace v1.2</span>
            </div>
          </div>

          <nav className="space-y-1 text-xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold transition-all border ${
                activeTab === 'dashboard' ? 'bg-slate-800 border-slate-700 text-white shadow' : 'border-transparent text-slate-450 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Workspace Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold transition-all border ${
                activeTab === 'projects' ? 'bg-slate-800 border-slate-700 text-white shadow' : 'border-transparent text-slate-450 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <Clock size={16} />
              <span>Active Projects Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold transition-all border ${
                activeTab === 'messages' ? 'bg-slate-800 border-slate-700 text-white shadow' : 'border-transparent text-slate-450 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <MessageSquare size={16} />
              <span>Secure Messaging Feeds</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold transition-all border ${
                activeTab === 'upload' ? 'bg-slate-800 border-slate-700 text-white shadow' : 'border-transparent text-slate-450 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <UploadCloud size={16} />
              <span>Document Upload Center</span>
            </button>

            <button
              onClick={() => setActiveTab('deliverables')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold transition-all border ${
                activeTab === 'deliverables' ? 'bg-slate-800 border-slate-700 text-white shadow' : 'border-transparent text-slate-450 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <FileText size={16} />
              <span>Completed Deliverables</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-800 text-slate-500 text-[10px] space-y-4">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="font-bold">Encryption Active</span>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full text-left font-bold text-rose-500 hover:text-rose-455 transition-colors"
          >
            Disconnect Portal Workspace
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-850">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight uppercase font-mono text-accent">KORK CLIENT CONSOLE</h2>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">Secure Workspace Session</p>
            </div>
            <div className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
              IP PORT STATUS: SECURE_SYNC
            </div>
          </div>

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Snapshot Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Active IP Projects</span>
                  <span className="text-2xl font-black text-white mt-2">{activeProjects.length}</span>
                  <button onClick={() => setActiveTab('projects')} className="text-[10px] text-accent hover:text-white font-bold flex items-center gap-1 mt-4 transition-colors">
                    View Project Milestones <ArrowUpRight size={12} />
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Compliant Deliverables</span>
                  <span className="text-2xl font-black text-white mt-2">2 Files</span>
                  <button onClick={() => setActiveTab('deliverables')} className="text-[10px] text-accent hover:text-white font-bold flex items-center gap-1 mt-4 transition-colors">
                    Download Documents <ArrowUpRight size={12} />
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Assigned Professionals</span>
                  <span className="text-2xl font-black text-white mt-2">1 Atty / 1 Draftsman</span>
                  <button onClick={() => setActiveTab('messages')} className="text-[10px] text-accent hover:text-white font-bold flex items-center gap-1 mt-4 transition-colors">
                    Open Message Feed <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>

              {/* Projects Summary & Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Active Projects Tracker Panel */}
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">
                    Active IP Projects Progress
                  </h3>
                  <div className="space-y-4">
                    {activeProjects.slice(0, 3).map((proj) => (
                      <div key={proj.id} className="space-y-1.5 text-xs font-normal">
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
                  </div>
                </div>

                {/* Secure File Upload Quick Widget */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">
                      Upload Center Quick Access
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                      Securely upload sketches, CAD drawings, or examiner objections to your assigned team.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900 text-xs text-white font-bold flex items-center justify-center gap-2 transition-all mt-4"
                  >
                    <UploadCloud size={16} />
                    Open Upload Dashboard
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-850">
                Active Projects Milestones Tracker
              </h3>
              
              <div className="space-y-6">
                {activeProjects.map((proj) => (
                  <div 
                    key={proj.id}
                    className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                        <span className="text-[10px] text-slate-500 font-bold block mt-1 font-mono">{proj.id} // {proj.phase}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase text-center shrink-0 tracking-wider font-mono ${
                        proj.status === 'Completed' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' : 'bg-blue-950/40 text-blue-400 border border-blue-900/30'
                      }`}>
                        {proj.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-450">Milestone Progress</span>
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

          {/* TAB 3: SECURE MESSAGING */}
          {activeTab === 'messages' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col h-[550px] justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">
                Secure Chat Feed with Support Team
              </h3>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 text-xs font-normal">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`max-w-[80%] rounded-2xl p-4 space-y-1 leading-relaxed ${
                      msg.sender === 'client' ? 'bg-accent/10 border border-accent/20 text-slate-200 ml-auto' : 'bg-slate-950/60 border border-slate-850 text-slate-350'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-slate-500 block font-mono text-right">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-3 pt-4 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Type a secure message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 bg-slate-950 border border-slate-800 focus:border-accent rounded-xl text-xs text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-3 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white flex items-center justify-center shadow"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: UPLOAD CENTER */}
          {activeTab === 'upload' && (
            <div className="space-y-8">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">
                  Secure Document & CAD Upload Center
                </h3>

                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div className="border-2 border-dashed border-slate-800 hover:border-accent/40 bg-slate-950/40 hover:bg-slate-950 rounded-2xl p-8 text-center space-y-3 transition-colors relative cursor-pointer">
                    <input 
                      type="file" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud size={32} className="mx-auto text-slate-500" />
                    <div className="text-xs font-bold text-slate-300">
                      {selectedFile ? `Selected File: ${selectedFile.name}` : 'Drag & drop or click to choose CAD files, sketches, or photos'}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">STEP, IGES, SolidWorks, DWG, PDF, PNG, JPG accepted. Max size: 25MB.</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-xs text-white font-bold flex items-center gap-1.5 shadow"
                    >
                      <UploadCloud size={14} />
                      Upload Selected File
                    </button>
                  </div>
                </form>
              </div>

              {/* Uploaded files list */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">
                  Secure File Registry
                </h3>
                <div className="divide-y divide-slate-850">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="py-4 flex justify-between items-center text-xs font-normal first:pt-0 last:pb-0">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-white leading-tight">{file.name}</h4>
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">{file.type} // {file.size}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-slate-500 font-mono">{file.date}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${
                          file.status === 'Secured' ? 'bg-emerald-950/45 text-emerald-400 border border-emerald-900/30' : 'bg-amber-955/40 text-amber-500 border border-amber-900/30 animate-pulse'
                        }`}>
                          {file.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DELIVERABLES */}
          {activeTab === 'deliverables' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">
                Completed Deliverables Library
              </h3>

              <div className="divide-y divide-slate-850">
                <div className="py-4 flex justify-between items-center text-xs font-normal first:pt-0">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white leading-tight">prior_art_patentability_report.pdf</h4>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">PDF Report // 840 KB</span>
                  </div>
                  <button 
                    onClick={() => triggerDownload('prior_art_patentability_report.pdf')}
                    className="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 text-accent rounded-lg flex items-center gap-1.5 font-bold transition-all text-[11px]"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>

                <div className="py-4 flex justify-between items-center text-xs font-normal">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white leading-tight">inlet_valve_utility_figures_draft1.pdf</h4>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">PDF Drawings // 1.4 MB</span>
                  </div>
                  <button 
                    onClick={() => triggerDownload('inlet_valve_utility_figures_draft1.pdf')}
                    className="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 text-accent rounded-lg flex items-center gap-1.5 font-bold transition-all text-[11px]"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Support Ticket Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Create ticket form */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">
                Submit Support Request / Ticket
              </h3>
              
              <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs font-normal">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Inquire about Design Shading update"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-accent rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Details / Description</label>
                  <textarea
                    required
                    rows={3}
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    placeholder="Describe your inquiry, billing query, or drawing questions..."
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-accent rounded-xl text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-xs text-white font-bold flex items-center gap-1.5 shadow"
                  >
                    Submit Support Ticket
                  </button>
                </div>
              </form>
            </div>

            {/* Portal FAQs */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">
                Portal Security & FAQs
              </h3>
              
              <div className="space-y-2 text-xs font-normal">
                {portalFaqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-850 rounded-xl overflow-hidden bg-slate-955/20">
                    <button suppressHydrationWarning                       onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full text-left px-4 py-2.5 font-bold text-[11px] text-slate-300 flex items-center justify-between gap-3 hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-1.5"><QuestionIcon size={14} className="text-accent" /> {faq.q}</span>
                      <span>{activeFaq === idx ? '−' : '+'}</span>
                    </button>
                    {activeFaq === idx && (
                      <p className="px-4 pb-3 pt-0.5 text-[10px] text-slate-500 leading-relaxed font-normal border-t border-slate-850">
                        {faq.a}
                      </p>
                    )}
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
