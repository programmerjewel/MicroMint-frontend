
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import MainLayout from '@/layouts/public/MainLayout';
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
        path: 'my-submission',
        element: <WorkerSubmissionPage/>,
      },
      {
        path: 'withdrawals',
        element: <WorkerWithdrawalPage/>,
      }
    ]
  }
])

export default Routes;