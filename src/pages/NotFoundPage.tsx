import { Link } from 'react-router-dom';
import './Error.css';
import errorLogo from '@/img/earth.jpg';

function NotFoundPage() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <img src={errorLogo} alt="Логотип" className="notfound-logo" />

        <div className="notfound-code"></div>
        <h1 className="notfound-title">Страница не найдена</h1>
        <p className="notfound-text">Похоже, такой страницы нет или ссылка устарела.</p>

        <div className="notfound-actions">
          <Link to="/" className="notfound-btn primary">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
