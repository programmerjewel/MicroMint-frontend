import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PendingSubmissionTableRow from "./PendingSubmissionTableRow";

const PendingSubmissionTable = ({ submissions = [], onApprove, onReject }) => {
  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Worker Name</TableHead>
            <TableHead>Task Title</TableHead>
            <TableHead>Payable Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                No pending submissions found.
              </TableCell>
            </TableRow>
          ) : (
            submissions.map((submission) => (
              <PendingSubmissionTableRow 
                key={submission._id} 
                submission={submission} 
                onApprove={onApprove}
                onReject={onReject}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingSubmissionTable;