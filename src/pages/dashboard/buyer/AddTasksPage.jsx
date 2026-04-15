import AddTaskForm from "@/components/features/dashboard/buyer/AddTaskForm";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";


const AddTaskPage = () => {
  return (
   <section>
    <DashboardSectionHeader title='Add New Tasks' className="text-center"/>
    <AddTaskForm/>
   </section>
  );
};

export default AddTaskPage;