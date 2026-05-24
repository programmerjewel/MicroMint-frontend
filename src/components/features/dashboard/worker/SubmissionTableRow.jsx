import { Link } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertCircle,
  Ban,
  Trash2,
} from "lucide-react";
import SubmissionDetailsModal from "./SubmissionDetailsModal";
import { LiaCoinsSolid } from "react-icons/lia";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";

const SubmissionTableRow = ({ submission, onCancel }) => {
  const { _id, task_id, task_title, buyer, payable_amount, status } =
    submission;

  const statusConfig = {
    approved: {
      variant: "approved",
      icon: <CheckCircle2 className="w-3 h-3" />,
      label: "Approved",
    },
    pending: { 
      variant: "pending", 
      icon: <Clock className="w-3 h-3" />, 
      label: "Pending",
    },
    rejected: {
      variant: "rejected",
      icon: <AlertCircle className="w-3 h-3" />,
      label: "Rejected",
    },
    "cancelled account deleted": {
      variant: "cancelledAdmin",
      icon: <AlertCircle className="w-3 h-3" />,
      label: "Admin Cancelled",
    },
    "cancelled by buyer": {
      variant: "cancelledBuyer",
      icon: <Trash2 className="w-3 h-3" />,
      label: "Buyer Cancelled",
    },
    "cancelled by user": {
      variant: "cancelledUser",
      icon: <Trash2 className="w-3 h-3" />,
      label: "Cancelled by You",
    },
  };

  const normalizedStatus = status?.toLowerCase();
  
  const currentConfig = statusConfig[normalizedStatus] || {
    variant: "outline",
    icon: null,
    label: status, // Fallback if a brand new status pops up
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{task_title}</TableCell>
      <TableCell className="text-gray-600 dark:text-gray-400">
        {buyer.name}
      </TableCell>
      <TableCell>
        <Badge variant="amber" className="gap-1.5">
          <LiaCoinsSolid className="h-3.5 w-3.5" />
          {payable_amount}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={currentConfig.variant}
          className="px-2 py-0.5 rounded-full flex items-center w-fit gap-1"
        >
          {currentConfig.icon}
          {currentConfig.label}
        </Badge>
      </TableCell>

      <TableCell className="text-right">
        {status === "pending" ? (
          <ConfirmActionModal
            title="Confirm Cancellation"
            description="This will remove your submission. If the task has limited spots, someone else might take your place."
            confirmText="Confirm Cancel"
            variant="destructive"
            onConfirm={() => onCancel(_id)}
            trigger={
              <Button
                variant="outline"
                size="xs"
                className="text-xs border-gray-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
              >
                <Ban className="w-3.5 h-3.5 mr-1" /> Cancel
              </Button>
            }
          />
        ) : status === "approved" ? (
          <SubmissionDetailsModal submission={submission} />
        ) : status === "rejected" ? (
          <Link to={`/dashboard/tasks/${task_id}`}>
            <Button
              variant="outline"
              size="xs"
              className="text-xs border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Resubmit
            </Button>
          </Link>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            disabled
            className="text-xs text-slate-400 cursor-not-allowed italic"
          >
            No Actions Available
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SubmissionTableRow;