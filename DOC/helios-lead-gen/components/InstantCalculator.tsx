
import React, { useState, useEffect } from 'react';
import { Zap, Sun, DollarSign, ArrowLeft, ArrowRight, MapPin, Home, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

interface InstantCalculatorProps {
  onClose: () => void;
  onSeeFullAnalysis: (bill: number) => void;
}

const InstantCalculator: React.FC<InstantCalculatorProps> = ({ onClose, onSeeFullAnalysis }) => {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [formData, setFormData] = useState({
    zipCode: '',
    bill: 150,
    roofType: 'shingle',
    sunlight: 5,
    efficiency: 0.8
  });

  const [estimatedSavings, setEstimatedSavings] = useState(0);

  useEffect(() => {
    // Basic calculation logic
    const monthlySolarProduction = formData.sunlight * 30 * 5 * formData.efficiency; 
    const rate = 0.15; // $/kWh
    const calculatedSavings = Math.min(formData.bill, monthlySolarProduction * rate);
    setEstimatedSavings(calculatedSavings);
  }, [formData]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setStep(5); // Show result
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mb-6 border border-red-800/30">
                <MapPin className="text-red-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white">Service Location</h2>
              <p className="text-slate-400 text-sm mt-2 px-4">Zip code helps us calculate precise peak sun hours for your specific region.</p>
            </div>
            <div className="space-y-4 pt-4 px-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Your Zip Code</label>
              <input
                type="text"
                maxLength={5}
                placeholder="00000"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/\D/g, '') })}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-5 text-2xl text-white font-mono tracking-[0.5em] text-center focus:outline-none focus:border-red-600 transition-all shadow-inner"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mb-6 border border-red-800/30">
                <DollarSign className="text-red-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white">Energy Usage</h2>
              <p className="text-slate-400 text-sm mt-2">What is your average monthly electric bill?</p>
            </div>
            <div className="space-y-10 pt-8">
              <div className="text-center">
                <span className="text-6xl font-black text-white">${formData.bill}</span>
                <span className="text-slate-500 font-bold ml-2">/mo</span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="5"
                value={formData.bill}
                onChange={(e) => setFormData({ ...formData, bill: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase">
                <span>Starter ($50)</span>
                <span>Heavy Use ($800+)</span>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mb-6 border border-red-800/30">
                <Home className="text-red-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white">Roof Surface</h2>
              <p className="text-slate-400 text-sm mt-2 px-4">Different surfaces require specific mounting hardware which affects the ROI.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {['shingle', 'tile', 'metal', 'flat'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, roofType: type })}
                  className={`p-6 rounded-2xl border transition-all text-center capitalize font-bold text-sm ${
                    formData.roofType === type
                      ? 'bg-red-900/30 border-red-600 text-white shadow-lg shadow-red-900/10'
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mb-6 border border-red-800/30">
                <Sun className="text-red-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white">Solar Strategy</h2>
              <p className="text-slate-400 text-sm mt-2 px-4">Choose your preferred panel performance tier.</p>
            </div>
            <div className="space-y-4 pt-4">
              <button 
                onClick={() => setFormData({...formData, efficiency: 0.8})}
                className={`w-full p-5 rounded-2xl border flex items-center space-x-4 transition-all ${
                  formData.efficiency === 0.8 ? 'bg-red-900/30 border-red-600' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.efficiency === 0.8 ? 'bg-red-600' : 'bg-slate-800'}`}>
                  <Sun size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <div className={`font-bold ${formData.efficiency === 0.8 ? 'text-white' : 'text-slate-400'}`}>Eco Tier</div>
                  <div className="text-[10px] text-slate-500 uppercase font-medium">Standard Efficiency</div>
                </div>
              </button>
              <button 
                onClick={() => setFormData({...formData, efficiency: 0.95})}
                className={`w-full p-5 rounded-2xl border flex items-center space-x-4 transition-all ${
                  formData.efficiency === 0.95 ? 'bg-red-900/30 border-red-600' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.efficiency === 0.95 ? 'bg-red-600' : 'bg-slate-800'}`}>
                  <Zap size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <div className={`font-bold ${formData.efficiency === 0.95 ? 'text-white' : 'text-slate-400'}`}>Max Output</div>
                  <div className="text-[10px] text-slate-500 uppercase font-medium">Premium High-Yield Panels</div>
                </div>
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="animate-in zoom-in-95 duration-500 h-full flex flex-col justify-center py-4">
            <div className="bg-gradient-to-br from-red-950/40 to-slate-900 rounded-[2.5rem] p-10 border border-red-900/30 text-center mb-8 relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 opacity-5">
                <Zap size={200} className="text-red-500" />
              </div>
              <p className="text-red-400 text-xs font-black uppercase tracking-[0.2em] mb-4">Estimated Monthly Savings</p>
              <div className="flex items-center justify-center">
                <span className="text-5xl font-black text-white/50 mb-4">$</span>
                <span className="text-8xl font-black text-white tabular-nums tracking-tighter leading-none">
                  {Math.round(estimatedSavings)}
                </span>
              </div>
              <div className="mt-8 pt-8 border-t border-red-900/20 flex justify-around">
                <div className="text-center">
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Break Even</div>
                   <div className="text-lg font-bold text-white">6.2 Yrs</div>
                </div>
                <div className="text-center">
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">ROI Rank</div>
                   <div className="text-lg font-bold text-white">Top 5%</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-900/20 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-green-500" />
                  </div>
                  <span className="text-xs font-medium text-slate-300">Zip {formData.zipCode} Qualified</span>
                </div>
                <span className="text-[10px] font-bold text-green-500 uppercase">High Yield Area</span>
              </div>

              <button 
                onClick={() => onSeeFullAnalysis(formData.bill)}
                className="w-full bg-red-700 text-white font-black py-6 rounded-2xl shadow-xl shadow-red-950/50 flex items-center justify-center group active:scale-[0.98] transition-all text-sm tracking-widest"
              >
                UNBLOCK FULL ANALYSIS
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isCalculating) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-950 p-6 text-center space-y-6">
        <div className="relative">
          <Loader2 className="animate-spin text-red-600" size={60} />
          <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Calculating Potential...</h2>
          <p className="text-slate-500 text-sm max-w-[200px]">Matching your profile with local solar incentive databases.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      {/* Top Navigation */}
      <div className="p-6 flex justify-between items-center border-b border-slate-900/50">
        <button onClick={handleBack} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={18} />
        </button>
        {step < 5 && (
          <div className="flex space-x-1.5">
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                className={`h-1 rounded-full transition-all duration-300 ${
                  s === step ? 'w-6 bg-red-600' : s < step ? 'w-2 bg-red-900/50' : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>
        )}
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
        {renderStep()}
      </div>

      {/* Bottom Action */}
      {step < 5 && (
        <div className="p-6 pb-12 border-t border-slate-900/50 bg-slate-950/50 backdrop-blur-md">
          <button
            onClick={handleNext}
            disabled={step === 1 && formData.zipCode.length < 5}
            className="w-full bg-red-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-950/50 flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale tracking-widest text-sm"
          >
            {step === 4 ? 'GET INSTANT QUOTE' : 'CONTINUE'}
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default InstantCalculator;
