import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Hash } from "lucide-react";

const PaymentHistoryTableRow = ({ payment }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Hash className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs uppercase">{payment.transactionId}</span>
        </div>
      </TableCell>
      <TableCell className="font-bold text-amber-600">
        +{payment.coinsAdded} Coins
      </TableCell>
      <TableCell>
        <Badge variant="secondary" className="font-semibold">
          ${payment.amount.toFixed(2)}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        <div className="flex items-center gap-2 text-xs">
          <Calendar className="h-3 w-3" />
          {new Date(payment.date).toLocaleDateString()}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
          Successful
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default PaymentHistoryTableRow;