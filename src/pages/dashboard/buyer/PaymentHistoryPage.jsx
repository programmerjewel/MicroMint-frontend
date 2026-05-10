import PaymentHistoryTable from "@/components/features/dashboard/buyer/PaymentHistoryTable";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";

const PaymentHistoryPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["buyer-payouts", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {

      // Fetching payouts to workers 
      const { data } = await axiosSecure.get(`/buyer-payments/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading/>
  return (
    <section>
      <DashboardSectionHeader title="Worker Payout History" />
      <div className="mt-6">
        <PaymentHistoryTable payments={payments} />
      </div>
    </section>
  );
};

export default PaymentHistoryPage;