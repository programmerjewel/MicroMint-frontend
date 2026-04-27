import { LayoutList, Users, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const statsCards = [
    {
      key: "totalTasks",
      title: "Total Tasks",
      description: "Jobs posted by you",
      icon: LayoutList,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      format: (v) => v,
    },
    {
      key: "totalPendingWorkers",
      title: "Pending Openings",
      description: "Remaining worker slots",
      icon: Users,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      format: (v) => v,
    },
    {
      key: "totalPaymentsPaid",
      description: "Total amount paid out",
      icon: CreditCard,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      format: (v) => `$${v.toFixed(2)}`,
    },
  ];
const BuyerStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["buyer-stats", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/buyer-stats/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statsCards.map((s) => (
        <Card key={s.key}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="h-9 w-16 bg-muted animate-pulse rounded mb-2" />
            <div className="h-3 w-32 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statsCards.map(({ key, title, description, icon, color, bgColor, format }) => {
        const Icon = icon;
        return (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {title}
              </CardTitle>
              <div className={`p-2 rounded-full ${bgColor}`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{format(stats?.[key] ?? 0)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BuyerStats;