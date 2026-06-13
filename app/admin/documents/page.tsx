'use client';

import { useState, useEffect } from 'react';
import { Search, Upload, Download, FileText, FolderOpen, ArrowDownToLine, Trash2 } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '@/firebase/config';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { isFirebaseConfigured } from '@/lib/firebase';

export default function DocumentsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [activeClient, setActiveClient] = useState<string>('');
  const [files, setFiles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Sync client project profiles
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      const mockClients = [
        { id: '1', name: 'Acme Corp', project: 'Smart Thermostat V2' },
        { id: '2', name: 'Global Innovations', project: 'Drone Delivery System' },
        { id: '3', name: 'Nexus Tech', project: 'Quantum Encrypter' },
      ];
      setClients(mockClients);
      setActiveClient('1');
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'client_projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || 'Unnamed Client',
        project: doc.data().projectName || 'Active Project'
      }));
      setClients(projects);
      if (projects.length > 0 && !activeClient) {
        setActiveClient(projects[0].id);
      }
      setLoading(false);
    }, (err) => {
      console.error('Error fetching project clients, falling back to mock:', err);
      const mockClients = [
        { id: '1', name: 'Acme Corp', project: 'Smart Thermostat V2' },
        { id: '2', name: 'Global Innovations', project: 'Drone Delivery System' },
        { id: '3', name: 'Nexus Tech', project: 'Quantum Encrypter' },
      ];
      setClients(mockClients);
      if (mockClients.length > 0 && !activeClient) {
        setActiveClient(mockClients[0].id);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Sync document files
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      const mockFiles = [
        { id: 'f1', clientId: '1', fileName: 'Acme_Thermostat_Sketches.pdf', type: 'inbound', date: 'Oct 12, 2023', size: '2.4 MB' },
        { id: 'f2', clientId: '1', fileName: 'Housing_Assembly.step', type: 'inbound', date: 'Oct 14, 2023', size: '15.1 MB' },
        { id: 'f3', clientId: '1', fileName: 'Prior_Art_Search_Results.pdf', type: 'outbound', date: 'Oct 20, 2023', size: '1.2 MB' },
        { id: 'f4', clientId: '2', fileName: 'Rotor_Specs.docx', type: 'inbound', date: 'Nov 02, 2023', size: '800 KB' },
        { id: 'f5', clientId: '2', fileName: 'Drone_V1_Draft_Claims.pdf', type: 'outbound', date: 'Nov 10, 2023', size: '3.5 MB' },
      ];
      setFiles(mockFiles);
      return;
    }

    const q = query(collection(db, 'documents'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFiles(docsList);
    }, (err) => {
      console.error('Error syncing documents metadata, falling back to mock:', err);
      const mockFiles = [
        { id: 'f1', clientId: '1', fileName: 'Acme_Thermostat_Sketches.pdf', type: 'inbound', date: 'Oct 12, 2023', size: '2.4 MB' },
        { id: 'f2', clientId: '1', fileName: 'Housing_Assembly.step', type: 'inbound', date: 'Oct 14, 2023', size: '15.1 MB' },
        { id: 'f3', clientId: '1', fileName: 'Prior_Art_Search_Results.pdf', type: 'outbound', date: 'Oct 20, 2023', size: '1.2 MB' },
        { id: 'f4', clientId: '2', fileName: 'Rotor_Specs.docx', type: 'inbound', date: 'Nov 02, 2023', size: '800 KB' },
        { id: 'f5', clientId: '2', fileName: 'Drone_V1_Draft_Claims.pdf', type: 'outbound', date: 'Nov 10, 2023', size: '3.5 MB' },
      ];
      setFiles(mockFiles);
    });

    return () => unsubscribe();
  }, []);

  const clientFiles = files.filter(f => f.clientId === activeClient);
  const inboundFiles = clientFiles.filter(f => f.type === 'inbound');
  const outboundFiles = clientFiles.filter(f => f.type === 'outbound');

  const activeClientName = clients.find(c => c.id === activeClient)?.name || '';

  const handleUploadClick = () => {
    if (!activeClient) {
      alert('Please select a client account first.');
      return;
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx,.zip,.step,.iges';
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        
        if (!isFirebaseConfigured()) {
          const fileObj = {
            id: Date.now().toString(),
            clientId: activeClient,
            fileName: file.name,
            type: 'outbound',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          };
          setFiles(prev => [...prev, fileObj]);
          alert(`Successfully uploaded ${file.name} to ${activeClientName} (Staging Demo Mode).`);
          return;
        }

        try {
          alert(`Uploading "${file.name}" to secure Firebase Storage...`);
          // 1. Upload file binary
          const fileRef = ref(storage, `project_documents/${activeClient}/${file.name}`);
          const snapshot = await uploadBytes(fileRef, file);
          const fileUrl = await getDownloadURL(snapshot.ref);

          // 2. Add description entry in firestore collection
          await addDoc(collection(db, 'documents'), {
            clientId: activeClient,
            fileName: file.name,
            fileUrl,
            type: 'outbound', // Admin uploads are outbound deliverables
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          });

          alert(`Successfully uploaded and registered "${file.name}".`);
        } catch (err: any) {
          console.error(err);
          alert('Upload Failed: ' + err.message);
        }
      }
    };
    fileInput.click();
  };

  const handleDownload = (file: any) => {
    if (file.fileUrl) {
      window.open(file.fileUrl, '_blank');
    } else {
      alert(`Downloading ${file.fileName}...`);
    }
  };

  const handleDelete = async (id: string, fileName: string) => {
    if (!confirm(`Are you sure you want to delete ${fileName}?`)) return;

    if (!isFirebaseConfigured()) {
      setFiles(files.filter(f => f.id !== id));
      return;
    }

    try {
      await deleteDoc(doc(db, 'documents', id));
      alert(`Deleted ${fileName} successfully.`);
    } catch (err: any) {
      console.error(err);
      alert('Delete Failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Document Control Center</h1>
        <p className="text-sm text-slate-500 mt-1">Manage inbound client uploads and outbound KORK deliverables.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar: Client Selector */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-16rem)]">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Select Client</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={14} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Filter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-8 pr-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {loading ? (
                <div className="text-center text-xs text-slate-400 py-8 animate-pulse">Syncing client profiles...</div>
              ) : clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(client => (
                <button
                  key={client.id}
                  onClick={() => setActiveClient(client.id)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex flex-col gap-0.5",
                    activeClient === client.id 
                      ? "bg-accent/10 text-accent font-semibold" 
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <span>{client.name}</span>
                  <span className="text-[10px] text-slate-500 truncate font-normal">{client.project}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content: Document Lists */}
        <div className="w-full lg:w-3/4 space-y-6">
          
          {/* Outbound Deliverables (KORK to Client) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FolderOpen size={18} className="text-accent" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Outbound Deliverables</h2>
              </div>
              <button 
                onClick={handleUploadClick}
                className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
              >
                <Upload size={14} />
                Upload Deliverable
              </button>
            </div>
            
            <div className="p-0">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                <thead className="bg-slate-50/50 dark:bg-slate-900/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">File Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {outboundFiles.map(file => (
                    <tr key={file.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <FileText size={16} className="text-slate-400" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{file.fileName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-500">{file.date}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-500">{file.size}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button onClick={() => handleDownload(file)} className="text-slate-400 hover:text-accent transition-colors p-1" title="Download">
                          <ArrowDownToLine size={16} />
                        </button>
                        <button onClick={() => handleDelete(file.id, file.fileName)} className="text-slate-400 hover:text-rose-500 transition-colors p-1" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {outboundFiles.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                        No deliverables have been uploaded for this client yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inbound Files (Client to KORK) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Download size={18} className="text-slate-500 dark:text-slate-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Inbound Client Uploads</h2>
              </div>
            </div>
            
            <div className="p-0">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                <thead className="bg-slate-50/50 dark:bg-slate-900/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">File Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Uploaded</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {inboundFiles.map(file => (
                    <tr key={file.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <FileText size={16} className="text-slate-400" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{file.fileName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-500">{file.date}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-500">{file.size}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button onClick={() => handleDownload(file)} className="text-slate-400 hover:text-accent transition-colors p-1" title="Download">
                          <ArrowDownToLine size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {inboundFiles.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                        No files have been uploaded by this client.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
