import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const location = useLocation();
  const token = localStorage.getItem('token')

  return token ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;