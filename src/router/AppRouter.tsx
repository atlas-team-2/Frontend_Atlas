import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapPage from '@/pages/MapPage';
import LoginPage from '@/pages/LoginPage';
import PeopleListPage from '@/pages/PeopleListPage';
import PeopleProfilePage from '@/pages/PeopleProfilePage';
import RegisterPage from '@/pages/RegisterPage';
import AdminUser from '@/pages/admin/AdminUser';
import AdminComments from '@/pages/admin/AdminComments';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import PrivateRoute from '@/router/PrivateRoute';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import NotFoundPage from '@/pages/NotFoundPage';

function AppRouter() {
  const { isAuth, role } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/peoples" element={<PeopleListPage />} />
          <Route path="/peoples/:id" element={<PeopleProfilePage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoute isAuth={isAuth} allowedRoles={['admin']} userRole={role} />}>
          <Route element={<MainLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUser />} />
            <Route path="/admin/comments" element={<AdminComments />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
