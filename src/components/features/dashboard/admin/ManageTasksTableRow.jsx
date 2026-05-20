import { TableCell, TableRow } from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { GoPeople } from 'react-icons/go';
import { LiaCoinsSolid } from 'react-icons/lia';
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";
import { Badge } from "@/components/ui/badge";
import { RxAvatar } from "react-icons/rx";

const ManageTasksTableRow = ({ task, onDelete }) => {
  return (
    <TableRow>
      <TableCell className="py-4">
        <div className="flex flex-col space-y-1 min-w-0"> 
          <span className="font-semibold text-sm text-foreground tracking-tight line-clamp-1">
            {task.task_title}
          </span>
          <span className="text-xs font-mono text-muted-foreground/80 tracking-wider uppercase">
            ID:{task._id}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-3 group">
         <RxAvatar className="h-5 w-5 shrink-0 text-muted-foreground/80" />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold leading-tight text-foreground truncate">
              {task.buyer.name}
            </span>
            <span className="text-xs text-muted-foreground lowercase truncate">
              {task.buyer.email}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-center gap-1.5 px-2 py-1 rounded-full border w-fit mx-auto transition-colors
          bg-teal-50/60 border-teal-100 text-teal-700
          dark:bg-teal-950/20 dark:border-teal-900/40 dark:text-teal-400"
        >
          <GoPeople className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs font-bold leading-none">
            {task.required_workers}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="amber" className="gap-1.5">
          <LiaCoinsSolid className="h-3.5 w-3.5" />
          {task.payable_amount}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span>{task.completion_date}</span>
        </div>
      </TableCell>

      <TableCell className="text-right">
        <ConfirmActionModal 
          title="Delete Task?"
          description={
            <>
              Are you sure you want to delete <strong>{task.task_title}</strong>? 
              This will remove all associated worker submissions.
            </>
          }
          onConfirm={() => onDelete(task._id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default ManageTasksTableRow;