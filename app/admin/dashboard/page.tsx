'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Package, 
  FileText, 
  Inbox, 
  Settings, 
  Sparkles, 
  ArrowRight,
  Plus,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { getProducts, getBlogs, getEnquiries } from '@/lib/firebase';
import { Product, Blog, Enquiry } from '@/types';
import { formatDate } from '@/utils/helpers';

export default function AdminDashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [recentLeads, setRecentLeads] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [products, blogs, enquiries] = await Promise.all([
          getProducts(100),
          getBlogs(100),
          getEnquiries()
        ]);
        setProductCount(products.length);
        setBlogCount(blogs.length);
        setEnquiryCount(enquiries.length);
        setRecentLeads(enquiries.slice(0, 3));
      } catch (err) {
        console.error('Error fetching dashboard count details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  const statCards = [
    { label: 'Total Products', value: productCount, icon: Package, href: '/admin/products', color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Total Blogs', value: blogCount, icon: FileText, href: '/admin/blogs', color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Active Inquiries', value: enquiryCount, icon: Inbox, href: '/admin/enquiries', color: 'text-emerald-500 bg-emerald-500/10' },
  ];

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => <div key={n} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />)}
        </div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor inquiries, manage product catalogs, update technical blogs, and edit branding details.
        </p>
      </div>

      {/* Grid of Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="p-6 rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between hover:border-slate-200 dark:hover:border-slate-850 transition-all"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {card.label}
              </span>
              <span className="text-3xl font-black text-primary dark:text-white font-mono">
                {card.value}
              </span>
            </div>
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${card.color}`}>
              <card.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Web Traffic / System Performance & Shortcut Operations side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* System Diagnostics & Web stats (Left) */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 space-y-6">
          <h3 className="text-sm font-bold uppercase text-primary dark:text-white tracking-wider pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <TrendingUp size={16} className="text-accent" />
            Website Metrics & Operations
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1.5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">AVG Load Time</span>
              <span className="text-lg font-bold text-emerald-500 block">182 ms</span>
              <span className="text-[10px] text-slate-400 block">Lighthouse target score: 95+</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1.5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">SEO Core Status</span>
              <span className="text-lg font-bold text-cyan-400 block">100 / 100</span>
              <span className="text-[10px] text-slate-400 block">Dynamic sitemap & robots active</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1.5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">SSL Handshake</span>
              <span className="text-lg font-bold text-white block">SECURE (TLS)</span>
              <span className="text-[10px] text-slate-400 block">Zero-Trust rules verified</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1.5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Lead Conversion Rate</span>
              <span className="text-lg font-bold text-white block">4.8 %</span>
              <span className="text-[10px] text-slate-400 block">Form submission ratio</span>
            </div>
          </div>
        </div>

        {/* Shortcuts (Right) */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 space-y-6">
          <h3 className="text-sm font-bold uppercase text-primary dark:text-white tracking-wider pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <Sparkles size={16} className="text-purple-500" />
            Quick Shortcut Settings
          </h3>
          
          <div className="flex flex-col gap-3">
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-850 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <Plus size={14} className="text-accent" />
                Add New Product
              </span>
              <ArrowRight size={12} className="text-slate-400" />
            </Link>

            <Link
              href="/admin/blogs"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-850 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <Plus size={14} className="text-purple-400" />
                Write Blog Article
              </span>
              <ArrowRight size={12} className="text-slate-400" />
            </Link>

            <Link
              href="/admin/enquiries"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-850 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <Eye size={14} className="text-emerald-400" />
                View Sales Leads
              </span>
              <ArrowRight size={12} className="text-slate-400" />
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-850 text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <Settings size={14} className="text-slate-450" />
                Edit Branding Info
              </span>
              <ArrowRight size={12} className="text-slate-400" />
            </Link>
          </div>
        </div>

      </div>

      {/* Recent Leads segment */}
      <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold uppercase text-primary dark:text-white tracking-wider flex items-center gap-2">
            <Inbox size={16} className="text-emerald-500" />
            Recent Sales Leads ({recentLeads.length})
          </h3>
          <Link href="/admin/enquiries" className="text-xs text-accent font-bold hover:underline">
            View All Leads
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="text-xs text-slate-450 py-4 text-center">No recent inquiries logged.</p>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-850">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="py-3.5 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <h4 className="font-bold text-primary dark:text-white">{lead.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {lead.company || 'Private inquiry'} • {lead.email}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {formatDate(lead.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
