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
  Mail,
  Info,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { LiaCoinsSolid } from "react-icons/lia";

const isDatePassed = (dateStr) => {
  if (!dateStr) return false;
  const today = new Date().toISOString().slice(0, 10);
  const deadline = dateStr.slice(0, 10);
  return today > deadline;
};

const buildConfig = ({
  status,
  isDeadlinePassed,
  isTaskFull,
  isSubmitting,
  user,
  completionDate,
}) => {
  const isApproved = status === "approved";
  const isPending = status === "pending";
  const isRejected = status === "rejected";
  const isInReview = status === "in_review"; // Added state reference

  let banner = null;

  if (isApproved) {
    banner = {
      classes:
        "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50 text-green-800 dark:text-green-300",
      icon: (
        <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600 dark:text-green-400" />
      ),
      message: "Great job! This task has been approved and paid.",
    };
  } else if (isPending) {
    banner = {
      classes:
        "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50 text-blue-800 dark:text-blue-300",
      icon: (
        <Clock className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
      ),
      message: "Your work is being reviewed by the buyer.",
    };
  } else if (isInReview) {
    // New Amber Banner for Revisions
    banner = {
      classes:
        "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300",
      icon: (
        <RefreshCw className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 animate-spin-slow" />
      ),
      message: "The buyer requested a revision. Please modify your proof below and submit again.",
    };
  } else if (isRejected) {
    banner = {
      classes:
        "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300",
      icon: (
        <XCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
      ),
      message: "Your previous submission was rejected. You can resubmit below.",
    };
  } else if (isDeadlinePassed) {
    banner = {
      classes:
        "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300",
      icon: (
        <XCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
      ),
      message: `This task is no longer accepting submissions. The deadline was ${completionDate}.`,
    };
  }

  let title, description;

  if (isApproved) {
    title = "Work Approved";
    description = "This task is completed. Check your dashboard for earnings.";
  } else if (isPending) {
    title = "Review Pending";
    description = "The buyer is currently reviewing your proof.";
  } else if (isInReview) {
    title = "Revision Requested";
    description = "Update your documentation adjustments and send back.";
  } else if (isRejected) {
    title = "Resubmit Work";
    description = "Please address the buyer's concerns and submit again.";
  } else if (isDeadlinePassed) {
    title = "Deadline Passed";
    description = "The deadline for this task has expired.";
  } else if (isTaskFull) {
    title = "Submit Work";
    description = "No slots available for new workers.";
  } else {
    title = "Submit Work";
    description = "Provide the proof requested by the buyer to get paid.";
  }

  let buttonLabel;

  if (isSubmitting) buttonLabel = "Processing...";
  else if (isApproved) buttonLabel = "Paid & Completed ✓";
  else if (isPending) buttonLabel = "Waiting for Approval";
  else if (isDeadlinePassed) buttonLabel = "Deadline Expired";
  else if (isInReview) buttonLabel = "Submit Revision"; // Custom label for in_review
  else if (isRejected) buttonLabel = "Resubmit Task";
  else if (isTaskFull) buttonLabel = "Task Limit Reached";
  else if (!user) buttonLabel = "Login to Start Earning";
  else buttonLabel = "Submit Task";

  // CRITICAL: Ensure `in_review` and `rejected` states are NOT blocked 
  // so workers can interact with the input form field.
  const isBlocked =
    isPending || isApproved || (isTaskFull && !isRejected && !isInReview) || isDeadlinePassed;

  return {
    banner,
    title,
    description,
    buttonLabel,
    isBlocked,
    isApproved,
    isPending,
    isInReview,
  };
};

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

  const {
    data: task,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return <Loading variant="fullscreen" text="Fetching task..." size="xl" />;
  if (!task)
    return (
      <div className="text-center py-20 text-muted-foreground">
        Task not found
      </div>
    );

  const status = task?.submissionStatus;
  const isDeadlinePassed = isDatePassed(task.completion_date);
  const isTaskFull = task.required_workers === 0;

  const { banner, title, description, buttonLabel, isBlocked, isApproved, isInReview } =
    buildConfig({
      status,
      isDeadlinePassed,
      isTaskFull,
      isSubmitting,
      user,
      completionDate: task.completion_date,
    });

  const onFormSubmit = async (formData) => {
    if (!user?.email) {
      toast.error("Please log in to submit a task");
      return;
    }
    setIsSubmitting(true);

    const submittedTaskData = {
      task_id: task._id,
      submission_details: formData.submission_details,
      worker_email: user.email,
      worker_name: user.displayName,
    };

    try {
      await axiosSecure.post("/submitted-task", submittedTaskData);
      
      // Dynamic success messages
      if (status === "in_review") {
        toast.success("Revision submitted successfully!");
      } else if (status === "rejected") {
        toast.success("Resubmitted successfully!");
      } else {
        toast.success("Task submitted successfully!");
      }
      
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

  return (
    <section className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500 text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Left: Task Details ── */}
        <div className="lg:col-span-2 space-y-8">
          {task.task_image_url && (
            <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
              <img
                src={task.task_image_url}
                alt={task.task_title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/800x400/27272a/a1a1aa?text=No+Image";
                }}
              />
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100">
                {task.task_title}
              </h1>
              <Badge className="text-sm px-3 py-1 shrink-0" variant="amber">
                <LiaCoinsSolid className="w-5 h-5 mr-1" />
                {task.payable_amount}
              </Badge>
            </div>

            {/* Single consolidated status/deadline banner */}
            {banner && (
              <div
                className={`p-4 rounded-lg border flex items-center gap-3 ${banner.classes}`}
              >
                {banner.icon}
                <p className="text-sm font-medium">{banner.message}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 divide-x divide-border border border-border rounded-xl overflow-hidden">
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
                icon: <LiaCoinsSolid className="w-5 h-5" />,
                label: "Budget",
                value: `${task.total_payable_amount}`,
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-1 py-4 px-2 bg-muted/30 dark:bg-muted/10"
              >
                <span className="text-brand-primary dark:text-brand-secondary">{icon}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="font-semibold text-sm text-center text-slate-800 dark:text-slate-200">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {task.task_detail}
          </p>

          <div className="bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/30 rounded-md p-4 space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Submission Instructions
            </p>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {task.submission_info}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <Avatar className="border border-border">
              <AvatarImage src={task.buyer?.image} alt={task.buyer?.name} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {task.buyer?.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold leading-none text-slate-900 dark:text-slate-100">
                {task.buyer?.name}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1 italic">
                <Mail className="w-3.5 h-3.5" /> {task.buyer?.email}
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Submission Form ── */}
        <aside className="lg:col-span-1">
          <Card className="sticky top-24 shadow-xl border border-border dark:border-slate-800 bg-card text-card-foreground">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                {title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {description}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onFormSubmit)}>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste links, text proof, or details here..."
                  disabled={isBlocked || !user}
                  className={`min-h-40 resize-none transition-all border-muted-foreground/20 dark:border-slate-800 ${
                    isBlocked
                      ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                      : "focus:ring-2 bg-background text-foreground"
                  }`}
                  {...register("submission_details", {
                    required: "Submission details are required",
                    minLength: {
                      value: 10,
                      message: "Provide more detail (min 10 characters)",
                    },
                  })}
                />
                {errors.submission_details && !isBlocked && (
                  <p className="text-destructive text-xs font-medium flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {errors.submission_details.message}
                  </p>
                )}
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className={`w-full mt-4 text-white font-medium ${
                    isApproved
                      ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                      : isInReview
                      ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600" // Custom color theme for revisions
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                  variant={isBlocked ? "secondary" : "default"}
                  disabled={isSubmitting || !user || isBlocked}
                >
                  {buttonLabel}
                </Button>

                {status && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-border bg-transparent hover:bg-muted text-foreground"
                  >
                    <Link to="/dashboard/my-submissions">
                      View in Dashboard
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