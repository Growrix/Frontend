
import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, Share2, Bookmark, ArrowRight, 
  UserPlus, Zap, Twitter, Facebook, Link, Check, X,
  MessageCircle, Heart, Send, UserCircle
} from 'lucide-react';
import { BlogPost as BlogPostType } from '../types';

interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
  onSelectRelated: (id: string) => void;
  relatedPosts: BlogPostType[];
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack, onSelectRelated, relatedPosts }) => {
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Comment State
  const [comments, setComments] = useState<Comment[]>([
    { id: 'c1', user: 'SolarSam', text: 'This guide saved me thousands on my battery setup! Highly recommend Enphase for efficiency.', date: '2d ago', likes: 12, isLiked: false },
    { id: 'c2', user: 'EcoWarrior_99', text: 'Does the tax credit cover the roof repairs if done alongside solar?', date: '5h ago', likes: 3, isLiked: true }
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const shareUrl = window.location.href;
  const shareTitle = `Check out this solar insight: ${post.title}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } catch (err) {
        setShowShareSheet(true);
      }
    } else {
      setShowShareSheet(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToSocial = (platform: 'x' | 'fb') => {
    const urls = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      user: 'Guest Reader',
      text: newCommentText,
      date: 'Just now',
      likes: 0,
      isLiked: false
    };
    setComments([comment, ...comments]);
    setNewCommentText('');
  };

  const toggleLike = (id: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          isLiked: !c.isLiked,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1
        };
      }
      return c;
    }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden relative">
      {/* Sticky Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-slate-950/80 to-transparent">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-950/50 backdrop-blur-md border border-slate-800 flex items-center justify-center text-white active:scale-95 transition-all shadow-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex space-x-2">
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-slate-950/50 backdrop-blur-md border border-slate-800 flex items-center justify-center text-white active:scale-95 transition-all"
          >
            <Share2 size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-950/50 backdrop-blur-md border border-slate-800 flex items-center justify-center text-white active:scale-95 transition-all">
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Hero Section */}
        <div className="h-96 relative">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
             <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-[9px] font-black uppercase text-white tracking-[0.2em]">
                {post.category}
              </span>
              <h1 className="text-3xl font-black text-white leading-[1.15] tracking-tight">
                {post.title}
              </h1>
          </div>
        </div>

        {/* Metadata & Author */}
        <div className="px-8 py-6 border-b border-slate-900 bg-slate-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-red-900/30" />
              <div>
                <div className="text-sm font-bold text-white">{post.author.name}</div>
                <div className="text-[10px] text-slate-500 font-medium">{post.author.role}</div>
              </div>
            </div>
            <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
              <UserPlus size={20} />
            </button>
          </div>
          <div className="flex items-center mt-6 space-x-4 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
            <span className="flex items-center"><Clock size={14} className="mr-1.5 text-red-600" /> {post.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-slate-800" />
            <span>Published {post.date}</span>
          </div>
        </div>

        {/* Content */}
        <article className="px-8 py-10 space-y-6 text-slate-300 leading-relaxed text-base">
          {post.content?.split('\n\n').map((paragraph, i) => (
            <p key={i} className={paragraph.startsWith('###') ? 'text-xl font-bold text-white pt-4 border-l-4 border-red-700 pl-4' : ''}>
              {paragraph.replace('###', '').trim()}
            </p>
          ))}
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 my-10 space-y-4">
             <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
               <Zap size={16} className="text-red-500 mr-2" /> Key Takeaway
             </h4>
             <p className="text-sm text-slate-400 italic leading-relaxed">
               "Maximizing your ROI in 2024 requires a combination of high-efficiency hardware and timely application for federal tax credits. Don't wait until 2025 as policy shifts could impact incentive availability."
             </p>
          </div>
        </article>

        {/* Related Posts */}
        <section className="px-8 pb-12 space-y-6">
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] border-b border-slate-900 pb-3">You might also like</h2>
          <div className="space-y-4">
            {relatedPosts.map((related) => (
              <button 
                key={related.id}
                onClick={() => onSelectRelated(related.id)}
                className="w-full flex items-center space-x-4 group text-left"
              >
                <img 
                  src={related.imageUrl} 
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" 
                  alt={related.title}
                />
                <div className="flex-1 space-y-1">
                  <h3 className="text-sm font-bold text-white leading-tight group-hover:text-red-500 transition-colors">
                    {related.title}
                  </h3>
                  <div className="text-[10px] text-slate-500 font-medium">{related.date} • {related.readTime}</div>
                </div>
                <ArrowRight size={16} className="text-slate-800 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </section>

        {/* Community Insights (Comments) */}
        <section className="px-8 pb-32 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center">
              <MessageCircle size={14} className="mr-2 text-red-500" /> Community Insights
            </h2>
            <span className="text-[10px] font-black text-slate-700 bg-slate-900 px-2 py-0.5 rounded">{comments.length}</span>
          </div>

          {/* Comment Input */}
          <div className="space-y-4">
            <div className="relative">
              <textarea 
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all min-h-[100px] resize-none"
              />
              <button 
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-red-700 flex items-center justify-center text-white shadow-lg shadow-red-900/20 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Comment List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="group animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <UserCircle size={20} className="text-slate-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{comment.user}</span>
                      <span className="text-[9px] font-medium text-slate-600 uppercase tracking-tighter">{comment.date}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {comment.text}
                    </p>
                    <div className="flex items-center space-x-4 pt-2">
                      <button 
                        onClick={() => toggleLike(comment.id)}
                        className={`flex items-center space-x-1.5 group/like transition-all ${comment.isLiked ? 'text-red-500' : 'text-slate-600 hover:text-slate-400'}`}
                      >
                        <Heart size={14} fill={comment.isLiked ? "currentColor" : "none"} className={`transition-transform duration-300 ${comment.isLiked ? 'scale-110' : 'group-active/like:scale-125'}`} />
                        <span className="text-[10px] font-bold">{comment.likes}</span>
                      </button>
                      <button className="text-[10px] font-bold text-slate-600 hover:text-white transition-colors">REPLY</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Premium Share Sheet Fallback */}
      {showShareSheet && (
        <>
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] transition-opacity animate-in fade-in"
            onClick={() => setShowShareSheet(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-[101] p-6 animate-in slide-in-from-bottom duration-300">
            <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl p-8 space-y-8 relative overflow-hidden">
              {/* Glow Accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-red-600/30 blur-xl" />
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-white">Share Insight</h3>
                <button 
                  onClick={() => setShowShareSheet(false)}
                  className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => shareToSocial('x')}
                  className="flex flex-col items-center space-y-3 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-red-900/20 group-hover:text-red-500 group-hover:border-red-900/50 transition-all">
                    <Twitter size={24} fill="currentColor" stroke="none" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">X / Twitter</span>
                </button>
                <button 
                  onClick={() => shareToSocial('fb')}
                  className="flex flex-col items-center space-y-3 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-red-900/20 group-hover:text-red-500 group-hover:border-red-900/50 transition-all">
                    <Facebook size={24} fill="currentColor" stroke="none" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Facebook</span>
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="flex flex-col items-center space-y-3 group"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    copied 
                      ? 'bg-green-600 border-green-500 text-white' 
                      : 'bg-white/5 border border-slate-800 text-slate-300 group-hover:bg-red-900/20 group-hover:text-red-500 group-hover:border-red-900/50'
                  }`}>
                    {copied ? <Check size={24} /> : <Link size={24} />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${copied ? 'text-green-500' : 'text-slate-500'}`}>
                    {copied ? 'Copied!' : 'Copy Link'}
                  </span>
                </button>
              </div>

              <div className="pt-2">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500 truncate mr-4">{shareUrl}</span>
                  <Link size={14} className="text-slate-700 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPost;
