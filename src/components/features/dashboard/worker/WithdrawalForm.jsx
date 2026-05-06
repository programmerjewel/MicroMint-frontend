import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  AlertCircle,
  Info,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { LiaCoinsSolid } from "react-icons/lia";

const WithdrawlForm = ({ availableCoins, onSuccess }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const COIN_RATE = parseInt(import.meta.env.VITE_COIN_TO_DOLLAR_RATE);
  const MIN_WITHDRAW_COINS = 200;
  const MIN_WITHDRAW_DOLLARS = (MIN_WITHDRAW_COINS / COIN_RATE).toFixed(2);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      withdrawal_coin: 0,
      payment_system: "",
      account_number: "",
    },
  });

  const withdrawCoins = useWatch({
    control,
    name: "withdrawal_coin",
    defaultValue: 0,
  });
  const amountInDollars = withdrawCoins / COIN_RATE;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/withdrawals", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Withdrawal request submitted!");
      onSuccess();
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit request");
    },
  });

  const onSubmit = async (data) => {
    const finalPayload = {
      ...data,
      withdrawal_amount: amountInDollars,
      worker_email: user?.email,
      worker_name: user?.displayName,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };
    await mutateAsync(finalPayload);
  };

  // Calculate if user meets minimum requirement
  const hasMinimumCoins = availableCoins >= MIN_WITHDRAW_COINS;
  const isExchangeRateValid = COIN_RATE > 0;

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Coin Input with better visual feedback */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <LiaCoinsSolid className="h-4 w-4 text-amber-500" />
              Coins to Withdraw
            </label>
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full">
              <Wallet className="h-3 w-3 text-slate-500" />
              <span className="text-xs font-medium text-slate-700">
                Balance: <span className="font-bold text-amber-600">{availableCoins}</span> coins
              </span>
            </div>
          </div>
          <Input
            type="number"
            placeholder={`Enter amount (Min ${MIN_WITHDRAW_COINS} coins)`}
            {...register("withdrawal_coin", {
              required: "Please enter the amount you wish to withdraw",
              min: { 
                value: MIN_WITHDRAW_COINS, 
                message: `Minimum withdrawal is ${MIN_WITHDRAW_COINS} coins (≈ $${MIN_WITHDRAW_DOLLARS})` 
              },
              max: {
                value: availableCoins,
                message: `You only have ${availableCoins} coins available`,
              },
            })}
            className={`transition-all ${
              errors.withdrawal_coin
                ? "border-red-400 focus-visible:ring-red-400"
                : withdrawCoins > 0 && withdrawCoins <= availableCoins && withdrawCoins >= MIN_WITHDRAW_COINS
                ? "border-emerald-400 focus-visible:ring-emerald-400"
                : ""
            }`}
          />
          {withdrawCoins > 0 && !errors.withdrawal_coin && withdrawCoins <= availableCoins && withdrawCoins >= MIN_WITHDRAW_COINS && (
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              Eligible for withdrawal!
            </p>
          )}
          {errors.withdrawal_coin && (
            <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" />
              {errors.withdrawal_coin.message}
            </p>
          )}
        </div>

        {/* Dollar Amount - Enhanced Display */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-emerald-600" />
            Estimated Payout (USD)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={isExchangeRateValid ? amountInDollars.toFixed(2) : "0.00"}
              readOnly
              className={`pl-10 font-mono text-base font-semibold bg-linear-to-r from-slate-50 to-slate-100 border-slate-200 cursor-default ${
                amountInDollars > 0 ? "text-emerald-700" : "text-slate-500"
              }`}
            />
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <Info className="h-3 w-3" />
            Current Rate: 1 coin = ${(1 / COIN_RATE).toFixed(4)} USD
          </p>
        </div>

        {/* Payment System - Improved styling */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Payment Method</label>
          <Select
            onValueChange={(val) =>
              setValue("payment_system", val, { shouldValidate: true })
            }
          >
            <SelectTrigger className="h-11 bg-white">
              <SelectValue placeholder="Select withdrawal method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bkash">Bkash (Mobile Banking)</SelectItem>
              <SelectItem value="Nagad">Nagad (Mobile Banking)</SelectItem>
              <SelectItem value="Rocket">Rocket (DBBL Mobile Banking)</SelectItem>
            </SelectContent>
          </Select>
          <input
            type="hidden"
            {...register("payment_system", { required: "Please select a payment method" })}
          />
          {errors.payment_system && (
            <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" />
              {errors.payment_system.message}
            </p>
          )}
        </div>

        {/* Account Number with better validation feedback */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Account Number</label>
          <Input
            placeholder="Enter your 11-digit mobile number (e.g., 01XXXXXXXXX)"
            {...register("account_number", {
              required: "Account number is required to process withdrawal",
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: "Please enter a valid 11-digit Bangladeshi mobile number starting with 01",
              },
            })}
            className={errors.account_number ? "border-red-400" : ""}
          />
          {errors.account_number && (
            <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" />
              {errors.account_number.message}
            </p>
          )}
          <p className="text-[11px] text-slate-400">
            Ensure the number is active and registered with your selected payment method
          </p>
        </div>

        {/* Action Button with improved state */}
        {!hasMinimumCoins ? (
          <div className="flex items-center justify-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="font-medium">
              Minimum {MIN_WITHDRAW_COINS} coins required to withdraw. You have {availableCoins} coins.
              <br />
              <span className="text-xs opacity-75">Earn more coins by completing tasks!</span>
            </span>
          </div>
        ) : (
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
               Processing Request...
              </>
            ) : (
              <>
                Confirm & Request Withdrawal
              </>
            )}
          </Button>
        )}
      </form>
  );
};

export default WithdrawlForm;