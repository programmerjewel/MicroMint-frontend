import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";
import { Eye, CheckCircle, XCircle, RefreshCw, Info } from "lucide-react";

const SubmissionDetailModal = ({ submission, onApprove, onReject, onRevision }) => {
  // Check if the submission status from backend is already marked as 'in_review'
  const isCurrentlyInReview = submission?.status === "in_review";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" /> View Submission
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-112.5">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-slate-100">
            Submission Detail
          </DialogTitle>
          
          <DialogDescription className="sr-only">
            Review the proof information submitted by the worker and choose to approve, request a revision, or reject the submission.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Contextual Status Alert Banner */}
          {isCurrentlyInReview && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-400 text-xs font-medium">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <p>
                This submission is currently <span className="font-bold underline">In Review</span>. You have requested a revision from the worker. Waiting for them to make adjustments and resubmit the task.
              </p>
            </div>
          )}

          {/* Worker Proof */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200">
              Worker Proof Info:
            </h4>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "{submission?.submission_details || "No written proof provided."}"
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          {/* REJECT ACTION */}
          <ConfirmActionModal
            title="Reject this submission?"
            description={`Status will be marked as "rejected" and the required workers for "${submission?.task_title}" will increase by 1.`}
            confirmText="Confirm Reject"
            variant="destructive"
            onConfirm={() => onReject(submission?._id)}
            trigger={
              <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                <XCircle className="mr-2 h-4 w-4" /> Reject
              </Button>
            }
          />
          
          {/* REQUEST REVISION ACTION */}
          <ConfirmActionModal
            title="Request Task Revision?"
            description="This passes the task verification status back to the worker for adjustments. No coins will be charged yet."
            confirmText="Send Back for Revision"
            variant="warning"
            onConfirm={() => onRevision(submission?._id)}
            disabled={isCurrentlyInReview}
            trigger={
              <Button 
                variant="outline" 
                size="sm" 
                disabled={isCurrentlyInReview}
                className="w-full sm:w-auto font-medium shadow-sm transition-all border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900/50 dark:text-amber-400 dark:hover:bg-amber-950/30 disabled:opacity-50 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 dark:disabled:bg-slate-900 dark:disabled:text-slate-600 dark:disabled:border-slate-800 disabled:cursor-not-allowed disabled:pointer-events-auto"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> 
                {isCurrentlyInReview ? "Revision Pending" : "Ask Revision"}
              </Button>
            }
          />   

          {/* APPROVE ACTION */}
          <ConfirmActionModal
            title="Approve Submission?"
            description={`This will transfer ${submission?.payable_amount} coins to ${submission?.worker?.name}. This action is permanent.`}
            confirmText="Confirm Payment"
            variant="success"
            onConfirm={() => onApprove(submission?._id, submission?.worker_email, submission?.payable_amount)}
            trigger={
              <Button size="sm" className="w-full sm:w-auto font-medium">
                <CheckCircle className="mr-2 h-4 w-4" /> Approve
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDetailModal;