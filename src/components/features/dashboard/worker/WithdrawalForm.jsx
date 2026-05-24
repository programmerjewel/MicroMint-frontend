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
import { BiDollar } from "react-icons/bi";

const WithdrawlForm = ({ availableCoins, onSuccess }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const WITHDRAW_COIN_TO_DOLLAR_RATE = parseInt(import.meta.env.VITE_WITHDRAW_COIN_TO_DOLLAR_RATE);

  const MIN_WITHDRAW_COINS = 200;
  
  const MIN_WITHDRAW_DOLLARS = WITHDRAW_COIN_TO_DOLLAR_RATE > 0 
    ? (MIN_WITHDRAW_COINS / WITHDRAW_COIN_TO_DOLLAR_RATE).toFixed(2) 
    : "0.00";

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

  const amountInDollars = withdrawCoins > 0 ? withdrawCoins / WITHDRAW_COIN_TO_DOLLAR_RATE : 0;

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

  const hasMinimumCoins = availableCoins >= MIN_WITHDRAW_COINS;
  const isExchangeRateValid = WITHDRAW_COIN_TO_DOLLAR_RATE > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-foreground">
      {/* Coin Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
            <LiaCoinsSolid className="h-4 w-4 text-amber-500" />
            Coins to Withdraw
          </label>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full">
            <Wallet className="h-3 w-3 text-slate-500 dark:text-slate-400" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Balance: <span className="font-bold text-amber-600 dark:text-amber-400">{availableCoins}</span> coins
            </span>
          </div>
        </div>
        <Input
          type="number"
          placeholder={`Enter amount (Min ${MIN_WITHDRAW_COINS} coins)`}
          {...register("withdrawal_coin", {
            required: "Please enter the amount you wish to withdraw",
            valueAsNumber: true,
            min: { 
              value: MIN_WITHDRAW_COINS, 
              message: `Minimum withdrawal is ${MIN_WITHDRAW_COINS} coins (≈ $${MIN_WITHDRAW_DOLLARS})` 
            },
            max: {
              value: availableCoins,
              message: `You only have ${availableCoins} coins available`,
            },
          })}
          className={`transition-all bg-background border-input text-foreground ${
            errors.withdrawal_coin
              ? "border-red-400 dark:border-red-500 focus-visible:ring-red-400 dark:focus-visible:ring-red-500"
              : withdrawCoins >= MIN_WITHDRAW_COINS && withdrawCoins <= availableCoins
              ? "border-emerald-400 dark:border-emerald-500 focus-visible:ring-emerald-400 dark:focus-visible:ring-emerald-500"
              : ""
          }`}
        />
        {withdrawCoins >= MIN_WITHDRAW_COINS && withdrawCoins <= availableCoins && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            Eligible for withdrawal!
          </p>
        )}
        {errors.withdrawal_coin && (
          <p className="text-xs text-red-500 dark:text-red-400 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.withdrawal_coin.message}
          </p>
        )}
      </div>

      {/* Payout Display */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
          <BiDollar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Estimated Payout (USD)
        </label>
        <div className="relative">
          <BiDollar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <Input
            value={isExchangeRateValid ? amountInDollars.toFixed(2) : "0.00"}
            readOnly
            className={`pl-10 font-mono text-base font-semibold bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 cursor-default ${
              amountInDollars > 0 ? "text-emerald-700 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"
            }`}
          />
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <Info className="h-3 w-3" />
          Current Rate: {WITHDRAW_COIN_TO_DOLLAR_RATE} coins = $1.00 USD
        </p>
      </div>

      {/* Payment System */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Payment Method</label>
        <Select
          onValueChange={(val) =>
            setValue("payment_system", val, { shouldValidate: true })
          }
        >
          <SelectTrigger className="h-11 bg-background border-input text-foreground">
            <SelectValue placeholder="Select withdrawal method" />
          </SelectTrigger>
          <SelectContent className="bg-popover text-popover-foreground border-border">
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
          <p className="text-xs text-red-500 dark:text-red-400 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.payment_system.message}
          </p>
        )}
      </div>

      {/* Account Number */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Account Number</label>
        <Input
          placeholder="Enter your 11-digit mobile number"
          {...register("account_number", {
            required: "Account number is required",
            pattern: {
              value: /^01[3-9]\d{8}$/,
              message: "Please enter a valid 11-digit Bangladeshi mobile number",
            },
          })}
          className={`bg-background text-foreground ${
            errors.account_number ? "border-red-400 dark:border-red-500 focus-visible:ring-red-400" : "border-input"
          }`}
        />
        {errors.account_number && (
          <p className="text-xs text-red-500 dark:text-red-400 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.account_number.message}
          </p>
        )}
      </div>

      {/* Action Button */}
      {!hasMinimumCoins ? (
        <div className="flex items-center justify-center gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <span className="font-medium">
            Minimum {MIN_WITHDRAW_COINS} coins required. You have {availableCoins}.
          </span>
        </div>
      ) : (
        <Button
          type="submit"
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Confirm & Request Withdrawal"}
        </Button>
      )}
    </form>
  );
};

export default WithdrawlForm;