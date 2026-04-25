import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading:authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading: isQueryLoading, refetch } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email && !authLoading,
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
        role: userRes.data?.role,
        pendingRequest,
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  const isRoleLoading = authLoading || isQueryLoading;

  return {
    role: isRoleLoading ? undefined : (data?.role ?? null),
    pendingRequest: data?.pendingRequest ?? null,
    isRoleLoading,
    refetch,
  };
};

export default useRole;