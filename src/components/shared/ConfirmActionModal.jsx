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
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { cn } from "@/lib/utils";

const ConfirmActionModal = ({ 
  trigger, 
  title = "Are you sure?", 
  description = "This action cannot be undone. Please confirm if you wish to proceed.", 
  onConfirm, 
  confirmText = "Confirm",
  variant = "destructive" // options: "destructive" | "success" | "default"
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <RiDeleteBin5Fill className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      
      {/* Explicitly container-styled context for dark backgrounds */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-900 dark:text-slate-100">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500 dark:text-slate-400">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          {/* Cancel button: Swapped to a responsive background tint and neutral text */}
          <AlertDialogCancel className="border-none bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={cn(
              "text-white transition-colors border-none",
              variant === "destructive" && "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600",
              variant === "success" && "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600",
              variant === "default" && "bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200",
              variant === "warning" && "bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
            )}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmActionModal;