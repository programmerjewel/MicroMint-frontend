import { useState } from 'react';
import { toast, Toaster } from "sonner"; 
import AddedTaskTable from '@/components/features/dashboard/buyer/AddedTaskTable';
import BuyerStats from '@/components/features/dashboard/buyer/BuyerStats';
import DashboardSectionHeader from '@/components/ui/dashboard-section-header';

const BuyerHomePage = () => {
 

  // Dummy Data for Table
  const [data, setData] = useState([
    {
      _id: "s1",
      task_id: "t101",
      worker_name: "Alice Johnson",
      worker_email: "alice@example.com",
      task_title: "Logo Design Feedback",
      payable_amount: 5.00,
      submission_details: "I have reviewed the logo and provided three variations in the attached drive link. The color palette was adjusted to hex #34521."
    },
    {
      _id: "s2",
      task_id: "t102",
      worker_name: "Bob Smith",
      worker_email: "bob@example.com",
      task_title: "Data Entry - Spreadsheet",
      payable_amount: 12.50,
      submission_details: "Completed 500 entries of the product catalog. Verified all SKUs against the master list."
    },
    {
      _id: "s3",
      task_id: "t101",
      worker_name: "Charlie Brown",
      worker_email: "charlie@example.com",
      task_title: "Logo Design Feedback",
      payable_amount: 5.00,
      submission_details: "The design looks clean, but I suggest increasing the font size of the tagline by 2px."
    }
  ]);

  // Handlers with UI feedback
  const handleApprove = (submissionId, workerEmail, amount) => {
    // Simulating API Success
    toast.success(`Approved! $${amount} sent to ${workerEmail}`);
    setData(prev => prev.filter(item => item._id !== submissionId));
  };

  const handleReject = (submissionId, taskId) => {
    console.log("Rejecting submission for Task ID:", taskId);
    // Simulating API Success
    toast.error("Submission rejected. Task slot reopened.");
    setData(prev => prev.filter(item => item._id !== submissionId));
  };

  return (
    <section>
      {/* Toast provider for notifications */}
      <Toaster position="top-center" richColors />
      <DashboardSectionHeader title="Buyer Dashboard"/>
      <BuyerStats />
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold my-4">Submissions to Review</h2>
          <span className="text-sm text-muted-foreground">
            {data.length} pending reviews
          </span>
        </div>
        
        <AddedTaskTable 
          submissions={data} 
          onApprove={handleApprove} 
          onReject={handleReject} 
        />
      </div>
    </section>
  );
};

export default BuyerHomePage;