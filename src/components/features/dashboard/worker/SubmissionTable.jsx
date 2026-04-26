import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubmissionTableRow from "./SubmissionTableRow";
const SubmissionTable = ({submissions, onCancel}) => {
  return (
    <div className="rounded-xs border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Task Title</TableHead>
            <TableHead className='font-semibold'>Buyer Name</TableHead>
            <TableHead className='font-semibold'>Payable Amount</TableHead>
            <TableHead className='font-semibold'>Status</TableHead>
            <TableHead className='font-semibold text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <SubmissionTableRow
              key={submission._id}
              submission={submission}
              onCancel={onCancel}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default SubmissionTable;