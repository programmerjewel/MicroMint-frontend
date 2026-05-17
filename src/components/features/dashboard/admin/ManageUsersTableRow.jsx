import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, X } from "lucide-react";
import { LiaCoinsSolid } from "react-icons/lia";
import { Badge } from "@/components/ui/badge";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";

const roleStyles = {
  admin: "bg-rose-50 text-rose-600 border-rose-200",
  buyer: "bg-violet-50 text-violet-600 border-violet-200",
  worker: "bg-sky-50 text-sky-600 border-sky-200",
};

const ManageUsersTableRow = ({ user, roleRequest, onStatusUpdate, onRemove }) => {
  const { name, email, image, role, coins } = user;
  const status = roleRequest?.status?.toLowerCase();

  return (
    <TableRow>
      
      <TableCell className="py-3 px-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 ring-2 ring-slate-100">
            <AvatarImage src={image} alt={name} referrerPolicy="no-referrer" />
            <AvatarFallback className="bg-slate-800 text-white text-xs">{name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-slate-800 truncate">{name}</span>
            <span className="text-xs text-slate-400 truncate">{email}</span>
          </div>
        </div>
      </TableCell>

      
      <TableCell>
        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full text-amber-700">
          <LiaCoinsSolid className="h-3.5 w-3.5" />
          <span className="text-xs font-bold">{coins ?? 0}</span>
        </div>
      </TableCell>

      
      <TableCell>
        <Badge variant="outline" className={cn("capitalize text-[10px] px-2", roleStyles[role?.toLowerCase()])}>
          {role}
        </Badge>
      </TableCell>

      
      <TableCell className='text-center'>
        {roleRequest ? (
            <span className="text-xs font-bold text-slate-700 capitalize">{roleRequest.requestedRole}</span>
        ) : <span className="text-slate-300 text-xs">N/A</span>}
      </TableCell>

      
      <TableCell className='text-center'>
        {status === "pending" ? (
          <div className="flex gap-2 justify-center items-center">
            
            <ConfirmActionModal
              title="Approve Role Request?"
              description={`Are you sure you want to upgrade this user to ${roleRequest.requestedRole}?`}
              confirmText="Yes, Approve"
              variant="success"
              onConfirm={() => onStatusUpdate(roleRequest._id, "approved")}
              trigger={
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 px-2 text-[10px] font-bold text-emerald-600 border border-emerald-100 hover:bg-emerald-50 gap-1"
                >
                  <Check className="h-3 w-3" /> Approve
                </Button>
              }
            />

            <ConfirmActionModal
              title="Reject Request?"
              description="This will decline the user's request for a role change."
              confirmText="Confirm Reject"
              variant="destructive"
              onConfirm={() => onStatusUpdate(roleRequest._id, "rejected")}
              trigger={
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 px-2 text-[10px] font-bold text-rose-500 border border-rose-100 hover:bg-rose-50 gap-1"
                >
                  <X className="h-3 w-3" /> Reject
                </Button>
              }
            />
            
          </div>
        ) : (
          <span className="text-slate-300 text-[10px] italic">No active request</span>
        )}
      </TableCell>


      
      <TableCell className="text-center pr-5">
        <ConfirmActionModal
          title="Delete User?"
          trigger={
            <Button 
              size="icon" 
              variant="ghost" 
              disabled={role?.toLowerCase() === "admin"} 
              className="h-8 w-8 text-red-500 disabled:opacity-20"
            >
              <RiDeleteBin5Fill className="h-3.5 w-3.5" />
            </Button>
          }
          onConfirm={() => onRemove(email)}
        />
      </TableCell>
    </TableRow>
  );
};

export default ManageUsersTableRow;