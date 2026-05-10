import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Sparkles, ShieldCheck, Coins, Loader2, ShieldAlert, Info, Clock } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "sonner";

const IconMap = {
  zap: <Zap className="text-blue-500" />,
  sparkles: <Sparkles className="text-amber-500" />,
  shield: <ShieldCheck className="text-emerald-500" />,
};

const BadgeStyles = {
  "Entry": "bg-blue-100 text-blue-700 border-blue-200",
  "Popular": "bg-amber-100 text-amber-700 border-amber-200 shadow-sm",
  "Best Value": "bg-emerald-100 text-emerald-700 border-emerald-200 animate-pulse",
};

// Refactored Quota Display - No hardcoded numbers
const QuotaTracker = ({ label, current, max, colorClass }) => {
  const percentage = Math.min((current / max) * 100, 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
        <span className="text-slate-500">{label}</span>
        <span className={current >= max ? "text-red-600" : "text-slate-900"}>
          {current.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
        <div 
          className={`h-full transition-all duration-1000 ${current >= max ? 'bg-red-500' : colorClass}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const PurchaseCoin = ({ stats, packages }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState(null);

  const purchaseMutation = useMutation({
    mutationFn: async (packageId) => (await axiosSecure.post('/purchase-coins', { packageId })).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['userStats', 'purchaseStats']);
      toast.success(data.message);
      setProcessingId(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Payment failed.");
      setProcessingId(null);
    }
  });

  const dailyLimitReached = stats.usage.daily >= stats.limits.daily;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-10">
      {/* Dynamic Warning Alert */}
      {dailyLimitReached && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
          <ShieldAlert className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">
            Daily limit reached. Resets in {stats.resetIn.hours}h {stats.resetIn.minutes}m.
          </p>
        </div>
      )}

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => {
          const wouldExceedDaily = stats.usage.daily + pkg.coins > stats.limits.daily;
          const wouldExceedMonthly = stats.usage.monthly + pkg.coins > stats.limits.monthly;
          const isButtonDisabled = wouldExceedDaily || wouldExceedMonthly || processingId !== null;

          return (
            <Card key={pkg._id} className={`relative overflow-hidden transition-all duration-50 border-2 ${pkg.badge === "Popular" ? "border-amber-200 shadow-sm" : "border-transparent"} ${isButtonDisabled ? "opacity-60" : "hover:shadow-md"}`}>
              {pkg.badge && (
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${BadgeStyles[pkg.badge]}`}>
                  {pkg.badge}
                </div>
              )}
              <CardHeader className="text-center pt-10">
                <div className="mx-auto bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-inner">
                  {IconMap[pkg.icon_type] || <Coins className="text-slate-400" />}
                </div>
                <CardTitle className="text-5xl font-bold text-slate-900 leading-none">
                  <span className="text-2xl font-bold align-top mt-1 inline-block text-slate-400">$</span>
                  {pkg.price_usd}
                </CardTitle>
                <p className="text-sm text-slate-500 font-semibold mt-2">
                  {pkg.coins.toLocaleString()} <span className="text-slate-400 font-normal">Coins</span>
                </p>
              </CardHeader>
              <CardContent className="text-center px-6 min-h-15 text-xs text-slate-500 leading-relaxed">
                {pkg.description}
              </CardContent>
              <CardFooter className="pb-8">
                <Button 
                  className={`w-full h-12 font-bold rounded-xl ${pkg.badge === "Popular" && !isButtonDisabled ? "bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-100" : "bg-slate-900 hover:bg-slate-800"}`}
                  disabled={isButtonDisabled}
                  onClick={() => {
                    setProcessingId(pkg._id);
                    purchaseMutation.mutate(pkg._id);
                  }}
                >
                  {processingId === pkg._id ? <Loader2 className="animate-spin h-5 w-5" /> : 
                   wouldExceedDaily || wouldExceedMonthly ? "Quota Full" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Footer Info Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> Secure Quota Management
            </h3>
            <p className="text-xs text-slate-500">Limits are strictly enforced server-side to maintain system stability.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs font-bold text-slate-600">
            <Clock className="h-4 w-4 text-amber-500" />
            Next Reset: {stats.resetIn.hours}h {stats.resetIn.minutes}m
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <QuotaTracker label="Daily Quota" current={stats.usage.daily} max={stats.limits.daily} colorClass="bg-amber-500" />
          <QuotaTracker label="Monthly Quota" current={stats.usage.monthly} max={stats.limits.monthly} colorClass="bg-slate-900" />
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoin;