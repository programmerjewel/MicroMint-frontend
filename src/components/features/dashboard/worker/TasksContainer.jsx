import TaskCard from "./TaskCard";
const TasksContainer = ({tasks = []}) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};
export default TasksContainer;