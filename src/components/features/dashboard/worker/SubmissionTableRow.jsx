import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const SubmissionTableRow = ({ submission }) => {
  const { task_title, buyer_name, payable_amount, status } = submission;

  // Define styles for each status
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
    approved: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  };

  // Fallback to a neutral style if status is unknown
  const currentStyle = statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-800";

  return (
    <TableRow>
      <TableCell className="font-medium">{task_title}</TableCell>
      <TableCell>{buyer_name}</TableCell>
      <TableCell>
        <span className="font-semibold text-green-600">
          ${payable_amount.toFixed(2)}
        </span>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`capitalize ${currentStyle}`}
        >
          {status}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default SubmissionTableRow;