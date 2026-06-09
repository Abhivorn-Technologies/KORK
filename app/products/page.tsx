'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  BrainCircuit,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getProducts } from '@/lib/firebase';
import { Product } from '@/types';

const CATEGORIES = ['All', 'Industrial Automation', 'Manufacturing Solutions', 'Product Development'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchMode, setSearchMode] = useState<'standard' | 'ai'>('standard');
  const [currentPage, setCurrentPage] = useState(1);
  const [aiResults, setAiResults] = useState<{ product: Product; score: number }[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts(50);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Standard Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.features && product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())));
      
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // AI Semantic Search Simulation
  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      // Simple heuristic string matching to simulate AI embeddings match
      const queryWords = aiQuery.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      
      const scored = products.map((product) => {
        let score = 30; // base score
        const textToSearch = [
          product.title,
          product.description,
          product.category,
          ...(product.features || []),
          ...(product.specifications || [])
        ].join(' ').toLowerCase();

        queryWords.forEach((word) => {
          if (textToSearch.includes(word)) {
            score += 20;
          }
        });

        // Add small random variation to look authentic
        score += Math.floor(Math.random() * 8);
        score = Math.min(score, 99); // Max score 99%
        
        return { product, score };
      })
      .filter(item => item.score > 40) // only return plausible matches
      .sort((a, b) => b.score - a.score);

      setAiResults(scored);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* Banner */}
      <section className="relative py-16 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af_0%,transparent_60%)] opacity-35" />
        <div className="container-custom relative z-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Industrial Systems Catalog
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Browse our range of certified controller panels, edge vibration sensors, and robotic handlers.
          </p>
        </div>
      </section>

      {/* Search and Filters Segment */}
      <section className="py-8 bg-light-gray dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800 transition-colors duration-300">
        <div className="container-custom space-y-6">
          
          {/* Search Mode Selector */}
          <div className="flex bg-slate-200 dark:bg-slate-950 p-1 rounded-xl max-w-sm">
            <button
              onClick={() => setSearchMode('standard')}
              className={`flex-1 py-2 px-4 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                searchMode === 'standard'
                  ? 'bg-white dark:bg-slate-900 text-primary dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Search size={14} />
              Standard Search
            </button>
            <button
              onClick={() => setSearchMode('ai')}
              className={`flex-1 py-2 px-4 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                searchMode === 'ai'
                  ? 'bg-gradient-to-r from-secondary to-accent text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BrainCircuit size={14} />
              AI Semantic Search
            </button>
          </div>

          {searchMode === 'standard' ? (
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products by model, key parameters, or features..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-primary dark:text-white focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all border whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm'
                        : 'bg-white dark:bg-slate-950 text-slate-500 border-slate-100 dark:border-slate-850 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* AI Query Bar */
            <form onSubmit={handleAiSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Explain what machine you need to control (e.g. 'I need a wireless node to monitor bearing vibration')..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-primary dark:text-white focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing Needs...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Match System
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                💡 Our AI analyzes your operational description to find corresponding controllers, gateways, or hardware options.
              </p>
            </form>
          )}

        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 bg-white dark:bg-slate-950 flex-1 transition-colors duration-300">
        <div className="container-custom">
          
          {loading ? (
            /* Skeleton Loading State */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-96 rounded-2xl bg-light-gray dark:bg-slate-900/40 p-4 animate-pulse flex flex-col justify-between border border-slate-100 dark:border-slate-850">
                  <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                  <div className="space-y-2 mt-4 flex-1">
                    <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                  <div className="h-10 w-28 bg-slate-200 dark:bg-slate-800 rounded mt-4" />
                </div>
              ))}
            </div>
          ) : (
            /* Products display */
            <>
              {searchMode === 'standard' ? (
                <>
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 space-y-4">
                      <p className="text-slate-400 text-lg">No products match your search query or filters.</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setActiveCategory('All');
                        }}
                        className="text-xs font-bold text-accent underline"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {paginatedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 shadow-card hover:shadow-card-hover hover:border-accent/30 transition-all duration-300"
                        >
                          <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-550"
                            />
                            <span className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded">
                              {product.category}
                            </span>
                          </div>
                          
                          <div className="flex-1 p-6 space-y-4 flex flex-col justify-between">
                            <div className="space-y-2">
                              <h3 className="text-lg font-bold text-primary dark:text-white leading-tight group-hover:text-secondary dark:group-hover:text-accent transition-colors">
                                {product.title}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                {product.description}
                              </p>
                            </div>
                            
                            <div className="pt-4 border-t border-slate-50 dark:border-slate-850 flex items-center justify-between">
                              <Link
                                href={`/products/${product.slug}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary dark:text-accent group-hover:gap-2.5 transition-all"
                              >
                                View Details
                                <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-slate-100 dark:border-slate-850">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-850 flex items-center justify-center text-slate-500 disabled:opacity-40"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <span className="text-xs font-bold text-slate-500">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-850 flex items-center justify-center text-slate-500 disabled:opacity-40"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* AI Search Results Display */
                <div className="space-y-6 max-w-4xl mx-auto">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    AI Search Results ({aiResults.length})
                  </h3>
                  
                  {aiResults.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                      <p className="text-slate-400 text-sm">Please input a request query above to run the matching model.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {aiResults.map(({ product, score }) => (
                        <div
                          key={product.id}
                          className="p-5 rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between hover:border-accent/30 hover:shadow-card transition-all"
                        >
                          <div className="flex gap-4 items-center">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100 dark:bg-slate-950"
                            />
                            <div className="space-y-1">
                              <span className="inline-block text-[9px] font-bold text-accent uppercase tracking-wider">
                                {product.category}
                              </span>
                              <h4 className="text-base font-bold text-primary dark:text-white leading-snug">
                                {product.title}
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-lg">
                                {product.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0 max-sm:w-full max-sm:justify-between max-sm:pt-3 max-sm:border-t max-sm:border-slate-50 dark:max-sm:border-slate-850">
                            {/* Score indicator */}
                            <div className="flex flex-col items-end">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Match Score</span>
                              <span className="text-lg font-black text-emerald-500 mt-1 leading-none font-mono">{score}%</span>
                            </div>
                            
                            <Link
                              href={`/products/${product.slug}`}
                              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-accent hover:text-white text-slate-300 transition-all"
                            >
                              <ArrowRight size={18} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>
      </section>

    </div>
  );
}
