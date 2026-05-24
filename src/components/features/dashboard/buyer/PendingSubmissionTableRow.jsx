import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { LiaCoinsSolid } from "react-icons/lia";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";
import { Badge } from "@/components/ui/badge";


const PendingSubmissionTableRow = ({ submission, onApprove, onReject }) => {
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
      <TableCell className="text-right">
        {/* VIEW DETAILS DIALOG */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" /> View Submission
            </Button>
          </DialogTrigger>
          {/* Changed to standard arbitrary max-width to avoid class breakdown */}
          <DialogContent className="sm:max-w-106.25 ">
            <DialogHeader>
              <DialogTitle className="text-slate-900 dark:text-slate-100">Submission Detail</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200">
                  Worker Proof Info:
                </h4>
                {/* Adjusted background, border, and text colors for dark mode context */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "
                  {submission.submission_details ||
                    "No written proof provided."}
                  "
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-row gap-2 sm:justify-end">
              {/* REJECT ACTION */}
              <ConfirmActionModal
                title="Reject this submission?"
                description={`Status will be marked as "rejected" and the required workers for "${submission.task_title}" will increase by 1.`}
                confirmText="Confirm Reject"
                variant="destructive"
                onConfirm={() => onReject(submission._id, submission.task_id)}
                trigger={
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <XCircle className="mr-2 h-4 w-4" /> Reject
                  </Button>
                }
              />

              {/* APPROVE ACTION */}
              <ConfirmActionModal
                title="Approve Submission?"
                description={`This will transfer ${submission.payable_amount} coins to ${submission.worker.name}. This action is permanent.`}
                confirmText="Confirm Payment"
                variant="success"
                onConfirm={() =>
                  onApprove(
                    submission._id,
                    submission.worker_email,
                    submission.payable_amount,
                  )
                }
                trigger={
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 flex-1 sm:flex-none text-white border-none"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                  </Button>
                }
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default PendingSubmissionTableRow;