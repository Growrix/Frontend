
import React, { useState } from 'react';
import { AppView } from './types';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import SolarForm from './components/SolarForm';
import SavingsAnalysis from './components/SavingsAnalysis';
import AIAssistant from './components/AIAssistant';
import InstantCalculator from './components/InstantCalculator';
import SolarRebateCalculator from './components/SolarRebateCalculator';
import BatteryRebateCalculator from './components/BatteryRebateCalculator';
import SideMenu from './components/SideMenu';
import BlogHome, { BLOG_POSTS } from './components/BlogHome';
import BlogPost from './components/BlogPost';
import NewsHome, { NEWS_ITEMS } from './components/NewsHome';
import NewsPost from './components/NewsPost';
import AuthForm from './components/AuthForm';
import ContactUs from './components/ContactUs';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [leadData, setLeadData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setView(AppView.DASHBOARD);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    setView(AppView.DASHBOARD); // Reset to default for next login
  };

  const handleFormComplete = (data: any) => {
    setLeadData(data);
    setView(AppView.ANALYSIS);
  };

  const handleCalculatorComplete = (bill: number) => {
    setLeadData({ monthlyBill: bill });
    setView(AppView.ANALYSIS);
  };

  const handleSelectPost = (id: string) => {
    setSelectedPostId(id);
    setView(AppView.BLOG_POST);
  };

  const handleSelectNews = (id: string) => {
    setSelectedNewsId(id);
    setView(AppView.NEWS_POST);
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return <AuthForm onLogin={handleLogin} />;
    }

    switch (view) {
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            onStartForm={() => setView(AppView.CALCULATOR)} 
            onOpenAI={() => setView(AppView.AI_CHAT)}
            onNavigate={(newView) => setView(newView)}
            onOpenMenu={() => setIsMenuOpen(true)}
            onSelectNews={handleSelectNews}
          />
        );
      case AppView.CALCULATOR:
        return (
          <InstantCalculator 
            onClose={() => setView(AppView.DASHBOARD)}
            onSeeFullAnalysis={handleCalculatorComplete}
          />
        );
      case AppView.SOLAR_REBATE:
        return <SolarRebateCalculator onClose={() => setView(AppView.DASHBOARD)} />;
      case AppView.BATTERY_REBATE:
        return (
          <BatteryRebateCalculator 
            onClose={() => setView(AppView.DASHBOARD)} 
            bill={leadData?.monthlyBill || 150}
            zipCode={leadData?.zipCode || '90210'}
          />
        );
      case AppView.LEAD_FORM:
        return <SolarForm onComplete={handleFormComplete} />;
      case AppView.ANALYSIS:
        return <SavingsAnalysis bill={leadData?.monthlyBill || 150} />;
      case AppView.AI_CHAT:
        return <AIAssistant />;
      case AppView.BLOG:
        return (
          <BlogHome 
            onOpenMenu={() => setIsMenuOpen(true)}
            onSelectPost={handleSelectPost}
          />
        );
      case AppView.BLOG_POST:
        const post = BLOG_POSTS.find(p => p.id === selectedPostId);
        if (!post) {
          setView(AppView.BLOG);
          return null;
        }
        return (
          <BlogPost 
            post={post}
            onBack={() => setView(AppView.BLOG)}
            onSelectRelated={handleSelectPost}
            relatedPosts={BLOG_POSTS.filter(p => p.id !== selectedPostId)}
          />
        );
      case AppView.NEWS:
        return (
          <NewsHome 
            onOpenMenu={() => setIsMenuOpen(true)}
            onSelectNews={handleSelectNews}
          />
        );
      case AppView.NEWS_POST:
        const newsItem = NEWS_ITEMS.find(n => n.id === selectedNewsId);
        if (!newsItem) {
          setView(AppView.NEWS);
          return null;
        }
        return (
          <NewsPost 
            news={newsItem}
            onBack={() => setView(AppView.NEWS)}
          />
        );
      case AppView.CONTACT:
        return <ContactUs onBack={() => setView(AppView.DASHBOARD)} />;
      default:
        return <Dashboard 
          onStartForm={() => setView(AppView.CALCULATOR)} 
          onOpenAI={() => setView(AppView.AI_CHAT)}
          onNavigate={(newView) => setView(newView)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onSelectNews={handleSelectNews}
        />;
    }
  };

  const hideNav = !isAuthenticated || [
    AppView.CALCULATOR, 
    AppView.SOLAR_REBATE, 
    AppView.BATTERY_REBATE, 
    AppView.BLOG,
    AppView.BLOG_POST,
    AppView.NEWS,
    AppView.NEWS_POST,
    AppView.CONTACT
  ].includes(view);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-red-500/30">
      {/* Mobile Shell Simulation on Desktop */}
      <main className="max-w-md mx-auto h-screen bg-slate-950 border-x border-slate-900 relative shadow-2xl overflow-hidden flex flex-col">
        {isAuthenticated && (
          <SideMenu 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)} 
            onNavigate={(newView) => setView(newView)}
            onSignOut={handleSignOut}
            currentView={view}
          />
        )}
        
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {renderContent()}
        </div>
        {!hideNav && <BottomNav currentView={view} setView={setView} />}
      </main>
    </div>
  );
};

export default App;
