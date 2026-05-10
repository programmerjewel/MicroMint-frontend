
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2} from "lucide-react";

const PaymentHistoryTableRow = ({ payment }) => {
  console.log(payment)
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-medium text-sm">{payment.worker.name}</span>
            <span className="text-[10px] text-muted-foreground italic">{payment.worker.email}</span>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <span className="text-sm line-clamp-1 max-w-50 truncate">{payment.task_title}</span>
      </TableCell>

      <TableCell className="font-bold text-emerald-600">
        {payment.payable_amount} Coins
      </TableCell>

      <TableCell className="text-muted-foreground">
        <div className="flex items-center gap-2 text-xs">
          <Calendar className="h-3 w-3" />
          {/* Using reviewedAt because this is when the payout was finalized */}
          {new Date(payment.reviewedAt).toLocaleDateString()}
        </div>
      </TableCell>

      <TableCell className="text-right">
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 capitalize">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          {payment.status}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default PaymentHistoryTableRow;