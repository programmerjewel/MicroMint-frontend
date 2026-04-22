import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole"; 
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { toast } from "sonner";
import UserProfileCard from "@/components/features/user/UserProfileCard";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { role, pendingRequest, isRoleLoading, refetch: refetchRole } = useRole();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ updatedData }) => {
      // 1. Identify what actually changed to avoid redundant API calls
      const isIdentityChanged = 
        updatedData.name !== user?.displayName || 
        updatedData.photoURL !== user?.photoURL;
      
      const isRoleRequesting = 
        updatedData.role && 
        updatedData.role !== role && 
        !pendingRequest;

      // 2. Update Firebase & MongoDB Identity (Only if name/photo changed)
      if (isIdentityChanged) {
        await updateUser(updatedData.name, updatedData.photoURL);
        await axiosSecure.patch(`/users/${user?.email}`, {
          name: updatedData.name,
          image: updatedData.photoURL,
        });
      }

      // 3. Handle Role Request (Only if role changed)
      if (isRoleRequesting) {
        await axiosSecure.post('/role-requests', {
          requestedRole: updatedData.role,
        });
      }
    },
    onSuccess: (data, variables) => {
      const { updatedData } = variables;
      
      // Refresh local role state and global user queries
      refetchRole();
      queryClient.invalidateQueries(["user", user?.email]);
      
      if (updatedData.role !== role) {
        toast.success("Request sent! Role change is pending admin approval.");
      } else {
        toast.success("Profile updated successfully!");
      }
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast.error(error.response?.data?.message || "Update failed. Please try again.");
    },
  });

  const handleProfileUpdate = async (data) => {
    return mutation.mutateAsync({ updatedData: data });
  };

  if (!user || isRoleLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-zinc-500">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const userWithRole = { ...user, role, pendingRequest };

  return <UserProfileCard user={userWithRole} onUpdate={handleProfileUpdate} />;
}