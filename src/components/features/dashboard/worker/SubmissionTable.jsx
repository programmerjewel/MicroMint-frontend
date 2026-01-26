import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubmissionTableRow from "./SubmissionTableRow";
const SubmissionTable = ({submissions}) => {
  return (
    <div className="rounded-xs border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task Title</TableHead>
            <TableHead>Buyer Name</TableHead>
            <TableHead>Payable Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <SubmissionTableRow
              key={submission._id}
              submission={submission}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default SubmissionTable;