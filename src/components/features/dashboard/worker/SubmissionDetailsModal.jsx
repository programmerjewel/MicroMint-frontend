import { Eye, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SubmissionDetailsModal = ({ submission }) => {
  const { task_title, buyer, payable_amount, submission_details, _id } = submission;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-950/50"
        >
          <Eye className="w-4 h-4 mr-1" /> Details
        </Button>
      </DialogTrigger>
      
      {/* DialogContent styling updated for dark mode backgrounds and borders */}
      <DialogContent className="sm:max-w-106.25 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold border-b border-zinc-100 dark:border-zinc-800 pb-2">
            Submission Receipt
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Success Banner - Adjusted for dark mode green tones */}
          <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 w-5 h-5" />
            <div>
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Payment Released</p>
              <p className="text-xs text-emerald-600/80 dark:text-emerald-400/70 uppercase tracking-wider font-mono">
                ID: {_id.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 dark:text-zinc-500 tracking-widest">Task</label>
              <p className="text-sm font-medium text-gray-900 dark:text-zinc-200 leading-tight">{task_title}</p>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 dark:text-zinc-500 tracking-widest">Buyer</label>
                <p className="text-sm text-gray-700 dark:text-zinc-300 truncate">{buyer.name}</p>
              </div>
              <div className="text-right">
                <label className="text-[10px] font-bold uppercase text-gray-400 dark:text-zinc-500 tracking-widest">Amount</label>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{payable_amount} Coins</p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <label className="text-[10px] font-bold uppercase text-gray-400 dark:text-zinc-500 tracking-widest">Your Submitted Proof</label>
              <div className="mt-2 p-3 bg-gray-50 dark:bg-zinc-950 rounded border border-zinc-200 dark:border-zinc-800 text-sm text-gray-600 dark:text-zinc-400 italic leading-relaxed">
                "{submission_details || "No written proof provided."}"
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDetailsModal;