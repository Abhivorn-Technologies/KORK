'use client';

import { useState, useEffect } from 'react';
import { getEnquiries, deleteEnquiry, getSupportTickets, updateTicketStatus, deleteTicket } from '@/lib/firebase';
import { Enquiry, SupportTicket } from '@/types';
import { Search, Trash2, Download, Inbox, Eye, X, ChevronDown, ChevronRight, MessageSquare, Handshake, Info } from 'lucide-react';
import { useToast } from '@/components/common/Toast';
import { formatDate } from '@/utils/helpers';

interface ParsedEnquiry extends Enquiry {
  type: 'general' | 'partner';
  subject: string;
  partnershipInterest?: string;
  cleanMessage: string;
}

function parseEnquiry(e: Enquiry): ParsedEnquiry {
  let type = e.type;
  let subject = e.subject;
  let partnershipInterest = e.partnershipInterest;
  let cleanMessage = e.message;

  // Fallback: Parse from string if format is [Type] [Meta] Message
  if (!type) {
    if (e.message.startsWith('[Partner Inquiry]')) {
      type = 'partner';
      const interestMatch = e.message.match(/\[Interest:\s*([^\]]+)\]/);
      if (interestMatch) {
        partnershipInterest = interestMatch[1];
      }
      cleanMessage = e.message.replace(/^\[Partner Inquiry\]\s*(\[Interest:\s*[^\]]+\])?\s*/, '');
    } else {
      type = 'general';
      const subjectMatch = e.message.match(/\[Subject:\s*([^\]]+)\]/);
      if (subjectMatch) {
        subject = subjectMatch[1];
      }
      cleanMessage = e.message.replace(/^\[General Inquiry\]\s*(\[Subject:\s*[^\]]+\])?\s*/, '');
    }
  }

  return {
    ...e,
    type: type || 'general',
    subject: subject || 'General Inquiry',
    partnershipInterest,
    cleanMessage
  };
}

export default function AdminEnquiriesPage() {
  const { success, error: toastError } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ParsedEnquiry | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'partner' | 'tickets'>('general');
  const [expandedClients, setExpandedClients] = useState<Record<string, boolean>>({});
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    if (activeTab === 'general' && selectedEnquiry) {
      setReplyText(`Hi ${selectedEnquiry.name},

Thank you for reaching out to KORK InventRex regarding "${selectedEnquiry.subject}".

Regarding your inquiry:
"${selectedEnquiry.cleanMessage}"

We are reviewing your request and will follow up shortly. Let us know if there is a convenient time to schedule a brief call.

Best regards,
KORK InventRex Team`);
    } else if (activeTab === 'partner' && selectedEnquiry) {
      setReplyText(`Hi ${selectedEnquiry.name},

Thank you for contacting KORK InventRex regarding a potential partnership under "${selectedEnquiry.partnershipInterest || 'Collaboration'}".

Regarding your proposal:
"${selectedEnquiry.cleanMessage}"

We are keen to evaluate opportunities with ${selectedEnquiry.company || 'your organization'}. Our team is reviewing this internally, and we will follow up with you to schedule a discussion.

Best regards,
Kork Partnerships Team`);
    } else if (activeTab === 'tickets' && selectedTicket) {
      setReplyText(`Hi ${selectedTicket.clientName},

Thank you for submitting a support ticket. This is regarding Support Ticket #${selectedTicket.ticketId}.

Ticket Details:
Subject: ${selectedTicket.subject}
Message:
"${selectedTicket.message}"

Our engineering team has set the ticket status to "${selectedTicket.status}". We are currently looking into this and will provide updates as soon as possible.

Best regards,
Kork Support Team`);
    } else {
      setReplyText('');
    }
  }, [selectedEnquiry, selectedTicket, activeTab]);

  const handleSendEmailReply = async () => {
    const email = activeTab === 'tickets' ? selectedTicket?.clientEmail : selectedEnquiry?.email;
    const subject = activeTab === 'general'
      ? `Response to KORK InventRex Inquiry - Subject: ${selectedEnquiry?.subject}`
      : activeTab === 'partner'
      ? `Partnership Proposal Response - KORK InventRex`
      : `RE: Support Ticket #${selectedTicket?.ticketId} - ${selectedTicket?.subject}`;

    if (!email || !replyText.trim()) {
      toastError('Error', 'Recipient email and response message are required.');
      return;
    }

    setSendingReply(true);
    try {
      const res = await fetch('/api/admin/send-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject,
          body: replyText,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reply email.');
      }

      success('Email Dispatched', `Response successfully sent to "${email}".`);
      
      if (activeTab === 'tickets' && selectedTicket && selectedTicket.status === 'Open') {
        handleUpdateStatus(selectedTicket.id, 'In Progress');
      }
    } catch (err: any) {
      console.error(err);
      toastError('Send Failed', err.message || 'An error occurred while sending the email.');
    } finally {
      setSendingReply(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsData, ticketsData] = await Promise.all([
        getEnquiries(),
        getSupportTickets()
      ]);
      setEnquiries(leadsData);
      setTickets(ticketsData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    const label = activeTab === 'general' ? 'general inquiry' : 'partnership proposal';
    if (!confirm(`Are you sure you want to delete the ${label} from "${name}"?`)) return;
    try {
      await deleteEnquiry(id);
      success('Record Removed', `Deleted ${label} from "${name}".`);
      loadData();
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error(err);
      toastError('Removal Failed', 'Failed to delete record.');
    }
  };

  const handleDeleteTicket = async (id: string, ticketRef: string) => {
    if (!confirm(`Are you sure you want to delete Support Ticket #${ticketRef}?`)) return;
    try {
      await deleteTicket(id);
      success('Ticket Removed', `Deleted Support Ticket #${ticketRef}.`);
      loadData();
      if (selectedTicket?.id === id) {
        setSelectedTicket(null);
      }
    } catch (err) {
      console.error(err);
      toastError('Removal Failed', 'Failed to delete support ticket.');
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    try {
      await updateTicketStatus(id, newStatus);
      success('Status Updated', `Support ticket status changed to ${newStatus}.`);
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
      if (selectedTicket?.id === id) {
        setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error(err);
      toastError('Update Failed', 'Failed to update ticket status.');
    }
  };

  const toggleClientExpand = (clientId: string) => {
    setExpandedClients(prev => ({
      ...prev,
      [clientId]: !prev[clientId]
    }));
  };

  const handleReplyEmail = (email: string, subject: string, bodyText: string) => {
    try {
      navigator.clipboard.writeText(email);
      success('Email Address Copied', `Copied "${email}" to clipboard. Opening mail client...`);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  };

  // CSV Export Utility
  const handleExportCSV = () => {
    if (activeTab === 'general') {
      const generalList = enquiries.map(parseEnquiry).filter(l => l.type === 'general');
      if (generalList.length === 0) {
        toastError('Export Failed', 'No general inquiries available to export.');
        return;
      }

      const headers = ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Date Received'];
      const rows = generalList.map(e => [
        e.id,
        `"${e.name.replace(/"/g, '""')}"`,
        e.email,
        e.phone || '',
        `"${e.subject.replace(/"/g, '""')}"`,
        `"${e.cleanMessage.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        e.createdAt
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `kork_general_inquiries_${new Date().toISOString().slice(0,10)}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      success('Export Succeeded', 'CSV sheet downloaded successfully.');
    } else if (activeTab === 'partner') {
      const partnerList = enquiries.map(parseEnquiry).filter(l => l.type === 'partner');
      if (partnerList.length === 0) {
        toastError('Export Failed', 'No partnership proposals available to export.');
        return;
      }

      const headers = ['ID', 'Partner Name', 'Email', 'Phone', 'Organization / Law Firm', 'Partnership Interest', 'Message', 'Date Received'];
      const rows = partnerList.map(e => [
        e.id,
        `"${e.name.replace(/"/g, '""')}"`,
        e.email,
        e.phone || '',
        `"${(e.company || '').replace(/"/g, '""')}"`,
        `"${(e.partnershipInterest || '').replace(/"/g, '""')}"`,
        `"${e.cleanMessage.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        e.createdAt
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `kork_partnerships_${new Date().toISOString().slice(0,10)}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      success('Export Succeeded', 'CSV sheet downloaded successfully.');
    } else {
      if (tickets.length === 0) {
        toastError('Export Failed', 'No support tickets available to export.');
        return;
      }

      const headers = ['Ticket ID', 'Client Name', 'Client Email', 'Subject', 'Status', 'Message', 'Date Submitted'];
      const rows = tickets.map(t => [
        t.ticketId,
        `"${t.clientName.replace(/"/g, '""')}"`,
        t.clientEmail,
        `"${t.subject.replace(/"/g, '""')}"`,
        t.status,
        `"${t.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        t.createdAt
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `kork_support_tickets_${new Date().toISOString().slice(0,10)}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      success('Export Succeeded', 'CSV sheet downloaded successfully.');
    }
  };

  // Parse and categorize enquiries
  const parsedLeads = enquiries.map(parseEnquiry);

  const generalLeads = parsedLeads.filter(l => l.type === 'general' && (
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.cleanMessage.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  const partnerLeads = parsedLeads.filter(l => l.type === 'partner' && (
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.company && l.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (l.partnershipInterest && l.partnershipInterest.toLowerCase().includes(searchQuery.toLowerCase())) ||
    l.cleanMessage.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  const filteredTickets = tickets.filter(t => 
    t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.ticketId.includes(searchQuery)
  );

  const groupedFilteredTickets = filteredTickets.reduce((acc, ticket) => {
    const clientId = ticket.clientId || 'unknown';
    if (!acc[clientId]) {
      acc[clientId] = {
        clientName: ticket.clientName || 'Unknown Client',
        clientEmail: ticket.clientEmail || '',
        tickets: []
      };
    }
    acc[clientId].tickets.push(ticket);
    return acc;
  }, {} as Record<string, { clientName: string; clientEmail: string; tickets: SupportTicket[] }>);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight">
            Sales Leads & Inquiries
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review and manage contact submissions, partnership proposals, and client-submitted support tickets.
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

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => {
            setActiveTab('general');
            setSelectedTicket(null);
            setSelectedEnquiry(null);
            setSearchQuery('');
          }}
          className={`px-5 py-3 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'general'
              ? 'border-accent text-accent'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          General Inquiries ({generalLeads.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('partner');
            setSelectedTicket(null);
            setSelectedEnquiry(null);
            setSearchQuery('');
          }}
          className={`px-5 py-3 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'partner'
              ? 'border-accent text-accent'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Partnership Proposals ({partnerLeads.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('tickets');
            setSelectedTicket(null);
            setSelectedEnquiry(null);
            setSearchQuery('');
          }}
          className={`px-5 py-3 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'tickets'
              ? 'border-accent text-accent'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Client Support Tickets ({filteredTickets.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder={
            activeTab === 'general' 
              ? "Search inquiries by name, email, or subject..." 
              : activeTab === 'partner'
              ? "Search partners by name, organization, or interest..."
              : "Search tickets by ID, client, subject..."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
        />
      </div>

      {/* Grid: Table/List on left, Details panel on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main List Column (Left) */}
        <div className="lg:col-span-8 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400 animate-pulse">
              Syncing records...
            </div>
          ) : activeTab === 'general' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-bold">Contact Person</th>
                    <th className="px-6 py-4 font-bold">Subject</th>
                    <th className="px-6 py-4 font-bold">Received Date</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {generalLeads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                        No general inquiries matching query.
                      </td>
                    </tr>
                  ) : (
                    generalLeads.map((e) => (
                      <tr 
                        key={e.id} 
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer ${
                          selectedEnquiry?.id === e.id ? 'bg-slate-50 dark:bg-slate-800' : ''
                        }`}
                        onClick={() => setSelectedEnquiry(e)}
                      >
                        <td className="px-6 py-4 font-bold text-primary dark:text-white">
                          <div>
                            <span>{e.name}</span>
                            <span className="text-[10px] text-slate-400 block font-normal font-mono">{e.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 max-w-[200px] truncate" title={e.subject}>
                          {e.subject}
                        </td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                          {formatDate(e.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right" onClick={(ev) => ev.stopPropagation()}>
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => setSelectedEnquiry(e)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg"
                              title="Inspect Inquiry"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(e.id, e.name)}
                              className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg"
                              title="Delete Inquiry"
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
          ) : activeTab === 'partner' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-bold">Partner Name</th>
                    <th className="px-6 py-4 font-bold">Organization / Law Firm</th>
                    <th className="px-6 py-4 font-bold">Partnership Interest</th>
                    <th className="px-6 py-4 font-bold">Received Date</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {partnerLeads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                        No partnership proposals matching query.
                      </td>
                    </tr>
                  ) : (
                    partnerLeads.map((e) => (
                      <tr 
                        key={e.id} 
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer ${
                          selectedEnquiry?.id === e.id ? 'bg-slate-50 dark:bg-slate-800' : ''
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
                          {e.company || <span className="text-slate-400 italic">Not Provided</span>}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-900/30">
                            {e.partnershipInterest || 'Collaboration'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                          {formatDate(e.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right" onClick={(ev) => ev.stopPropagation()}>
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => setSelectedEnquiry(e)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg"
                              title="Inspect Proposal"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(e.id, e.name)}
                              className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg"
                              title="Delete Proposal"
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
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {Object.keys(groupedFilteredTickets).length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No support tickets matching query.
                </div>
              ) : (
                Object.entries(groupedFilteredTickets).map(([clientId, group]) => {
                  const isExpanded = !!expandedClients[clientId];
                  return (
                    <div key={clientId} className="bg-white dark:bg-slate-900">
                      {/* Client Header Row */}
                      <div 
                        onClick={() => toggleClientExpand(clientId)}
                        className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors border-b border-slate-50 dark:border-slate-800/60"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-slate-400">
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </div>
                          <div>
                            <h4 className="font-bold text-primary dark:text-white text-xs">{group.clientName}</h4>
                            <span className="text-[10px] text-slate-400 block font-normal font-mono">{group.clientEmail}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-[10px] rounded-full">
                          {group.tickets.length} {group.tickets.length === 1 ? 'ticket' : 'tickets'}
                        </span>
                      </div>

                      {/* Client Tickets Sub-table */}
                      {isExpanded && (
                        <div className="bg-slate-50/50 dark:bg-slate-950/20 pl-8 pr-6 py-2 border-b border-slate-100 dark:border-slate-800">
                          <table className="w-full text-[11px] text-left text-slate-600 dark:text-slate-400">
                            <thead>
                              <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800">
                                <th className="py-2.5 font-bold">Ticket ID</th>
                                <th className="py-2.5 font-bold">Subject</th>
                                <th className="py-2.5 font-bold">Date Created</th>
                                <th className="py-2.5 font-bold">Status</th>
                                <th className="py-2.5 font-bold text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                              {group.tickets.map((t) => (
                                <tr 
                                  key={t.id}
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    setSelectedTicket(t);
                                  }}
                                  className={`hover:bg-slate-100/50 dark:hover:bg-slate-800/40 cursor-pointer ${
                                    selectedTicket?.id === t.id ? 'bg-slate-100 dark:bg-slate-800 text-primary dark:text-white font-bold' : ''
                                  }`}
                                >
                                  <td className="py-3 font-mono font-bold text-primary dark:text-white">
                                    #{t.ticketId}
                                  </td>
                                  <td className="py-3 font-semibold text-slate-700 dark:text-slate-300 max-w-[200px] truncate" title={t.subject}>
                                    {t.subject}
                                  </td>
                                  <td className="py-3 text-slate-500 dark:text-slate-400 font-normal">
                                    {formatDate(t.createdAt)}
                                  </td>
                                  <td className="py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                      t.status === 'Resolved' 
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-900/30' 
                                        : t.status === 'In Progress'
                                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-900/30'
                                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-900/30'
                                    }`}>
                                      {t.status}
                                    </span>
                                  </td>
                                  <td className="py-3 text-right" onClick={(ev) => ev.stopPropagation()}>
                                    <div className="inline-flex gap-2">
                                      <button
                                        onClick={() => setSelectedTicket(t)}
                                        className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md"
                                        title="Inspect Ticket"
                                      >
                                        <Eye size={12} />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteTicket(t.id, t.ticketId)}
                                        className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-md"
                                        title="Delete Ticket"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Detail Panel Inspector (Right) */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold uppercase text-primary dark:text-white tracking-wider flex items-center gap-1.5 font-mono">
              {activeTab === 'general' ? (
                <>
                  <MessageSquare size={16} className="text-blue-500" />
                  General Inspector
                </>
              ) : activeTab === 'partner' ? (
                <>
                  <Handshake size={16} className="text-purple-500" />
                  Partner Inspector
                </>
              ) : (
                <>
                  <Inbox size={16} className="text-accent" />
                  Ticket Inspector
                </>
              )}
            </h3>
            {activeTab !== 'tickets' && selectedEnquiry && (
              <button 
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            )}
            {activeTab === 'tickets' && selectedTicket && (
              <button 
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {activeTab === 'general' ? (
            selectedEnquiry ? (
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Contact Person</span>
                  <p className="text-sm font-bold text-primary dark:text-white">{selectedEnquiry.name}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Subject Line</span>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {selectedEnquiry.subject}
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
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800 mt-1">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {selectedEnquiry.cleanMessage}
                    </p>
                  </div>
                </div>

                {/* Reply Composer */}
                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Compose Reply Email</span>
                  <textarea
                    rows={5}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all resize-y text-slate-700 dark:text-slate-300"
                    placeholder="Write response message..."
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={sendingReply}
                      onClick={handleSendEmailReply}
                      className="flex-1 inline-flex justify-center items-center py-2 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-lg hover:opacity-95 text-center text-xs disabled:opacity-50"
                    >
                      {sendingReply ? 'Sending...' : 'Send Secure Reply'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const subject = `Response to KORK InventRex Inquiry - Subject: ${selectedEnquiry.subject}`;
                        handleReplyEmail(selectedEnquiry.email, subject, replyText);
                      }}
                      className="px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold"
                      title="Open in Local Mail Client"
                    >
                      Mailto Link
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.name)}
                    className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    title="Delete Inquiry"
                  >
                    <Trash2 size={14} />
                    <span>Delete Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select a general inquiry row from the table to inspect details and respond.
              </div>
            )
          ) : activeTab === 'partner' ? (
            selectedEnquiry ? (
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Partner Name</span>
                  <p className="text-sm font-bold text-primary dark:text-white">{selectedEnquiry.name}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Organization / Law Firm</span>
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

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Partnership Interest</span>
                  <span className="mt-1 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-900/30">
                    {selectedEnquiry.partnershipInterest || 'General Collaboration'}
                  </span>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Collaboration Proposal</span>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800 mt-1">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {selectedEnquiry.cleanMessage}
                    </p>
                  </div>
                </div>

                {/* Reply Composer */}
                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Compose Reply Email</span>
                  <textarea
                    rows={5}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all resize-y text-slate-700 dark:text-slate-300"
                    placeholder="Write response message..."
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={sendingReply}
                      onClick={handleSendEmailReply}
                      className="flex-1 inline-flex justify-center items-center py-2 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-lg hover:opacity-95 text-center text-xs disabled:opacity-50"
                    >
                      {sendingReply ? 'Sending...' : 'Send Secure Reply'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const subject = `Partnership Proposal Response - KORK InventRex`;
                        handleReplyEmail(selectedEnquiry.email, subject, replyText);
                      }}
                      className="px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold"
                      title="Open in Local Mail Client"
                    >
                      Mailto Link
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.name)}
                    className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    title="Delete Proposal"
                  >
                    <Trash2 size={14} />
                    <span>Delete Proposal</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select a partnership proposal row from the table to inspect details and respond.
              </div>
            )
          ) : (
            selectedTicket ? (
              <div className="space-y-4 text-xs font-normal">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Support Ticket</span>
                    <p className="text-sm font-black text-primary dark:text-white">#{selectedTicket.ticketId}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Status</span>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => handleUpdateStatus(selectedTicket.id, e.target.value as any)}
                      className="mt-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold focus:outline-none focus:border-accent text-primary dark:text-white cursor-pointer"
                    >
                      <option value="Open">🔴 Open</option>
                      <option value="In Progress">🟡 In Progress</option>
                      <option value="Resolved">🟢 Resolved</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Subject</span>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{selectedTicket.subject}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Client Profile</span>
                  <p className="text-xs font-bold text-primary dark:text-white">{selectedTicket.clientName}</p>
                  <span className="text-[10px] text-slate-400 font-mono block">{selectedTicket.clientEmail}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Submission Date</span>
                  <p className="font-mono text-slate-600 dark:text-slate-400">
                    {formatDate(selectedTicket.createdAt)}
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Issue / Ticket Message</span>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800 mt-1">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {selectedTicket.message}
                    </p>
                  </div>
                </div>

                {/* Reply Composer */}
                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Compose Reply Email</span>
                  <textarea
                    rows={5}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all resize-y text-slate-700 dark:text-slate-300"
                    placeholder="Write response message..."
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={sendingReply}
                      onClick={handleSendEmailReply}
                      className="flex-1 inline-flex justify-center items-center py-2 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-lg hover:opacity-95 text-center text-xs disabled:opacity-50"
                    >
                      {sendingReply ? 'Sending...' : 'Send Secure Reply'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const subject = `RE: Support Ticket #${selectedTicket.ticketId} - ${selectedTicket.subject}`;
                        handleReplyEmail(selectedTicket.clientEmail, subject, replyText);
                      }}
                      className="px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold"
                      title="Open in Local Mail Client"
                    >
                      Mailto Link
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => handleDeleteTicket(selectedTicket.id, selectedTicket.ticketId)}
                    className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    title="Delete Ticket"
                  >
                    <Trash2 size={14} />
                    <span>Delete Ticket</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select a support ticket row to inspect details, reply via email, or update status.
              </div>
            )
          )}
        </div>

      </div>

    </div>
  );
}
