
import React from 'react';
import { Sun, Battery, DollarSign, ArrowRight, Zap, Cloud, ShieldCheck, Gift, Menu, BookOpen, Clock, Globe, Newspaper, ExternalLink } from 'lucide-react';
import { AppView } from '../types';
import { BLOG_POSTS } from './BlogHome';
import { NEWS_ITEMS } from './NewsHome';

interface DashboardProps {
  onStartForm: () => void;
  onOpenAI: () => void;
  onNavigate: (view: AppView) => void;
  onOpenMenu: () => void;
  onSelectNews: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartForm, onOpenAI, onNavigate, onOpenMenu, onSelectNews }) => {
  // Take top 2 recent posts for the dashboard preview
  const recentPosts = BLOG_POSTS.slice(0, 2);
  const displayNews = NEWS_ITEMS.slice(0, 3);

  return (
    <div className="p-6 space-y-6 pb-32 max-w-md mx-auto custom-scrollbar overflow-y-auto h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenMenu}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 active:scale-95 transition-all shadow-lg"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Welcome Home</h1>
            <p className="text-slate-500 text-xs">Solar yield is high today</p>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-red-900/30 border border-red-800 flex items-center justify-center shadow-lg shadow-red-900/10">
          <Sun className="text-red-500" size={24} />
        </div>
      </div>

      {/* Hero Action Card */}
      <button 
        onClick={onStartForm}
        className="w-full bg-gradient-to-br from-red-800 to-red-950 rounded-2xl p-6 text-left border border-red-700/50 shadow-xl relative overflow-hidden group transition-all"
      >
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-white mb-2">Switch to Solar</h2>
          <p className="text-red-100/70 text-sm mb-4">See how much you could save with a custom Helios installation.</p>
          <div className="flex items-center text-white font-semibold group-hover:gap-2 transition-all">
            Get Instant Quote <ArrowRight size={18} className="ml-2" />
          </div>
        </div>
        <Zap className="absolute -right-4 -bottom-4 text-red-700 opacity-20 group-hover:scale-110 transition-transform" size={140} />
      </button>

      {/* New Rebate Sections */}
      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={() => onNavigate(AppView.SOLAR_REBATE)}
          className="flex items-center space-x-4 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-red-900/50 transition-colors group shadow-sm"
        >
          <div className="w-12 h-12 bg-red-950/40 rounded-lg flex items-center justify-center shrink-0">
            <Gift className="text-red-500" size={24} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-sm font-bold text-white">Solar Rebate Calculator</h3>
            <p className="text-xs text-slate-500">Find federal & state incentives</p>
          </div>
          <ArrowRight size={16} className="text-slate-600 group-hover:text-red-500 transition-colors" />
        </button>

        <button 
          onClick={() => onNavigate(AppView.BATTERY_REBATE)}
          className="flex items-center space-x-4 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-red-900/50 transition-colors group shadow-sm"
        >
          <div className="w-12 h-12 bg-red-950/40 rounded-lg flex items-center justify-center shrink-0">
            <Battery className="text-red-500" size={24} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-sm font-bold text-white">Battery Rebate Calculator</h3>
            <p className="text-xs text-slate-500">Storage & SGIP incentives</p>
          </div>
          <ArrowRight size={16} className="text-slate-600 group-hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="bg-slate-800/50 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
            <DollarSign className="text-red-500" size={18} />
          </div>
          <div className="text-2xl font-bold text-white">$1,240</div>
          <div className="text-xs text-slate-500">Estimated Annual Savings</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="bg-slate-800/50 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
            <Zap className="text-red-500" size={18} />
          </div>
          <div className="text-2xl font-bold text-white">12.4 kW</div>
          <div className="text-xs text-slate-500">Avg. System Capacity</div>
        </div>
      </div>

      {/* AI Assistant Callout */}
      <button 
        onClick={onOpenAI}
        className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between group"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-red-900/20 rounded-xl flex items-center justify-center">
            <Cloud className="text-red-500" size={20} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-white">Ask Helios AI</h3>
            <p className="text-[10px] text-slate-500 uppercase font-medium">Instant Solar Answers</p>
          </div>
        </div>
        <ArrowRight size={18} className="text-slate-700 group-hover:text-red-500 transition-colors" />
      </button>

      {/* Latest Insights Blog Section */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center">
            <BookOpen size={16} className="text-red-500 mr-2" /> Latest Insights
          </h2>
          <button 
            onClick={() => onNavigate(AppView.BLOG)}
            className="text-[10px] font-bold text-red-500 hover:text-red-400 transition-colors flex items-center"
          >
            VIEW ALL <ArrowRight size={12} className="ml-1" />
          </button>
        </div>

        <div className="space-y-3">
          {recentPosts.map((post) => (
            <button 
              key={post.id}
              onClick={() => onNavigate(AppView.BLOG)} 
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-3 flex items-center space-x-4 group text-left transition-all hover:bg-slate-900"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                  <span className="text-red-500">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-800" />
                  <span className="flex items-center"><Clock size={10} className="mr-1" /> {post.readTime}</span>
                </div>
                <h3 className="text-xs font-bold text-white line-clamp-2 leading-tight group-hover:text-red-100">
                  {post.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Industry News Section (Solar Market Pulse) */}
      <section className="space-y-4 pt-4 pb-12">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center">
            <Globe size={16} className="text-red-500 mr-2" /> Market Pulse
          </h2>
          <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Real-time Updates</span>
        </div>

        <div className="bg-slate-900/30 rounded-3xl border border-slate-800/50 divide-y divide-slate-800/50 overflow-hidden">
          {displayNews.map((news) => (
            <div 
              key={news.id} 
              onClick={() => onSelectNews(news.id)}
              className="p-4 hover:bg-slate-900/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-wider">{news.source}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span className="text-[10px] text-slate-500 font-medium">{news.time}</span>
                </div>
                {news.trending && (
                  <div className="flex items-center space-x-1 bg-red-950/40 border border-red-900/30 px-2 py-0.5 rounded-full">
                    <Zap size={10} className="text-red-500 fill-red-500" />
                    <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter">Trending</span>
                  </div>
                )}
              </div>
              <div className="flex items-start justify-between space-x-4">
                <p className="text-sm font-bold text-slate-200 leading-snug group-hover:text-white transition-colors">
                  {news.title}
                </p>
                <ExternalLink size={14} className="text-slate-700 shrink-0 group-hover:text-red-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => onNavigate(AppView.NEWS)}
          className="w-full py-4 border border-dashed border-slate-800 rounded-2xl flex items-center justify-center space-x-2 text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-all text-xs font-bold uppercase tracking-widest"
        >
           <Newspaper size={16} />
           <span>Browse Industry Archive</span>
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
