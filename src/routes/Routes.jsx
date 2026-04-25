import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import MainLayout from "@/layouts/public/MainLayout";
import AdminHomePage from "@/pages/dashboard/admin/AdminHomePage";
import ManageTasksPage from "@/pages/dashboard/admin/ManageTasksPage";
import ManageUsers from "@/pages/dashboard/admin/ManageUsersPage";
import AddTaskPage from "@/pages/dashboard/buyer/AddTasksPage";
import AllTasksPage from "@/pages/dashboard/buyer/AllTasksPage";
import BuyerHomePage from "@/pages/dashboard/buyer/BuyerHomePage";
import PaymentHistoryPage from "@/pages/dashboard/buyer/PaymentHistoryPage";
import PurchaseCoinsPage from "@/pages/dashboard/buyer/PurchaseCoinsPage";
import TaskDetailsPage from "@/pages/dashboard/worker/TaskDetailsPage";
import TaskListPage from "@/pages/dashboard/worker/TaskListPage";
import WorkerHomePage from "@/pages/dashboard/worker/WorkerHomePage";
import WorkerSubmissionPage from "@/pages/dashboard/worker/WorkerSubmissionPage";
import WorkerWithdrawalPage from "@/pages/dashboard/worker/WorkerWithdrawalPage";
import LoginPage from "@/pages/public/auth/LoginPage";
import ProfilePage from "@/pages/public/auth/ProfilePage";
import RegisterPage from "@/pages/public/auth/RegisterPage";
import ErrorPage from "@/pages/public/ErrorPage";
import HomePage from "@/pages/public/Home";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import DashboardIndexRedirect from "./DashboardIndexRedirect";
import RoleGuard from "./RoleGuard";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashboardIndexRedirect/>,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "worker-home",
        element: (
          <RoleGuard allowedRoles={["worker"]}>
            <WorkerHomePage />
          </RoleGuard>
        ),
      },
      {
        path: "task-list",
        element: (
          <RoleGuard allowedRoles={["worker"]}>
            <TaskListPage />
          </RoleGuard>
        ),
      },
      {
        path: "tasks/:id",
        element: (
          <RoleGuard allowedRoles={["worker"]}>
            <TaskDetailsPage />
          </RoleGuard>
        ),
      },
      {
        path: "my-submissions",
        element: (
          <RoleGuard allowedRoles={["worker"]}>
            <WorkerSubmissionPage />
          </RoleGuard>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <RoleGuard allowedRoles={["worker"]}>
            <WorkerWithdrawalPage />
          </RoleGuard>
        ),
      },
      {
        path: "buyer-home",
        element: (
          <RoleGuard allowedRoles={["buyer"]}>
            <BuyerHomePage />
          </RoleGuard>
        ),
      },
      {
        path: "add-task",
        element: (
          <RoleGuard allowedRoles={["buyer"]}>
            <AddTaskPage />
          </RoleGuard>
        ),
      },
      {
        path: "tasks",
        element: (
          <RoleGuard allowedRoles={["buyer"]}>
            <AllTasksPage />
          </RoleGuard>
        ),
      },
      {
        path: "purchase-coins",
        element: (
          <RoleGuard allowedRoles={["buyer"]}>
            <PurchaseCoinsPage />
          </RoleGuard>
        ),
      },
      {
        path: "payments",
        element: (
          <RoleGuard allowedRoles={["buyer"]}>
            <PaymentHistoryPage />
          </RoleGuard>
        ),
      },
      {
        path: "admin-home",
        element: (
          <RoleGuard allowedRoles={["admin"]}>
            <AdminHomePage />
          </RoleGuard>
        ),
      },
      {
        path: "manage-users",
        element: (
          <RoleGuard allowedRoles={["admin"]}>
            <ManageUsers />
          </RoleGuard>
        ),
      },
      {
        path: "manage-tasks",
        element: (
          <RoleGuard allowedRoles={["admin"]}>
            <ManageTasksPage />
          </RoleGuard>
        ),
      },
    ],
  },
]);

export default Routes;
