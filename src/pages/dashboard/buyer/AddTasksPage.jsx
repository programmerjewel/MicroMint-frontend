import AddTaskForm from "@/components/features/dashboard/buyer/AddTaskForm";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";


const AddTasksPage = () => {
  return (
   <section>
    <DashboardSectionHeader title='Add New Tasks'/>
    <AddTaskForm/>
   </section>
  );
};

export default AddTasksPage;