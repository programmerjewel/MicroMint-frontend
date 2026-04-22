// ManageUsers.jsx (page)
import { useState, useCallback, useEffect } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import ManageUsersTable from "@/components/features/dashboard/admin/ManageUsersTable";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleRequests, setRoleRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [usersRes, requestsRes] = await Promise.all([
        axios.get(`${API}/users`, { withCredentials: true }),
        axios.get(`${API}/role-requests`, { withCredentials: true }),
      ]);
      setUsers(usersRes.data);
      setRoleRequests(requestsRes.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Admin approves or rejects a pending role request
  const handleStatusUpdate = async (requestId, status) => {
    try {
      await axios.patch(
        `${API}/role-requests/${requestId}`,
        { status },
        { withCredentials: true }
      );
      toast.success(`Request ${status}`);
      fetchData(); // refresh both lists
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update request");
    }
  };

  // Admin removes a user — uses sonner confirm pattern (no window.confirm)
  const handleRemoveUser = (userId) => {
    toast("Are you sure you want to remove this user?", {
      action: {
        label: "Remove",
        onClick: async () => {
          try {
            await axios.delete(`${API}/users/${userId}`, { withCredentials: true });
            setUsers((prev) => prev.filter((u) => u._id !== userId));
            toast.error("User removed permanently");
          } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to remove user");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  return (
    <section className="space-y-6">
      <Toaster position="top-center" richColors closeButton />
      <DashboardSectionHeader title="Manage Users" />

      {loading ? (
        <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
          Loading users...
        </div>
      ) : (
        <div className="bg-white rounded-md">
          <ManageUsersTable
            users={users}
            roleRequests={roleRequests}
            onStatusUpdate={handleStatusUpdate}
            onRemove={handleRemoveUser}
          />
        </div>
      )}
    </section>
  );
};

export default ManageUsers;