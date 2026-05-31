import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export const UpdateTaskModal = ({ task, open, onOpenChange, onUpdate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: task,
  });

  useEffect(() => {
    if (open) reset(task);
  }, [task, open, reset]);

  const todayDateStr = new Date().toISOString().split("T")[0];

  const onSubmit = async (data) => {
    if (!isDirty) {
      onOpenChange(false);
      return;
    }
    try {
      await onUpdate(task._id, {
        ...data,
        required_workers: Number(data.required_workers),
        payable_amount: Number(data.payable_amount),
      });
      onOpenChange(false);
    } catch (err) {
      console.error("Update failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 text-brand-primary dark:text-blue-300 border-blue-100 dark:border-blue-900/40 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-700 dark:hover:text-blue-300 shadow-sm"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Task Info</DialogTitle>
          <DialogDescription className="sr-only">
            Form to edit the selected task details including title, workers, and completion date.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="task_title">Title</Label>
            <Input
              id="task_title"
              {...register("task_title", { required: "Title is required." })}
            />
            {errors.task_title && (
              <p className="text-xs text-red-500">{errors.task_title.message}</p>
            )}
          </div>

          {/* Task Detail */}
          <div className="space-y-2">
            <Label htmlFor="task_detail">Task Detail</Label>
            <Textarea
              id="task_detail"
              {...register("task_detail", { required: "Detail is required." })}
            />
            {errors.task_detail && (
              <p className="text-xs text-red-500">{errors.task_detail.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Required Workers */}
            <div className="space-y-1.5">
              <Label htmlFor="required_workers">Required Workers</Label>
              <Input
                id="required_workers"
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

            {/* Payable Amount */}
            <div className="space-y-1.5">
              <Label htmlFor="payable_amount">Payable Amount</Label>
              <Input
                id="payable_amount"
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
            <Label htmlFor="completion_date">Completion Date</Label>
            <Input
              id="completion_date"
              type="date"
              min={todayDateStr}
              className="dark:scheme-dark"
              {...register("completion_date", { required: "Date is required." })}
            />
            {errors.completion_date && (
              <p className="text-xs text-red-500">{errors.completion_date.message}</p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className={!isDirty ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};