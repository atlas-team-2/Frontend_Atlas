import { Link } from 'react-router-dom';
import './Error.css';
import errorLogo from '@/img/earth.jpg';

function ForbiddenPage() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <img src={errorLogo} alt="Логотип" className="notfound-logo" />

        <div className="notfound-code">451</div>
        <h1 className="notfound-title">Не достаточно прав</h1>
        <p className="notfound-text">Похоже, у вас недостаточно прав.</p>

        <div className="notfound-actions">
          <Link to="/" className="notfound-btn primary">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForbiddenPage;
