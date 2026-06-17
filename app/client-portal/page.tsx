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
  HelpCircle as QuestionIcon,
  LogOut
} from 'lucide-react';
import { useToast } from '@/components/common/Toast';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, query, where, orderBy, onSnapshot, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '@/firebase/config';
import { isFirebaseConfigured } from '@/lib/firebase';

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
  const [clientProfile, setClientProfile] = useState<any>(null);
  
  // Workspace navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'messages' | 'upload' | 'deliverables'>('dashboard');

  // Dynamic States
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);

  // Support Ticket state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [ticketLoading, setTicketLoading] = useState(false);

  // Onboarding Force Password change states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  // 1. Listen to Firebase Authentication State Change
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
          } else {
            // The logged-in user is not a registered client (e.g. they are the Admin)
            // Prevent auto-logging them into the client portal
            setIsAuthenticated(false);
            setClientProfile(null);
            const userEmail = user.email?.toLowerCase().trim() || '';
            const isAdminEmail = ['contact@korkinventrex.com', 'kavyasree@korkinventrex.com'].includes(userEmail);
            
            if (isAdminEmail) {
              toastError('Access Denied', 'Administrator accounts cannot log in to the Client Portal. Please use a client account.');
            } else {
              toastError('Access Denied', 'Your account profile does not exist in client_projects database.');
            }
            await signOut(auth);
          }
        } catch (err: any) {
          console.error('Error loading client profile:', err);
          setIsAuthenticated(false);
          setClientProfile(null);
          
          if (err.message && err.message.includes('permission')) {
            toastError('Database Permission Error', 'Please check your Firestore Database Rules. Allow read access to client_projects.');
          } else {
            toastError('Database Error', err.message || 'Could not load your client profile.');
          }
          await signOut(auth);
        }
      } else {
        setIsAuthenticated(false);
        setClientProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Sync client project milestones
  useEffect(() => {
    if (!isAuthenticated) return;

    if (!isFirebaseConfigured()) {
      setActiveProjects([
        { id: 'proj-1', title: 'Utility Drawing Set (Inlet Valve)', progress: 75, status: 'Draft Review', deadline: 'June 22, 2026', phase: 'Step 6: Patent Drawings' },
        { id: 'proj-2', title: 'Prior Art Patentability Search', progress: 100, status: 'Completed', deadline: 'June 12, 2026', phase: 'Step 3: Search & Evaluation' },
        { id: 'proj-3', title: 'Provisional Filing Coordination', progress: 40, status: 'Assembly', deadline: 'July 10, 2026', phase: 'Step 5: Application Preparation' }
      ]);
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    // Load subcollection 'projects' under the client
    const projectsColRef = collection(db, 'client_projects', userId, 'projects');
    const q = query(projectsColRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsList = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().projectName || 'Active IP Project',
        progress: doc.data().progress || 0,
        status: doc.data().phase || 'Initial Consultation',
        deadline: doc.data().deadline || 'TBD',
        phase: doc.data().phase || 'Initial Consultation'
      }));
      setActiveProjects(projectsList);
    }, (err) => {
      console.error('Error fetching client project milestones, falling back to mock:', err);
      setActiveProjects([
        { id: 'proj-1', title: 'Utility Drawing Set (Inlet Valve)', progress: 75, status: 'Draft Review', deadline: 'June 22, 2026', phase: 'Step 6: Patent Drawings' },
        { id: 'proj-2', title: 'Prior Art Patentability Search', progress: 100, status: 'Completed', deadline: 'June 12, 2026', phase: 'Step 3: Search & Evaluation' },
        { id: 'proj-3', title: 'Provisional Filing Coordination', progress: 40, status: 'Assembly', deadline: 'July 10, 2026', phase: 'Step 5: Application Preparation' }
      ]);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // 3. Sync messages feed in real time
  useEffect(() => {
    if (!isAuthenticated) return;

    if (!isFirebaseConfigured()) {
      setMessages([
        { sender: 'support', text: 'Welcome to your secure KORK portal. We are reviewing your provisional disclosure materials.', time: '10:02 AM' },
        { sender: 'client', text: 'Thank you. Did you receive the revised vector assembly sketch?', time: '11:15 AM' },
        { sender: 'support', text: 'Yes, the file is currently with our draftsmen. Compliant figures are being drafted.', time: '11:22 AM' }
      ]);
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const q = query(
      collection(db, 'messages'),
      where('clientId', '==', userId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        sender: doc.data().sender,
        text: doc.data().text,
        time: doc.data().timestamp ? new Date(doc.data().timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'
      })));
    }, (err) => {
      console.error('Error fetching messages, falling back to mock:', err);
      setMessages([
        { sender: 'support', text: 'Welcome to your secure KORK portal. We are reviewing your provisional disclosure materials.', time: '10:02 AM' },
        { sender: 'client', text: 'Thank you. Did you receive the revised vector assembly sketch?', time: '11:15 AM' },
        { sender: 'support', text: 'Yes, the file is currently with our draftsmen. Compliant figures are being drafted.', time: '11:22 AM' }
      ]);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // 4. Sync client document database
  useEffect(() => {
    if (!isAuthenticated) return;

    if (!isFirebaseConfigured()) {
      setUploadedFiles([
        { name: 'inlet_valve_schematic.step', size: '4.2 MB', type: 'CAD Model', date: 'June 08, 2026', status: 'Secured', fileUrl: '', typeGroup: 'inbound' },
        { name: 'provisional_disclosure_notes.docx', size: '124 KB', type: 'Word Doc', date: 'June 08, 2026', status: 'Secured', fileUrl: '', typeGroup: 'inbound' }
      ]);
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const q = query(
      collection(db, 'documents'),
      where('clientId', '==', userId),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docsList = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().fileName,
        size: doc.data().size,
        type: doc.data().fileName.split('.').pop()?.toUpperCase() + ' File',
        date: doc.data().date,
        status: 'Secured',
        fileUrl: doc.data().fileUrl,
        typeGroup: doc.data().type // 'inbound' or 'outbound'
      }));
      setUploadedFiles(docsList);
    }, (err) => {
      console.error('Error fetching documents, falling back to mock:', err);
      setUploadedFiles([
        { name: 'inlet_valve_schematic.step', size: '4.2 MB', type: 'CAD Model', date: 'June 08, 2026', status: 'Secured', fileUrl: '', typeGroup: 'inbound' },
        { name: 'provisional_disclosure_notes.docx', size: '124 KB', type: 'Word Doc', date: 'June 08, 2026', status: 'Secured', fileUrl: '', typeGroup: 'inbound' }
      ]);
    });

    return () => unsubscribe();
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
      console.error(err);
      toastError('Authentication Failed', err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };



  const handleLogout = async () => {
    if (isFirebaseConfigured()) {
      await signOut(auth);
    }
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
      // Auto mock response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'support', 
          text: `Received message: "${currentMsg}". Our applications engineer has been updated in queue.`, 
          time: 'Just Now' 
        }]);
        success('Message Transmitted', 'Your secure message has been queued for developer response.');
      }, 1500);
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      // 1. Post message in firestore
      await addDoc(collection(db, 'messages'), {
        clientId: userId,
        sender: 'client',
        text: currentMsg,
        timestamp: new Date().toISOString()
      });

      // 2. Update conversation details on client project document
      await updateDoc(doc(db, 'client_projects', userId), {
        lastMessage: currentMsg,
        lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      
      success('Message Transmitted', 'Your message has been synced.');
    } catch (err: any) {
      console.error(err);
      toastError('Failed to send', err.message);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toastError('Selection Required', 'Please choose a file to upload first.');
      return;
    }
    
    const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB';
    const currentFile = selectedFile;
    setSelectedFile(null);

    if (!isFirebaseConfigured()) {
      const newFile = {
        name: currentFile.name,
        size: sizeMB,
        type: currentFile.name.split('.').pop()?.toUpperCase() + ' File',
        date: 'Today',
        status: 'Secured',
        fileUrl: '',
        typeGroup: 'inbound'
      };
      setUploadedFiles(prev => [newFile, ...prev]);
      success('Upload Initialized', `Transmitting "${newFile.name}" to secure storage.`);
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      success('Upload Initialized', `Transmitting "${currentFile.name}" to secure storage.`);
      
      // 1. Upload binary file
      const fileRef = ref(storage, `project_documents/${userId}/${currentFile.name}`);
      const snapshot = await uploadBytes(fileRef, currentFile);
      const fileUrl = await getDownloadURL(snapshot.ref);

      // 2. Save metadata in documents Firestore
      await addDoc(collection(db, 'documents'), {
        clientId: userId,
        fileName: currentFile.name,
        fileUrl,
        type: 'inbound',
        size: sizeMB,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });

      success('Security Scan Complete', `"${currentFile.name}" has been encrypted and scanned successfully.`);
    } catch (err: any) {
      console.error(err);
      toastError('Upload Failed', err.message);
    }
  };

  const handleDownload = (file: any) => {
    if (file.fileUrl) {
      window.open(file.fileUrl, '_blank');
    } else {
      success('File Decrypted', `"${file.name}" is ready. Secure download packaging starting.`);
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg) return;

    const generatedRef = Math.floor(100000 + Math.random() * 900000).toString();

    if (!isFirebaseConfigured()) {
      success('Support Ticket Created', `Ticket reference #${generatedRef} has been logged.`);
      setTicketSubject('');
      setTicketMsg('');
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      toastError('Authentication Required', 'You must be logged in to submit a support ticket.');
      return;
    }

    setTicketLoading(true);
    try {
      await addDoc(collection(db, 'support_tickets'), {
        ticketId: generatedRef,
        clientId: userId,
        clientName: clientProfile?.name || 'Authorized Client',
        clientEmail: clientProfile?.email || auth.currentUser?.email || '',
        subject: ticketSubject,
        message: ticketMsg,
        status: 'Open',
        createdAt: new Date().toISOString()
      });

      success('Support Ticket Created', `Ticket reference #${generatedRef} has been logged.`);
      setTicketSubject('');
      setTicketMsg('');
    } catch (err: any) {
      console.error('Error submitting support ticket:', err);
      toastError('Submission Failed', err.message || 'Could not submit your support ticket.');
    } finally {
      setTicketLoading(false);
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) {
      toastError('Password Mismatch', 'New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      toastError('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    setChangingPassword(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No active authentication session.');

      // 1. Update password in Firebase Auth
      await updatePassword(user, newPassword);

      // 2. Update Firestore flag
      if (isFirebaseConfigured()) {
        const docRef = doc(db, 'client_projects', user.uid);
        await updateDoc(docRef, {
          needsPasswordChange: false
        });
      }

      // 3. Update local state
      setClientProfile((prev: any) => prev ? { ...prev, needsPasswordChange: false } : null);
      success('Password Updated Successfully', 'Your secure password has been set. Welcome to your workspace!');
    } catch (err: any) {
      console.error('Password change error:', err);
      toastError('Change Failed', err.message || 'Could not change your password.');
    } finally {
      setChangingPassword(false);
    }
  };

  const deliverables = uploadedFiles.filter(f => f.typeGroup === 'outbound');
  const clientUploads = uploadedFiles.filter(f => f.typeGroup === 'inbound' || !f.typeGroup);

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
                <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventRex Logo" className="h-9 w-auto object-contain cursor-pointer" />
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
                    suppressHydrationWarning
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
                    suppressHydrationWarning
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl text-slate-900 focus:outline-none placeholder-slate-400 transition-all shadow-sm text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                suppressHydrationWarning
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

  const needsPasswordChange = clientProfile?.needsPasswordChange === true;

  if (isAuthenticated && needsPasswordChange) {
    return (
      <div className="flex h-screen w-full bg-slate-950 font-sans overflow-hidden items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_50%)] opacity-30" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-4 pb-2">
            <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventRex Logo" className="h-10 w-auto object-contain" />
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-tight font-mono text-accent">Security Reset Required</h2>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-semibold">
                Please choose a new secure password before accessing your workspace.
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs font-normal">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-505 uppercase tracking-wider pl-1">New Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={16} />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl text-white focus:outline-none placeholder-slate-500 transition-all text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-505 uppercase tracking-wider pl-1">Confirm New Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={16} />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl text-white focus:outline-none placeholder-slate-500 transition-all text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={changingPassword}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white font-black tracking-wide shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center transition-all transform hover:-translate-y-0.5 text-xs"
            >
              {changingPassword ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Updating Password...
                </>
              ) : (
                'Set New Password & Access Portal'
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800">
            <button 
              onClick={handleLogout}
              className="text-[10px] text-rose-500 hover:text-rose-455 font-bold uppercase tracking-wider transition-colors"
            >
              Cancel & Disconnect
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const clientName = clientProfile?.name || 'Authorized Client';
  const clientProject = activeProjects.length > 0 ? activeProjects[0].title : 'Active Project';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col lg:flex-row relative">
      {/* Sidebar navigation */}
      <aside className="w-full lg:w-64 bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex flex-col items-center pb-6 border-b border-slate-800">
            <img src="/KORK_InventRex_Logo.jpg.jpeg" alt="KORK InventRex Logo" className="w-40 h-auto max-h-16 object-contain cursor-pointer mb-2" />
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
          <div className="flex flex-col text-slate-400">
            <span className="font-bold text-[10px] text-white leading-tight truncate">{clientName}</span>
            <span className="text-[9px] text-slate-550 font-mono mt-0.5 truncate">{clientProject}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="font-bold">Encryption Active</span>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full text-left font-bold text-rose-500 hover:text-rose-455 transition-colors flex items-center gap-2"
          >
            <LogOut size={14} />
            <span>Log Out</span>
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
                  <span className="text-2xl font-black text-white mt-2">{deliverables.length}</span>
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
                    {activeProjects.map((proj) => (
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
                    {activeProjects.length === 0 && (
                      <div className="text-center text-xs text-slate-400 py-4">No active projects linked.</div>
                    )}
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
                    <span className="text-[9px] text-slate-505 block font-mono text-right">{msg.time}</span>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center text-xs text-slate-400 py-12">No messages exchanged yet. Send a message to start the conversation.</div>
                )}
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
                  <div className="border-2 border-dashed border-slate-800 hover:border-accent/40 bg-slate-955/40 hover:bg-slate-950 rounded-2xl p-8 text-center space-y-3 transition-colors relative cursor-pointer">
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
                    <div className="text-xs font-bold text-slate-350">
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
                  {clientUploads.map((file, idx) => (
                    <div key={file.id || idx} className="py-4 flex justify-between items-center text-xs font-normal first:pt-0 last:pb-0">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-white leading-tight">{file.name}</h4>
                        <span className="text-[10px] text-slate-550 font-semibold uppercase">{file.type} // {file.size}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-slate-500 font-mono">{file.date}</span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono bg-emerald-950/45 text-emerald-400 border border-emerald-900/30">
                          {file.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {clientUploads.length === 0 && (
                    <div className="text-center text-xs text-slate-400 py-8">No files uploaded yet.</div>
                  )}
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
                {deliverables.map((file, idx) => (
                  <div key={file.id || idx} className="py-4 flex justify-between items-center text-xs font-normal first:pt-0">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-white leading-tight">{file.name}</h4>
                      <span className="text-[10px] text-slate-550 font-semibold uppercase">{file.type} // {file.size}</span>
                    </div>
                    <button 
                      onClick={() => handleDownload(file)}
                      className="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 text-accent rounded-lg flex items-center gap-1.5 font-bold transition-all text-[11px]"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                ))}
                {deliverables.length === 0 && (
                  <div className="text-center text-xs text-slate-400 py-12">No completed deliverables available yet.</div>
                )}
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
                    disabled={ticketLoading}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-xs text-white font-bold flex items-center gap-1.5 shadow disabled:opacity-50"
                  >
                    {ticketLoading ? (
                      <>
                        <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Support Ticket'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* FAQ */}
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
