import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function useNotifications(userEmail) {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const queryKey = ["notifications", userEmail];

  // 1. Fetch Notification Stream
  const notificationsQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axiosSecure.get(`/notifications/${userEmail}`);
      return response.data;
    },
    enabled: !!userEmail,
    refetchInterval: 60000, // Background updates every 60 seconds
  });

  // 2. Mutation Hook to Mark Single Alert as Read
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId) => {
      // FIXED: Matched route payload to backend app.patch("/notifications/:id")
      await axiosSecure.patch(`/notifications/${notificationId}`);
    },
    // Optimistic Update: Instantly changes UI state for an ultra-responsive feel
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey });
      const previousNotifications = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) =>
        old ? old.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n)) : []
      );

      return { previousNotifications };
    },
    onError: (err, notificationId, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(queryKey, context.previousNotifications);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // 3. NEW: Mutation Hook to Mark All Alerts as Read
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      // Matches backend app.patch("/notifications/:email/read-all")
      await axiosSecure.patch(`/notifications/${userEmail}/read-all`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousNotifications = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) =>
        old ? old.map((n) => ({ ...n, isRead: true })) : []
      );

      return { previousNotifications };
    },
    onError: (err, variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(queryKey, context.previousNotifications);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    notifications: notificationsQuery.data || [],
    isLoading: notificationsQuery.isLoading,
    isError: notificationsQuery.isError,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    isMarkingAllLoading: markAllAsReadMutation.isPending,
  };
}