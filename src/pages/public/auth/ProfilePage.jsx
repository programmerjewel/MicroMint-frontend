import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole"; 
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { toast } from "sonner";
import UserProfileCard from "@/components/features/user/UserProfileCard";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  // console.log(user, updateUser)
  
  // UPDATED: Now destructuring as an object
  const { role, pendingRequest, isRoleLoading, refetch: refetchRole } = useRole();

  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ updatedData }) => {
      // 1. Update Firebase (Name & Photo)
      await updateUser(updatedData.name, updatedData.photoURL);

      // 2. Sync Identity to MongoDB
      await axiosSecure.patch(`/users/${user?.email}`, {
        name: updatedData.name,
        image: updatedData.photoURL,
      });

      // 3. Handle Role Request
      if (updatedData.role && updatedData.role !== role) {
        await axiosSecure.post('/role-requests', {
          requestedRole: updatedData.role,
        });
      }
    },
    onSuccess: (variables) => {
      // These call the refetch function from our hook
      refetchRole();
      queryClient.invalidateQueries(["user", user?.email]);
      
      if (variables.updatedData.role !== role) {
        toast.success("Profile updated! Role change is pending admin approval.");
      } else {
        toast.success("Profile updated successfully!");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Update failed.");
    },
  });

  const handleProfileUpdate = async (data) => {
    return mutation.mutateAsync({ updatedData: data });
  };

  if (!user || isRoleLoading) {
    return <div className="p-20 text-center text-zinc-500">Loading profile...</div>;
  }

  // Combine user data with role metadata for the UI
  const userWithRole = { ...user, role, pendingRequest };

  return <UserProfileCard user={userWithRole} onUpdate={handleProfileUpdate} />;
}