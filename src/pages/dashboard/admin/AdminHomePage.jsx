import { useState } from 'react';
import { toast, Toaster } from "sonner";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import WithdrawRequestTable from '@/components/features/dashboard/admin/WithdrawRequestTable';

const AdminHome = () => {
  // Dummy Withdrawal Data
  const [withdrawRequests, setWithdrawRequests] = useState([
    {
      _id: "w_01",
      worker_name: "Mahmud Hasan",
      worker_email: "mahmud@worker.com",
      withdrawal_coin: 1000,
      withdrawal_amount: 10.00,
      payment_system: "bKash",
      account_number: "01700000000",
      status: "pending"
    },
    {
      _id: "w_02",
      worker_name: "Sarah Sky",
      worker_email: "sarah@worker.com",
      withdrawal_coin: 500,
      withdrawal_amount: 5.00,
      payment_system: "Nagad",
      account_number: "01800000000",
      status: "pending"
    }
  ]);

  const handleApproveWithdrawal = (request) => {
    // 1. UPDATE LOGIC:
    // In your real app, you would:
    // axios.patch(`/withdraw/approve/${request._id}`, { email: request.worker_email, coins: request.withdrawal_coin })

    // 2. UI Update: Remove from the pending list
    setWithdrawRequests(prev => prev.filter(r => r._id !== request._id));

    toast.success(`Payment Success!`, {
      description: `Deducted ${request.withdrawal_coin} coins from ${request.worker_name}.`
    });
  };

  return (
    <section className="space-y-8">
      <Toaster position="top-center" richColors />
      
      <DashboardSectionHeader title="Admin Dashboard" />

      {/* Overview Cards (AdminStats) should go here */}

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-slate-800">Pending Withdrawals</h2>
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
            {withdrawRequests.length} Requests
          </span>
        </div>

        <WithdrawRequestTable
          requests={withdrawRequests} 
          onPaymentSuccess={handleApproveWithdrawal} 
        />
      </div>
    </section>
  );
};

export default AdminHome;