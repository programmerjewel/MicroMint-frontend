import { toast, Toaster } from "sonner";
import BuyerStats from "@/components/features/dashboard/buyer/BuyerStats";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import PendingSubmissionTable from "@/components/features/dashboard/buyer/PendingSubmissionTable";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";

const BuyerHomePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["buyer-pending-submissions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/submitted-task/buyer/${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  const { mutate: reviewSubmission } = useMutation({
    mutationFn: async ({ id, action }) =>
      axiosSecure.patch(`/submitted-task/${id}/review`, { action }),
    onSuccess: (_, { action, workerEmail, amount }) => {
      queryClient.invalidateQueries(["buyer-pending-submissions", user?.email]);
      if (action === "approved") {
        toast.success(`Approved! $${amount} coins sent to ${workerEmail}`);
      } else {
        toast.error("Submission rejected. Task slot reopened.");
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Action failed");
    },
  });

  const handleApprove = (submissionId, workerEmail) => {
    reviewSubmission({ id: submissionId, action: "approved", workerEmail});
  };

  const handleReject = (submissionId, taskId) => {
    reviewSubmission({ id: submissionId, action: "rejected", taskId });
  };

  if (isLoading)
    return <Loading variant="fullscreen" text="Loading submissions..." size="xl" />;

  return (
    <section>
      <Toaster position="top-center" richColors />
      <DashboardSectionHeader title="Buyer Dashboard" />
      <BuyerStats />
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold my-4">Submissions to Review</h2>
          <span className="text-sm text-muted-foreground">
            {submissions.length} pending reviews
          </span>
        </div>
        <PendingSubmissionTable
          submissions={submissions}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </section>
  );
};

export default BuyerHomePage;