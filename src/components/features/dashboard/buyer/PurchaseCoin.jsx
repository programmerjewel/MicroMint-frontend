
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, CreditCard, Sparkles } from "lucide-react";
import { toast, Toaster } from "sonner";

const PurchaseCoin = () => {
  const [isProcessing, setIsProcessing] = useState(null);

  const coinPackages = [
    { id: 1, coins: 10, price: 1, label: "Starter" },
    { id: 2, coins: 150, price: 10, label: "Popular" },
    { id: 3, coins: 500, price: 20, label: "Value" },
    { id: 4, coins: 1000, price: 35, label: "Business" },
  ];

  const handlePurchase = (pkg) => {
    setIsProcessing(pkg.id);

    // Simulate a 1.5 second "Payment Verification" process
    setTimeout(async () => {
      const paymentData = {
        transactionId: `DUMMY-${Math.random().toString(36).toUpperCase().substring(2, 10)}`,
        package: pkg.label,
        amount: pkg.price,
        coinsAdded: pkg.coins,
        timestamp: new Date().toLocaleString(),
      };

      // logic to save paymentData to your database and update user.coins goes here
      console.log("Saving to DB:", paymentData);

      toast.success(`Success! ${pkg.coins} coins added to your account.`, {
        description: `TransID: ${paymentData.transactionId}`,
      });
      
      setIsProcessing(null);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Toaster position="top-center" richColors />
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="text-amber-500" /> Get More Coins
        </h1>
        <p className="text-muted-foreground mt-2">Choose a package to increase your balance and post more tasks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coinPackages.map((pkg) => (
          <Card key={pkg.id} className="relative flex flex-col hover:border-amber-400 transition-colors">
            {pkg.label === "Popular" && (
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold">
                BEST SELLER
              </div>
            )}
            
            <CardHeader className="text-center">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{pkg.label}</p>
              <CardTitle className="text-4xl font-black py-2 flex justify-center items-center gap-2">
                {pkg.coins} <Coins className="h-6 w-6 text-amber-500" />
              </CardTitle>
            </CardHeader>

            <CardContent className="text-center grow">
              <div className="text-2xl font-bold text-slate-900">${pkg.price}</div>
              <p className="text-sm text-muted-foreground mt-2">Pay once, use anytime</p>
            </CardContent>

            <CardFooter>
              <Button 
                className="w-full bg-slate-900 hover:bg-slate-800" 
                onClick={() => handlePurchase(pkg)}
                disabled={isProcessing !== null}
              >
                {isProcessing === pkg.id ? (
                  "Verifying..."
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" /> Purchase
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Manual Instruction Note */}
      <div className="mt-12 bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-800">
        <strong>Note:</strong> Since this is a dummy payment system, clicking "Purchase" simulates a successful transaction. In a production environment, you would record the <code>transactionId</code> in your database to keep a history for the user.
      </div>
    </div>
  );
};

export default PurchaseCoin;