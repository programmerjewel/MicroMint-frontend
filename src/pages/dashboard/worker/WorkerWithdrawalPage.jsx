import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import WithdrawlForm from "@/components/features/dashboard/worker/WithdrawalForm";
import TotalEarnings from "@/components/features/dashboard/worker/TotalEarnings";
import useCoin from "@/hooks/useCoin";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Loading from "@/components/shared/Loading";
import WithdrawInfo from "@/components/features/dashboard/worker/WithdrawInfo";

const WorkerWithdrawalPage = () => {
  // Use your custom hook to get coins and the refetch function
  const {coins, isLoading, refetch }= useCoin();

  if (isLoading) return <Loading/>;

  return (
    <section>
      <DashboardSectionHeader title="Withdrawals" />
      
      {/* Visual representation of current balance */}
      <div className="mt-6">
        <TotalEarnings coins={coins} />
      </div>

      <Card className="mt-8">
        <CardTitle className="p-6 pb-0">
          <h3 className="text-lg font-bold">Withdrawal Form</h3>
        </CardTitle>
        <CardContent className="p-6">
          <WithdrawlForm 
            availableCoins={coins} 
            onSuccess={refetch} 
          />
        </CardContent>
      </Card>
      <WithdrawInfo/>
    </section>
  );
};

export default WorkerWithdrawalPage;