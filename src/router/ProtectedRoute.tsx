import { Navigate } from 'react-router-dom';
import type {ReactNode} from 'react';

type ProtectedRouteProps = {
  isAuth: boolean;
  children: ReactNode;
};

function PrivateRoutes({isAuth, children}: ProtectedRouteProps) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
export default PrivateRoutes;