'use client';

import { useState, useEffect } from 'react';
import { getEnquiries, deleteEnquiry } from '@/lib/firebase';
import { Enquiry } from '@/types';
import { Search, Trash2, Download, Inbox, Eye, X } from 'lucide-react';
import { useToast } from '@/components/common/Toast';
import { formatDate } from '@/utils/helpers';

export default function AdminEnquiriesPage() {
  const { success, error: toastError } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the enquiry from "${name}"?`)) return;
    try {
      await deleteEnquiry(id);
      success('Enquiry Removed', `Deleted inquiry record from "${name}".`);
      loadEnquiries();
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error(err);
      toastError('Removal Failed', 'Failed to delete record.');
    }
  };

  // CSV Export Utility
  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      toastError('Export Failed', 'No leads available to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Message', 'Date Received'];
    const rows = enquiries.map(e => [
      e.id,
      `"${e.name.replace(/"/g, '""')}"`,
      e.email,
      e.phone || '',
      `"${(e.company || '').replace(/"/g, '""')}"`,
      `"${e.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      e.createdAt
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `kork_leads_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    success('Export Succeeded', 'CSV sheet downloaded successfully.');
  };

  const filtered = enquiries.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.company && e.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    e.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight">
            Sales Leads & Inquiries
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review and manage contact submissions, RFQ specs, and support tickets.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
        >
          <Download size={16} />
          Export CSV Sheet
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Search leads by name, email, or message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
        />
      </div>

      {/* Grid: Table on left, Details panel on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Table List (Left) */}
        <div className="lg:col-span-8 border border-slate-100 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400 animate-pulse">
              Syncing leads...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 border-b border-slate-100 dark:border-slate-850">
                  <tr>
                    <th className="px-6 py-4 font-bold">Contact Person</th>
                    <th className="px-6 py-4 font-bold">Organization</th>
                    <th className="px-6 py-4 font-bold">Received Date</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                        No enquiries matching query.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((e) => (
                      <tr 
                        key={e.id} 
                        className={`hover:bg-slate-50 dark:hover:bg-slate-850/50 cursor-pointer ${
                          selectedEnquiry?.id === e.id ? 'bg-slate-50 dark:bg-slate-850' : ''
                        }`}
                        onClick={() => setSelectedEnquiry(e)}
                      >
                        <td className="px-6 py-4 font-bold text-primary dark:text-white">
                          <div>
                            <span>{e.name}</span>
                            <span className="text-[10px] text-slate-400 block font-normal font-mono">{e.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                          {e.company || <span className="text-slate-400 italic">Individual</span>}
                        </td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                          {formatDate(e.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right" onClick={(ev) => ev.stopPropagation()}>
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => setSelectedEnquiry(e)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg"
                              title="View Message"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(e.id, e.name)}
                              className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg"
                              title="Delete Lead"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected lead detail viewport (Right) */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold uppercase text-primary dark:text-white tracking-wider flex items-center gap-1.5">
              <Inbox size={16} className="text-accent" />
              Lead Inspector
            </h3>
            {selectedEnquiry && (
              <button 
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {selectedEnquiry ? (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Contact Person</span>
                <p className="text-sm font-bold text-primary dark:text-white">{selectedEnquiry.name}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Company Name</span>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {selectedEnquiry.company || 'Private Person / Individual'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Email Address</span>
                  <p className="font-mono text-slate-600 dark:text-slate-400 truncate" title={selectedEnquiry.email}>
                    {selectedEnquiry.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Phone Number</span>
                  <p className="font-mono text-slate-600 dark:text-slate-400 truncate">
                    {selectedEnquiry.phone || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Inquiry Message Detail</span>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-850 mt-1">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Response to Kork Inventrex Inquiry`}
                  className="flex-1 inline-flex justify-center items-center py-2 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-lg hover:opacity-95"
                >
                  Reply Email
                </a>
                <button
                  onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.name)}
                  className="px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg"
                  title="Delete Inquiry"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select an inquiry row from the table to inspect details and respond.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
