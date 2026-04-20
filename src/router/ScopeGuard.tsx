import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import forbidden from '@/pages/ForbiddenPage';

type ScopeGuardProps = {
  requiredScopes: string[];
};

function ScopeGuard({ requiredScopes }: ScopeGuardProps) {
  const { isAuth, isLoading, hasAnyScope } = useAuth();

  if (isLoading) {
    return <div>Проверка доступа...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!hasAnyScope(requiredScopes)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}

export default ScopeGuard;
