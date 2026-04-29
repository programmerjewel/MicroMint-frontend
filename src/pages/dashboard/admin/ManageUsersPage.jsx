import { toast } from "sonner";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import ManageUsersTable from "@/components/features/dashboard/admin/ManageUsersTable";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const ManageUsersPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch Users & Requests
  const { data: users = [], isLoading: uLoad } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const { data: roleRequests = [], isLoading: rLoad } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => (await axiosSecure.get("/role-requests")).data,
  });

  // Mutations
  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ requestId, status }) => axiosSecure.patch(`/role-requests/${requestId}`, { status }),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries(["roleRequests", "users"]);
      toast.success(`Request ${status} successfully`);
    },
    onError: () => toast.error("Failed to update status"),
  });

  const { mutate: removeUser } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully");
    },
  });

  if (uLoad || rLoad) return <Loading text="Loading users..." />;

  return (
    <section className="mt-6 space-y-4">
      <div className="flex justify-between items-center px-1">
        <DashboardSectionHeader title="Manage Users" className="mb-0" />
        <Badge variant="secondary" className="gap-1.5 px-3 py-1 font-semibold">
          <Users className="h-3.5 w-3.5" /> {users.length} Users
        </Badge>
      </div>

      <ManageUsersTable
        users={users}
        roleRequests={roleRequests}
        onStatusUpdate={(requestId, status) => updateStatus({ requestId, status })}
        onRemove={removeUser}
      />
    </section>
  );
};

export default ManageUsersPage;