import { ClipboardList } from "lucide-react";
import TasksContainer from "@/components/features/dashboard/worker/TasksContainer";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";
import axios from "axios";

const TaskListPage = () => {
  
  const {data: tasks = [], isLoading} = useQuery({
    queryKey: ['tasks'],
    queryFn: async () =>{
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`)
      return data
    }
  })
  
  if(isLoading) return <Loading variant="fullscreen" text="Waiting..." size="xl" />

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