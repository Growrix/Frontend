
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { getSolarAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hello! I am Helios AI. Ask me anything about solar panels, tax credits, or installation. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getSolarAdvice(input, history);
    
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText || "I'm having a bit of trouble processing that. Can you rephrase?"
    }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-950 max-w-md mx-auto border-x border-slate-900">
      {/* Header */}
      <div className="p-4 border-b border-slate-900 flex items-center space-x-3 bg-slate-900/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center border border-red-800">
          <Sparkles className="text-red-500" size={20} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Helios AI</h2>
          <div className="flex items-center text-[10px] text-green-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
            Online Expert
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-slate-800' : 'bg-red-900/40 border border-red-800/40'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-slate-400" /> : <Bot size={16} className="text-red-400" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-red-700 text-white rounded-tr-none' 
                  : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] flex space-x-3">
              <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-red-900/40 border border-red-800/40">
                <Bot size={16} className="text-red-400" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none">
                <Loader2 className="animate-spin text-red-500" size={18} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-4 pb-28 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-slate-900 border border-slate-800 rounded-full px-5 py-4 text-sm text-white focus:outline-none focus:border-red-600 transition-colors pr-12 shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 w-10 h-10 bg-red-700 rounded-full flex items-center justify-center text-white transition-all active:scale-90 hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-600 shadow-md"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
