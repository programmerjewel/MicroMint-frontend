
import { toast, Toaster } from "sonner";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import WithdrawRequestTable from '@/components/features/dashboard/admin/WithdrawRequestTable';
import AdminStats from '@/components/features/dashboard/admin/AdminStats';
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient(); 

  //fetch all pending withdrawals
  const { data: withdrawRequests = [], isLoading} = useQuery({
    queryKey: ["withdrawRequests"],
    queryFn: async () =>{
      const {data} = await axiosSecure.get('/admin/withdrawals');
      return data;
    }
  })


  //mutation for approval
  const approveMutation = useMutation({
    mutationFn: async ({ id, action }) =>{
      const {data} = await axiosSecure.patch(`/admin/withdraw-process/${id}`, {action});
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["withdrawRequests"]);
      toast.success(data.message || "Request processed successfully");
    },
    onError: (error) =>{
      const errorMsg = error.response?.data?.message || "Failed to process request";
    toast.error(errorMsg);
    }
  })
  const handleProcessRequest = (request, action) => {
    approveMutation.mutate({ id: request._id, action});
  };

  if(isLoading) return <Loading />

  return (
    <section className="space-y-8">
      <Toaster position="top-center" richColors />
      
      <DashboardSectionHeader title="Admin Dashboard" />

      {/* Overview Cards (AdminStats) should go here */}
      <AdminStats/>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-slate-800">Pending Withdrawals</h2>
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
            {withdrawRequests.length} Requests
          </span>
        </div>

        <WithdrawRequestTable
          requests={withdrawRequests} 
          onApprove={(req) => handleProcessRequest(req, 'approve')} 
          onReject={(req) => handleProcessRequest(req, 'reject')}
        />
      </div>
    </section>
  );
};

export default AdminHome;