import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Zap,
  Sparkles,
  ShieldCheck,
  Coins,
  Loader2,
  ShieldAlert,
} from "lucide-react";

// Configuration for custom background and matching icon colors per type
const IconConfig = {
  zap: {
    icon: <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    bgClass: "bg-blue-100 text-blue-600 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30",
  },
  sparkles: {
    icon: <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
    bgClass: "bg-amber-100 text-amber-600 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/30",
  },
  shield: {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
    bgClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30",
  },
  default: {
    icon: <Coins className="h-6 w-6 text-slate-500 dark:text-slate-400" />,
    bgClass: "bg-slate-50 text-slate-500 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50",
  }
};

// Reusable Icon Badge Component
const PackageIcon = ({ type }) => {
  const config = IconConfig[type] || IconConfig.default;

  return (
    <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-200 ${config.bgClass}`}>
      {config.icon}
    </div>
  );
};

const BadgeStyles = {
  Entry: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900",
  Popular: "bg-amber-100 text-amber-700 border-amber-200 shadow-sm dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
  "Best Value": "bg-emerald-100 text-emerald-700 border-emerald-200 animate-pulse dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900",
};

const QuotaTracker = ({ label, current = 0, max = 1, colorClass }) => {
  const percentage = Math.min((current / max) * 100, 100);
  const isExceeded = current >= max;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
        <span className="text-slate-500 dark:text-slate-400">{label}</span>
        <span className={isExceeded ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-slate-100"}>
          {current.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>

      <div className="h-2 w-full bg-slate-100 border border-slate-50 rounded-full overflow-hidden dark:bg-slate-800 dark:border-slate-800/50">
        <div
          className={`h-full transition-all duration-1000 ${isExceeded ? "bg-red-500 dark:bg-red-400" : colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const PurchaseCoin = ({ stats = {}, packages = [] }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState(null);

  const dailyUsage = stats?.dailyPurchased || 0;
  const monthlyUsage = stats?.monthlyPurchased || 0;
  const dailyLimit = stats?.dailyLimit || 1;
  const monthlyLimit = stats?.monthlyLimit || 1;

  const purchaseMutation = useMutation({
    mutationFn: async (packageId) =>
      (await axiosSecure.post("/purchase-coins", { packageId })).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["purchaseStats"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
      toast.success(data.message || "Coins purchased successfully!");
      setProcessingId(null);
    },
    onError: (error) => {
      const data = error.response?.data;
      if (error.response?.status === 429) {
        toast.error(`${data.message}. Remaining quota: ${data.remaining} coins`);
      } else {
        toast.error(data?.message || "Failed to purchase coins.");
      }
      setProcessingId(null);
    },
  });

  const dailyLimitReached = dailyUsage >= dailyLimit;
  const monthlyLimitReached = monthlyUsage >= monthlyLimit;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8">
      {(dailyLimitReached || monthlyLimitReached) && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400">
          <ShieldAlert className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">
            {monthlyLimitReached ? "Monthly coin purchase limit has been reached." : "Daily coin purchase limit has been reached."}
          </p>
        </div>
      )}

      {/* Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => {
          const wouldExceedDaily = dailyUsage + pkg.coins > dailyLimit;
          const wouldExceedMonthly = monthlyUsage + pkg.coins > monthlyLimit;
          const isQuotaExceeded = wouldExceedDaily || wouldExceedMonthly;
          
          const isButtonDisabled = isQuotaExceeded || processingId !== null;
          const isProcessing = processingId === pkg._id;

          return (
            <Card
              key={pkg._id}
              className={`relative overflow-hidden border-2 transition-all duration-200 shadow-md ${
                pkg.badge === "Popular" ? "border-amber-200 dark:border-amber-700" : "border-transparent"
              }`}
            >
              {pkg.badge && (
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${BadgeStyles[pkg.badge]}`}>
                  {pkg.badge}
                </div>
              )}

              <CardHeader className="text-center pt-10">
                {/* Custom Packaged Icon Badge implementation */}
                <PackageIcon type={pkg.icon_type} />

                <CardTitle className="text-5xl font-bold">
                  <span className="text-2xl align-top">$</span>
                  {pkg.price_usd}
                </CardTitle>

                <p className="text-sm text-slate-500 font-semibold mt-2">
                  {pkg.coins.toLocaleString()} Coins
                </p>
              </CardHeader>

              <CardContent className="text-center text-xs text-slate-500 min-h-16">
                {pkg.description}
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  disabled={isButtonDisabled}
                  onClick={() => {
                    setProcessingId(pkg._id);
                    purchaseMutation.mutate(pkg._id);
                  }}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isQuotaExceeded ? (
                    "Quota Exceeded"
                  ) : (
                    "Select Plan"
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Progress Section */}
      <div className="border rounded-3xl p-8">
        <div className="mb-8">
          <h3 className="font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            Purchase Quota Monitoring
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Daily and monthly purchase limits are enforced on the server.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <QuotaTracker label="Daily Quota" current={dailyUsage} max={dailyLimit} colorClass="bg-amber-500" />
          <QuotaTracker label="Monthly Quota" current={monthlyUsage} max={monthlyLimit} colorClass="bg-indigo-600" />
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoin;