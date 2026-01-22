
import MainLayout from '@/layouts/public/MainLayout';
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
  }
])

export default Routes;