import { useState } from 'react';
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

const AddedTasksTableRow = ({ task, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    task_title: task.task_title,
    task_detail: task.task_detail,
    submission_info: task.submission_info,
  });

  return (
    <TableRow className="group hover:bg-slate-50/50 transition-colors">
      {/* --- REDESIGNED TASK INFO --- */}
      <TableCell className="py-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-bold text-slate-900 leading-none">
            {task.task_title}
          </span>
          <p 
            className="text-sm text-slate-500 line-clamp-2 leading-relaxed max-w-87.5"
            title={task.task_detail}
          >
            {task.task_detail}
          </p>
        </div>
      </TableCell>

      <TableCell className="text-sm font-medium text-slate-600">
        {task.completion_date}
      </TableCell>
      
      <TableCell className="font-semibold text-emerald-600">
        ${task.payable_amount}
      </TableCell>
      
      <TableCell className="text-slate-600 font-medium">
        {task.required_workers}
      </TableCell>
      
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          {/* --- UPDATE DIALOG --- */}
          <Dialog>
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
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input 
                    value={formData.task_title} 
                    onChange={(e) => setFormData({...formData, task_title: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Task Detail</Label>
                  <Textarea 
                    value={formData.task_detail} 
                    onChange={(e) => setFormData({...formData, task_detail: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Submission Requirements</Label>
                  <Textarea 
                    value={formData.submission_info} 
                    onChange={(e) => setFormData({...formData, submission_info: e.target.value})} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => onUpdate(task._id, formData)}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* --- DELETE BUTTON --- */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onDelete(task._id)}
            className="h-9 w-9 text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 shadow-sm"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AddedTasksTableRow;