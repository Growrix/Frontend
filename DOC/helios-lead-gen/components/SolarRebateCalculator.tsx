
import React, { useState, useEffect } from 'react';
import { Gift, ArrowLeft, Info, Landmark, CheckCircle2 } from 'lucide-react';

interface SolarRebateCalculatorProps {
  onClose: () => void;
}

const SolarRebateCalculator: React.FC<SolarRebateCalculatorProps> = ({ onClose }) => {
  const [systemSize, setSystemSize] = useState(8); // kW
  const [costPerWatt, setCostPerWatt] = useState(3.2); // $/W
  const [rebates, setRebates] = useState({ federal: 0, state: 0, total: 0 });

  useEffect(() => {
    const totalCost = systemSize * 1000 * costPerWatt;
    const federal = totalCost * 0.30; // 30% ITC
    const state = systemSize * 250; // Mock state rebate: $250 per kW
    setRebates({
      federal,
      state,
      total: federal + state
    });
  }, [systemSize, costPerWatt]);

  return (
    <div className="p-6 h-full flex flex-col bg-slate-950 animate-in slide-in-from-right duration-500 overflow-y-auto custom-scrollbar">
      <div className="flex items-center space-x-4 mb-8">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-400 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-white">Solar Rebate Explorer</h2>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Landmark className="text-red-500" size={20} />
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Estimated Total Incentives</h3>
        </div>
        <div className="text-5xl font-black text-white mb-2">${Math.round(rebates.total).toLocaleString()}</div>
        <p className="text-xs text-slate-500">Reducing your net system cost by ~35%</p>
      </div>

      <div className="space-y-8 flex-1">
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase">Project Size (kW)</label>
            <span className="text-lg font-bold text-white">{systemSize} kW</span>
          </div>
          <input
            type="range"
            min="3"
            max="25"
            step="1"
            value={systemSize}
            onChange={(e) => setSystemSize(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase">Estimated Install Cost ($/W)</label>
            <span className="text-lg font-bold text-white">${costPerWatt.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="2.5"
            max="5.0"
            step="0.1"
            value={costPerWatt}
            onChange={(e) => setCostPerWatt(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase border-b border-slate-800 pb-2">Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm text-slate-300">Federal Tax Credit (30%)</span>
              </div>
              <span className="text-sm font-bold text-white">${Math.round(rebates.federal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm text-slate-300">State Solar Rebate</span>
              </div>
              <span className="text-sm font-bold text-white">${Math.round(rebates.state).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 pb-8">
        <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-4 mb-4 flex space-x-3">
          <Info size={20} className="text-red-500 shrink-0" />
          <p className="text-[10px] text-slate-400">
            Rebates are subject to local availability and utility program funds. We recommend consulting with a tax professional to confirm Federal ITC eligibility.
          </p>
        </div>
        <button className="w-full bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg">
          Lock In These Rebates
        </button>
      </div>
    </div>
  );
};

export default SolarRebateCalculator;
