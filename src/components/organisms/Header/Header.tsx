import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import './header.css';

function Header() {
  const { user, isAuth, logout, hasAnyScope } = useAuth();
  const navigate = useNavigate();
  const isAdmin = hasAnyScope(['user:read', 'comment:moderate', 'content:manage']);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand" aria-label="На главную">
        <div className="site-header__logo">АТ</div>
        <div className="site-header__titles">
          <p className="site-header__title">Атлас народов Татарстана</p>
          <p className="site-header__subtitle">Культура, карта и традиции региона</p>
        </div>
      </Link>

      <nav className="site-header__nav" aria-label="Главная навигация">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `site-header__link ${isActive ? 'site-header__link--active' : ''}`
          }
          end
        >
          Главная
        </NavLink>
        <NavLink
          to="/peoples"
          className={({ isActive }) =>
            `site-header__link ${isActive ? 'site-header__link--active' : ''}`
          }
        >
          Народы
        </NavLink>
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `site-header__link ${isActive ? 'site-header__link--active' : ''}`
            }
          >
            Админка
          </NavLink>
        )}
      </nav>

      <div className="site-header__actions">
        {isAuth && user ? (
          <>
            <Link to="/profile" className="site-header__user">
              <span className="site-header__avatar">
                {user.display_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </span>
              <span className="site-header__user-name">{user.display_name || user.email}</span>
            </Link>
            <button
              type="button"
              className="site-header__button site-header__button--danger"
              onClick={handleLogout}
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="site-header__button site-header__button--secondary">
              Войти
            </Link>
            <Link to="/auth/register" className="site-header__button site-header__button--primary">
              Регистрация
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
