// useAxiosSecure.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { useEffect } from 'react';

// Export the instance for use in AuthProvider (where hooks can't be used)
export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth(); // Ensure name matches AuthProvider

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logoutUser();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => axiosSecure.interceptors.response.eject(interceptor);
  }, [logoutUser, navigate]);

  return axiosSecure;
};
export default useAxiosSecure;