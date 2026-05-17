
import { DollarSign } from "lucide-react";
import { LiaCoinsSolid } from "react-icons/lia";

const TotalEarnings = ({ coins = 0 }) => {
  const WITHDRAW_COIN_TO_DOLLAR_RATE = parseInt(import.meta.env.VITE_WITHDRAW_COIN_TO_DOLLAR_RATE);
  const totalDollars = coins / WITHDRAW_COIN_TO_DOLLAR_RATE;

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden p-4">
        <div className="flex flex-col sm:flex-row">
          {/* Left: Coins */}
          <div className="flex-1 px-6 py-5 flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-xl shrink-0">
              <LiaCoinsSolid className="h-7 w-7 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-amber-600 uppercase tracking-widest mb-0.5">
                Available Balance
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-slate-800 tracking-tight">
                  {coins.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-amber-500">Coins</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-slate-200 sm:h-auto sm:w-px mx-4" />

          {/* Right: Dollar Value */}
          <div className="flex-1 px-6 py-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl shrink-0">
              <DollarSign className="h-7 w-7 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-emerald-600 uppercase tracking-widest mb-0.5">
                Est. Withdrawal Value
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-emerald-700 tracking-tight">
                  ${totalDollars.toFixed(2)}
                </span>
                <span className="text-sm font-medium text-emerald-500">USD</span>
              </div>
            </div>
          </div>

        </div>
    </div>
  );
};

export default TotalEarnings;