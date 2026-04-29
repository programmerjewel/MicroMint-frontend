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

  return (
    <section className="mt-6">
      <div className="flex justify-between items-center">
        <DashboardSectionHeader title="Manage All Tasks" className="mb-2"/>
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