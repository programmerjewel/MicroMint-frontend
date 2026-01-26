import ApprovedSubmissions from '@/components/features/dashboard/worker/ApprovedSubmissions';
import WorkerStats from '@/components/features/dashboard/worker/workerStats';
import DashboardSectionHeader from '@/components/ui/dashboard-section-header';

const WorkerHomePage = () => {
  return (
    <section>
      <DashboardSectionHeader title='Worker Home'/>
      <WorkerStats/>
      <ApprovedSubmissions/>
    </section>
  );
};

export default WorkerHomePage;