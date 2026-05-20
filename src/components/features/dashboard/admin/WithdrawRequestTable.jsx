
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import WithdrawRequestTableRow from "./WithdrawRequestTableRow";

const WithdrawRequestTable = ({ requests = [], onApprove, onReject }) => {
  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Worker Details</TableHead>
            <TableHead>Withdraw Coins</TableHead>
            <TableHead>Payable Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell 
                colSpan={5} 
                className="text-center py-16 text-muted-foreground font-medium"
              >
                No pending withdrawal requests found.
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <WithdrawRequestTableRow 
                key={request._id} 
                request={request} 
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

export default WithdrawRequestTable;