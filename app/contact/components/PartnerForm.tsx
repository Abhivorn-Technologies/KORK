'use client';

import { useState } from 'react';
import { Send, CheckCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { saveEnquiry } from '@/lib/firebase';
import { useToast } from '@/components/common/Toast';
import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';

export default function PartnerForm() {
  const { success, error: toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [successMode, setSuccessMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    partnershipInterest: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.organization,
        message: `[Partner Inquiry] [Interest: ${formData.partnershipInterest}] ${formData.message}`
      });
      setSuccessMode(true);
      setFormData({ name: '', organization: '', email: '', phone: '', partnershipInterest: '', message: '' });
    } catch (err) {
      console.error(err);
      toastError('Submission Failed', 'An error occurred while sending your inquiry.');
    } finally {
      setLoading(false);
    }
  };

  if (successMode) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-4 shadow-xl shadow-slate-200/20 dark:shadow-none"
      >
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Partnership Inquiry Sent!</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">Thank you for your interest. Our partnership team will be in touch soon.</p>
        <button onClick={() => setSuccessMode(false)} className="text-secondary dark:text-accent text-sm font-bold hover:underline">
          Submit another
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 space-y-5 shadow-xl shadow-slate-200/20 dark:shadow-none"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
        <input required type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="Organization / Law Firm" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
      </div>
      <div className="relative">
        <select required name="partnershipInterest" value={formData.partnershipInterest} onChange={handleChange} className="w-full p-3 pr-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all appearance-none cursor-pointer">
          <option value="" disabled>Partnership Interest...</option>
          <option>Patent Attorneys</option>
          <option>Patent Agents</option>
          <option>Law Firms</option>
          <option>Universities</option>
          <option>Innovation Consultants</option>
          <option>Research Organizations</option>
          <option>Industry Associations</option>
        </select>
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
      <textarea required name="message" value={formData.message} onChange={handleChange} placeholder="How can we collaborate?" rows={4} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm resize-none focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
      <button suppressHydrationWarning disabled={loading} type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-700 to-cyan-500 text-white font-bold text-sm hover:opacity-95 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2">
        {loading ? 'Sending...' : 'Become A Partner'} <Send size={14} />
      </button>
    </motion.form>
  );
}
