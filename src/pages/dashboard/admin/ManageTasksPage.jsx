import React, { useState } from 'react';
import { toast, Toaster } from "sonner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import ManageTasksTable from "@/components/features/dashboard/admin/ManageTasksTable";

const ManageTasksPage = () => {
  const [tasks, setTasks] = useState([
    {
      _id: "T-8801",
      task_title: "Watch YouTube Video & Comment",
      buyer_name: "John Marketing",
      buyer_email: "john@agency.com",
      required_workers: 50,
      payable_amount: 0.80,
      completion_date: "2026-02-15"
    },
    {
      _id: "T-8802",
      task_title: "Facebook Page Like & Follow",
      buyer_name: "Tech Startups",
      buyer_email: "info@tech.io",
      required_workers: 200,
      payable_amount: 0.20,
      completion_date: "2026-02-10"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Cleaned up Delete Handler
  const handleDeleteTask = (taskId) => {
    // 1. In real app: axios.delete(`/api/admin/tasks/${taskId}`)
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    
    // 2. Success Feedback
    toast.error("Task has been removed from the database.");
  };

  const filteredTasks = tasks.filter(task => 
    task.task_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.buyer_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <Toaster position="top-center" richColors closeButton />
      
      <DashboardSectionHeader title="Manage All Tasks" />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center my-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title or buyer email..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm font-medium text-muted-foreground bg-slate-100 px-3 py-1 rounded-full">
          Total Tasks: {tasks.length}
        </div>
      </div>

      <div className="bg-white rounded-md border shadow-sm overflow-hidden">
        <ManageTasksTable 
          tasks={filteredTasks} 
          onDelete={handleDeleteTask} 
        />
      </div>
    </section>
  );
};

export default ManageTasksPage;