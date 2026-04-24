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
      <PrivateRoutes allowedRoles={["admin", "buyer", "worker"]}>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "worker-home",
        element: (
          <PrivateRoutes allowedRoles={["worker"]}>
            <WorkerHomePage />
          </PrivateRoutes>
        ),
      },
      {
        path: "task-list",
        element: (
          <PrivateRoutes allowedRoles={["worker"]}>
            <TaskListPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "tasks/:id",
        element: (
          <PrivateRoutes allowedRoles={["worker"]}>
            <TaskDetailsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-submission",
        element: (
          <PrivateRoutes allowedRoles={["worker"]}>
            <WorkerSubmissionPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <PrivateRoutes allowedRoles={["worker"]}>
            <WorkerWithdrawalPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "buyer-home",
        element: (
          <PrivateRoutes allowedRoles={["buyer"]}>
            <BuyerHomePage />
          </PrivateRoutes>
        ),
      },
      {
        path: "add-task",
        element: (
          <PrivateRoutes allowedRoles={["buyer"]}>
            <AddTaskPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "tasks",
        element: (
          <PrivateRoutes allowedRoles={["buyer"]}>
            <AllTasksPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "purchase-coins",
        element: (
          <PrivateRoutes allowedRoles={["buyer"]}>
            <PurchaseCoinsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "payments",
        element: (
          <PrivateRoutes allowedRoles={["buyer"]}>
            <PaymentHistoryPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "admin-home",
        element: (
          <PrivateRoutes allowedRoles={["admin"]}>
            <AdminHomePage />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoutes allowedRoles={["admin"]}>
            <ManageUsers />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage-tasks",
        element: (
          <PrivateRoutes allowedRoles={["admin"]}>
            <ManageTasksPage />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default Routes;
