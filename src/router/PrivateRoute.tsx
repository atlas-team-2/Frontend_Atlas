import { Navigate, Outlet } from 'react-router-dom';

type PrivateRouteProps = {
  isAuth: boolean;
  allowedRoles?: string[];
  userRole?: string | null;
};

function PrivateRoute({ isAuth, allowedRoles, userRole }: PrivateRouteProps) {
  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole ?? '')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
