import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import SubmissionTable from "./SubmissionTable";

const MySubmissions = () => {
   // Filter approved submissions for the table
    const submissions = [
  {
    _id: "1",
    task_title: "Write a product review",
    payable_amount: 5.00,
    buyer_name: "Alice Johnson",
    status: "approved",
  },
  {
    _id: "2",
    task_title: "Complete a survey",
    payable_amount: 2.50,
    buyer_name: "Bob Smith",
    status: "pending",
  },
  {
    _id: "3",
    task_title: "Test mobile application",
    payable_amount: 15.00,
    buyer_name: "Charlie Brown",
    status: "approved",
  },
  {
    _id: "4",
    task_title: "Transcribe audio file",
    payable_amount: 8.00,
    buyer_name: "Diana Ross",
    status: "rejected",
  },
  {
    _id: "5",
    task_title: "Data entry task",
    payable_amount: 3.50,
    buyer_name: "Edward Norton",
    status: "approved",
  },
  {
    _id: "6",
    task_title: "Logo feedback",
    payable_amount: 4.00,
    buyer_name: "Fiona Apple",
    status: "pending",
  },
  {
    _id: "7",
    task_title: "Website usability test",
    payable_amount: 12.00,
    buyer_name: "George Lucas",
    status: "approved",
  },
  {
    _id: "8",
    task_title: "Social media engagement",
    payable_amount: 6.00,
    buyer_name: "Hannah Montana",
    status: "pending",
  },
];
  return (
    <section>
      <DashboardSectionHeader title='Worker Submissions'/>
      <div>
        {submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No approved submissions yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your approved submissions will appear here.
            </p>
          </div>
        ) : (
          <SubmissionTable submissions={submissions} />
        )}
      </div>
    </section>
  );
};

export default MySubmissions;