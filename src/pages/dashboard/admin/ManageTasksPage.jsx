// import { useState } from 'react';
// import { toast, Toaster } from "sonner";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import ManageTasksTable from "@/components/features/dashboard/admin/ManageTasksTable";
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/shared/Loading';
import { Badge } from "@/components/ui/badge";

const ManageTasksPage = () => {
  const axiosSecure = useAxiosSecure();

  const {data: tasks = [], isLoading, isError} = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tasks');
      return res.data;
    }
  })
  console.log(tasks)

  if(isLoading) return <Loading text='Data is in progres...' size='md'/>
  if (isError) {
    return <div className="text-center text-red-500 py-10">Error loading tasks.</div>;
  }

  // const [searchQuery, setSearchQuery] = useState("");

  // Cleaned up Delete Handler
  // const handleDeleteTask = (taskId) => {
  //   // 1. In real app: axios.delete(`/api/admin/tasks/${taskId}`)
  //   setTasks((prev) => prev.filter((t) => t._id !== taskId));
    
  //   // 2. Success Feedback
  //   toast.error("Task has been removed from the database.");
  // };

  // const filteredTasks = tasks.filter(task => 
  //   task.task_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   task.buyer_email.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <section className="space-y-6">
      {/* <Toaster position="top-center" richColors closeButton /> */}
      
      <DashboardSectionHeader title="Manage All Tasks" className="" />

      <div className="flex flex-col justify-end md:flex-row items-center">
        <Badge variant="secondary">Total Tasks: {tasks.length}</Badge>
      </div>

      <div className="bg-white rounded-md border shadow-sm overflow-hidden">
        <ManageTasksTable 
          tasks={tasks} 
          // onDelete={handleDeleteTask} 
        />
      </div>
    </section>
  );
};

export default ManageTasksPage;