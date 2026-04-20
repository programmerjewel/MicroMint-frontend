import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosSecure } from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();

  const { data, isLoading: isRoleLoading, refetch } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const userRes = await axiosSecure.get(`/users/${user.email}`);

      // Handle 404 gracefully — no pending request is a normal state
      let pendingRequest = null;
      try {
        const reqRes = await axiosSecure.get(`/role-requests/${user.email}/pending`);
        pendingRequest = reqRes.data ?? null;
      } catch (err) {
        if (err.response?.status !== 404) {
          console.error("Error fetching role request:", err);
        }
      }

      return {
        role: userRes.data?.role || 'worker',
        pendingRequest,
      };
    },
  });

  return {
    role: data?.role || 'worker',
    pendingRequest: data?.pendingRequest ?? null,
    isRoleLoading,
    refetch,
  };
};

export default useRole;