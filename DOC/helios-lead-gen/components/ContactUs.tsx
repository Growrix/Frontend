
import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, Phone, MapPin, Send, 
  CheckCircle2, MessageSquare, Clock, Globe, 
  Linkedin, Twitter, Instagram 
} from 'lucide-react';

interface ContactUsProps {
  onBack: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const contactMethods = [
    { icon: Phone, title: 'Call Us', value: '+1 (888) HELIOS-0', label: 'Mon-Fri, 9am-6pm PST' },
    { icon: Mail, title: 'Email', value: 'support@helios.solar', label: '24/7 Response time' },
    { icon: MapPin, title: 'HQ', value: 'Palo Alto, CA', label: 'Silicon Valley Campus' },
  ];

  if (isSubmitted) {
    return (
      <div className="flex flex-col h-full bg-slate-950 items-center justify-center p-8 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-900/20 rounded-[2.5rem] flex items-center justify-center mb-8 border border-green-800/30">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Message Received</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-[280px] mb-10">
          Thank you for reaching out. One of our solar experts will be in touch within 24 hours.
        </p>
        <button 
          onClick={onBack}
          className="w-full bg-red-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-950/50 flex items-center justify-center tracking-widest text-sm"
        >
          BACK TO DASHBOARD
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden">
      <header className="p-6 flex items-center space-x-4 border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl z-10">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 active:scale-90 transition-all shadow-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-black text-white tracking-tight uppercase">Get in Touch</h1>
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-0.5">Helios Support</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 pb-32">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-950/20 to-slate-900 border border-red-900/30 rounded-[2rem] p-8">
           <MessageSquare className="absolute -right-6 -top-6 text-red-500/10" size={140} />
           <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-black text-white leading-tight">We're here to power your transition.</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Whether you have technical questions or need a detailed quote, our team is standing by.
              </p>
           </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 gap-4">
          {contactMethods.map((method, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-900/20 rounded-xl flex items-center justify-center border border-red-800/30 shrink-0">
                <method.icon size={20} className="text-red-500" />
              </div>
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{method.title}</h4>
                <div className="text-sm font-bold text-white mt-0.5">{method.value}</div>
                <div className="text-[10px] text-slate-600 font-medium">{method.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
             <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Send a Message</h2>
             <Clock size={14} className="text-slate-800" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Your Name</label>
              <input 
                required
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-red-600 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                required
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-red-600 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Subject</label>
              <select 
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-red-600 transition-all appearance-none"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership">Partnership</option>
                <option value="Quote Request">Detailed Quote Request</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Message</label>
              <textarea 
                required
                rows={4}
                placeholder="How can we help you?"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-red-600 transition-all resize-none"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-950/50 flex items-center justify-center space-x-3 active:scale-[0.98] transition-all tracking-widest text-sm"
          >
            <span>SEND MESSAGE</span>
            <Send size={18} />
          </button>
        </form>

        {/* Social Links */}
        <div className="pt-8 text-center space-y-6">
           <div className="flex items-center justify-center space-x-8">
              <Linkedin size={20} className="text-slate-600 hover:text-red-500 transition-colors cursor-pointer" />
              <Twitter size={20} className="text-slate-600 hover:text-red-500 transition-colors cursor-pointer" />
              <Instagram size={20} className="text-slate-600 hover:text-red-500 transition-colors cursor-pointer" />
           </div>
           <p className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.4em]">Follow Helios Pulse</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
