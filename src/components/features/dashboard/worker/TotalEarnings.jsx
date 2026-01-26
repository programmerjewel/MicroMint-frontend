import { Card, CardContent } from "@/components/ui/card";
import { Coins, DollarSign } from "lucide-react";

const TotalEarnings = ({ coins = 0 }) => {
  const COIN_RATE = 20; // 20 coins = $1
  const totalDollars = coins / COIN_RATE;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="bg-primary/5 border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Coins className="h-4 w-4 text-amber-500" /> 
            <span className="text-xs uppercase font-bold tracking-tight">Current Coins</span>
          </div>
          <p className="text-3xl font-black">{coins.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <DollarSign className="h-4 w-4 text-green-600" /> 
            <span className="text-xs uppercase font-bold tracking-tight">Withdrawal Value</span>
          </div>
          <p className="text-3xl font-black text-green-700">
            ${totalDollars.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalEarnings;