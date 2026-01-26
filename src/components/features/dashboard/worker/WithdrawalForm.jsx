import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, AlertCircle } from "lucide-react";

const WithdrawlForm = ({ userTotalCoins, onWithdraw }) => {
  const COIN_RATE = 20;
  const [withdrawCoins, setWithdrawCoins] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const amountInDollars = withdrawCoins / COIN_RATE;
  const isOverLimit = withdrawCoins > userTotalCoins;
  const hasNoCoins = userTotalCoins <= 0;
  const isValid = withdrawCoins > 0 && !isOverLimit && paymentSystem && accountNumber;

  const handleSubmit = (e) => {
    e.preventDefault();
    onWithdraw({
      withdrawal_coin: withdrawCoins,
      withdrawal_amount: amountInDollars,
      payment_system: paymentSystem,
      account_number: accountNumber,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Coins to Withdraw</label>
        <Input
          type="number"
          placeholder="Enter amount"
          onChange={(e) => setWithdrawCoins(Number(e.target.value))}
          className={isOverLimit ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {isOverLimit && <p className="text-xs text-destructive font-medium">Insufficient coins available</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Withdraw Amount ($)</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={amountInDollars.toFixed(2)} readOnly className="pl-10 bg-muted cursor-not-allowed" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Select Payment System</label>
        <Select onValueChange={setPaymentSystem}>
          <SelectTrigger>
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bkash">Bkash</SelectItem>
            <SelectItem value="Nagad">Nagad</SelectItem>
            <SelectItem value="Rocket">Rocket</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Account Number</label>
        <Input placeholder="01XXXXXXXXX" onChange={(e) => setAccountNumber(e.target.value)} />
      </div>

      {hasNoCoins ? (
        <div className="flex items-center justify-center gap-2 p-3 bg-red-50 text-red-700 rounded-md border border-red-100">
          <AlertCircle className="h-4 w-4" />
          <span className="font-bold">Insufficient coin</span>
        </div>
      ) : (
        <Button type="submit" className="w-full" disabled={!isValid}>
          Withdraw Now
        </Button>
      )}
    </form>
  );
};

export default WithdrawlForm;