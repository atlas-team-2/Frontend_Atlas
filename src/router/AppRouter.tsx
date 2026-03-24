import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapPage from '../pages/MapPage';
import LoginPage from '../pages/LoginPage';
import PeopleListPage from '../pages/PeopleListPage';
import PeopleProfilePage from '../pages/PeopleProfilePage';
import RegisterPage from '../pages/RegisterPage';
import AdminUser from '../pages/admin/AdminUser';
import AdminComments from '../pages/admin/AdminComments';
import AdminDashboard from '../pages/admin/AdminDashboard';

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="peopleList" element={<PeopleListPage />} />
        <Route path="peopleList/:peopleId" element={<PeopleProfilePage />} />
        <Route path="admin" element={<AdminUser />} />
        <Route path="adminComments" element={<AdminComments />} />
        <Route path="adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;