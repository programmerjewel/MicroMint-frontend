
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Eye, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


const WithdrawRequestTableRow = ({ request, onApprove, onReject }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium text-md">{request.worker_name}</span>
          <span className="text-xs text-muted-foreground">{request.worker_email}</span>
        </div>
      </TableCell>
      <TableCell className="font-bold text-amber-600">
        {request.withdrawal_coin} Coins
      </TableCell>
      <TableCell className="font-semibold">
        ${request.withdrawal_amount.toFixed(2)}
      </TableCell>
      <TableCell className="flex justify-end py-3">
        <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" size="sm" className="flex items-center gap-2">
      <Eye className="h-4 w-4" /> Review
    </Button>
  </DialogTrigger>
  {/* FIXED: Standardized custom max-width variant syntax using arbitrary sizing */}
  <DialogContent className="sm:max-w-106.25"> 
    <DialogHeader>
      <DialogTitle>Withdrawal Review</DialogTitle>
      <DialogDescription>
        Verify the details below before processing the payment.
      </DialogDescription>
    </DialogHeader>

    {/* FIXED: Replaced absolute slate-100 borders with dynamic theme tokens */}
    <div className="grid gap-4 py-4 border-y border-border dark:border-border/60">
      <div className="flex justify-between">
        <span className="text-muted-foreground text-sm">Requested By:</span>
        <span className="font-medium text-sm text-foreground">{request.worker_name}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-muted-foreground text-sm">Payment Method:</span>
        {/* FIXED: Balanced text visibility via dark: text modifiers */}
        <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
          {request.payment_system}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground text-sm">Account Number:</span>
        {/* FIXED: Shifted slate backgrounds to theme-aware bg-muted */}
        <span className="font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs border border-border/40">
          {request.account_number}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground text-sm">Amount to Pay:</span>
        {/* FIXED: Smooth accessible scaling contrast for currency text */}
        <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">
          ${request.withdrawal_amount}
        </span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-muted-foreground text-sm">Requested On:</span>
        <span className="text-sm text-foreground/90">
          {new Date(request.withdraw_date).toLocaleDateString()}
        </span>
      </div>
    </div>

    <DialogFooter className="flex flex-row justify-between sm:justify-between w-full gap-2 pt-2">
      <Button 
        variant="destructive" 
        onClick={() => onReject(request)}
        className="flex-1"
      >
        <XCircle className="mr-2 h-4 w-4" /> Reject & Refund
      </Button>
      <Button 
        onClick={() => onApprove(request)}
        /* FIXED: Added explicit background scaling properties for dark theme approval states */
        className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:text-white flex-1"
      >
        <CheckCircle2 className="mr-2 h-4 w-4" /> Approve Payment
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
      </TableCell>
    </TableRow>
  );
};

export default WithdrawRequestTableRow;