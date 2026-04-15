import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Users, DollarSign, Mail, Info } from "lucide-react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TaskDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { submission_details: "" },
  });

  const { data: task, isLoading, refetch } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`,
      );
      return data;
    },
    enabled: !!id,
  });
  // console.log(task)
  const onFormSubmit = async (formData) => {
    if (!user?.email) {
      toast.error("Please log in to submit a task");
      return;
    }
    setIsSubmitting(true);

    const submittedTaskData = {
      task_id: task._id,
      submission_details: formData.submission_details,
      worker_email: user?.email,
      worker_name: user?.displayName,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/submitted-task`, submittedTaskData);
      toast.success("Task submitted successfully!");
      refetch();
      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit work. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return <Loading variant="fullscreen" text="Fetching task..." size="xl" />;

  return (
    <section className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Left: Task Details ── */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          {task.task_image_url && (
            <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
              <img
                src={task.task_image_url}
                alt={task.task_title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x400";
                }}
              />
            </div>
          )}

          {/* Title & Meta */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold leading-tight">
                {task.task_title}
              </h1>
              <Badge className="text-sm px-3 py-1 shrink-0 bg-primary text-primary-foreground">
                ${task.payable_amount}
              </Badge>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 divide-x divide-border border rounded-xl overflow-hidden">
            {[
              {
                icon: <Users className="w-4 h-4" />,
                label: "Workers",
                value: task.required_workers,
              },
              {
                icon: <CalendarIcon className="w-4 h-4" />,
                label: "Deadline",
                value: task.completion_date,
              },
              {
                icon: <DollarSign className="w-4 h-4" />,
                label: "Budget",
                value: `$${task.total_payable_amount}`,
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-1 py-4 px-2 bg-muted/30"
              >
                <span className="text-primary">{icon}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="font-semibold text-sm text-center">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {task.task_detail}
          </p>

          {/* Submission Instructions */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-4 space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Submission Instructions
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {task.submission_info}
            </p>
          </div>

          {/* Buyer Info — flat row, no card */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <Avatar>
              <AvatarImage
                src={task.buyer?.image}
                alt={task.buyer?.image}
              />
              <AvatarFallback>
                {task.buyer.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold leading-none">{task.buyer.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1 italic">
                <Mail className="w-3.5 h-3.5" /> {task.buyer.email}
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Submission Form (single card) ── */}
        <aside className="lg:col-span-1">
          <Card className="sticky top-24 shadow-xl ring-1 ring-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Submit Your Proof</CardTitle>
              <CardDescription>
                Enter links or details requested by the buyer.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onFormSubmit)}>
              <CardContent className="my-4">
                <Textarea
                  placeholder="Paste your work proof here..."
                  className={`min-h-50 resize-none ${errors.submission_details ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  {...register("submission_details", {
                    required: "Submission details are required",
                    minLength: {
                      value: 10,
                      message: "Please provide more detail (min 10 chars)",
                    },
                  })}
                />
                {errors.submission_details && (
                  <p className="text-destructive text-sm mt-1.5 flex items-center gap-1">
                    <Info className="w-3 h-3 shrink-0" />
                    {errors.submission_details.message}
                  </p>
                )}
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full font-semibold"
                  disabled={isSubmitting || !user}
                >
                  {isSubmitting
                    ? "Processing..."
                    : !user
                      ? "Login to Submit"
                      : "Submit Task"}
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
