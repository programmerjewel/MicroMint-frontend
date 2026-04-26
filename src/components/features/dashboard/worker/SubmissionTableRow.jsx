import React from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import SubmissionDetailsModal from "./SubmissionDetailsModal";
import CancelSubmissionModal from "./CancelSubmissionModal";

const SubmissionTableRow = ({ submission, onCancel }) => {
  const { _id, task_id, task_title, buyer, payable_amount, status } =
    submission;

  const statusStyles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const currentStyle = statusStyles[status] || "bg-gray-50 text-gray-600";

  return (
    <TableRow className="hover:bg-gray-50/50 transition-colors">
      <TableCell className="font-medium text-gray-900">{task_title}</TableCell>
      <TableCell className="text-gray-600">{buyer.name}</TableCell>
      <TableCell>
        <span className="font-bold text-emerald-600">
          ${payable_amount.toFixed(2)}
        </span>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`capitalize px-2 py-0.5 rounded-full font-medium flex items-center w-fit gap-1 ${currentStyle}`}
        >
          {status === "pending" && <Clock className="w-3 h-3" />}
          {status === "approved" && <CheckCircle2 className="w-3 h-3" />}
          {status === "rejected" && <AlertCircle className="w-3 h-3" />}
          {status}
        </Badge>
      </TableCell>

      <TableCell className="text-right">
        {status === "pending" ? (
          <CancelSubmissionModal submissionId={_id} onCancel={onCancel} />
        ) : status === "approved" ? (
          <SubmissionDetailsModal submission={submission} />
        ) : (
          /* status === "rejected" */
          <Link to={`/dashboard/tasks/${task_id}`}>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Resubmit
            </Button>
          </Link>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SubmissionTableRow;
