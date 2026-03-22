import { Outlet } from 'react-dom';
import Header from '../Components/organisms/Header';
import Footer from '../Components/organisms/Footer';

const MainLayout = () => {
  return (
    <div className="app-cont">
      <Header />
      <main className="main-container">
        {/*main content*/}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;