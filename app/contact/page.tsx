'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle,
  Clock,
  Lock,
  UploadCloud,
  File,
  X
} from 'lucide-react';
import { saveEnquiry } from '@/lib/firebase';
import { useToast } from '@/components/common/Toast';

export default function ContactPage() {
  const { success, error: toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    servicePillar: 'inventor-services',
    message: '',
    ndaRequired: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Mock file selector change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + ' MB'
      }));
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toastError('Validation Error', 'Please complete the Name, Email, and Message description.');
      return;
    }
    setLoading(true);

    try {
      const fileNames = files.map(f => f.name).join(', ');
      await saveEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: `[Service Pillar: ${formData.servicePillar}] [NDA Required: ${formData.ndaRequired}] [Attached Files: ${fileNames || 'None'}] ${formData.message}`
      });
      success('Inquiry Received!', 'Our IP support desk has received your request. We will contact you within 24 hours under confidentiality safeguards.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        servicePillar: 'inventor-services',
        message: '',
        ndaRequired: true
      });
      setFiles([]);
    } catch (err) {
      console.error(err);
      toastError('Submission Failed', 'An error occurred while transmitting your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* Banner */}
      <section className="relative py-16 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_60%)] opacity-35" />
        <div className="container-custom relative z-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Contact & Consultation
          </h1>
          <p className="text-base md:text-lg text-slate-350 max-w-2xl mx-auto">
            Get in touch to review prior art, format patent drawings, or coordinate filings with registered practitioners.
          </p>
        </div>
      </section>

      {/* Grid container */}
      <section className="py-20 bg-white dark:bg-slate-950 flex-1 transition-colors duration-300">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Details (Left) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-primary dark:text-white tracking-tight">
                Support & Consultation
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Connect with our coordinators under safe NDA guidelines. We coordinate drawing updates, novelty database screenings, and matched attorney drafting sequences.
              </p>
            </div>

            {/* List */}
            <div className="space-y-6 text-sm">
              
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-blue-500/10 text-secondary dark:text-accent rounded-xl flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary dark:text-white">Business Hours</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Support: 24 Hours | Consultation: 9 AM–6 PM ET
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-blue-500/10 text-secondary dark:text-accent rounded-xl flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary dark:text-white">Call Platform Support</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 font-mono">
                    330-353-9850
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-blue-500/10 text-secondary dark:text-accent rounded-xl flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary dark:text-white">Email Address</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 font-mono">
                    contact@korkinventrex.com
                  </p>
                </div>
              </div>

            </div>

            {/* Legal Notice Sidecard */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl space-y-3">
              <span className="font-bold text-xs text-slate-800 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
                <Lock size={14} className="text-accent" />
                NDA Protected Inbound
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                All incoming submissions are processed in strict confidence. If you prefer to review and sign our standard Mutual Non-Disclosure Agreement (MNDA) before sharing drawings, please select the NDA requirement box in the form.
              </p>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7 bg-light-gray dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-850 shadow-sm text-left">
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold text-primary dark:text-white tracking-tight">
                Submit an Inquiry
              </h3>
              <p className="text-xs text-slate-550 dark:text-slate-400">
                Please complete the form details. A platform coordinator will follow up to review options.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="330-353-9850"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IP Pillar Interest</label>
                  <select
                    name="servicePillar"
                    value={formData.servicePillar}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white font-bold"
                  >
                    <option value="inventor-services">Inventor Services & Roadmaps</option>
                    <option value="patent-illustrations">Patent Illustration drawings</option>
                    <option value="patent-filing-support">Filing & Prosecution Support</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Invention & Project Details</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your design, patent drawing needs, or filing targets. Avoid sharing raw claims before signing the mutual NDA."
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white resize-none"
                />
              </div>

              {/* Styled File Upload Zone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attachment Files (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-6 bg-white dark:bg-slate-950 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all flex flex-col items-center justify-center cursor-pointer relative group">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud size={28} className="text-slate-400 group-hover:text-accent transition-colors" />
                  <span className="text-xs font-bold text-primary dark:text-white mt-2">
                    Drag & drop files or click to browse
                  </span>
                  <span className="text-[10px] text-slate-450 mt-1">
                    Upload CAD sheets, technical sketches, or blueprints (PDF, JPG, DXF up to 20MB)
                  </span>
                </div>

                {/* File checklist */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-lg text-xs">
                        <div className="flex items-center gap-2 text-slate-650 dark:text-slate-350">
                          <File size={14} className="text-accent" />
                          <span className="font-bold truncate max-w-[200px]">{file.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({file.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* NDA Checkbox */}
              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="ndaRequired"
                  name="ndaRequired"
                  checked={formData.ndaRequired}
                  onChange={handleCheckboxChange}
                  className="rounded bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-accent focus:ring-0 focus:outline-none w-4 h-4"
                />
                <label htmlFor="ndaRequired" className="text-xs text-slate-550 dark:text-slate-400 cursor-pointer flex items-center gap-1.5 selection:bg-transparent">
                  <Lock size={12} className="text-accent" />
                  Require mutual NDA review prior to full technical disclosure
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10 disabled:opacity-50 transition-opacity"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Send secure message
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
