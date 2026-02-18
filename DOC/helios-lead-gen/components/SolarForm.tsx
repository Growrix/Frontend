
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Zap, Home, CheckCircle } from 'lucide-react';

interface SolarFormProps {
  onComplete: (data: any) => void;
}

const SolarForm: React.FC<SolarFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zipCode: '',
    monthlyBill: 150,
    roofType: 'shingle',
    utilityCompany: ''
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    onComplete(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-red-500" size={32} />
              </div>
              <h2 className="text-xl font-bold text-white">Where is your home?</h2>
              <p className="text-slate-400 text-sm mt-2">We'll check solar incentives in your area.</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase">Zip Code</label>
              <input
                type="text"
                placeholder="e.g. 90210"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-red-500" size={32} />
              </div>
              <h2 className="text-xl font-bold text-white">Monthly Utility Bill</h2>
              <p className="text-slate-400 text-sm mt-2">Adjust to match your average monthly cost.</p>
            </div>
            <div className="space-y-8 pt-4">
              <div className="text-center">
                <span className="text-4xl font-bold text-white">${formData.monthlyBill}</span>
                <span className="text-slate-500 ml-1">/mo</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={formData.monthlyBill}
                onChange={(e) => setFormData({ ...formData, monthlyBill: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>$50</span>
                <span>$1000+</span>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <Home className="text-red-500" size={32} />
              </div>
              <h2 className="text-xl font-bold text-white">Roof Configuration</h2>
              <p className="text-slate-400 text-sm mt-2">Choose the material of your roof.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['shingle', 'tile', 'metal', 'flat'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, roofType: type })}
                  className={`p-4 rounded-xl border transition-all text-center capitalize ${
                    formData.roofType === type
                      ? 'bg-red-900/30 border-red-600 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
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
          <div className="space-y-8 text-center animate-in zoom-in duration-500">
             <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-green-500" size={48} />
              </div>
              <h2 className="text-2xl font-bold text-white">Ready for Analysis!</h2>
              <p className="text-slate-400 mt-2">
                We've gathered enough info to estimate your solar potential. 
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left space-y-2">
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Zip Code</span>
                  <span className="text-white font-medium">{formData.zipCode}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Average Bill</span>
                  <span className="text-white font-medium">${formData.monthlyBill}/mo</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Roof Type</span>
                  <span className="text-white font-medium capitalize">{formData.roofType}</span>
               </div>
            </div>
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="p-6 h-[80vh] flex flex-col justify-between max-w-md mx-auto">
      <div className="flex-1 pt-4">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-800 rounded-full mb-12">
          <div 
            className="h-1 bg-red-600 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {renderStep()}
      </div>

      <div className="flex space-x-4">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="flex-1 bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all hover:bg-slate-700"
          >
            <ChevronLeft size={20} className="mr-2" /> Back
          </button>
        )}
        <button
          onClick={step === 4 ? handleSubmit : nextStep}
          disabled={step === 1 && formData.zipCode.length < 5}
          className={`flex-[2] bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {step === 4 ? 'Generate Analysis' : 'Next Step'} <ChevronRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SolarForm;
