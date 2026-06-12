'use client';

import { useState } from 'react';
import { Search, Plus, Save, BellRing, Mail } from 'lucide-react';
import { cn } from '@/utils/helpers';

// Mock data for clients
const MOCK_CLIENTS = [
  { id: '1', name: 'Acme Corp', project: 'Smart Thermostat V2', phase: 'Prior Art Search', progress: 40, email: 'contact@acme.com' },
  { id: '2', name: 'Global Innovations', project: 'Drone Delivery System', phase: 'Patent Drafting', progress: 75, email: 'info@globalinnovations.com' },
  { id: '3', name: 'Nexus Tech', project: 'Quantum Encrypter', phase: 'Filing & Prosecution', progress: 90, email: 'ceo@nexustech.io' },
];

const PHASES = [
  'Initial Consultation',
  'Prior Art Search',
  'Design & Engineering',
  'Patent Drafting',
  'Filing & Prosecution',
  'Completed'
];

export default function ClientProjectsPage() {
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleProgressChange = (id: string, newProgress: number) => {
    setClients(clients.map(c => c.id === id ? { ...c, progress: newProgress } : c));
  };

  const handlePhaseChange = (id: string, newPhase: string) => {
    setClients(clients.map(c => c.id === id ? { ...c, phase: newPhase } : c));
  };

  const handleSave = (clientName: string) => {
    // In a real app, this would trigger an API call to save the data and potentially send an email notification
    alert(`Saved progress for ${clientName}. An email notification has been sent to the client.`);
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.project.toLowerCase().includes(searchTerm.toLowerCase())
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
          placeholder="Search by client or project name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition-colors"
        />
      </div>

      {/* Projects List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Client & Project</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/4">Phase</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Progress</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{client.name}</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Mail size={12}/> {client.email}</span>
                      <span className="text-sm text-accent font-medium mt-1">{client.project}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={client.phase}
                      onChange={(e) => handlePhaseChange(client.id, e.target.value)}
                      className="block w-full text-sm border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-accent focus:border-accent bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-2 px-3"
                    >
                      {PHASES.map(phase => (
                        <option key={phase} value={phase}>{phase}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{client.progress}% Complete</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={client.progress}
                        onChange={(e) => handleProgressChange(client.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-accent"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleSave(client.name)}
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors bg-accent/10 px-3 py-1.5 rounded-lg"
                      title="Save & Notify Client"
                    >
                      <Save size={16} />
                      <span>Update</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
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
                <input type="text" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-accent focus:border-accent bg-transparent text-slate-900 dark:text-white" placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Email</label>
                <input type="email" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-accent focus:border-accent bg-transparent text-slate-900 dark:text-white" placeholder="contact@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Initial Project Name</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-accent focus:border-accent bg-transparent text-slate-900 dark:text-white" placeholder="e.g. Smart Thermostat" />
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Account created successfully. An email has been dispatched with login credentials.");
                  setIsCreateModalOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors"
              >
                <BellRing size={16} />
                Create & Notify
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
