import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";

const PendingSubmissionTableRow = ({ submission, onApprove, onReject }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{submission.worker_name}</TableCell>
      <TableCell>{submission.task_title}</TableCell>
      <TableCell className="font-semibold text-green-700">
        ${submission.payable_amount.toFixed(2)}
      </TableCell>
      <TableCell className="text-right">
        {/* --- VIEW DETAILS DIALOG --- */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" /> View Submission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Submission Detail</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold">Worker Proof Info:</h4>
                <div className="p-3 bg-slate-50 rounded-md border text-sm text-gray-700 leading-relaxed">
                  {submission.submission_details || "No written proof provided."}
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-row gap-2 sm:justify-end">
              {/* --- REJECT ACTION --- */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="flex-1 sm:flex-none">
                    <XCircle className="mr-2 h-4 w-4" /> Reject
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reject this submission?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Status will be "rejected" and <strong>required workers</strong> will increase by 1.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onReject(submission._id, submission.task_id)}
                      className="bg-red-600"
                    >
                      Confirm Reject
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* --- APPROVE ACTION --- */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none">
                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Approve Submission?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will transfer ${submission.payable_amount} to {submission.worker_name}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onApprove(submission._id, submission.worker_email, submission.payable_amount)}
                      className="bg-green-600"
                    >
                      Confirm Payment
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default PendingSubmissionTableRow;