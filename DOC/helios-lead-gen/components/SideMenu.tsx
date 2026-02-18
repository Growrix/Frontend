
import React from 'react';
import { 
  X, Home, Calculator, Gift, Battery, 
  MessageSquare, User, Settings, ShieldCheck, 
  Zap, LogOut, BookOpen, Globe, Mail
} from 'lucide-react';
import { AppView } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView) => void;
  onSignOut: () => void;
  currentView: AppView;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate, onSignOut, currentView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: Home },
    { id: AppView.CALCULATOR, label: 'Instant Quote', icon: Calculator },
    { id: AppView.SOLAR_REBATE, label: 'Solar Rebates', icon: Gift },
    { id: AppView.BATTERY_REBATE, label: 'Battery Storage', icon: Battery },
    { id: AppView.BLOG, label: 'Solar Knowledge', icon: BookOpen },
    { id: AppView.NEWS, label: 'Solar News', icon: Globe },
    { id: AppView.AI_CHAT, label: 'Helios AI Assistant', icon: MessageSquare },
  ];

  const secondaryItems = [
    { id: AppView.CONTACT, label: 'Contact Us', icon: Mail },
    { label: 'My Profile', icon: User },
    { label: 'Security', icon: ShieldCheck },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-slate-900 border-r border-slate-800 z-[70] transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white fill-current" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">HELIOS</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Items */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="space-y-1 mb-8">
              <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Main Navigation</p>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-red-900/20 text-red-500 border border-red-900/30' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-1">
              <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Account</p>
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === (item as any).id;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      if ((item as any).id) {
                        onNavigate((item as any).id);
                        onClose();
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-red-900/20 text-red-500 border border-red-900/30' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={onSignOut}
              className="w-full flex items-center space-x-3 px-4 py-4 rounded-xl text-red-400 hover:bg-red-950/20 transition-all font-bold text-sm"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
