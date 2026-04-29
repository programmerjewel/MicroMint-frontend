import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Users, Briefcase, Database, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading, isError } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isError) {
    return <div className="text-red-500">Error loading stats.</div>;
  }

  // Define the card structure for both loading and data states
  const adminCards = [
    {
      title: "Total Workers",
      value: stats.totalWorkers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Buyers",
      value: stats.totalBuyers,
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Platform Coins",
      value: stats.totalCoins?.toLocaleString(),
      icon: Database,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Total Payments",
      value: stats.totalPaymentsUSD !== undefined ? `$${stats.totalPaymentsUSD.toFixed(2)}` : null,
      icon: Wallet,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {adminCards.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {/* Icon Skeleton */}
              {isLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              )}
            </CardHeader>
            <CardContent>
              {/* Value Skeleton */}
              {isLoading ? (
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminStats;