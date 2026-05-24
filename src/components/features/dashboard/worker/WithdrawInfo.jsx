import { AlertCircle, Clock, MessageCircle, ShieldCheck, TrendingUp, UserCheck } from 'lucide-react';

const WithdrawInfo = () => {
  const WITHDRAW_COIN_TO_DOLLAR_RATE = parseInt(import.meta.env.VITE_WITHDRAW_COIN_TO_DOLLAR_RATE);
  const MIN_WITHDRAW_COINS = 200;
  const MIN_WITHDRAW_DOLLARS = (MIN_WITHDRAW_COINS / WITHDRAW_COIN_TO_DOLLAR_RATE).toFixed(2);
  
  return (
    <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950 transition-colors duration-300">
        {/* Header with gradient accent */}
        <div className="bg-linear-to-r from-indigo-50 via-slate-50 to-emerald-50 dark:from-indigo-950/40 dark:via-slate-900/40 dark:to-emerald-950/40 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-950 p-2 rounded-xl">
              <ShieldCheck className="h-5 w-5 text-indigo-700 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">Withdrawal Information & Guidelines</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Important details before you request a payout</p>
            </div>
          </div>
        </div>

        {/* Main content grid - 3 columns for richer info */}
        <div className="p-5">
          <div className="grid gap-5 md:grid-cols-3">
            {/* Column 1: Exchange & Threshold */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 dark:bg-emerald-950/60 p-1.5 rounded-lg shrink-0">
                  <TrendingUp className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Dynamic Exchange Rate</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    The coin-to-dollar conversion rate is updated based on platform economics. 
                    Current rate: <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">1 coin = ${(1/WITHDRAW_COIN_TO_DOLLAR_RATE).toFixed(4)} USD</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 dark:bg-amber-950/60 p-1.5 rounded-lg shrink-0">
                  <AlertCircle className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Minimum Withdrawal</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    You need at least <span className="font-bold text-slate-900 dark:text-slate-100">{MIN_WITHDRAW_COINS} coins</span> 
                    (≈ ${MIN_WITHDRAW_DOLLARS} USD) to request a payout.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Process & Timing */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-950/60 p-1.5 rounded-lg shrink-0">
                  <Clock className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Processing Timeline</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    Withdrawals are processed within <strong className="text-slate-900 dark:text-slate-100">24-48 business hours</strong> after 
                    admin verification. You'll receive a confirmation email once completed.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-950/60 p-1.5 rounded-lg shrink-0">
                  <UserCheck className="h-4 w-4 text-purple-700 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Security & Verification</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    All requests undergo manual review to prevent fraud and ensure compliance. 
                    Make sure your account details match your profile.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Support & Responsibility */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-rose-100 dark:bg-rose-950/60 p-1.5 rounded-lg shrink-0">
                  <MessageCircle className="h-4 w-4 text-rose-700 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Support Channels</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    For payment delays or technical issues, contact our support team through 
                    the helpdesk portal or email <span className="font-mono text-xs text-slate-900 dark:text-slate-100">support@micromint.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer disclaimer with better emphasis */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/30 rounded-lg p-3">
            <div className="flex items-center gap-2 justify-center flex-wrap">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Important:</span> Double-check your account details before submitting. 
                The platform cannot reverse or refund transactions made to incorrect or unverified accounts. 
                Withdrawal requests are final once approved.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default WithdrawInfo;