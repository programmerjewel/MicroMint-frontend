
import AddedTasksTable from '@/components/features/dashboard/buyer/AddedTasksTable';
import Loading from '@/components/shared/Loading';
import DashboardSectionHeader from '@/components/ui/dashboard-section-header';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";

const AllTasksPage = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  //fetch all added task data from the backend
  const {data: tasks = [], isLoading} = useQuery({
    queryKey: ['tasks', user?.email],
    enabled: !!user?.email,
    queryFn: async ()=> {
      const {data} = await axiosSecure.get(`/tasks/buyer/${user?.email}`)
      return data
    }
  })


  const {mutateAsync: updateTask} = useMutation({
    mutationFn: async ({id, updatedData}) =>{
      const {data} = await axiosSecure.patch(`/tasks/${id}`, updatedData);
      return data;
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['tasks', user?.email]),
      toast.success("Task updated successfully!")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update task");
    },

  })
  const handleUpdate = async (id, updatedData) => {
    // You call the mutation function here
    await updateTask({ id, updatedData });
  };


  if (isLoading) return <Loading text='Loading tasks...' size='md'/>;
  return (
    <section>
      <DashboardSectionHeader title='My Added Tasks'/>
      <AddedTasksTable
        tasks={tasks} 
        onUpdate={handleUpdate} 
        // onDelete={handleDelete} 
      />
    </section>
  );
};

export default AllTasksPage;
