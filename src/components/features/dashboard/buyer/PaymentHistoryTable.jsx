import React from 'react';
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
            <TableHead>Transaction ID</TableHead>
            <TableHead>Coins Added</TableHead>
            <TableHead>Amount Paid</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <p>No payment history found.</p>
                  <p className="text-xs">Your purchases will appear here.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <PaymentHistoryTableRow 
                key={payment.transactionId} 
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