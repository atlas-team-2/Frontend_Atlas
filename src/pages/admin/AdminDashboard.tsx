import { Link } from 'react-router-dom';
import { MOCK_COMMENTS, MOCK_NATIONS } from '@/client/api/nations.mock';
import './AdminPage.css';

function AdminDashboard() {
  const commentsCount = Object.values(MOCK_COMMENTS).flat().length;

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <p className="admin-kicker">Администрирование</p>
        <h1 className="admin-title">Панель администратора</h1>
        <p className="admin-text">
          Здесь собраны основные разделы управления контентом, пользователями и комментариями.
        </p>
      </section>

      <section className="admin-grid">
        <article className="admin-card">
          <h2 className="admin-card__title">Народы</h2>
          <p className="admin-card__value">{MOCK_NATIONS.length}</p>
          <p className="admin-card__text">Опубликованные профили народов на платформе.</p>
          <Link className="admin-button" to="/peoples">
            Открыть каталог
          </Link>
        </article>

        <article className="admin-card">
          <h2 className="admin-card__title">Комментарии</h2>
          <p className="admin-card__value">{commentsCount}</p>
          <p className="admin-card__text">Просмотр и подготовка комментариев к модерации.</p>
          <Link className="admin-button" to="/admin/comments">
            Модерация
          </Link>
        </article>

        <article className="admin-card">
          <h2 className="admin-card__title">Пользователи</h2>
          <p className="admin-card__value">3</p>
          <p className="admin-card__text">Демо-раздел со списком пользовательских ролей.</p>
          <Link className="admin-button" to="/admin/users">
            Пользователи
          </Link>
        </article>
      </section>
    </main>
  );
}

export default AdminDashboard;
