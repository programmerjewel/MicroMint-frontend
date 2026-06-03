import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LiaCoinsSolid } from "react-icons/lia";
import SubmissionDetailModal from "./SubmissionDetailModal"; 

const PendingSubmissionTableRow = ({ submission, onApprove, onReject, onRevision }) => {
  
  const renderStatusBadge = (status) => {
    if (status === "in_review") {
      return (
        <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/50">
          In Review
        </Badge>
      );
    }

    // Fallback/Default case for "pending"
    return (
      <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50">
        Pending
      </Badge>
    );
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <span className="font-semibold text-sm text-foreground tracking-tight line-clamp-1">
          {submission.worker.name}
        </span>
      </TableCell>
      <TableCell>
        <span className="font-semibold text-sm text-foreground tracking-tight line-clamp-1">
          {submission.task_title}
        </span>
      </TableCell>
      <TableCell>
        <Badge variant="amber" className="gap-1.5">
          <LiaCoinsSolid className="h-3.5 w-3.5" />
          {submission.payable_amount.toFixed(2)}
        </Badge>
      </TableCell>
      
      <TableCell>
        {renderStatusBadge(submission?.status)}
      </TableCell>
  
      <TableCell className="text-right">
        <SubmissionDetailModal
          submission={submission}
          onApprove={onApprove}
          onReject={onReject}
          onRevision={onRevision}
        />
      </TableCell>
    </TableRow>
  );
};

export default PendingSubmissionTableRow;