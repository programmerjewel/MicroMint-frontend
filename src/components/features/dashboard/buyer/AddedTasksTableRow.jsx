import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { LiaCoinsSolid } from "react-icons/lia";
import { GoPeople } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { Badge } from "@/components/ui/badge";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";

import { UpdateTaskModal } from "./UpdateTaskModal";

const AddedTasksTableRow = ({ task, onUpdate, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <TableRow>
      <TableCell className="py-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-bold leading-none">{task.task_title}</span>
          <p
            className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-80"
            title={task.task_detail}
          >
            {task.task_detail}
          </p>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="secondary" className="gap-1.5">
          <CiCalendar className="h-3.5 w-3.5" />
          {task.completion_date}
        </Badge>
      </TableCell>

      <TableCell>
        <Badge variant="amber" className="gap-1.5">
          <LiaCoinsSolid className="h-3.5 w-3.5" />
          {task.payable_amount}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-center gap-1.5 px-2 py-1 rounded-full border w-fit mx-auto transition-colors bg-teal-50/60 border-teal-100 text-teal-700 dark:bg-teal-950/20 dark:border-teal-900/40 dark:text-teal-400">
          <GoPeople className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs font-bold leading-none">
            {task.required_workers}
          </span>
        </div>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          
          <UpdateTaskModal
            task={task}
            open={modalOpen}
            onOpenChange={setModalOpen}
            onUpdate={onUpdate}
          />

          <ConfirmActionModal
            title="Delete this task?"
            description="Warning: Deleting this task will notify all workers with pending submissions that the task has been cancelled by the buyer."
            confirmText="Yes, Delete Task"
            variant="destructive"
            onConfirm={() => onDelete(task._id)}
            trigger={
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 text-red-600 dark:text-red-300 border-red-100 hover:bg-red-50 hover:text-red-700 shadow-sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AddedTasksTableRow;