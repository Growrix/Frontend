
import React, { useState, useEffect } from 'react';
import { Battery, ArrowLeft, Zap, Info, Shield, HelpCircle, Sparkles, Loader2 } from 'lucide-react';
import { analyzeSavings } from '../services/geminiService';

interface BatteryRebateCalculatorProps {
  onClose: () => void;
  bill: number;
  zipCode: string;
}

const BatteryRebateCalculator: React.FC<BatteryRebateCalculatorProps> = ({ onClose, bill, zipCode }) => {
  const [batteryCount, setBatteryCount] = useState(1);
  const [capacity, setCapacity] = useState(13.5); // kWh (standard Powerwall size)
  const [rebates, setRebates] = useState({ federal: 0, utility: 0, total: 0 });
  
  // AI State
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const baseCost = batteryCount * 12000; // Estimated $12k per installed battery
    const federal = baseCost * 0.30;
    const utility = batteryCount * capacity * 200; // Mock $200/kWh incentive
    setRebates({
      federal,
      utility,
      total: federal + utility
    });
  }, [batteryCount, capacity]);

  useEffect(() => {
    const fetchAiInsight = async () => {
      setIsAiLoading(true);
      const insight = await analyzeSavings(bill, zipCode, 'battery');
      setAiInsight(insight);
      setIsAiLoading(false);
    };

    fetchAiInsight();
  }, [bill, zipCode]);

  return (
    <div className="p-6 h-full flex flex-col bg-slate-950 animate-in slide-in-from-right duration-500 overflow-y-auto custom-scrollbar">
      <div className="flex items-center space-x-4 mb-8">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-400 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-white">Battery Storage Incentives</h2>
      </div>

      <div className="bg-gradient-to-br from-red-950/20 to-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="text-red-500" size={20} />
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Storage Savings</h3>
          </div>
          <div className="text-5xl font-black text-white mb-2">${Math.round(rebates.total).toLocaleString()}</div>
          <p className="text-xs text-slate-500">Incentives applied to battery hardware & labor</p>
        </div>
        <Battery className="absolute -right-4 -bottom-4 text-red-900 opacity-10" size={120} />
      </div>

      <div className="space-y-8 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase">Number of Batteries</label>
            <span className="text-lg font-bold text-white">{batteryCount} Units</span>
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setBatteryCount(n)}
                className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                  batteryCount === n 
                    ? 'bg-red-700 border-red-600 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase">Capacity per Battery (kWh)</label>
            <span className="text-lg font-bold text-white">{capacity} kWh</span>
          </div>
          <input
            type="range"
            min="5"
            max="20"
            step="0.5"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase border-b border-slate-800 pb-2">Programs Included</h4>
          <div className="space-y-3">
             <div className="flex items-start space-x-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <Zap className="text-yellow-500 mt-1 shrink-0" size={16} />
                <div>
                   <div className="text-sm font-bold text-white">Federal Battery ITC</div>
                   <p className="text-xs text-slate-500">30% off the total storage installation cost.</p>
                   <div className="text-sm font-bold text-red-500 mt-1">${Math.round(rebates.federal).toLocaleString()}</div>
                </div>
             </div>
             <div className="flex items-start space-x-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <Shield className="text-blue-500 mt-1 shrink-0" size={16} />
                <div>
                   <div className="text-sm font-bold text-white">Utility SGIP / VPP</div>
                   <p className="text-xs text-slate-500">Self-Generation Incentive Program performance based rebates.</p>
                   <div className="text-sm font-bold text-red-500 mt-1">${Math.round(rebates.utility).toLocaleString()}</div>
                </div>
             </div>
          </div>
        </div>

        {/* AI Insight Section */}
        <div className="pt-4 border-t border-slate-800">
          <div className="bg-slate-900/40 border border-red-900/20 rounded-[2rem] p-6 relative overflow-hidden group">
            {/* Background Sparkle Decoration */}
            <div className="absolute -top-4 -right-4 text-red-900/10 rotate-12 group-hover:scale-110 transition-transform duration-1000">
              <Sparkles size={120} />
            </div>
            
            <div className="flex items-center space-x-2 mb-4 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center border border-red-800/40">
                <Sparkles size={16} className="text-red-500" />
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Helios AI: Resilience Strategy</h3>
            </div>

            {isAiLoading ? (
              <div className="py-6 flex flex-col items-center justify-center space-y-4 relative z-10">
                <Loader2 size={24} className="text-red-600 animate-spin" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest animate-pulse">Analyzing Grid Stability...</p>
              </div>
            ) : (
              <div className="relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  {aiInsight || "Unable to generate AI storage insights at this time. Please check your connection."}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-red-950/50 border border-red-900/30 text-[9px] font-bold text-red-400 uppercase tracking-tighter">TOU Arbitrage</span>
                  <span className="px-2 py-0.5 rounded bg-red-950/50 border border-red-900/30 text-[9px] font-bold text-red-400 uppercase tracking-tighter">Grid Resilience</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-2 pb-8">
        <button className="w-full bg-slate-900 border border-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-slate-800 transition-colors">
          <HelpCircle size={18} />
          <span>Learn About Resilience</span>
        </button>
      </div>
    </div>
  );
};

export default BatteryRebateCalculator;
