'use client';

import { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '@/lib/firebase';
import { Settings } from '@/types';
import { Settings as SettingsIcon, Save, Building, Share2, Info, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/common/Toast';

export default function AdminSettingsPage() {
  const { success, error: toastError } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'contact' | 'social'>('info');

  // Form State matching the Settings Interface
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [logo, setLogo] = useState('');
  const [favicon, setFavicon] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSettings();
        if (data) {
          setCompanyName(data.companyName || '');
          setCompanyDescription(data.companyDescription || '');
          setEmail(data.email || '');
          setPhone(data.phone || '');
          setAddress(data.address || '');
          setLogo(data.logo || '');
          setFavicon(data.favicon || '');
          setLinkedin(data.socialLinks?.linkedin || '');
          setFacebook(data.socialLinks?.facebook || '');
          setTwitter(data.socialLinks?.twitter || '');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: Settings = {
      id: 'general',
      companyName,
      companyDescription,
      email,
      phone,
      address,
      logo,
      favicon,
      socialLinks: {
        linkedin,
        facebook,
        twitter
      },
      createdAt: new Date().toISOString(), // Fallback placeholders
      updatedAt: new Date().toISOString()
    };

    try {
      await saveSettings(payload);
      success('Settings Saved', 'Corporate metadata settings synced successfully.');
    } catch (err) {
      console.error(err);
      toastError('Save Error', 'Failed to store metadata configurations.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight flex items-center gap-2">
            <SettingsIcon size={24} className="text-slate-450" />
            Website Branding Settings
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure metadata, headers, map overlays, contact information and social handles.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Tabs sidebar (Left) */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all border whitespace-nowrap ${
              activeTab === 'info'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow'
                : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-100 dark:border-slate-850 hover:bg-slate-50'
            }`}
          >
            <Building size={14} />
            Corporate Info
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all border whitespace-nowrap ${
              activeTab === 'contact'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow'
                : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-100 dark:border-slate-850 hover:bg-slate-50'
            }`}
          >
            <Info size={14} />
            Contact Info
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all border whitespace-nowrap ${
              activeTab === 'social'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow'
                : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-100 dark:border-slate-850 hover:bg-slate-50'
            }`}
          >
            <Share2 size={14} />
            Social Profiles
          </button>
        </div>

        {/* Tab contents (Right) */}
        <div className="lg:col-span-9 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-850 shadow-sm space-y-6">
          
          {/* TAB: Corporate Info */}
          {activeTab === 'info' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-primary dark:text-white border-b border-slate-50 dark:border-slate-850 pb-2 mb-4">
                General Company Info
              </h3>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Website Title / Company Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="KORK InventRex"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Meta Description</label>
                <textarea
                  required
                  rows={4}
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  placeholder="Provide brief summary search description for robots..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Branding Logo Asset URL</label>
                  <input
                    type="text"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="/logo.png"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Favicon Icon URL</label>
                  <input
                    type="text"
                    value={favicon}
                    onChange={(e) => setFavicon(e.target.value)}
                    placeholder="/favicon.ico"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: Contact Info */}
          {activeTab === 'contact' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-primary dark:text-white border-b border-slate-50 dark:border-slate-850 pb-2 mb-4">
                Company Contact Coordinates
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="info@korkinventrex.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Corporate Hotline</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 422 234 5678"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Registered Physical Address</label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address details..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB: Social handles */}
          {activeTab === 'social' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-primary dark:text-white border-b border-slate-50 dark:border-slate-850 pb-2 mb-4">
                Social Networking Links
              </h3>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/company/kork-inventrex"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Facebook Page URL</label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="https://facebook.com/kork-inventrex"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Twitter Handle URL</label>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="https://twitter.com/kork_inventrex"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white font-bold text-xs shadow disabled:opacity-50"
            >
              {saving ? 'Syncing...' : 'Save Settings'}
              <Save size={16} />
            </button>
          </div>

        </div>

      </form>
      
    </div>
  );
}
