import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLeftPanel from '@/components/organisms/AuthLeftPanel/AuthLeftPanel';
import './AuthPage.css';
import { useAuth } from '@/hooks/useAuth';

const features = [
  { icon: '🌏', text: 'Интерактивная карта народов' },
  { icon: '🗺️', text: 'Карта расселения по Татарстану' },
  { icon: '🎭', text: 'Национальные костюмы' },
  { icon: '🎮', text: 'Мини-игры: Угадай блюдо, Угадай праздник' },
];

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTatarstanClick = () => {
    setShowMap(true);
    window.setTimeout(() => setShowMap(false), 2000);
  };

  return (
    <div className="auth-page">
      <AuthLeftPanel
        features={features}
        onTatarstanClick={handleTatarstanClick}
        showMap={showMap}
      />

      <motion.div
        className="auth-right-panel"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="form-card form-card--ornament">
          <span className="ornament ornament--tl" />
          <span className="ornament ornament--tr" />
          <span className="ornament ornament--bl" />
          <span className="ornament ornament--br" />
          <div className="form-header">
            <motion.h2
              className="form-title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Добро пожаловать!
            </motion.h2>

            <motion.p
              className="form-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Войдите в свой аккаунт
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <motion.div
              className="input-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.6 }}
            >
              <label className="input-label" htmlFor="login-email">
                Email
              </label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  id="login-email"
                  type="email"
                  className="auth-input"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="input-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.7 }}
            >
              <label className="input-label" htmlFor="login-password">
                Пароль
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="login-password"
                  type="password"
                  className="auth-input"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
            </motion.div>

            {error && <p className="auth-error">{error}</p>}

            <motion.div
              className="form-options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.8 }}
            >
              <label className="checkbox-label" htmlFor="remember-me">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Запомнить меня</span>
              </label>

              <button type="button" className="text-link-button">
                Забыли пароль?
              </button>
            </motion.div>

            <motion.button
              type="submit"
              className="submit-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.9 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Входим...' : 'Войти'}
            </motion.button>
          </form>

          <div className="divider">
            <span>или</span>
          </div>

          <p className="register-text">
            Нет аккаунта?{' '}
            <Link to="/auth/register" className="register-link">
              Зарегистрируйтесь
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
