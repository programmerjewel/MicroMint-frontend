import PurchaseCoin from "@/components/features/dashboard/buyer/PurchaseCoin";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "@/components/shared/Loading";

const PurchaseCoinsPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["purchaseStats"],
    queryFn: async () =>
      (await axiosSecure.get("/user-purchase-stats")).data,
  });

  const { data: packages = [], isLoading: packagesLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () =>
      (await axiosSecure.get("/packages")).data,
  });

  const isLoading = statsLoading || packagesLoading;

  return (
    <section>
      <DashboardSectionHeader title="Purchase Coins" />

      {isLoading ? (
        <Loading />
      ) : (
        <PurchaseCoin
          stats={stats}
          packages={packages}
        />
      )}
    </section>
  );
};

export default PurchaseCoinsPage;