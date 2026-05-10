
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaymentHistoryTableRow from "./PaymentHistoryTableRow";

const PaymentHistoryTable = ({ payments = [] }) => {
  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[10%]">Worker</TableHead>
            <TableHead>Task Title</TableHead>
            <TableHead className="w-[10%]">Amount Paid</TableHead>
            <TableHead className="w-[10%]">Approval Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                <p>No payout history found.</p>
                <p className="text-xs">Once you approve worker tasks, they will appear here.</p>
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <PaymentHistoryTableRow 
                key={payment._id} 
                payment={payment} 
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistoryTable;