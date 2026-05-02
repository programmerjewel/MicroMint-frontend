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
import { cn } from "@/lib/utils"; // Standard shadcn utility for merging classes

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
        {/* If a custom trigger is provided via props, it renders that.
           Otherwise, it falls back to a default red trash icon button.
        */}
        {trigger || (
          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
            <RiDeleteBin5Fill className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none bg-slate-100 hover:bg-slate-200 text-slate-900">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={cn(
              "text-white transition-colors",
              variant === "destructive" && "bg-red-600 hover:bg-red-700",
              variant === "success" && "bg-emerald-600 hover:bg-emerald-700",
              variant === "default" && "bg-slate-900 hover:bg-slate-800"
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