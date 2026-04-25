
import Loading from "@/components/shared/Loading";
import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";

const ROLE_HOME = {
  worker: "/dashboard/worker-home",
  buyer:  "/dashboard/buyer-home",
  admin:  "/dashboard/admin-home",
};

const DashboardIndexRedirect = () => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return (
    <div className="min-h-screen flex flex-col justify-center">
      <Loading size="xl" />
    </div>
  );

  return <Navigate to={ROLE_HOME[role] ?? "/"} replace />;
};

export default DashboardIndexRedirect;