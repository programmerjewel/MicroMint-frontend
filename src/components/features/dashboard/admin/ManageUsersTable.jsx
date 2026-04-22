// ManageUsersTable.jsx
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import ManageUsersTableRow from "./ManageUsersTableRow";

const ManageUsersTable = ({ users = [], roleRequests = [], onStatusUpdate, onRemove }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/60 border-b border-slate-200">
          <TableRow>
            <TableHead className="py-4 px-6 text-slate-900 font-bold w-[25%]">User</TableHead>
            <TableHead className="text-slate-900 font-bold w-[15%]">Current Role</TableHead>
            <TableHead className="text-slate-900 font-bold w-[30%]">Role Request</TableHead>
            <TableHead className="text-slate-900 font-bold w-[15%]">Coins</TableHead>
            <TableHead className="text-right pr-6 text-slate-900 font-bold w-[15%]">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-20 text-slate-400">
                No users found in the database.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => {
              const userEmail = user.user_email || user.email;
              const pendingRequest = roleRequests.find(
                (req) =>
                  req.email?.toLowerCase() === userEmail?.toLowerCase() &&
                  req.status === "pending"
              );

              return (
                <ManageUsersTableRow
                  key={user._id}
                  user={user}
                  roleRequest={pendingRequest}
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