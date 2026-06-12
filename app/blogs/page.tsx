'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { getBlogs, getRecentBlogs } from '@/lib/firebase';
import { Blog } from '@/types';
import { formatDate, getReadingTime, truncate } from '@/utils/helpers';
import { fadeUpReveal, scaleReveal, staggerContainer, childFadeUp } from '@/lib/animations';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const [allData, recentData] = await Promise.all([
          getBlogs(30),
          getRecentBlogs(4)
        ]);
        setBlogs(allData);
        setRecentBlogs(recentData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Categories extraction
  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean) as string[]))];

  // Filtering
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* Banner */}
      <section className="relative py-16 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_60%)] opacity-35" />
        <div className="container-custom relative z-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Knowledge Hub & Blog
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Insights on industrial automation, predictive maintenance, embedded designs, and manufacturing engineering.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-16 bg-white dark:bg-slate-950 flex-1 transition-colors duration-300">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Blogs Feed (Left) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Search and Categories bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-light-gray dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
              {/* Search */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs focus:outline-none focus:border-accent text-primary dark:text-white"
                />
              </div>

              {/* Categories */}
              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                      activeCategory === cat
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-white dark:bg-slate-950 text-slate-500 hover:text-slate-800 border border-slate-100 dark:border-slate-850'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              /* Skeletons */
              <div className="space-y-8">
                {[1, 2].map((n) => (
                  <div key={n} className="flex flex-col md:flex-row gap-6 p-5 rounded-2xl bg-light-gray dark:bg-slate-900/40 animate-pulse border border-slate-50 dark:border-slate-850">
                    <div className="w-full md:w-1/3 aspect-video md:h-40 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                    <div className="flex-1 space-y-3 py-1">
                      <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    No articles found matching your query.
                  </div>
                ) : (
                  <div className="space-y-8">
                    {filteredBlogs.map((blog) => (
                      <motion.article
                        key={blog.id}
                        variants={fadeUpReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="group flex flex-col md:flex-row gap-6 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900/40 hover:shadow-card transition-all"
                      >
                        {/* Thumbnail */}
                        <div className="w-full md:w-1/3 aspect-[16/10] md:h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0">
                          <img
                            src={blog.thumbnail}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                        </div>

                        {/* Content text */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="space-y-2.5">
                            {blog.category && (
                              <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                                {blog.category}
                              </span>
                            )}
                            <h2 className="text-lg md:text-xl font-bold text-primary dark:text-white leading-snug group-hover:text-secondary dark:group-hover:text-accent transition-colors">
                              <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {blog.excerpt || truncate(blog.content.replace(/[#*`]/g, ''), 120)}
                            </p>
                          </div>

                          {/* Metadata */}
                          <div className="flex flex-wrap gap-4 items-center text-[10px] text-slate-400 pt-4 border-t border-slate-50 dark:border-slate-850/80">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {formatDate(blog.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {blog.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {getReadingTime(blog.content)} min read
                            </span>
                            
                            <Link
                              href={`/blogs/${blog.slug}`}
                              className="ml-auto inline-flex items-center gap-1 font-bold text-secondary dark:text-accent"
                            >
                              Read Post
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>

          {/* Sidebar Widgets (Right) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Recent Posts widget */}
            <div className="p-6 rounded-2xl bg-light-gray dark:bg-slate-900 border border-slate-100 dark:border-slate-850 space-y-4">
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                <BookOpen size={14} className="text-accent" />
                Recent Technical Posts
              </h3>
              <div className="space-y-4">
                {loading ? (
                  [1, 2, 3].map(n => <div key={n} className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />)
                ) : (
                  recentBlogs.map((rb) => (
                    <div key={rb.id} className="space-y-1 group">
                      <Link 
                        href={`/blogs/${rb.slug}`}
                        className="text-xs font-bold text-slate-700 hover:text-secondary dark:text-slate-300 dark:hover:text-accent leading-snug line-clamp-2 transition-colors block"
                      >
                        {rb.title}
                      </Link>
                      <span className="text-[10px] text-slate-400 block">
                        {formatDate(rb.createdAt)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Support Widget */}
            <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-900 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
              <h4 className="text-sm font-bold tracking-tight">Need On-Site Engineering Support?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our operations technicians are on call 24/7. Submit system troubleshooting logs or schedule electrical audits today.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-secondary to-accent text-white"
                >
                  Contact Support
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
