import React, { useState } from 'react';
import { toast, Toaster } from "sonner";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import ManageUsersTable from "@/components/features/dashboard/admin/ManageUsersTable";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { _id: "u1", display_name: "Mahmudul Hasan", user_email: "mahmud@example.com", photo_url: "https://i.pravatar.cc/150?u=u1", role: "Admin", coin: 1500 },
    { _id: "u2", display_name: "Sarah Jenkins", user_email: "sarah@buyer.com", photo_url: "https://i.pravatar.cc/150?u=u2", role: "Buyer", coin: 450 },
    { _id: "u3", display_name: "Rakib Ahmed", user_email: "rakib@worker.com", photo_url: "https://i.pravatar.cc/150?u=u3", role: "Worker", coin: 25 }
  ]);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
    // Sonner Success Toast
    toast.success(`Role updated successfully`, {
      description: `User role is now set to ${newRole}`,
    });
  };

  const handleRemoveUser = (userId) => {
    // Instead of window.confirm, we trigger a "Confirm" toast
    toast("Are you sure you want to remove this user?", {
      action: {
        label: "Remove",
        onClick: () => {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
          toast.error("User deleted permanently");
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => console.log("Deletion cancelled"),
      },
    });
  };

  return (
    <section className="space-y-6">
      {/* Ensure richColors is enabled for Green/Red styling */}
      <Toaster position="top-center" richColors closeButton />
      
      <DashboardSectionHeader title="Manage Users" />

      <div className="bg-white rounded-md">
        <ManageUsersTable 
          users={users} 
          onRoleChange={handleRoleChange} 
          onRemove={handleRemoveUser} 
        />
      </div>
    </section>
  );
};

export default ManageUsers;