
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, CreditCard } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const WithdrawRequestTableRow = ({ request, onApprove }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{request.worker_name}</span>
          <span className="text-xs text-muted-foreground">{request.worker_email}</span>
        </div>
      </TableCell>
      <TableCell className="font-bold text-amber-600">
        {request.withdrawal_coin} Coins
      </TableCell>
      <TableCell className="font-semibold">
        ${request.withdrawal_amount.toFixed(2)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-slate-400" />
          <div className="flex flex-col text-xs">
            <span className="font-bold">{request.payment_system}</span>
            <span>{request.account_number}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle className="mr-2 h-4 w-4" /> Payment Success
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Payment Success?</AlertDialogTitle>
              <AlertDialogDescription>
                This will mark the request as <strong>Approved</strong> and deduct 
                <strong> {request.withdrawal_coin} coins</strong> from {request.worker_name}'s balance. 
                Ensure you have sent ${request.withdrawal_amount} via {request.payment_system}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onApprove(request)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Confirm & Deduct
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default WithdrawRequestTableRow;