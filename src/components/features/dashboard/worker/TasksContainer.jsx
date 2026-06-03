import TaskCard from "./TaskCard";
const TasksContainer = ({tasks = [], statusMap = {}}) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} currentStatus={statusMap[task._id]} />
      ))}
    </div>
  );
};
export default TasksContainer;