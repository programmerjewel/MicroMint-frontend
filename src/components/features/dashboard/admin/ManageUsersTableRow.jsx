// ManageUsersTableRow.jsx
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, Coins, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const roleBadgeClass = {
  admin: "bg-rose-50 text-rose-600 border-rose-100",
  buyer: "bg-blue-50 text-blue-600 border-blue-100",
  worker: "bg-slate-50 text-slate-600 border-slate-100",
};

const ManageUsersTableRow = ({ user, roleRequest, onStatusUpdate, onRemove }) => {
  const { _id, display_name, name, user_email, email, photo_url, image, role, coin } = user;

  const displayName = display_name || name;
  const displayEmail = user_email || email;
  const displayPhoto = photo_url || image;

  return (
    <TableRow className="group hover:bg-slate-50/80 transition-colors">
      {/* User Info */}
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border shadow-sm">
            <AvatarImage src={displayPhoto} alt={displayName} />
            <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">
              {displayName?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm text-slate-900 truncate">
              {displayName}
            </span>
            <span className="text-xs text-slate-500 truncate">
              {displayEmail}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Column 2: Current Role */}
      <TableCell>
        <Badge 
          variant="outline" 
          className={`capitalize px-2.5 py-0.5 rounded-full ${roleBadgeClass[role?.toLowerCase()] || "bg-slate-50"}`}
        >
          {role}
        </Badge>
      </TableCell>

      {/* Column 3: Role Request (The specific column you wanted) */}
      <TableCell>
        {roleRequest ? (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-300">
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 capitalize py-1">
              {roleRequest.requestedRole}
            </Badge>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onStatusUpdate(roleRequest._id, "approved")}
                className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 rounded-full border border-transparent hover:border-emerald-200"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onStatusUpdate(roleRequest._id, "rejected")}
                className="h-8 w-8 text-rose-500 hover:bg-rose-50 rounded-full border border-transparent hover:border-rose-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <span className="text-slate-300 ml-4">—</span>
        )}
      </TableCell>

      {/* Column 4: Coins */}
      <TableCell>
        <div className="inline-flex items-center gap-1.5 font-bold text-slate-700">
          <Coins className="h-4 w-4 text-amber-500" />
          {coin ?? 0}
        </div>
      </TableCell>

      {/* Column 5: Remove */}
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          disabled={role?.toLowerCase() === "admin"}
          onClick={() => onRemove(_id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ManageUsersTableRow;