import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
