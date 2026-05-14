import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { LiaCoinsSolid } from "react-icons/lia";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";

const AddedTasksTableRow = ({ task, onUpdate, onDelete }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: task,
  });

  const todayDateStr = new Date().toISOString().split("T")[0];

  const onSubmit = async (data) => {
    if(!isDirty){
      setOpen(false);
      return;
    }
    try {
      await onUpdate(task._id, {
        ...data,
        required_workers: Number(data.required_workers),
        payable_amount: Number(data.payable_amount),
      });
      setOpen(false);
    } catch (err) {
      console.error("Update failed:", err.response?.data?.message);
    }
  };

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) reset(task);
  };

  return (
    <TableRow className="group hover:bg-slate-50/50 transition-colors">
      <TableCell className="py-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-bold text-slate-900 leading-none">
            {task.task_title}
          </span>
          <p className="text-sm text-slate-500 truncate max-w-80" title={task.task_detail}>
            {task.task_detail}
          </p>
        </div>
      </TableCell>

      <TableCell className="text-sm font-medium text-slate-600">
        {task.completion_date}
      </TableCell>

      <TableCell className="font-semibold text-emerald-600">
        <div className="flex items-center justify-center gap-2">
          <LiaCoinsSolid className="h-5 w-5" />
          <span>{task.payable_amount.toFixed(2)}</span>
        </div>
      </TableCell>

      <TableCell className="text-slate-600 font-medium text-center">
        {task.required_workers}
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 text-blue-600 border-blue-100 hover:bg-blue-50 hover:text-blue-700 shadow-sm"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Task Info</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  {/* Task Title */}
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      {...register("task_title", { required: "Title is required." })}
                    />
                    {errors.task_title && (
                      <p className="text-xs text-red-500">{errors.task_title.message}</p>
                    )}
                  </div>

                  {/* Task Detail */}
                  <div className="space-y-2">
                    <Label>Task Detail</Label>
                    <Textarea
                      {...register("task_detail", { required: "Detail is required." })}
                    />
                    {errors.task_detail && (
                      <p className="text-xs text-red-500">{errors.task_detail.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Required Workers */}
                    <div className="space-y-1.5">
                      <Label>Required Workers</Label>
                      <Input
                        type="number"
                        {...register("required_workers", {
                          required: "Required",
                          min: { value: 1, message: "Min 1 worker" },
                          valueAsNumber: true,
                        })}
                      />
                      {errors.required_workers && (
                        <p className="text-xs text-red-500">{errors.required_workers.message}</p>
                      )}
                    </div>

                    {/* Payable Amount - Frontend Guard Only */}
                    <div className="space-y-1.5">
                      <Label>Payable Amount</Label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register("payable_amount", {
                          required: "Required",
                          valueAsNumber: true,
                          min: {
                            value: task.payable_amount,
                            message: `Min $${task.payable_amount}`,
                          },
                        })}
                      />
                      {errors.payable_amount && (
                        <p className="text-xs text-red-500">{errors.payable_amount.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Completion Date */}
                  <div className="space-y-1.5">
                    <Label>Completion Date</Label>
                    <Input
                      type="date"
                      min={todayDateStr}
                      {...register("completion_date", { required: "Date is required." })}
                    />
                    {errors.completion_date && (
                      <p className="text-xs text-red-500">{errors.completion_date.message}</p>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || !isDirty} className={!isDirty ? "opacity-50 cursor-not-allowed" : ""}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

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
                className="h-9 w-9 text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 shadow-sm"
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