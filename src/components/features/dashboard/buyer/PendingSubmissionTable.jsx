import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PendingSubmissionTableRow from "./PendingSubmissionTableRow";

const PendingSubmissionTable = ({ submissions = [], onApprove, onReject, onRevision }) => {
  return (
    <div className="rounded-md border shadow-sm bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Worker Name</TableHead>
            <TableHead>Task Title</TableHead>
            <TableHead>Payable Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                No submissions requiring attention found.
              </TableCell>
            </TableRow>
          ) : (
            submissions.map((submission) => (
              <PendingSubmissionTableRow 
                key={submission._id} 
                submission={submission} 
                onApprove={onApprove}
                onReject={onReject}
                onRevision={onRevision}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingSubmissionTable;