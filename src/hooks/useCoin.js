import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosSecure } from "./useAxiosSecure";

const useCoin = () => {
  const { user, loading } = useAuth();

  const {
    data: coins = 0,
    isLoading,
    refetch,
  } = useQuery({
    // Query key depends on user email;
    queryKey: ["userCoins", user?.email],
    // Only run if auth is not loading and user email exists
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      
      return data?.coins || 0;
    },
  });

  return {coins, isLoading, refetch};
};

export default useCoin;