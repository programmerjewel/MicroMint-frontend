import { LayoutList, Users, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BuyerStats = ({ stats = {} }) => {
  const {
    totalTasks = 10,           // Tasks added by user
    totalPendingWorkers = 33,  // Sum of required_workers count
    totalPaymentsPaid = 3,    // Total payment paid by user
  } = stats;

  const statsCards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      description: "Jobs posted by you",
      icon: LayoutList,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pending Openings",
      value: totalPendingWorkers,
      description: "Remaining worker slots",
      icon: Users,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Total Spent",
      value: `$${totalPaymentsPaid.toFixed(2)}`,
      description: "Total amount paid out",
      icon: CreditCard,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stat.value}</div>
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

export default BuyerStats;