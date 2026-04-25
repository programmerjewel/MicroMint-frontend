
import Loading from "@/components/shared/Loading";
import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";

const RoleGuard = ({ children, allowedRoles = [] }) => {
  const { role, isRoleLoading } = useRole(); 

  if (isRoleLoading) return (
    <div className="min-h-screen flex flex-col justify-center">
      <Loading size="xl" />
    </div>
  );

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleGuard;