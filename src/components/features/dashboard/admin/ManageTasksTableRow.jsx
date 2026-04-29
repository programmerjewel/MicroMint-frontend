import { TableCell, TableRow } from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { GoPeople } from 'react-icons/go';
import { FaRegUserCircle } from 'react-icons/fa';
import { LiaCoinsSolid } from 'react-icons/lia';
import ConfirmDeleteModal from "@/components/shared/ConfirmDeleteModal";

const ManageTasksTableRow = ({ task, onDelete }) => {
  return (
    <TableRow className="hover:bg-slate-50/80 transition-colors border-b">
      <TableCell className="py-4">
        <div className="flex flex-col space-y-0.5">
          <span className="font-medium text-gray-800 leading-none">
            {task.task_title}
          </span>
          <span className="text-xs font-mono text-muted-foreground opacity-70">
            #{task._id}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <FaRegUserCircle className="h-4 w-5 text-gray-600 group-hover:text-primary transition-colors" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-700 leading-tight">
              {task.buyer.name}
            </span>
            <span className="text-xs text-muted-foreground lowercase">
              {task.buyer.email}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-center gap-2 px-2 py-1.5 rounded-md bg-amber-50 border border-amber-100 w-fit mx-auto">
          <GoPeople className="text-amber-600 shrink-0" />
          <span className="text-xs font-semibold text-amber-900 leading-none">
            {task.required_workers}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-emerald-50 border border-emerald-100 w-fit">
          <LiaCoinsSolid className="text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold text-emerald-900 leading-none">
            {task.payable_amount}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span>{task.completion_date}</span>
        </div>
      </TableCell>

      <TableCell className="text-right">
        <ConfirmDeleteModal 
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