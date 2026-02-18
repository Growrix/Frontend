
import React from 'react';
import { Zap, Chrome, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';

interface AuthFormProps {
  onLogin: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col h-full bg-slate-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-72 h-72 bg-slate-900/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Brand Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pt-20">
        <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-red-900/40 mb-10 animate-in zoom-in-50 duration-700">
          <Zap size={40} className="text-white fill-white" />
        </div>
        
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            HELIOS<span className="text-red-600">.</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-[260px] mx-auto leading-relaxed">
            Power your home, empower your future. The smartest way to switch to solar.
          </p>
        </div>
      </div>

      {/* Action Section */}
      <div className="px-8 pb-16 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="space-y-4">
          <button 
            onClick={onLogin}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-center space-x-4 shadow-xl active:scale-[0.98] transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-6 h-6 flex items-center justify-center bg-white rounded-md shrink-0">
              <img 
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                alt="Google" 
                className="w-4 h-4"
              />
            </div>
            <span className="text-sm font-bold text-white tracking-wide">Continue with Google</span>
          </button>
          
          <div className="flex items-center space-x-2 justify-center text-[10px] text-slate-600 font-bold uppercase tracking-widest pt-2">
            <ShieldCheck size={12} className="text-red-900" />
            <span>Secure Enterprise Encryption</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="w-full h-px bg-slate-900/50 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-4 text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">
              Installer Portal
            </span>
          </div>

          <button className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-red-950/10 border border-red-900/30 text-slate-300 hover:text-white hover:border-red-600/50 hover:bg-red-900/20 transition-all group shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-red-900/20 flex items-center justify-center border border-red-800/30 group-hover:scale-110 transition-transform">
                <Briefcase size={16} className="text-red-500" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Become a partner</span>
            </div>
            <ArrowRight size={16} className="text-red-900 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      {/* Footer Legal */}
      <div className="px-8 pb-10 text-center">
        <p className="text-[10px] text-slate-700 leading-relaxed font-medium">
          By continuing, you agree to Helios's <span className="text-slate-500 underline decoration-slate-800">Terms of Service</span> and <span className="text-slate-500 underline decoration-slate-800">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
