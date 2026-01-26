import TotalEarnings from "@/components/features/dashboard/worker/TotalEarnings";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import WithdrawlForm from "@/components/features/dashboard/worker/WithdrawalForm";


const WorkerWithdrawalPage = () => {
   // DUMMY DATA - Replace with API data later
  const dummyUser = {
    name: "Tariqul Islam",
    email: "tariqul@example.com",
    totalCoins: 300, 
  };

  const handleWithdrawalRequest = (formData) => {
    const finalPayload = {
      ...formData,
      worker_email: dummyUser.email,
      worker_name: dummyUser.name,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };

    console.log("Ready to send to backend:", finalPayload);
    alert("Withdrawal submitted successfully!");
  };
  return (
    <section>
      <DashboardSectionHeader title='Withdrawals'/>
      {/* Component 1 */}
      <TotalEarnings coins={dummyUser.totalCoins} />

      {/* Component 2 */}
      <Card className="mt-8">
        <CardTitle><CardContent><h3>Withdrawal Form</h3></CardContent></CardTitle>
        <CardContent className="">
          <WithdrawlForm 
            userTotalCoins={dummyUser.totalCoins} 
            onWithdraw={handleWithdrawalRequest} 
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default WorkerWithdrawalPage;