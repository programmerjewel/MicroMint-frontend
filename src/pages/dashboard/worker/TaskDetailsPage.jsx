import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
import {
  CalendarIcon,
  Users,
  DollarSign,
  Mail,
  Info,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const TaskDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`
      );
      return data;
    },
    enabled: !!id,
  });

  // Derived state from backend response
  const isTaskFull = task?.required_workers === 0;
  const hasAlreadySubmitted = task?.hasSubmitted; // comes directly from backend

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
      await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/submitted-task`,
        submittedTaskData
      );
      toast.success("Task submitted successfully!");
      refetch(); // re-fetches task — hasSubmitted will now be true
      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit work. Please try again."
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

          {/* Buyer Info */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <Avatar>
              <AvatarImage src={task.buyer?.image} alt={task.buyer?.name} />
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

        {/* ── Right: Submission Form ── */}
        <aside className="lg:col-span-1">
          <Card
            className={'sticky top-24 shadow-2xl'}
          >
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                {hasAlreadySubmitted && (
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                )}
                {hasAlreadySubmitted ? "Task Submitted" : "Submit Proof"}
              </CardTitle>
              <CardDescription>
                {hasAlreadySubmitted
                  ? "You have already submitted this task. Track your task status and earnings in the dashboard."
                  : isTaskFull
                  ? "This task has reached its maximum number of workers."
                  : "Carefully provide the proof requested to ensure approval od submitted."}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onFormSubmit)}>
              <CardContent className="my-4">
                <Textarea
                  placeholder="Paste your work proof here..."
                  disabled={hasAlreadySubmitted || isTaskFull || !user}
                  className={`min-h-50 resize-none ${
                    hasAlreadySubmitted ? "bg-muted/50 grayscale-50" : ""
                  }`}
                  {...register("submission_details", {
                    required: "Submission details are required",
                    minLength: {
                      value: 10,
                      message: "Please provide more detail (min 10 chars)",
                    },
                  })}
                />
                {errors.submission_details && !hasAlreadySubmitted && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1.5">
                    <Info className="w-3 h-3 shrink-0" />
                    {errors.submission_details.message}
                  </p>
                )}
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full"
                  variant={hasAlreadySubmitted ? "secondary" : "default"}
                  disabled={
                    isSubmitting || !user || hasAlreadySubmitted || isTaskFull
                  }
                >
                  {isSubmitting
                    ? "Submitting..."
                    : hasAlreadySubmitted
                    ? "Completed ✓"
                    : isTaskFull
                    ? "Task Full"
                    : !user
                    ? "Login to Work"
                    : "Submit Task"}
                </Button>

                {hasAlreadySubmitted && (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard/my-submissions">
                      View My Submissions
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </aside>
      </div>
    </section>
  );
};

export default TaskDetailsPage;