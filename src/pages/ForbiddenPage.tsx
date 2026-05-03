import { Link } from 'react-router-dom';
import './Error.css';
import errorLogo from '@/img/earth.jpg';

function ForbiddenPage() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <img src={errorLogo} alt="Логотип" className="notfound-logo" />

        <h1 className="notfound-title">Недостаточно прав</h1>
        <p className="notfound-text">
          У вас нет доступа к этой странице. Вернитесь на главную или войдите под аккаунтом с
          нужными правами.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="notfound-btn primary">
            На главную
          </Link>
          <Link to="/auth/login" className="notfound-btn secondary">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForbiddenPage;
