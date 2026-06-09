'use client';

import { useState, useEffect } from 'react';
import { getBlogs, addBlog, updateBlog, deleteBlog } from '@/lib/firebase';
import { Blog } from '@/types';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { useToast } from '@/components/common/Toast';
import { slugify, formatDate } from '@/utils/helpers';

export default function AdminBlogsPage() {
  const { success, error: toastError } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Industrial Automation');
  const [excerpt, setExcerpt] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [author, setAuthor] = useState('Er. A. K. Ranganathan');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await getBlogs(100);
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const openCreateModal = () => {
    setEditingBlog(null);
    setTitle('');
    setCategory('Industrial Automation');
    setExcerpt('');
    setThumbnail('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80');
    setAuthor('Er. A. K. Ranganathan');
    setContent('');
    setIsModalOpen(true);
  };

  const openEditModal = (b: Blog) => {
    setEditingBlog(b);
    setTitle(b.title);
    setCategory(b.category || 'Industrial Automation');
    setExcerpt(b.excerpt || '');
    setThumbnail(b.thumbnail);
    setAuthor(b.author);
    setContent(b.content);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !thumbnail || !author) {
      toastError('Validation Failed', 'Title, thumbnail URL, author, and content details are required.');
      return;
    }
    setSubmitting(true);

    const slug = slugify(title);
    const payload = {
      title,
      slug,
      category,
      excerpt,
      thumbnail,
      author,
      content
    };

    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, payload);
        success('Article Updated', `Saved changes to "${title}".`);
      } else {
        await addBlog(payload);
        success('Article Published', `Successfully added "${title}" to knowledge hub.`);
      }
      setIsModalOpen(false);
      loadBlogs();
    } catch (err) {
      console.error(err);
      toastError('Operation Failed', 'Failed to publish/update article details.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the article "${name}"?`)) return;

    try {
      await deleteBlog(id);
      success('Article Removed', `Successfully deleted "${name}".`);
      loadBlogs();
    } catch (err) {
      console.error(err);
      toastError('Removal Failed', 'Could not delete article.');
    }
  };

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight">
            Knowledge Hub Blogs Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Write, modify, or delete technical reports and engineering guidance posts.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white font-bold text-xs shadow-md shadow-blue-500/10"
        >
          <Plus size={16} />
          Create Blog Post
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
        />
      </div>

      {/* Table grid */}
      <div className="border border-slate-100 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400 animate-pulse">
            Loading publication records...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 border-b border-slate-100 dark:border-slate-850">
                <tr>
                  <th className="px-6 py-4 font-bold">Article Title</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Author</th>
                  <th className="px-6 py-4 font-bold">Published Date</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                      No blog posts published yet.
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.thumbnail}
                            alt={b.title}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-primary dark:text-white line-clamp-1">{b.title}</h4>
                            <span className="text-[10px] text-slate-400 font-mono">/{b.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-755">
                        {b.category || 'General'}
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {b.author}
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {formatDate(b.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => openEditModal(b)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(b.id, b.title)}
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
                {editingBlog ? `Edit Blog Article` : `Create Blog Article`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Article Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Scaling industrial operations using IoT..."
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
                    <option value="Engineering Consulting">Engineering Consulting</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Author Name</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Er. A. K. Ranganathan"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Thumbnail Image URL</label>
                  <input
                    type="text"
                    required
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Brief Excerpt</label>
                  <input
                    type="text"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Provide a 1-sentence summary of the article..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Article Content (Markdown supported)</label>
                  <textarea
                    required
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Use ## Title or ### Subtitle formatting. Use standard double carriage returns for paragraph breaks..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-accent text-primary dark:text-white resize-none font-mono"
                  />
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
                  {submitting ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
