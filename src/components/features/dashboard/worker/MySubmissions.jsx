import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import SubmissionTable from "./SubmissionTable";
import useAuth from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";
import { toast } from "sonner";
import { BiCheckCircle } from "react-icons/bi";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const MySubmissions = () => {
  const {user} = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  //fetch submitted-task data 
  const { data: submissions = [], isLoading} = useQuery({
    queryKey: ['submissions', user?.email],
    queryFn: async ()=>{
      const {data} = await axiosSecure.get(`/submitted-task/${user?.email}`)
      return data
    }
  })
  console.log(submissions)

  //handle submit cancellation
  const {mutateAsync: cancelSubmission} = useMutation({
    mutationFn: async(id) =>{
      return await axiosSecure.delete(`/submitted-task/${id}`)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['submissions', user?.email]);
      toast.success("Submission cancel successfully");
    }
  })

  if(isLoading) return <Loading variant="fullscreen" text="Fetching task..." size="xl"/>

  return (
    <section>
      <DashboardSectionHeader title='Worker Submissions'/>
      <div>
        {submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <BiCheckCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No approved submissions yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your approved submissions will appear here.
            </p>
          </div>
        ) : (
          <SubmissionTable submissions={submissions} onCancel={cancelSubmission} />
        )}
      </div>
    </section>
  );
};

export default MySubmissions;