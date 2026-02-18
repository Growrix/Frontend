
import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, ArrowRight, Clock, Menu, Zap, 
  TrendingUp, ShieldCheck, Mail, Bookmark, PlayCircle,
  Filter, Sparkles, Flame, Inbox
} from 'lucide-react';
import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The 2024 Federal Tax Credit Guide: Save 30% Today',
    excerpt: 'The Residential Clean Energy Credit is at an all-time high. Learn how to maximize your return before the next policy shift.',
    category: 'Policy',
    readTime: '6 min read',
    date: 'Oct 12, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    author: { name: 'Sarah Jensen', role: 'Policy Lead', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    content: `The Residential Clean Energy Credit is one of the most significant incentives for homeowners looking to go solar. In 2024, the credit remains at a robust 30% of your total system cost.\n\n### What is covered?\nIt's not just the panels. The credit applies to labor, assembly, installation, and even the piping or wiring required for the system. Furthermore, if you install a battery storage system with at least 3kWh capacity, that is also eligible for the full 30% credit.\n\n### How to claim it?\nWhen you file your federal income taxes, you'll use IRS Form 5695. This form allows you to calculate your credit based on the qualified expenses you paid for your solar energy system.`
  },
  {
    id: '2',
    title: 'Tesla Powerwall 3 vs. Enphase IQ Battery 5P',
    excerpt: 'We deep dive into the two industry titans of 2024. Which storage solution wins for your specific home size?',
    category: 'Hardware',
    readTime: '12 min read',
    date: 'Oct 10, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800',
    author: { name: 'Marcus Chen', role: 'Storage Engineer', avatar: 'https://i.pravatar.cc/150?u=marcus' },
    content: `As energy prices fluctuate and grid instability becomes more common, battery storage is no longer just an accessory—it's becoming a necessity for many solar homeowners.\n\n### Energy Independence\nWith a battery, you can store excess energy produced during the day to use at night or during an outage. This is particularly valuable in states with "Time of Use" (TOU) rates, where electricity is significantly more expensive during evening peak hours.`
  },
  {
    id: '3',
    title: 'Top 5 Panel Brands for High-Yield Performance',
    excerpt: 'We rank the most efficient solar panels currently available on the market for residential use.',
    category: 'Reviews',
    readTime: '5 min read',
    date: 'Oct 05, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-fe5bb584850a?auto=format&fit=crop&q=80&w=800',
    author: { name: 'David Miller', role: 'Field Specialist', avatar: 'https://i.pravatar.cc/150?u=david' },
    content: `Efficiency is the name of the game in 2024. Standard panels usually hover around 17-19% efficiency, but the top-tier brands we've reviewed are pushing past 22%.\n\n1. **SunPower Maxeon**: Still the gold standard for residential efficiency.\n2. **REC Alpha Pure-R**: Exceptional temperature coefficients.\n3. **QCells Duo**: Best value-for-performance.`
  },
];

interface BlogHomeProps {
  onOpenMenu: () => void;
  onSelectPost: (id: string) => void;
}

const BlogHome: React.FC<BlogHomeProps> = ({ onOpenMenu, onSelectPost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Policy', 'Hardware', 'ROI', 'Design', 'Reviews'];

  // Filtering Logic
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const listPosts = filteredPosts.slice(1);

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden relative">
      {/* Dynamic Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl z-[60] shrink-0">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenMenu}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 active:scale-90 transition-all shadow-lg"
          >
            <Menu size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-white tracking-tight leading-none">SOLAR INSIGHTS</h1>
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">Knowledge Hub</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="text-slate-500 hover:text-white transition-colors">
            <Bookmark size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-red-900/20 flex items-center justify-center border border-red-800/30">
            <BookOpen size={16} className="text-red-500" />
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Search Bar */}
        <div className="px-6 pt-6 pb-2">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search guides, hardware, policy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800/80 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Category Carousel */}
        <div className="flex space-x-3 overflow-x-auto no-scrollbar px-6 py-4">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-red-700 border-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Breaking Update Ticker */}
        <div className="px-6 mb-8">
           <div className="bg-red-950/10 border border-red-900/20 rounded-xl p-3 flex items-center space-x-3">
             <div className="flex items-center space-x-1 px-2 py-1 rounded bg-red-600 text-[8px] font-black text-white animate-pulse">
               <Flame size={10} fill="currentColor" />
               <span>TRENDING</span>
             </div>
             <p className="text-[11px] text-slate-300 font-medium truncate">New Solar Rebate Expansion in CA & NY: Check Eligibility →</p>
           </div>
        </div>

        {filteredPosts.length > 0 ? (
          <>
            {/* Featured Card */}
            {featuredPost && (
              <section className="px-6 mb-12">
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center">
                  <Sparkles size={14} className="mr-2 text-yellow-500" /> Editor's Choice
                </h2>
                <button 
                  onClick={() => onSelectPost(featuredPost.id)}
                  className="w-full text-left group relative rounded-[2.5rem] overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl transition-all active:scale-[0.98]"
                >
                  <div className="h-72 relative">
                    <img 
                      src={featuredPost.imageUrl} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    <div className="absolute top-4 right-4 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 flex items-center space-x-1.5">
                      <Clock size={12} className="text-red-500" />
                      <span className="text-[10px] font-bold text-white">{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-lg bg-red-600 text-[9px] font-black uppercase text-white tracking-widest">
                        {featuredPost.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">• {featuredPost.date}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white leading-tight group-hover:text-red-200 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed opacity-80">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center space-x-3 pt-2">
                      <img src={featuredPost.author.avatar} className="w-6 h-6 rounded-full border border-red-900/50" alt="" />
                      <span className="text-[11px] font-bold text-slate-300">{featuredPost.author.name}</span>
                    </div>
                  </div>
                </button>
              </section>
            )}

            {/* Video Learning Section */}
            <section className="px-6 mb-12">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Quick Lessons</h2>
                  <p className="text-lg font-black text-white mt-1">Video Shorts</p>
                </div>
                <button className="text-[10px] font-black text-red-500 hover:text-red-400 transition-colors">VIEW ALL</button>
              </div>
              <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-40 shrink-0 group cursor-pointer">
                    <div className="aspect-[9/16] bg-slate-900 rounded-3xl relative overflow-hidden border border-slate-800 shadow-lg">
                      <img 
                        src={`https://images.unsplash.com/photo-${i === 1 ? '1509391366360-fe5bb584850a' : i === 2 ? '1508514177221-188b1cf16e9d' : '1620714223084-8fcacc6dfd8d'}?auto=format&fit=crop&q=80&w=300`} 
                        className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                        alt=""
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-slate-950 to-transparent">
                        <PlayCircle className="text-white opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={32} />
                        <p className="text-[10px] font-bold text-white leading-tight">Solar 101: Understanding Net Metering</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Main Feed */}
            {listPosts.length > 0 && (
              <section className="px-6 pb-24 space-y-8">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                   <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Latest Stories</h2>
                   <TrendingUp size={14} className="text-slate-700" />
                </div>
                <div className="space-y-6">
                  {listPosts.map((post) => (
                    <button 
                      key={post.id}
                      onClick={() => onSelectPost(post.id)}
                      className="w-full flex items-center space-x-5 group text-left"
                    >
                      <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 border border-slate-800 shadow-md">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        />
                      </div>
                      <div className="flex-1 space-y-1.5 py-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.15em]">{post.category}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-800" />
                          <span className="text-[9px] font-bold text-slate-600">{post.readTime}</span>
                        </div>
                        <h3 className="text-sm font-black text-white leading-snug group-hover:text-red-100 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center justify-between pt-1">
                           <div className="flex items-center space-x-2">
                              <img src={post.author.avatar} className="w-4 h-4 rounded-full" alt="" />
                              <span className="text-[10px] font-medium text-slate-500">{post.author.name}</span>
                           </div>
                           <ArrowRight size={14} className="text-slate-800 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Newsletter Box */}
                <div className="bg-gradient-to-br from-red-800 to-red-950 rounded-[2.5rem] p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
                  <Mail className="absolute -right-6 -top-6 text-white/5" size={120} />
                  <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                    <Mail className="text-red-800" size={28} />
                  </div>
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-2xl font-black text-white">The Solar Pulse</h3>
                    <p className="text-xs text-red-100/60 max-w-[220px] mx-auto leading-relaxed">
                      Join 50k+ homeowners receiving weekly expert ROI strategies.
                    </p>
                  </div>
                  <div className="space-y-3 pt-2">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-white/20 transition-all text-center"
                    />
                    <button className="w-full bg-white text-red-900 font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all text-xs tracking-widest">
                      SIGN UP NOW
                    </button>
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="px-6 py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center text-slate-700">
              <Inbox size={40} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">No Insights Found</h3>
              <p className="text-sm text-slate-500 max-w-[240px] mt-2">
                We couldn't find any articles for "{activeCategory}" matching your search. Try another category.
              </p>
            </div>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="text-red-500 text-xs font-black tracking-widest uppercase hover:text-red-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogHome;
