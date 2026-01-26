import { Calendar, DollarSign, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const {
    _id,
    task_title,
    buyer_name,
    completion_date,
    payable_amount,
    required_workers,
  } = task;
  // Format the completion date
  const formattedDate = new Date(completion_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  // Check if deadline is approaching (within 3 days)
  const isDeadlineNear = () => {
    const deadline = new Date(completion_date);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };
  const handleViewDetails = () => {
    navigate(`/task-details/${_id}`);
  };
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{task_title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            <Users className="h-3 w-3 mr-1" />
            {required_workers}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">by {buyer_name}</p>
      </CardHeader>
      <CardContent className="grow space-y-3">
        {/* Payable Amount */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-green-100">
            <DollarSign className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Reward</p>
            <p className="text-sm font-semibold text-green-600">
              ${payable_amount.toFixed(2)}
            </p>
          </div>
        </div>
        {/* Completion Date */}
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-full ${
              isDeadlineNear() ? "bg-red-100" : "bg-blue-100"
            }`}
          >
            <Calendar
              className={`h-3.5 w-3.5 ${
                isDeadlineNear() ? "text-red-600" : "text-blue-600"
              }`}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Deadline</p>
            <p
              className={`text-sm font-medium ${
                isDeadlineNear() ? "text-red-600" : ""
              }`}
            >
              {formattedDate}
            </p>
          </div>
        </div>
        {/* Required Workers */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-purple-100">
            <Users className="h-3.5 w-3.5 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Workers Needed</p>
            <p className="text-sm font-medium">{required_workers} workers</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <Button onClick={handleViewDetails} className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
export default TaskCard;