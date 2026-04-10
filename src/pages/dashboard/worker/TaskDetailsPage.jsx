import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'; // ✅ ADD THIS IMPORT
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Users, DollarSign, User, Mail, ClipboardCheck, Info } from "lucide-react";
import { toast } from "sonner";
import useAuth from '@/hooks/useAuth';
import Loading from '@/components/shared/Loading';

// ✅ Simple ErrorState component (or import your own)
const ErrorState = ({ message = "Failed to load task" }) => (
  <div className="flex flex-col items-center justify-center min-h-100 text-center p-6">
    <Info className="w-12 h-12 text-destructive mb-4" />
    <h3 className="text-xl font-semibold mb-2">Oops! Something went wrong</h3>
    <p className="text-muted-foreground mb-4">{message}</p>
    <Button onClick={() => window.location.reload()}>Try Again</Button>
  </div>
);

const TaskDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Initialize react-hook-form
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm({
    defaultValues: {
      submission_details: ""
    }
  });

  // Fetch Task Data
  const { data: task, isLoading, isError } = useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
      return data;
    },
    enabled: !!id,
  });

  // ✅ Fixed: onFormSubmit receives data from react-hook-form automatically
  const onFormSubmit = async (formData) => {
    if (!user?.email) {
      toast.error("Please log in to submit a task");
      return;
    }

    setIsSubmitting(true);
    
    const payload = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user.email,
      worker_name: user.displayName || "Anonymous",
      submission_details: formData.submission_details,
      Buyer_name: task.buyer.name,
      Buyer_email: task.buyer.email,
      current_date: new Date().toISOString().split('T')[0],
      status: "pending"
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/submissions`, payload);
      toast.success("Task submitted successfully!");
      reset(); // ✅ Clears form
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Failed to submit work. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Loading state
  if (isLoading) return <Loading variant="fullscreen" text="Fetching task..." size="xl" />;
  
  // ✅ Error state with proper component
  if (isError || !task) return <ErrorState message={isError ? "Could not fetch task data" : "Task not found"} />;

  // ✅ Helper component for stats (defined inside or extract to separate file)
  const StatBox = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );

  return (
    <section className="container mx-auto p-6 max-w-6xl animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Task Information */}
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden border-none shadow-xl bg-card">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              {task.task_image_url ? (
                <img 
                  src={task.task_image_url} 
                  alt={task.task_title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-3xl font-bold tracking-tight">{task.task_title}</CardTitle>
                  <CardDescription className="text-lg">
                    Posted by <span className="font-semibold text-foreground">{task.buyer.name}</span>
                  </CardDescription>
                </div>
                <Badge className="text-xl px-4 py-1.5 bg-primary text-primary-foreground shrink-0">
                  ${task.payable_amount}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <ClipboardCheck className="w-6 h-6 text-primary" /> Task Description
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {task.task_detail}
                </p>
              </section>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-y border-border/50">
                <StatBox icon={<Users />} label="Required" value={`${task.required_workers} Workers`} />
                <StatBox icon={<CalendarIcon />} label="Deadline" value={task.completion_date} />
                <StatBox icon={<DollarSign />} label="Total Budget" value={`$${task.total_payable_amount}`} />
              </div>

              <div className="bg-amber-500/10 p-5 rounded-xl border border-amber-500/20">
                <h4 className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-2 mb-2 uppercase text-xs tracking-widest">
                  Submission Instructions
                </h4>
                <p className="text-foreground leading-snug">{task.submission_info}</p>
              </div>
            </CardContent>
          </Card>

          {/* Buyer Info */}
          <Card className="border-dashed bg-muted/30">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                {task.buyer.name?.charAt(0) || "U"}
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg leading-none">{task.buyer.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 italic">
                  <Mail className="w-3.5 h-3.5" /> {task.buyer.email}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Submission Form */}
        <aside className="md:col-span-1">
          <Card className="sticky top-24 shadow-2xl ring-1 ring-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Submit Your Proof</CardTitle>
              <CardDescription>Enter links or details requested by the buyer.</CardDescription>
            </CardHeader>
            
            {/* ✅ Form wrapped with handleSubmit */}
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <CardContent>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Paste work proof here..."
                    className={`min-h-62.5 resize-none ${errors.submission_details ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...register("submission_details", { 
                      required: "Submission details are required",
                      minLength: { value: 10, message: "Please provide more detail (min 10 chars)" }
                    })}
                  />
                  {/* ✅ Display validation errors */}
                  {errors.submission_details && (
                    <p className="text-destructive text-sm font-medium flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {errors.submission_details.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold" 
                  disabled={isSubmitting || !user}
                >
                  {isSubmitting ? "Processing..." : !user ? "Login to Submit" : "Submit Task"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </aside>

      </div>
    </section>
  );
};

export default TaskDetailsPage;