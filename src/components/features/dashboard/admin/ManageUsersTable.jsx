import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import ManageUsersTableRow from "./ManageUsersTableRow";

const ManageUsersTable = ({ users = [], roleRequests = [], onStatusUpdate, onRemove }) => {
  return (
    <div className="rounded-md border bg-white  overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[30%]">User</TableHead>
            <TableHead className="w-[10%]">Coins</TableHead>
            <TableHead className="w-[10%]">Role</TableHead>
            <TableHead className="w-[10%]">Requested Role</TableHead>
            <TableHead className="w-[30%] text-center">Role Request Action</TableHead>
            <TableHead className="w-[10%]">Delete User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-20 text-slate-400">No users found.</TableCell>
            </TableRow>
          ) : (
            users.map((user) => {
              const email = (user.email || user.user_email)?.toLowerCase();
              const request = roleRequests.find(r => (r.email || r.user_email)?.toLowerCase() === email);
              
              return (
                <ManageUsersTableRow
                  key={user._id}
                  user={user}
                  roleRequest={request}
                  onStatusUpdate={onStatusUpdate}
                  onRemove={onRemove}
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsersTable;