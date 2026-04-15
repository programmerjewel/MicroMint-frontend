
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import MainLayout from '@/layouts/public/MainLayout';
import AdminHomePage from '@/pages/dashboard/admin/AdminHomePage';
import ManageTasksPage from '@/pages/dashboard/admin/ManageTasksPage';
import ManageUsers from '@/pages/dashboard/admin/ManageUsersPage';
import AddTaskPage from '@/pages/dashboard/buyer/AddTasksPage';
import AllTasksPage from '@/pages/dashboard/buyer/AllTasksPage';
import BuyerHomePage from '@/pages/dashboard/buyer/BuyerHomePage';
import PaymentHistoryPage from '@/pages/dashboard/buyer/PaymentHistoryPage';
import PurchaseCoinsPage from '@/pages/dashboard/buyer/PurchaseCoinsPage';
import TaskDetailsPage from '@/pages/dashboard/worker/TaskDetailsPage';
import TaskListPage from '@/pages/dashboard/worker/TaskListPage';
import WorkerHomePage from '@/pages/dashboard/worker/WorkerHomePage';
import WorkerSubmissionPage from '@/pages/dashboard/worker/WorkerSubmissionPage';
import WorkerWithdrawalPage from '@/pages/dashboard/worker/WorkerWithdrawalPage';
import LoginPage from '@/pages/public/auth/LoginPage';
import RegisterPage from '@/pages/public/auth/RegisterPage';
import ErrorPage from '@/pages/public/ErrorPage';
import HomePage from '@/pages/public/Home';
import { createBrowserRouter } from 'react-router-dom';

const Routes= createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <HomePage/>,
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage/>,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout/>,
    children: [
      {
        path: 'worker-home',
        element: <WorkerHomePage/>,
      },
      {
        path: 'task-list',
        element: <TaskListPage/>,
      },
      {
        path: 'tasks/:id',
        element: <TaskDetailsPage/>,
      },
      {
        path: 'my-submission',
        element: <WorkerSubmissionPage/>,
      },
      {
        path: 'withdrawals',
        element: <WorkerWithdrawalPage/>,
      },
      {
        path: 'buyer-home',
        element: <BuyerHomePage/>,
      },
      {
        path: 'add-task',
        element: <AddTaskPage/>
      },
      {
        path: 'tasks',
        element: <AllTasksPage/>,
      },
      {
        path: 'purchase-coins',
        element: <PurchaseCoinsPage/>,
      },
      {
        path: 'payments',
        element: <PaymentHistoryPage/>,
      },
      {
        path: 'admin-home',
        element: <AdminHomePage/>,
      },
      {
        path: 'manage-users',
        element: <ManageUsers/>,
      },
      {
        path: 'manage-tasks',
        element: <ManageTasksPage/>,
      }
    ]
  }
])

export default Routes;