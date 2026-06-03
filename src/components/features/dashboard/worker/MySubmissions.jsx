import { useState } from "react";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import SubmissionTable from "./SubmissionTable";
import useAuth from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";
import { toast } from "sonner";
import { BiCheckCircle } from "react-icons/bi";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MySubmissions = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  
  // Pagination State Configurations
  const [page, setPage] = useState(1);
  const limit = 6;

  // Fetch paginated submitted-task data
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["submissions", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submitted-task/${user?.email}?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    placeholderData: (prevData) => prevData, // Prevents layout snapping during loads
    enabled: !!user?.email,
  });

  // Handle submit cancellation
  const { mutateAsync: cancelSubmission } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/submitted-task/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["submissions", user?.email]);
      toast.success("Submission cancelled successfully");
    },
  });

  const submissions = data?.submissions || [];
  const meta = data?.meta || { totalSubmissions: 0, totalPages: 1, currentPage: 1 };

  if (isLoading && !isPlaceholderData) {
    return <Loading variant="fullscreen" text="Fetching tasks..." size="xl" />;
  }

  return (
    <section className="space-y-6">
      <DashboardSectionHeader title="Worker Submissions" />
      
      <div>
        {submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-2xl bg-muted/10">
            <BiCheckCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No submissions found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your submissions will appear here once you take on assignments.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* The Submissions Table Viewport */}
            <SubmissionTable submissions={submissions} onCancel={cancelSubmission} />

            {/* Pagination Controls Footer UI */}
            {meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  disabled={page === 1}
                  className="gap-1 disabled:cursor-not-allowed dark:border-slate-800"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </Button>

                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Page <span className="text-foreground font-bold">{meta.currentPage}</span> of{" "}
                  <span className="text-foreground font-bold">{meta.totalPages}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!isPlaceholderData && page < meta.totalPages) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={page >= meta.totalPages || isPlaceholderData}
                  className="gap-1 disabled:cursor-not-allowed dark:border-slate-800"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MySubmissions;