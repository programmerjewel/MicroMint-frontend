
import AddedTasksTable from '@/components/features/dashboard/buyer/AddedTasksTable';
import DashboardSectionHeader from '@/components/ui/dashboard-section-header';
import { useState } from 'react';
import { toast } from "sonner";

const AllTasksPage = () => {
  // Dummy Data - Sorted by date descending
  const [tasks, setTasks] = useState([
    {
      _id: "t_1",
      task_title: "Social Media Engagement",
      task_detail: "Like and comment on the pinned post.",
      submission_info: "Provide screenshot of the comment.",
      payable_amount: 5,
      required_workers: 10,
      completion_date: "2026-05-20",
    },
    {
      _id: "t_2",
      task_title: "App Testing",
      task_detail: "Download and open the app for 2 mins.",
      submission_info: "Username used to register.",
      payable_amount: 50,
      required_workers: 2,
      completion_date: "2026-04-15",
    }
  ].sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date)));

  const handleUpdate = (id, updatedData) => {
    setTasks(prev => prev.map(t => t._id === id ? { ...t, ...updatedData } : t));
    toast.success("Task updated successfully");
  };

  const handleDelete = (id) => {
    const taskToDelete = tasks.find(t => t._id === id);
    if (!taskToDelete) return;

    // Logic: Calculate refill (remaining workers * amount)
    // Note: In a real app, you'd subtract 'already completed' workers from required_workers
    const refillAmount = taskToDelete.required_workers * taskToDelete.payable_amount;
    
    setTasks(prev => prev.filter(t => t._id !== id));
    
    toast.success(`Task deleted. ${refillAmount} coins refilled to your account.`);
    console.log(`Deleting ${id}. Refilling coins: ${refillAmount}`);
  };
  return (
    <section>
      <DashboardSectionHeader title='My Added Tasks'/>
      <AddedTasksTable
        tasks={tasks} 
        onUpdate={handleUpdate} 
        onDelete={handleDelete} 
      />
    </section>
  );
};

export default AllTasksPage;
