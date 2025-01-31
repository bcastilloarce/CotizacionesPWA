import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  // TODO: Implement actual authentication check
  const isAuthenticated = true; // For demo purposes

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};