'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Save, BellRing, Mail, Trash2 } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { isFirebaseConfigured } from '@/lib/firebase';

// Mock fallback data for clients
const MOCK_CLIENTS = [
  { id: '1', name: 'Acme Corp', email: 'contact@acme.com' },
  { id: '2', name: 'Global Innovations', email: 'info@globalinnovations.com' },
  { id: '3', name: 'Nexus Tech', email: 'ceo@nexustech.io' },
];

const PHASES = [
  'Initial Consultation',
  'Prior Art Search',
  'Design & Engineering',
  'Patent Drafting',
  'Filing & Prosecution',
  'Completed'
];

function ClientRow({ client, onDeleteClient }: { client: any, onDeleteClient: (id: string, name: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [addingProject, setAddingProject] = useState(false);

  // Sync projects subcollection in real-time when expanded
  useEffect(() => {
    if (!isExpanded) return;

    if (!isFirebaseConfigured()) {
      setProjects([
        { id: 'mock-p1', projectName: 'Mock Setup System', phase: 'Initial Consultation', progress: 40, createdAt: new Date().toISOString() }
      ]);
      return;
    }

    const projectsCol = collection(db, 'client_projects', client.id, 'projects');
    const q = query(projectsCol, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({
        id: doc.id,
        projectName: doc.data().projectName || '',
        phase: doc.data().phase || 'Initial Consultation',
        progress: doc.data().progress || 0,
        createdAt: doc.data().createdAt || '',
        ...doc.data()
      })));
    }, (err) => {
      console.error('Error fetching subcollection projects:', err);
    });

    return () => unsubscribe();
  }, [isExpanded, client.id]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    if (!isFirebaseConfigured()) {
      const mockProj = {
        id: `mock-${Date.now()}`,
        projectName: newProjectName,
        phase: 'Initial Consultation',
        progress: 10,
        createdAt: new Date().toISOString()
      };
      setProjects(prev => [mockProj, ...prev]);
      setNewProjectName('');
      alert('Project added successfully (Demo Staging).');
      return;
    }

    setAddingProject(true);
    try {
      const projectsCol = collection(db, 'client_projects', client.id, 'projects');
      const newDocRef = doc(projectsCol);
      await setDoc(newDocRef, {
        id: newDocRef.id,
        projectName: newProjectName,
        phase: 'Initial Consultation',
        progress: 10,
        createdAt: new Date().toISOString(),
        deadline: 'TBD'
      });
      setNewProjectName('');
    } catch (err: any) {
      console.error(err);
      alert('Failed to add project: ' + err.message);
    } finally {
      setAddingProject(false);
    }
  };

  const handleUpdateProject = async (proj: any) => {
    if (!isFirebaseConfigured()) {
      alert(`Updated ${proj.projectName} successfully (Demo Staging).`);
      return;
    }

    try {
      const projDocRef = doc(db, 'client_projects', client.id, 'projects', proj.id);
      await updateDoc(projDocRef, {
        phase: proj.phase,
        progress: proj.progress
      });
      alert(`Successfully saved progress for project "${proj.projectName}".`);
    } catch (err: any) {
      console.error(err);
      alert('Failed to update project: ' + err.message);
    }
  };

  const handleDeleteProject = async (projId: string, projName: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete project "${projName}"?`);
    if (!confirmDelete) return;

    if (!isFirebaseConfigured()) {
      setProjects(prev => prev.filter(p => p.id !== projId));
      alert(`Project "${projName}" deleted successfully (Demo Staging).`);
      return;
    }

    try {
      const projDocRef = doc(db, 'client_projects', client.id, 'projects', projId);
      await deleteDoc(projDocRef);
      alert(`Project "${projName}" has been deleted.`);
    } catch (err: any) {
      console.error(err);
      alert('Failed to delete project: ' + err.message);
    }
  };

  const handleProjProgressChange = (projId: string, newProgress: number) => {
    setProjects(prev => prev.map(p => p.id === projId ? { ...p, progress: newProgress } : p));
  };

  const handleProjPhaseChange = (projId: string, newPhase: string) => {
    setProjects(prev => prev.map(p => p.id === projId ? { ...p, phase: newPhase } : p));
  };

  return (
    <>
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors border-b border-slate-200 dark:border-slate-800">
        <td className="px-6 py-4">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white">{client.name}</span>
            <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Mail size={12}/> {client.email}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-350">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-accent hover:underline text-xs font-bold uppercase tracking-wider"
          >
            <span>{isExpanded ? 'Hide Projects' : 'Show Projects'}</span>
          </button>
        </td>
        <td className="px-6 py-4 text-xs font-semibold text-slate-500 font-mono">
          CLIENT_ID: {client.id.substring(0, 8)}...
        </td>
        <td className="px-6 py-4 text-right">
          <button 
            onClick={() => onDeleteClient(client.id, client.name)}
            className="inline-flex items-center gap-1.5 text-rose-500 hover:text-rose-600 transition-colors bg-rose-500/10 px-3 py-1.5 rounded-lg text-xs font-bold"
            title="Delete Client Account Permanently"
          >
            <Trash2 size={14} />
            <span>Delete Client</span>
          </button>
        </td>
      </tr>
      
      {isExpanded && (
        <tr className="bg-slate-50/50 dark:bg-slate-955/20">
          <td colSpan={4} className="px-8 py-6 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-6">
              
              {/* Header inside details */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Projects for {client.name}
                </h4>
                
                {/* Form to add a new project */}
                <form onSubmit={handleAddProject} className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter new project name..."
                    className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button
                    type="submit"
                    disabled={addingProject}
                    className="flex items-center gap-1 bg-accent text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-accent/90"
                  >
                    <Plus size={12} />
                    <span>{addingProject ? 'Adding...' : 'Add Project'}</span>
                  </button>
                </form>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/65 shadow-sm">
                    
                    {/* Project Title */}
                    <div className="md:col-span-4 space-y-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        {proj.projectName}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono block">
                        PROJECT_ID: {proj.id.substring(0, 8)}...
                      </span>
                    </div>

                    {/* Phase Selector */}
                    <div className="md:col-span-3">
                      <select
                        value={proj.phase}
                        onChange={(e) => handleProjPhaseChange(proj.id, e.target.value)}
                        className="block w-full text-xs border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-accent focus:border-accent bg-transparent text-slate-900 dark:text-white py-1.5 px-2.5"
                      >
                        {PHASES.map(phase => (
                          <option key={phase} value={phase}>{phase}</option>
                        ))}
                      </select>
                    </div>

                    {/* Progress Slider */}
                    <div className="md:col-span-3 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{proj.progress}% Complete</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={proj.progress}
                        onChange={(e) => handleProjProgressChange(proj.id, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-accent"
                      />
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex justify-end gap-2">
                      <button
                        onClick={() => handleUpdateProject(proj)}
                        className="p-1.5 text-accent bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
                        title="Save Changes"
                      >
                        <Save size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.projectName)}
                        className="p-1.5 text-rose-500 bg-rose-500/10 rounded-lg hover:bg-rose-555/20 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                  </div>
                ))}

                {projects.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-4">No projects registered for this client. Enter a project name above to create one.</p>
                )}
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function ClientProjectsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State for client creation
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [creating, setCreating] = useState(false);

  // 1. Sync client profiles from Firestore
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setClients(MOCK_CLIENTS);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'client_projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setClients(snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || '',
        email: doc.data().email || '',
        ...doc.data()
      })));
      setLoading(false);
    }, (err) => {
      console.error('Error fetching client projects, falling back to mock:', err);
      setClients(MOCK_CLIENTS);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteClient = async (clientId: string, clientName: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete client "${clientName}"?\n\n` +
      `This will permanently remove their Firebase login account, Firestore milestones, messages, and document control records. This action cannot be undone.`
    );
    if (!confirmDelete) return;

    if (!isFirebaseConfigured()) {
      setClients(prev => prev.filter(c => c.id !== clientId));
      alert(`Client "${clientName}" permanently deleted (Offline fallback simulation).`);
      return;
    }

    try {
      const response = await fetch('/api/admin/delete-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete client.');
      }

      alert(`Client "${clientName}" has been permanently deleted.`);
    } catch (err: any) {
      console.error(err);
      alert('Delete failed: ' + err.message);
    }
  };

  const handleCreateAccount = async () => {
    if (!newCompanyName || !newContactEmail || !newProjectName) {
      alert('All fields are mandatory.');
      return;
    }

    if (!isFirebaseConfigured()) {
      const fakeClient = {
        id: Date.now().toString(),
        name: newCompanyName,
        email: newContactEmail
      };
      setClients(prev => [fakeClient, ...prev]);
      alert('Account simulated successfully in offline fallback mode.');
      setIsCreateModalOpen(false);
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/admin/create-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCompanyName,
          email: newContactEmail,
          projectName: newProjectName
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to register client.');
      }

      if (result.emailSent === false) {
        alert(
          `Account created successfully in Auth & Firestore!\n\n` +
          `⚠️ Onboarding Welcome Email Failed to Send:\n` +
          `(${result.emailError || 'SMTP not configured'})\n\n` +
          `Please provide the client with these login details manually:\n` +
          `- Temporary Password: ${result.tempPassword}\n` +
          `- Verification Link: ${result.passwordResetLink}`
        );
      } else {
        alert('Account created and onboarding reset email dispatched successfully!');
      }

      setIsCreateModalOpen(false);
      setNewCompanyName('');
      setNewContactEmail('');
      setNewProjectName('');
    } catch (err: any) {
      console.error(err);
      alert('Onboarding failed: ' + err.message);
    } finally {
      setCreating(false);
    }
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Active Client Projects</h1>
          <p className="text-sm text-slate-500 mt-1">Manage client project phases, progress tracking, and accounts.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus size={16} />
          Create Client Account
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search by client company or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-505 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition-colors"
        />
      </div>

      {/* Projects List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Client Company</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/4">Projects</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Security Registry</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-450 animate-pulse">
                    Syncing client lists...
                  </td>
                </tr>
              ) : filteredClients.map((client) => (
                <ClientRow 
                  key={client.id}
                  client={client}
                  onDeleteClient={handleDeleteClient}
                />
              ))}
              {!loading && filteredClients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-505">
                    No clients found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Account Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Client Account</h2>
              <p className="text-sm text-slate-500 mt-1">An automated email will be sent to the client with their temporary password.</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company / Client Name</label>
                <input 
                  type="text" 
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-accent focus:border-accent bg-transparent text-slate-900 dark:text-white" 
                  placeholder="e.g. Acme Corp" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Email</label>
                <input 
                  type="email" 
                  value={newContactEmail}
                  onChange={(e) => setNewContactEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-accent focus:border-accent bg-transparent text-slate-900 dark:text-white" 
                  placeholder="contact@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Initial Project Name</label>
                <input 
                  type="text" 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-accent focus:border-accent bg-transparent text-slate-900 dark:text-white" 
                  placeholder="e.g. Smart Thermostat" 
                />
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                disabled={creating}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateAccount}
                disabled={creating}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors disabled:opacity-50"
              >
                <BellRing size={16} />
                <span>{creating ? 'Creating...' : 'Create & Notify'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
