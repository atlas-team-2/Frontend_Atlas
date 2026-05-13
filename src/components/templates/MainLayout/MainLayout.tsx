import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer';

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
