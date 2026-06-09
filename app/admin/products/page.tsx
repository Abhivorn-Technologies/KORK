'use client';

import { useState, useEffect } from 'react';
import { 
  getProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from '@/lib/firebase';
import { Product } from '@/types';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { useToast } from '@/components/common/Toast';
import { slugify } from '@/utils/helpers';

export default function AdminProductsPage() {
  const { success, error: toastError } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Industrial Automation');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [featured, setFeatured] = useState(false);
  const [featuresText, setFeaturesText] = useState('');
  const [specsText, setSpecsText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch Products
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(100);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Open modal for Create
  const openCreateModal = () => {
    setEditingProduct(null);
    setTitle('');
    setCategory('Industrial Automation');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80');
    setFeatured(false);
    setFeaturesText('');
    setSpecsText('');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setCategory(p.category);
    setDescription(p.description);
    setImage(p.image);
    setFeatured(p.featured);
    setFeaturesText(p.features ? p.features.join('\n') : '');
    setSpecsText(p.specifications ? p.specifications.join('\n') : '');
    setIsModalOpen(true);
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !image) {
      toastError('Validation Failed', 'Title, description and main image URL are mandatory.');
      return;
    }
    setSubmitting(true);

    const slug = slugify(title);
    const featuresList = featuresText.split('\n').map(f => f.trim()).filter(Boolean);
    const specsList = specsText.split('\n').map(s => s.trim()).filter(Boolean);

    const payload = {
      title,
      slug,
      category,
      description,
      image,
      featured,
      gallery: [],
      features: featuresList,
      specifications: specsList
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        success('Product Updated', `Successfully saved changes to "${title}".`);
      } else {
        await addProduct(payload);
        success('Product Created', `Successfully added "${title}" to catalog.`);
      }
      setIsModalOpen(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      toastError('Operation Failed', 'Failed to save product details.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await deleteProduct(id);
      success('Product Removed', `Successfully deleted "${name}".`);
      loadProducts();
    } catch (err) {
      console.error(err);
      toastError('Removal Failed', 'Could not remove product.');
    }
  };

  // Filtered
  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight">
            Products Catalog Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Add, update, or remove physical systems, sensors, and gateway modules.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white font-bold text-xs shadow-md shadow-blue-500/10"
        >
          <Plus size={16} />
          Add Product Node
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
        />
      </div>

      {/* Table grid */}
      <div className="border border-slate-100 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400 animate-pulse">
            Syncing product records...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 border-b border-slate-100 dark:border-slate-850">
                <tr>
                  <th className="px-6 py-4 font-bold">Product Model</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Featured</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                      No products cataloged.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-primary dark:text-white">{p.title}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">/{p.slug}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                        {p.category}
                      </td>
                      <td className="px-6 py-4">
                        {p.featured ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase">
                            <Check size={12} />
                            Featured
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg"
                            title="Delete"
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

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center pb-4 border-b border-slate-150 dark:border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-primary dark:text-white">
                {editingProduct ? `Edit Product Node` : `Add Product Node`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Product Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. SCADA edge gateway X-50"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  >
                    <option value="Industrial Automation">Industrial Automation</option>
                    <option value="Manufacturing Solutions">Manufacturing Solutions</option>
                    <option value="Product Development">Product Development</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Main Product Image URL</label>
                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detailed description of features, operating profiles..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Features list (One per line)</label>
                  <textarea
                    rows={4}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    placeholder="Feature item 1&#10;Feature item 2"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Specs List (key: value - One per line)</label>
                  <textarea
                    rows={4}
                    value={specsText}
                    onChange={(e) => setSpecsText(e.target.value)}
                    placeholder="Input Voltage: 24V&#10;Interface: RS-485"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white resize-none"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-accent focus:ring-0 w-4 h-4 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  />
                  <label htmlFor="featured" className="text-xs font-bold text-slate-700 dark:text-slate-350 cursor-pointer">
                    Promote to Featured on Landing Page
                  </label>
                </div>

              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-secondary to-accent font-bold disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
