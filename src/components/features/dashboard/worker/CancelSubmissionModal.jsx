
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const CancelSubmissionModal = ({ submissionId, onCancel }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs border-gray-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
        >
          <Ban className="w-3.5 h-3.5 mr-1" /> Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove your submission. If the task has limited spots, someone else might take your place.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Submission</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => onCancel(submissionId)} 
            className="bg-rose-600 hover:bg-rose-700 text-white"
          >
            Confirm Cancel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelSubmissionModal;