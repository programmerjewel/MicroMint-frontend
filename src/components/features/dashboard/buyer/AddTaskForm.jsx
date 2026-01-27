import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { Card, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AddTaskForm = ({ availableCoins = 500, userEmail }) => {
const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // Extracting values directly from the form
    const task_title = form.task_title.value;
    const task_detail = form.task_detail.value;
    const required_workers = parseInt(form.required_workers.value);
    const payable_amount = parseFloat(form.payable_amount.value);
    const completion_date = form.completion_date.value;
    const submission_info = form.submission_info.value;

    // Calculate Total Payable Amount
    const total_payable_amount = required_workers * payable_amount;

    // Validate Coin Availability
    if (total_payable_amount > availableCoins) {
      alert("Not available Coin. Purchase Coin");
      return navigate("/dashboard/purchase-coin");
    }

    setLoading(true);

    try {
      // Logic for Image Upload would go here (getting the URL)
      const task_image_url = "https://placeholder-link-from-imgbb.com/image.png";

      // Prepare the Task Object
      const taskData = {
        task_title,
        task_detail,
        required_workers,
        payable_amount,
        total_payable_amount,
        completion_date,
        submission_info,
        task_image_url,
        buyer_email: userEmail,
      };

      console.log("Saving Task and Reducing Buyer's coin:", taskData);
      
      // Save to Collection & Reduce Coins (Backend Call)
      // await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(taskData) });

      toast.success("Task Added Successfully!");
      form.reset();
    } catch {
      toast.error("Error adding task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Toaster position="top-center" richColors />
      <CardContent>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task_title">Task Title</Label>
            <Input name="task_title" id="task_title" required placeholder="e.g. Subscribe to channel" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task_detail">Task Detail</Label>
            <Textarea name="task_detail" id="task_detail" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="required_workers">Required Workers</Label>
              <Input name="required_workers" id="required_workers" type="number" required defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payable_amount">Payable Amount (Per Worker)</Label>
              <Input name="payable_amount" id="payable_amount" type="number" step="0.01" required defaultValue="1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="completion_date">Completion Date</Label>
              <Input name="completion_date" id="completion_date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task_image">Task Image</Label>
              <Input name="task_image" id="task_image" type="file" required accept="image/*" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="submission_info">Submission Info (Proof description)</Label>
            <Input name="submission_info" id="submission_info" required placeholder="e.g. Provide screenshot" />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Add Task"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
};

export default AddTaskForm;