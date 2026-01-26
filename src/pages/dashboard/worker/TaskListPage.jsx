import { ClipboardList } from "lucide-react";
import TasksContainer from "@/components/features/dashboard/worker/TasksContainer";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";

const TaskListPage = () => {
  const tasks = [
    {
      _id: "1",
      task_title: "Write a product review for electronics",
      buyer_name: "Alice Johnson",
      completion_date: "2025-02-15",
      payable_amount: 5.0,
      required_workers: 10,
    },
    {
      _id: "2",
      task_title: "Complete a survey about shopping habits",
      buyer_name: "Bob Smith",
      completion_date: "2025-02-10",
      payable_amount: 2.5,
      required_workers: 25,
    },
    {
      _id: "3",
      task_title: "Test mobile application and report bugs",
      buyer_name: "Charlie Brown",
      completion_date: "2025-02-20",
      payable_amount: 15.0,
      required_workers: 5,
    },
    {
      _id: "4",
      task_title: "Transcribe audio files to text",
      buyer_name: "Diana Ross",
      completion_date: "2025-02-08",
      payable_amount: 8.0,
      required_workers: 15,
    },
    {
      _id: "5",
      task_title: "Data entry for spreadsheet",
      buyer_name: "Edward Norton",
      completion_date: "2025-02-25",
      payable_amount: 3.5,
      required_workers: 20,
    },
    {
      _id: "6",
      task_title: "Social media content creation",
      buyer_name: "Fiona Apple",
      completion_date: "2025-02-12",
      payable_amount: 12.0,
      required_workers: 8,
    },
    {
      _id: "7",
      task_title: "Website usability testing",
      buyer_name: "George Lucas",
      completion_date: "2025-02-18",
      payable_amount: 10.0,
      required_workers: 12,
    },
    {
      _id: "8",
      task_title: "Logo design feedback",
      buyer_name: "Hannah Montana",
      completion_date: "2025-02-14",
      payable_amount: 4.0,
      required_workers: 30,
    },
  ];

  return (
    <section className="">
      {/* Page Header */}
      <DashboardSectionHeader title='Available Tasks'/>

      {/* Task Cards Display */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ClipboardList className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold">No tasks found</h3>
        </div>
      ) : (
        <TasksContainer tasks={tasks} />
      )}
    </section>
  );
};

export default TaskListPage;