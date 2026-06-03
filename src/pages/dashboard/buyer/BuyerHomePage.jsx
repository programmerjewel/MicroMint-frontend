import { toast, Toaster } from "sonner";
import BuyerStats from "@/components/features/dashboard/buyer/BuyerStats";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import PendingSubmissionTable from "@/components/features/dashboard/buyer/PendingSubmissionTable";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";
import { Badge } from "@/components/ui/badge";

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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["buyer-pending-submissions", user?.email] });
      
      if (variables.action === "approved") {
        toast.success(`Approved! ${variables.amount.toFixed(2)} coins sent to ${variables.workerEmail}`);
      } else if (variables.action === "in_review") {
        toast.warning("Revision requested. Task returned to worker."); 
      } else {
        toast.error("Submission rejected. Task slot reopened.");
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Action failed");
    },
  });

  const handleApprove = (submissionId, workerEmail, amount) => {
    reviewSubmission({ id: submissionId, action: "approved", workerEmail, amount });
  };

  const handleReject = (submissionId) => {
    reviewSubmission({ id: submissionId, action: "rejected" });
  };

  const handleRevision = (submissionId) => {
    reviewSubmission({ id: submissionId, action: "in_review" });
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
          <Badge variant="amber">
            {submissions.length} Action Required
          </Badge>
        </div>
        <PendingSubmissionTable
          submissions={submissions}
          onApprove={handleApprove}
          onReject={handleReject}
          onRevision={handleRevision}
        />
      </div>
    </section>
  );
};

export default BuyerHomePage;