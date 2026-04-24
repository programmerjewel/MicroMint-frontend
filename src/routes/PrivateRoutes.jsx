import Loading from "@/components/shared/Loading";
import useRole from "@/hooks/useRole";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoutes = ({children, allowedRoles}) => {
  const location = useLocation();
  const {role, isRoleLoading} = useRole();

  if(isRoleLoading) return <div className="min-h-screen flex flex-col justify-center"><Loading size="md" text="Loading..." /></div>
  if(allowedRoles.includes(role)){
    return children
  }

  return role ? <Navigate to= '/' replace /> : <Navigate to="/login" state={{from: location}} replace/>
};

export default PrivateRoutes;