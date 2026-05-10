import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export const useCoinPurchaseLogic = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState(null);

  // 1. Fetch Dynamic Stats (Limits & Usage from Backend)
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['purchaseStats'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/user-purchase-stats');
      return data;
    },
    // We use zeros here to prevent 'undefined' crashes before the API responds.
    initialData: { 
      usage: { daily: 0, monthly: 0 }, 
      limits: { daily: 1, monthly: 1 },
      resetIn: { hours: 0, minutes: 0 }
    }
  });

  // 2. Fetch Packages
  const { data: packages = [], isLoading: pkgsLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/packages');
      return data;
    }
  });

  // 3. Purchase Logic
  const purchaseMutation = useMutation({
    mutationFn: async (packageId) => {
      const { data } = await axiosSecure.post('/purchase-coins', { packageId });
      return data;
    },
    onSuccess: (data) => {
      // Refresh both balance and quota stats
      queryClient.invalidateQueries(['userStats']); 
      queryClient.invalidateQueries(['purchaseStats']); 
      toast.success(data.message || "Purchase Successful!");
      setProcessingId(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Transaction failed.");
      setProcessingId(null);
    }
  });

  const handlePurchase = (id) => {
    setProcessingId(id);
    purchaseMutation.mutate(id);
  };

  return {
    stats,
    packages,
    loading: statsLoading || pkgsLoading,
    processingId,
    handlePurchase
  };
};