
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import ManageUsersTableRow from "./ManageUsersTableRow";

const ManageUsersTable = ({ users = [], onRoleChange, onRemove }) => {
  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Coins</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                No users found in the system.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <ManageUsersTableRow 
                key={user._id} 
                user={user} 
                onRoleChange={onRoleChange}
                onRemove={onRemove}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsersTable;