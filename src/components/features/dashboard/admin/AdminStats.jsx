
import { Users, Briefcase, Database, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminStats = ({ stats = {} }) => {
  const {
    totalWorkers = 0,
    totalBuyers = 0,
    totalAvailableCoins = 0, // Sum of all user coins
    totalPayments = 0,       // Total revenue/payments processed
  } = stats;

  const adminCards = [
    {
      title: "Total Workers",
      value: totalWorkers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Buyers",
      value: totalBuyers,
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Platform Coins",
      value: totalAvailableCoins.toLocaleString(),
      icon: Database,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Total Payments",
      value: `$${totalPayments.toFixed(2)}`,
      icon: Wallet,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {adminCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminStats;