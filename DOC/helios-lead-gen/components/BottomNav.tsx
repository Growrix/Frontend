
import React from 'react';
import { Home, Calculator, TrendingUp, MessageSquare } from 'lucide-react';
import { AppView } from '../types';

interface BottomNavProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Home', icon: Home },
    { id: AppView.CALCULATOR, label: 'Calculator', icon: Calculator },
    { id: AppView.ANALYSIS, label: 'Analysis', icon: TrendingUp },
    { id: AppView.AI_CHAT, label: 'Helios AI', icon: MessageSquare },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                isActive ? 'text-red-500 scale-110' : 'text-slate-500'
              }`}
            >
              <Icon size={isActive ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
