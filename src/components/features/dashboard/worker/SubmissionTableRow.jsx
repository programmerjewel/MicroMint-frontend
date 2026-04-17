import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

const SubmissionTableRow = ({ submission, onCancel }) => {
  const { _id, task_title, buyer, payable_amount, status } = submission;

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
    approved: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  };

  const currentStyle = statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  const isPending = status.toLowerCase() === "pending";
 

  return (
    <TableRow>
      <TableCell className="text-gray-900">{task_title}</TableCell>
      <TableCell className='text-gray-900'>{buyer.name}</TableCell>
      <TableCell className= ''>
        <span className="font-semibold text-green-600">
          ${payable_amount.toFixed(2)}
        </span>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={`capitalize ${currentStyle}`}>
          {status}
        </Badge>
      </TableCell>
      <TableCell>
        {isPending ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs hover:text-red-600">
                Cancel
              </Button>
            </AlertDialogTrigger>
            
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel? This spot will be opened for others.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction onClick={() => onCancel(_id)} className="bg-red-600">
                  Yes, Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          // If not pending, show a disabled button or a tooltip
          <Button variant="ghost" size="sm" disabled className="cursor-not-allowed opacity-50">
            Locked
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SubmissionTableRow;