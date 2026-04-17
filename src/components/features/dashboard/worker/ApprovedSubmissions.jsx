import { useQuery } from "@tanstack/react-query";
import SubmissionTable from "./SubmissionTable";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import Loading from "@/components/shared/Loading";
import { CheckCircle } from "lucide-react";

const ApprovedSubmissions = () => {
  const {user} = useAuth();
 const { data: submissions = [], isLoading} = useQuery({
    queryKey: ['submissions', user?.email],
    queryFn: async ()=>{
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/submitted-task/${user?.email}`)
      return data
    }
  })
  console.log(submissions)
  if(isLoading) return <Loading variant="fullscreen" text="Fetching task..." size="xl"/>

  const approvedSubmissions = submissions.filter(
    (sub) => sub.status === "approved"
  );
  return (
    <section>
      <h2 className="font-semibold text-xl mt-6">Approved Submissions</h2>
      <div>
        {approvedSubmissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No approved submissions yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your approved submissions will appear here.
            </p>
          </div>
        ) : (
          <SubmissionTable submissions={approvedSubmissions} />
        )}
      </div>
    </section>
  );
};
export default ApprovedSubmissions;