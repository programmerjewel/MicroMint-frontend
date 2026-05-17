
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import ManageTasksTable from "@/components/features/dashboard/admin/ManageTasksTable";
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '@/components/shared/Loading';
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ManageTasksPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  //fetch all added tasks
  const {data: tasks = [], isLoading, isError} = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tasks');
      return res.data;
    }
  })

  //delete tasks from database
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const {data} = await axiosSecure.delete(`/tasks/${id}`);
      return data;
    },
    onSuccess: (data) => {
      if(data.success) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("Task removed by Admin successfully.")
      }
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
      toast.error("Something went wrong while trying to delete this task.");
    }
  })

  const handleDeleteTask = async (id) => {
    return deleteMutation.mutateAsync(id)
  }

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

      <div className="rounded-md border shadow-sm overflow-hidden">
        <ManageTasksTable 
          tasks={tasks} 
          onDelete={handleDeleteTask} 
        />
      </div>
    </section>
  );
};

export default ManageTasksPage;