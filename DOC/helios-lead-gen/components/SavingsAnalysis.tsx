
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, ShieldCheck, TreePine } from 'lucide-react';

interface SavingsAnalysisProps {
  bill: number;
}

const SavingsAnalysis: React.FC<SavingsAnalysisProps> = ({ bill }) => {
  // Mock calculation logic
  const years = [1, 5, 10, 15, 20, 25];
  const utilityCost = years.map(y => y * bill * 12 * 1.05 ** y); // 5% inflation
  const solarCost = years.map(y => {
    const install = 15000;
    const incentive = 15000 * 0.3; // 30% federal tax credit
    const netInstall = install - incentive;
    const maintenance = y * 100;
    return netInstall + maintenance;
  });

  const chartData = years.map((y, idx) => ({
    year: `Yr ${y}`,
    utility: Math.round(utilityCost[idx]),
    solar: Math.round(solarCost[idx]),
    savings: Math.round(utilityCost[idx] - solarCost[idx])
  }));

  return (
    <div className="p-6 space-y-8 pb-24 max-w-md mx-auto custom-scrollbar overflow-y-auto h-full">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Your Financial Roadmap</h2>
        <p className="text-slate-400 text-sm">Based on a ${bill}/mo current spending.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
         <div className="bg-red-950/20 border border-red-800/40 rounded-xl p-4">
            <TrendingUp className="text-red-500 mb-2" size={20} />
            <div className="text-xl font-bold text-white">$42,800</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">25-Year Savings</div>
         </div>
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <ShieldCheck className="text-red-500 mb-2" size={20} />
            <div className="text-xl font-bold text-white">6.2 Yrs</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Break Even</div>
         </div>
      </div>

      {/* Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 h-64">
        <h3 className="text-xs font-semibold text-slate-500 uppercase mb-4">Utility vs Solar Spend</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="year" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Bar dataKey="utility" fill="#334155" radius={[4, 4, 0, 0]} name="Utility Cost" />
            <Bar dataKey="solar" fill="#991b1b" radius={[4, 4, 0, 0]} name="Solar Investment" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-950/20 to-slate-900 border border-slate-800 rounded-xl p-5 flex items-center space-x-4">
        <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
          <TreePine className="text-green-500" size={24} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Carbon Offset</h4>
          <p className="text-xs text-slate-400 mt-0.5">Your installation is equivalent to planting 120 trees every year.</p>
        </div>
      </div>

      <button className="w-full bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/30">
        Talk to a Solar Pro
      </button>
    </div>
  );
};

export default SavingsAnalysis;
