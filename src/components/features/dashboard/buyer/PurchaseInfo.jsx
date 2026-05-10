import { Info, ShieldAlert, History } from "lucide-react";

const PurchaseInfo = () => {
  return (
    <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="text-slate-900 h-5 w-5" />
        <h3 className="font-bold text-slate-900 tracking-tight">Fair Use & Dummy Purchase Policy</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-sm text-slate-600 leading-relaxed">
            To ensure a balanced ecosystem and fair competition among buyers, we implement strict 
            <strong> dummy transaction limits</strong>. These limits prevent account inflation and 
            maintain the integrity of our micro-tasking marketplace.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Daily Purchase Limit</span>
            <span className="font-bold text-slate-900">500 Coins</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[10%]" /> {/* Visual indicator */}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Monthly Purchase Limit</span>
            <span className="font-bold text-slate-900">5,000 Coins</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-[12px] text-slate-400 italic">
        <Info className="h-3 w-3 mt-0.5 shrink-0" />
        <p>All purchases are simulated for project purposes. No real currency is processed, but limits are enforced server-side for realism.</p>
      </div>
    </div>
  );
};

export default PurchaseInfo;