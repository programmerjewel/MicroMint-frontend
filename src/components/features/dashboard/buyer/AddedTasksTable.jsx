
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddedTasksTableRow from "./AddedTasksTableRow";

const AddedTasksTable = ({ tasks, onUpdate, onDelete }) => {
  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Task Info</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Payable</TableHead>
            <TableHead>Workers</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              {/* This now works because TableCell is imported above */}
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                You haven't added any tasks yet.
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <AddedTasksTableRow 
                key={task._id} 
                task={task} 
                onUpdate={onUpdate} 
                onDelete={onDelete} 
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AddedTasksTable;