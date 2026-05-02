import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import PeopleListPage from '@/pages/PeopleListPage';
import PeopleProfilePage from '@/pages/PeopleProfilePage';
import RegisterPage from '@/pages/RegisterPage';
import AdminUser from '@/pages/admin/AdminUser';
import AdminComments from '@/pages/admin/AdminComments';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import PrivateRoute from '@/router/PrivateRoute';
import ScopeGuard from '@/router/ScopeGuard';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import NotFoundPage from '@/pages/NotFoundPage';
import ForbiddenPage from '@/pages/ForbiddenPage';
import HomePage from '@/pages/HomePage';
import ProfilePage from '@/pages/ProfilePage';

function AppRouter() {
  const { isAuth, isLoading } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/peoples" element={<PeopleListPage />} />
          <Route path="/peoples/:id" element={<PeopleProfilePage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />
        </Route>

        <Route element={<PrivateRoute isAuth={isAuth} isLoading={isLoading} />}>
          <Route element={<MainLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route element={<ScopeGuard requiredScopes={['user:read']} />}>
            <Route element={<MainLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUser />} />
            </Route>
          </Route>

          <Route element={<ScopeGuard requiredScopes={['comment:moderate']} />}>
            <Route element={<MainLayout />}>
              <Route path="/admin/comments" element={<AdminComments />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
