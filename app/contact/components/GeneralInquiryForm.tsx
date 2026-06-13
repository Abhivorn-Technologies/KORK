'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { saveEnquiry } from '@/lib/firebase';
import { useToast } from '@/components/common/Toast';
import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';

export default function GeneralInquiryForm() {
  const { success, error: toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [successMode, setSuccessMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        message: `[General Inquiry] [Subject: ${formData.subject}] ${formData.message}`,
        type: 'general',
        subject: formData.subject
      });
      setSuccessMode(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Inquiry Sent!</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">We will get back to you regarding your general inquiry shortly.</p>
        <button onClick={() => setSuccessMode(false)} className="text-accent text-sm font-bold hover:underline">
          Send another message
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
        <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
        <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
      </div>
      <textarea required name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows={4} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm resize-none focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
      <button suppressHydrationWarning disabled={loading} type="submit" className="w-full py-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2">
        {loading ? 'Sending...' : 'Send General Inquiry'} <Send size={14} />
      </button>
    </motion.form>
  );
}
