

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Trash2, Coins } from "lucide-react";

const ManageUsersTableRow = ({ user, onRoleChange, onRemove }) => {
  return (
    <TableRow>
      {/* User Info with Photo */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={user.photo_url} alt={user.display_name} />
            <AvatarFallback>{user.display_name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{user.display_name}</span>
            <span className="text-xs text-muted-foreground">{user.user_email}</span>
          </div>
        </div>
      </TableCell>

      {/* Role Update Dropdown */}
      <TableCell>
        <Select 
          defaultValue={user.role} 
          onValueChange={(newRole) => onRoleChange(user._id, newRole)}
        >
          <SelectTrigger className="w-30 h-8 text-xs">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Buyer">Buyer</SelectItem>
            <SelectItem value="Worker">Worker</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* Coin Balance */}
      <TableCell>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <Coins className="h-4 w-4 text-amber-500" />
          {user.coin}
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => onRemove(user._id)}
          className="h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ManageUsersTableRow;