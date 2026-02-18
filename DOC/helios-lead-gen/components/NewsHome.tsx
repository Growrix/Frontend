
import React, { useState, useMemo } from 'react';
import { 
  Globe, Search, ArrowRight, Clock, Menu, Zap, 
  Newspaper, Filter, Inbox, ExternalLink, Bookmark
} from 'lucide-react';
import { NewsItem } from '../types';

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    source: 'EnergyWire',
    time: '2h ago',
    category: 'Global',
    title: 'Global solar output projected to rise 22% by end of 2024.',
    summary: 'New report from the International Energy Agency shows unprecedented growth in photovoltaic installations globally.',
    content: `The International Energy Agency (IEA) has released its mid-year outlook, suggesting that 2024 will be a record-breaking year for solar energy. Total output is expected to rise by 22%, driven largely by massive utility-scale projects in Asia and aggressive residential adoption in North America.\n\n### Scaling the Grid\nGrid infrastructure remains the primary bottleneck for this expansion. "We are seeing panel production outpace grid readiness in many key markets," says senior analyst Elena Rostova. Governments are now shifting focus toward smart-grid technology and long-term storage solutions to accommodate the surge.`,
    trending: true,
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'n2',
    source: 'EcoTimes',
    time: '5h ago',
    category: 'Tech',
    title: 'New solid-state battery tech promises 15-year home lifespan.',
    summary: 'Researchers in Germany have developed a solid-state electrolyte that significantly reduces degradation in home storage units.',
    content: `A breakthrough in solid-state chemistry could change the landscape of home energy storage. Current lithium-ion batteries typically see significant degradation after 8-10 years. This new technology, utilizing a proprietary solid electrolyte, maintains 95% capacity after 5,000 cycles—equivalent to roughly 15 years of daily use.\n\n### Commercial Availability\nWhile the tech is currently in pilot production, the researchers expect commercial licensing to begin by late 2025. This would bring more stable and longer-lasting batteries to the Helios ecosystem soon.`,
    trending: false,
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'n3',
    source: 'PolicyDaily',
    time: '1d ago',
    category: 'Policy',
    title: 'IRS clarifies new rules for multi-family solar tax credits.',
    summary: 'The Internal Revenue Service issued guidance on how apartment complexes and multi-unit dwellings can claim solar incentives.',
    content: `The IRS has finally provided the long-awaited clarity regarding section 25D credits for multi-family buildings. Under the new rules, individual unit owners can claim a pro-rated share of the solar installation cost for shared roof surfaces, provided the energy usage is directly metered to their units.\n\n### Impact on Renters\nThis move is expected to unlock solar adoption for millions of urban residents who were previously in a legal gray area regarding federal incentives.`,
    trending: false,
    imageUrl: 'https://images.unsplash.com/photo-1449156001533-cb39c85049c3?auto=format&fit=crop&q=80&w=800'
  }
];

interface NewsHomeProps {
  onOpenMenu: () => void;
  onSelectNews: (id: string) => void;
}

const NewsHome: React.FC<NewsHomeProps> = ({ onOpenMenu, onSelectNews }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Global', 'Tech', 'Policy', 'Markets', 'Resilience'];

  const filteredNews = useMemo(() => {
    return NEWS_ITEMS.filter(news => {
      const matchesCategory = activeCategory === 'All' || news.category === activeCategory;
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          news.source.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden relative">
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl z-[60] shrink-0">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenMenu}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 active:scale-90 transition-all shadow-lg"
          >
            <Menu size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-white tracking-tight leading-none uppercase">Market Pulse</h1>
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">Real-time News</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-red-900/20 flex items-center justify-center border border-red-800/30">
          <Globe size={16} className="text-red-500" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-6 pt-6 pb-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Search market updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-red-600/50 transition-all"
            />
          </div>
        </div>

        <div className="flex space-x-3 overflow-x-auto no-scrollbar px-6 py-4">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-black whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-red-700 border-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="px-6 pb-24 space-y-4 pt-2">
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <button 
                key={news.id}
                onClick={() => onSelectNews(news.id)}
                className={`w-full border rounded-3xl p-5 group text-left transition-all relative overflow-hidden ${
                  news.trending 
                    ? 'bg-gradient-to-br from-red-950/20 to-slate-900 border-red-900/30 shadow-[0_0_20px_rgba(185,28,28,0.1)]' 
                    : 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-900 hover:border-slate-700 shadow-sm'
                }`}
              >
                {/* Visual Flair for Trending Items */}
                {news.trending && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
                )}

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${news.trending ? 'text-red-400' : 'text-red-500'}`}>
                      {news.source}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-[10px] text-slate-500 font-medium">{news.time}</span>
                  </div>
                  {news.trending && (
                    <div className="flex items-center space-x-1 bg-red-600 border border-red-500 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.3)] transform group-hover:scale-105 transition-transform">
                      <Zap size={10} className="text-white fill-white" />
                      <span className="text-[8px] font-black text-white tracking-tighter">TRENDING</span>
                    </div>
                  )}
                </div>
                <h3 className={`text-base font-bold leading-snug transition-colors mb-2 relative z-10 ${
                  news.trending ? 'text-white' : 'text-slate-200 group-hover:text-red-100'
                }`}>
                  {news.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4 relative z-10">
                  {news.summary}
                </p>
                <div className={`flex items-center justify-between pt-2 border-t relative z-10 ${
                  news.trending ? 'border-red-900/20' : 'border-slate-800/50'
                }`}>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter bg-slate-800/50 px-2 py-0.5 rounded">#{news.category}</span>
                   <div className="flex items-center text-red-500 text-[10px] font-bold group-hover:gap-1 transition-all">
                     READ ARTICLE <ArrowRight size={14} className="ml-1" />
                   </div>
                </div>
              </button>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <Inbox size={40} className="text-slate-800" />
              <p className="text-slate-500 text-sm">No news found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsHome;
