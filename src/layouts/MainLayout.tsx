import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default MainLayout;
