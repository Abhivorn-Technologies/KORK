'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle, 
  Send, 
  HelpCircle,
  FileText,
  Boxes,
  Layers,
  ChevronRight
} from 'lucide-react';
import { getProductBySlug, saveEnquiry } from '@/lib/firebase';
import { Product } from '@/types';
import { useToast } from '@/components/common/Toast';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { success, error: toastError } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductBySlug(slug);
        if (data) {
          setProduct(data);
          setActiveImage(data.image);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    if (!formData.name || !formData.email || !formData.message) {
      toastError('Validation Failed', 'Please input name, email, and inquiry detail.');
      return;
    }
    setSubmitting(true);

    try {
      await saveEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: `[Product Inquiry: ${product.title}] ${formData.message}`
      });

      success('Inquiry Submitted!', `Your request for ${product.title} has been logged.`);
      setIsInquiryModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      toastError('Submission Error', 'Failed to send your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-24 space-y-12 animate-pulse">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-4">
            <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
            <div className="flex gap-4">
              <div className="h-20 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-20 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-6">
            <div className="h-10 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-24 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-12 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-32 text-center space-y-6">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Product Not Found</h2>
        <p className="text-slate-400">The product you are trying to view does not exist or has been relocated.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold"
        >
          <ArrowLeft size={16} />
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-slate-950 transition-colors duration-300 py-12">
      <div className="container-custom space-y-8">
        
        {/* Navigation back / Breadcrumbs */}
        <div className="flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Products Catalog
          </Link>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        {/* Core details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Gallery View */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-900">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-all"
              />
            </div>
            
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[product.image, ...product.gallery].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`h-16 w-20 rounded-xl overflow-hidden border-2 shrink-0 ${
                      activeImage === img ? 'border-accent' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="gallery-thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Texts & Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
                {product.title}
              </h1>
            </div>

            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 border-t border-slate-100 dark:border-slate-850">
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-secondary to-accent hover:opacity-95 shadow-md shadow-blue-500/10"
              >
                Inquire About Product
                <Send size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Features & Specifications Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-slate-100 dark:border-slate-850">
          
          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary dark:text-white flex items-center gap-2">
              <Boxes className="text-secondary dark:text-accent" size={20} />
              Features & Functional Benefits
            </h3>
            {product.features && product.features.length > 0 ? (
              <ul className="space-y-3">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={16} />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">Standard operational features apply. Contact sales for customized setups.</p>
            )}
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary dark:text-white flex items-center gap-2">
              <FileText className="text-accent" size={20} />
              Technical Specifications
            </h3>
            {product.specifications && product.specifications.length > 0 ? (
              <div className="border border-slate-100 dark:border-slate-850 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left text-slate-600 dark:text-slate-400">
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                    {product.specifications.map((spec, i) => {
                      const parts = spec.split(':');
                      const label = parts[0];
                      const val = parts.slice(1).join(':');
                      return (
                        <tr key={i} className="bg-white dark:bg-slate-900/60">
                          <td className="px-4 py-3 font-bold text-primary dark:text-white bg-slate-50 dark:bg-slate-950/40 w-1/3">
                            {label}
                          </td>
                          <td className="px-4 py-3">
                            {val || 'Yes'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Custom specification buildheets can be generated on request.</p>
            )}
          </div>

        </div>

      </div>

      {/* Inquiry Dialog Modal */}
      <AnimatePresence>
        {isInquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInquiryModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl z-10"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-primary dark:text-white tracking-tight">
                    Inquire: {product.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Submit your parameters below. An applications engineer will follow up shortly.
                  </p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Corporate Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Corp Systems Ltd"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Inquiry Details</label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Specify voltage, load conditions, custom layout needs..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsInquiryModalOpen(false)}
                      className="px-4 py-2 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-850"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-secondary to-accent disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {submitting ? 'Submitting...' : 'Send Inquiry'}
                      <Send size={12} />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
