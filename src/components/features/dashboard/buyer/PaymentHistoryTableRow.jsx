
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2} from "lucide-react";
import { CiCalendar } from "react-icons/ci";

const PaymentHistoryTableRow = ({ payment }) => {
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
      
      <TableCell className="max-w-50 md:max-w-75">
        <span className="text-sm line-clamp-1 w-full truncate block font-medium">{payment.task_title}</span>
      </TableCell>

      <TableCell>
        <Badge variant="amber" className="gap-1.5 rounded-md">
          {payment.payable_amount} coins
        </Badge>
      </TableCell>

      <TableCell>
        <Badge variant="secondary" className="gap-1.5 rounded-md">
          <CiCalendar className="h-3.5 w-3.5" />
          {new Date(payment.reviewedAt).toLocaleDateString()}
        </Badge>
      </TableCell>

      <TableCell className="text-right">
        <Badge variant="approved">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          {payment.status}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default PaymentHistoryTableRow;