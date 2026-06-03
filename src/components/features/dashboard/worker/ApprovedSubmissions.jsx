import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SubmissionTable from "./SubmissionTable";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/Loading";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";

const ApprovedSubmissions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  // Pagination State Setup
  const [page, setPage] = useState(1);
  const limit = 6;

  // Fetch paginated submitted-task data
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["submissions", user?.email, "approved", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submitted-task/${user?.email}?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    placeholderData: (prevData) => prevData, // Holds UI smooth while navigating
    enabled: !!user?.email,
  });

  // Extract the inner data arrays and objects safely
  const rawSubmissions = data?.submissions || [];
  const meta = data?.meta || { totalSubmissions: 0, totalPages: 1, currentPage: 1 };

  if (isLoading && !isPlaceholderData) {
    return <Loading variant="fullscreen" text="Fetching tasks..." size="xl" />;
  }

  // Filter for approved tasks locally from the chunk response
  const approvedSubmissions = rawSubmissions.filter(
    (sub) => sub.status?.toLowerCase() === "approved"
  );

  return (
    <section className="space-y-6">
      <h2 className="font-semibold text-xl mt-6">Approved Submissions</h2>
      
      <div>
        {approvedSubmissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-2xl bg-muted/10">
            <CheckCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No approved submissions yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your approved submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Submission Render Table */}
            <SubmissionTable submissions={approvedSubmissions} />

            {/* Pagination Segment Viewport */}
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

export default ApprovedSubmissions;