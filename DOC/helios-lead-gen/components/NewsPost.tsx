
import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, Share2, Bookmark, ArrowRight, 
  Zap, Globe, Twitter, Facebook, Link, Check, X,
  ExternalLink, Newspaper, Mail
} from 'lucide-react';
import { NewsItem } from '../types';

interface NewsPostProps {
  news: NewsItem;
  onBack: () => void;
}

const NewsPost: React.FC<NewsPostProps> = ({ news, onBack }) => {
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: news.title, url: shareUrl });
    } else {
      setShowShareSheet(true);
    }
  };

  const shareToSocial = (platform: 'x' | 'fb') => {
    const shareTitle = `Market Pulse: ${news.title}`;
    const urls = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
    setShowShareSheet(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-slate-950 to-transparent">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-950/50 backdrop-blur-md border border-slate-800 flex items-center justify-center text-white active:scale-95 transition-all shadow-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex space-x-2">
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-slate-950/50 backdrop-blur-md border border-slate-800 flex items-center justify-center text-white active:scale-95 transition-all shadow-lg"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {news.imageUrl && (
          <div className="h-64 relative">
            <img 
              src={news.imageUrl} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          </div>
        )}

        <div className="px-8 pt-8 pb-32 space-y-6">
          <div className="flex items-center space-x-3">
             <span className="px-3 py-1 rounded-full bg-red-600 text-[9px] font-black uppercase text-white tracking-[0.2em]">
                {news.category}
              </span>
              <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <Globe size={12} className="text-red-500" />
                <span>{news.source}</span>
              </div>
          </div>

          <h1 className="text-3xl font-black text-white leading-tight tracking-tight">
            {news.title}
          </h1>

          <div className="flex items-center space-x-4 py-4 border-y border-slate-900 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
            <span className="flex items-center"><Clock size={14} className="mr-1.5 text-red-600" /> {news.time}</span>
            <span className="w-1 h-1 rounded-full bg-slate-800" />
            <span className="text-slate-400">Verified Market Intel</span>
          </div>

          <article className="space-y-6 text-slate-300 leading-relaxed text-base">
            {news.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className={paragraph.startsWith('###') ? 'text-xl font-bold text-white pt-4 border-l-4 border-red-700 pl-4' : ''}>
                {paragraph.replace('###', '').trim()}
              </p>
            ))}
          </article>

          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 my-10 space-y-4">
             <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                  <ExternalLink size={16} className="text-red-500 mr-2" /> Source Details
                </h4>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed">
               This report was syndicated from {news.source} and verified by Helios Market Intelligence. For the full original report, visit the publisher's official archive.
             </p>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-br from-red-800 to-red-950 rounded-[2.5rem] p-10 text-center space-y-6 shadow-2xl relative overflow-hidden mt-12 mb-8">
            <Mail className="absolute -right-6 -top-6 text-white/5" size={120} />
            <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
              <Mail className="text-red-800" size={28} />
            </div>
            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-black text-white">The Solar Pulse</h3>
              <p className="text-xs text-red-100/60 max-w-[220px] mx-auto leading-relaxed">
                Stay updated on the latest market shifts and policy changes.
              </p>
            </div>
            <div className="space-y-3 pt-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-white/20 transition-all text-center"
              />
              <button className="w-full bg-white text-red-900 font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all text-xs tracking-widest">
                SIGN UP FOR UPDATES
              </button>
            </div>
          </div>
        </div>
      </div>

      {showShareSheet && (
        <>
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]" onClick={() => setShowShareSheet(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-[101] p-6 animate-in slide-in-from-bottom">
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-white">Share Intel</h3>
                <button onClick={() => setShowShareSheet(false)} className="p-2 bg-slate-800 rounded-full text-slate-400"><X size={18} /></button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => shareToSocial('x')}
                  className="flex flex-col items-center space-y-2 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 transition-colors group-hover:text-red-500 group-hover:bg-red-900/10">
                    <Twitter size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">Twitter</span>
                </button>
                <button 
                  onClick={() => shareToSocial('fb')}
                  className="flex flex-col items-center space-y-2 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 transition-colors group-hover:text-red-500 group-hover:bg-red-900/10">
                    <Facebook size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">Facebook</span>
                </button>
                <button 
                  className="flex flex-col items-center space-y-2 group" 
                  onClick={() => { 
                    navigator.clipboard.writeText(shareUrl); 
                    setCopied(true); 
                    setTimeout(() => setCopied(false), 2000); 
                  }}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${copied ? 'bg-green-600 text-white' : 'bg-white/5 text-slate-300 group-hover:text-red-500 group-hover:bg-red-900/10'}`}>
                    {copied ? <Check size={20} /> : <Link size={20} />}
                  </div>
                  <span className={`text-[10px] font-bold ${copied ? 'text-green-500' : 'text-slate-500'}`}>{copied ? 'Copied' : 'Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsPost;
