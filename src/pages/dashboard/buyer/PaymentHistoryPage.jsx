import PaymentHistoryTable from "@/components/features/dashboard/buyer/PaymentHistoryTable";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";


const PaymentHistoryPage = () => {
  const dummyPayments = [
    {
      transactionId: "TXN-8K2L9P1X",
      coinsAdded: 150,
      amount: 10.00,
      date: "2024-05-20T10:30:00Z"
    },
    {
      transactionId: "TXN-3M5N7Q2W",
      coinsAdded: 500,
      amount: 20.00,
      date: "2024-05-18T14:15:00Z"
    }
  ];
  return (
  <section>
    <DashboardSectionHeader title='Payment History'/>
    <PaymentHistoryTable payments={dummyPayments} />
  </section>
  );
};

export default PaymentHistoryPage;