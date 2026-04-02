import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RussiaMap from '@/components/organisms/RussiaMap/RussiaMap';
import './AuthPage.css';

interface RegisterFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PasswordStrengthInfo {
  level: 'weak' | 'medium' | 'strong';
  text: string;
  color: string;
}

function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getPasswordStrength = (password: string): PasswordStrengthInfo | null => {
    if (!password) return null;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLong = password.length >= 8;

    const score = [hasLower, hasUpper, hasNumber, hasSpecial, isLong].filter(Boolean).length;

    if (score <= 2) {
      return { level: 'weak', text: 'Слабый', color: '#F44336' };
    }
    if (score <= 3) {
      return { level: 'medium', text: 'Средний', color: '#FF9800' };
    }
    return { level: 'strong', text: 'Надёжный', color: '#4CAF50' };
  };

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const features = [
    { icon: '🗺️', text: 'Интерактивная карта народов' },
    { icon: '📍', text: 'Карта расселения по Татарстану' },
    { icon: '👘', text: 'Национальные костюмы' },
  ];

  return (
    <div className="auth-page register-page">
      <motion.div
        className="auth-left-panel"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="logo-container">
          <motion.div
            className="map-wrapper"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <RussiaMap />
          </motion.div>

          <motion.h1
            className="year-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.span
              className="title-gradient"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              АТЛАС НАРОДОВ
            </motion.span>
            <br />
            <span className="title-green">ТАТАРСТАНА</span>
          </motion.h1>

          <motion.p
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Платформа для изучения этнокультурного разнообразия региона
          </motion.p>

          <motion.div
            className="features"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={`feature-${index}`}
                className="feature-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 6 }}
              >
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-text">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="auth-right-panel"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="form-card">
          <div className="form-header">
            <motion.h2
              className="form-title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Создать аккаунт
            </motion.h2>

            <motion.p
              className="form-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Присоединяйтесь к нашему сообществу
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <motion.div
                className="input-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.6 }}
              >
                <label className="input-label" htmlFor="register-firstName">
                  Имя *
                </label>
                <input
                  id="register-firstName"
                  type="text"
                  name="firstName"
                  className="auth-input"
                  placeholder="Иван"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div
                className="input-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.65 }}
              >
                <label className="input-label" htmlFor="register-lastName">
                  Фамилия *
                </label>
                <input
                  id="register-lastName"
                  type="text"
                  name="lastName"
                  className="auth-input"
                  placeholder="Иванов"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </div>

            <motion.div
              className="input-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.7 }}
            >
              <label className="input-label" htmlFor="register-email">
                Email *
              </label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  className="auth-input"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="input-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.75 }}
            >
              <label className="input-label" htmlFor="register-password">
                Пароль *
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="register-password"
                  type="password"
                  name="password"
                  className="auth-input"
                  placeholder="Минимум 8 символов"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
              {passwordStrength && (
                <div className="password-strength" style={{ color: passwordStrength.color }}>
                  {passwordStrength.text}
                </div>
              )}
            </motion.div>

            <motion.div
              className="input-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.8 }}
            >
              <label className="input-label" htmlFor="register-confirmPassword">
                Подтвердите пароль *
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔐</span>
                <input
                  id="register-confirmPassword"
                  type="password"
                  name="confirmPassword"
                  className="auth-input"
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="form-options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.85 }}
            >
              <label className="checkbox-label" htmlFor="agree-terms">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                />
                <span>Я принимаю пользовательское соглашение</span>
              </label>
            </motion.div>

            <motion.button
              type="submit"
              className="submit-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.9 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={!agreedToTerms}
            >
              Зарегистрироваться
            </motion.button>
          </form>

          <div className="divider">
            <span>или</span>
          </div>

          <p className="register-text">
            Уже есть аккаунт?{' '}
            <Link to="/auth/login" className="register-link">
              Войдите
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
