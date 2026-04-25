import { Send, Clock, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

//Skeleton Loader - Matches the exact layout of the real cards
 
export const WorkerStatsSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-25" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-15 mb-2" />
            <Skeleton className="h-3 w-35" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const WorkerStats = ({ stats = {} }) => {
  const {
    totalSubmissions = 0,
    totalPendingSubmissions = 0,
    totalEarnings = 0,
  } = stats;

  const statsCards = [
    {
      title: "Total Submissions",
      value: totalSubmissions,
      description: "All tasks you have submitted",
      icon: Send,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Submissions",
      value: totalPendingSubmissions,
      description: "Awaiting buyer review",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Total Earnings",
      value: `$${totalEarnings.toFixed(2)}`,
      description: "From approved tasks",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default WorkerStats;