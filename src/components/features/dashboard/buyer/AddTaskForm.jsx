import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { Card, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/utils/uploadImage"; 
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
// import { useNavigate } from 'react-router-dom';

const AddTaskForm = () => {
  // const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // 1. Check Coin Availability (Frontend Validation)
    // Assuming 'user' object from useAuth includes 'coins' from your DB
    // if (totalCost > (user?.coins || 0)) {
    //   toast.error("Not enough coins! Please purchase more.");
    //   return navigate("/dashboard/purchase-coin");
    // }
    const workers = parseInt(data.required_workers);
    const amount = parseFloat(data.payable_amount);
    const total_payable_amount = workers * amount;

    setLoading(true);

    try {
      // 2. Upload Image using your Util
      const imageFile = data.task_image[0];
      const task_image_url = await uploadImage(imageFile);

      // 3. Prepare the Final Object
      const taskData = {
        task_title: data.task_title,
        task_detail: data.task_detail,
        required_workers: parseInt(data.required_workers),
        payable_amount: parseFloat(data.payable_amount),
        total_payable_amount: total_payable_amount,
        completion_date: data.completion_date,
        submission_info: data.submission_info,
        task_image_url: task_image_url,
        buyer: {
          email: user?.email,
          name: user?.displayName,
          image: user?.photoURL
        }
      };

      await axiosSecure.post('/tasks', taskData);

      toast.success("Task Added Successfully!");
      reset(); 
      
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.response?.data?.message || "Error adding task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto my-10 shadow-lg">
      <Toaster position="top-center" richColors />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="task_title">Task Title</Label>
            <Input 
              {...register("task_title", { required: "Title is required" })} 
              id="task_title" 
              placeholder="ex: watch my YouTube video and make a comment" 
            />
            {errors.task_title && <span className="text-red-500 text-sm">{errors.task_title.message}</span>}
          </div>

          {/* Task Detail */}
          <div className="space-y-2">
            <Label htmlFor="task_detail">Task Detail</Label>
            <Textarea 
              {...register("task_detail", { required: "Detailed description is required" })} 
              id="task_detail" 
              placeholder="Provide step-by-step instructions..."
              className="min-h-25"
            />
            {errors.task_detail && <span className="text-red-500 text-sm">{errors.task_detail.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Required Workers */}
            <div className="space-y-2">
              <Label htmlFor="required_workers">Required Workers</Label>
              <Input 
                {...register("required_workers", { required: true, min: 1 })}
                id="required_workers" 
                type="number" 
                placeholder="ex: 100"
              />
            </div>
            {/* Payable Amount */}
            <div className="space-y-2">
              <Label htmlFor="payable_amount">Payable Amount (Per Worker)</Label>
              <Input 
                {...register("payable_amount", { required: true, min: 0.01 })}
                id="payable_amount" 
                type="number" 
                step="0.01" 
                placeholder="ex: 10"
              />
            </div>
          </div>

        

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Completion Date */}
            <div className="space-y-2">
              <Label htmlFor="completion_date">Completion Date</Label>
              <Input 
                {...register("completion_date", { required: "Date is required" })} 
                id="completion_date" 
                type="date" 
              />
            </div>
            
            {/* Task Image */}
            <div className="space-y-2">
              <Label htmlFor="task_image">Task Image</Label>
              <Input 
                {...register("task_image", { required: "Image is required" })}
                id="task_image" 
                type="file" 
                accept="image/*" 
              />
              {errors.task_image && <span className="text-red-500 text-sm">{errors.task_image.message}</span>}
            </div>
          </div>

          {/* Submission Info */}
          <div className="space-y-2">
            <Label htmlFor="submission_info">Submission Info</Label>
            <Input 
              {...register("submission_info", { required: "Proof requirements are required" })} 
              id="submission_info" 
              placeholder="ex: screenshot of the comment and username" 
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing Task..." : "Add Task"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
};

export default AddTaskForm;