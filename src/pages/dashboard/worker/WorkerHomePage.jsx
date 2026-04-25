import ApprovedSubmissions from '@/components/features/dashboard/worker/ApprovedSubmissions';
import WorkerStats, { WorkerStatsSkeleton } from '@/components/features/dashboard/worker/workerStats';
import DashboardSectionHeader from '@/components/ui/dashboard-section-header';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const WorkerHomePage = () => {
  const {user} = useAuth();
  const axiosSecure= useAxiosSecure();
  const {data: stats = [], isLoading} = useQuery({
    queryKey: ["worker-stats", user?.email],
    queryFn: async ()=> {
      const {data} = await axiosSecure.get(`/worker-stats/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  })

  console.log(stats);

  return (
    <section className="space-y-6">
    <DashboardSectionHeader title="Worker Home" />
    
    {isLoading ? (
      <WorkerStatsSkeleton />
    ) : (
      <WorkerStats stats={stats} />
    )}
    
    <ApprovedSubmissions />
  </section>
  );
};

export default WorkerHomePage;