'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  BookOpen, 
  Check, 
  Copy 
} from 'lucide-react';
import { getBlogBySlug, getRecentBlogs } from '@/lib/firebase';
import { Blog } from '@/types';
import { formatDate, getReadingTime } from '@/utils/helpers';
import { useToast } from '@/components/common/Toast';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { success } = useToast();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogData, recentData] = await Promise.all([
          getBlogBySlug(slug),
          getRecentBlogs(4)
        ]);
        if (blogData) {
          setBlog(blogData);
        }
        setRecentBlogs(recentData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    success('Link Copied!', 'Article URL copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="container-custom py-24 space-y-12 animate-pulse">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="flex gap-4">
            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="h-96 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container-custom py-32 text-center space-y-6">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Article Not Found</h2>
        <p className="text-slate-400">The technical post you are searching for is not cataloged.</p>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold"
        >
          <ArrowLeft size={16} />
          Back to Blogs Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-slate-950 transition-colors duration-300 py-12">
      <div className="container-custom space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Blogs Hub
          </Link>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main article container (Left) */}
          <article className="lg:col-span-8 space-y-8">
            
            {/* Header info */}
            <div className="space-y-4">
              {blog.category && (
                <span className="text-xs font-black text-accent uppercase tracking-widest block">
                  {blog.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight leading-tight">
                {blog.title}
              </h1>
              
              {/* Metadata */}
              <div className="flex flex-wrap gap-4 items-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-b border-slate-100 dark:border-slate-850 pb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(blog.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {blog.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {getReadingTime(blog.content)} min read
                </span>
                
                <button
                  onClick={copyLink}
                  className="ml-auto inline-flex items-center gap-1.5 hover:text-primary dark:hover:text-white transition-colors"
                  title="Share Article"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-900">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Text Content (Rendered Markdown simulation) */}
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-350 text-sm md:text-base leading-relaxed space-y-6">
              {blog.content.split('\n\n').map((para, i) => {
                if (para.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-extrabold text-primary dark:text-white pt-4 tracking-tight">{para.replace('## ', '')}</h2>;
                }
                if (para.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-bold text-primary dark:text-white pt-2 tracking-tight">{para.replace('### ', '')}</h3>;
                }
                if (para.startsWith('- ')) {
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-1 my-2">
                      {para.split('\n').map((li, idx) => (
                        <li key={idx} className="leading-relaxed">{li.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (para.startsWith('1. ')) {
                  return (
                    <ol key={i} className="list-decimal pl-5 space-y-1 my-2">
                      {para.split('\n').map((li, idx) => (
                        <li key={idx} className="leading-relaxed">{li.replace(/^\d+\.\s+/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return <p key={i} className="whitespace-pre-line">{para}</p>;
              })}
            </div>

          </article>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Recent Posts widget */}
            <div className="p-6 rounded-2xl bg-light-gray dark:bg-slate-900 border border-slate-100 dark:border-slate-850 space-y-4">
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-850">
                <BookOpen size={14} className="text-accent" />
                Recent Tech Articles
              </h3>
              <div className="space-y-4">
                {recentBlogs.filter(rb => rb.id !== blog.id).map((rb) => (
                  <div key={rb.id} className="space-y-1">
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
                ))}
              </div>
            </div>

            {/* Consult Widget */}
            <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-900 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
              <h4 className="text-sm font-bold tracking-tight">Need Technical Feasibility Advice?</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Speak directly with an automation architect. We evaluate motor torque profiles, custom PLC racks, and remote VPN solutions.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-secondary to-accent text-white"
                >
                  Request Consultation
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
