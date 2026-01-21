
import MainLayout from '@/layouts/public/MainLayout';
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
  }
])

export default Routes;