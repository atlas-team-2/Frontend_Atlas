import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import './ProfilePage.css';

function ProfilePage() {
  const { user, scopes, logout, hasAnyScope } = useAuth();

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-card">
          <h1>Профиль недоступен</h1>
          <p>Войдите в аккаунт, чтобы открыть личный кабинет.</p>
          <Link className="profile-button" to="/auth/login">
            Войти
          </Link>
        </div>
      </main>
    );
  }

  const isAdmin = hasAnyScope(['user:read', 'comment:moderate', 'content:manage']);

  async function handleLogout() {
    await logout();
  }

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar">
          {user.display_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
        </div>

        <div>
          <p className="profile-kicker">Личный кабинет</p>
          <h1 className="profile-title">{user.display_name || 'Пользователь'}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </section>

      <section className="profile-grid">
        <article className="profile-card">
          <h2>Информация</h2>

          <div className="profile-info-list">
            <div className="profile-info-row">
              <span>ID пользователя</span>
              <strong>{user.id}</strong>
            </div>

            <div className="profile-info-row">
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div className="profile-info-row">
              <span>Имя</span>
              <strong>{user.display_name || 'Не указано'}</strong>
            </div>

            <div className="profile-info-row">
              <span>Дата создания</span>
              <strong>{new Date(user.created_at).toLocaleDateString('ru-RU')}</strong>
            </div>

            <div className="profile-info-row">
              <span>Роль</span>
              <strong>{isAdmin ? 'Администратор' : 'Пользователь'}</strong>
            </div>
          </div>
        </article>

        <article className="profile-card">
          <h2>Возможности</h2>

          <ul className="profile-list">
            <li>Просмотр визуальных профилей народов</li>
            <li>Прохождение мини-игр</li>
            <li>Чтение опубликованных комментариев</li>
            <li>Добавление комментариев после входа</li>
          </ul>

          {isAdmin && (
            <div className="profile-admin-box">
              <h3>Администрирование</h3>
              <p>У вас есть доступ к административным разделам платформы.</p>

              <div className="profile-actions">
                <Link className="profile-button" to="/admin">
                  Панель администратора
                </Link>

                <Link className="profile-button profile-button--secondary" to="/admin/comments">
                  Модерация комментариев
                </Link>
              </div>
            </div>
          )}
        </article>

        <article className="profile-card profile-card--wide">
          <h2>Права доступа</h2>

          {scopes.length > 0 ? (
            <div className="profile-scopes">
              {scopes.map((scope) => (
                <span key={scope} className="profile-scope">
                  {scope}
                </span>
              ))}
            </div>
          ) : (
            <p className="profile-muted">Для пользователя не указаны дополнительные права.</p>
          )}
        </article>

        <article className="profile-card profile-card--wide">
          <h2>Действия</h2>

          <div className="profile-actions">
            <Link className="profile-button" to="/peoples">
              Перейти к народам Татарстана
            </Link>

            <button
              className="profile-button profile-button--danger"
              type="button"
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}

export default ProfilePage;
