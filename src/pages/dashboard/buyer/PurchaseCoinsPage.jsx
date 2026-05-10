import PurchaseCoin from '@/components/features/dashboard/buyer/PurchaseCoin';
import DashboardSectionHeader from '@/components/ui/dashboard-section-header';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Loading from '@/components/shared/Loading';

const PurchaseCoinsPage = () => {
  const axiosSecure = useAxiosSecure();

  // 1. Fetch Purchase Quota Stats (Limits and Usage)
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['purchaseStats'],
    queryFn: async () => (await axiosSecure.get('/user-purchase-stats')).data,
  });

  // 2. Fetch Package Data
  const { data: packages = [], isLoading: pkgsLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => (await axiosSecure.get('/packages')).data,
  });

  const isLoading = statsLoading || pkgsLoading;

  return (
    <section>
      <DashboardSectionHeader title="Purchase Coins" />
      
      {isLoading ?
      <Loading/>
       : (
        <PurchaseCoin stats={stats} packages={packages} />
      )}
    </section>
  );
};

export default PurchaseCoinsPage;