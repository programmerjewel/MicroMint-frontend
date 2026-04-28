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

const ConfirmDeleteModal = ({ 
  trigger, 
  title = "Are you sure?", 
  description, 
  onConfirm, 
  confirmText = "Delete Permanently",
  variant = "destructive" 
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* If a custom trigger is provided, use it. Otherwise, show a default delete button */}
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
            {description || "This action cannot be undone. This will permanently delete the data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none bg-slate-100 hover:bg-slate-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={variant === "destructive" ? "bg-red-600 hover:bg-red-700 text-white" : ""}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteModal;