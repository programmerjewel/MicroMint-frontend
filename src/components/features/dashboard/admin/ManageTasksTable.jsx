import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import ManageTasksTableRow from "./ManageTasksTableRow";

const ManageTasksTable = ({ tasks = [], onDelete }) => {
  return (
    <div className="rounded-md bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Task Details</TableHead>
            <TableHead>Buyer Info</TableHead>
            <TableHead className='text-right'>Required Workers</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-muted-foreground font-medium">
                No active tasks found in the database.
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <ManageTasksTableRow 
                key={task._id} 
                task={task} 
                onDelete={onDelete} 
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageTasksTable;