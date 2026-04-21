import './HomePage.css';
import { Link } from 'react-router-dom';
import logo from 'img/лого.jpg';
import RussiaMap from '@/components/organisms/RussiaMap/RussiaMap';
function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-section__content">
          <p className="hero-section__eyebrow">Год единства 2026</p>

          <h1 className="hero-section__title">Атлас народов Татарстана</h1>

          <p className="hero-section__text">
            Цифровое пространство для изучения культурного многообразия региона: народов, традиций,
            расселения, костюмов и историй.
          </p>

          <p className="hero-section__subtext">
            Единство народов — это память, уважение и общее будущее. Платформа помогает увидеть это
            разнообразие через карту, визуальные профили, мини-игры и комментарии пользователей.
          </p>

          <div className="hero-section__actions">
            <a href="#map-auth" className="hero-section__button hero-section__button--primary">
              Перейти к карте
            </a>

            <a href="#about" className="hero-section__button hero-section__button--secondary">
              Узнать больше
            </a>
          </div>
        </div>

        <div className="hero-section__visual-card">
          <div className="hero-section__ornament" />

          <div className="hero-section__visual-content">
            <img src={logo} alt="Логотип Года единства 2026" className="hero-section__logo-image" />

            <div className="hero-section__visual-text">Культура. Память. Единство.</div>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-heading">
          <p className="section-heading__eyebrow">О проекте</p>
          <h2 className="section-heading__title">Почему это важно</h2>
        </div>

        <div className="about-section__grid">
          <div className="info-card">
            <h3 className="info-card__title">Единство народов</h3>
            <p className="info-card__text">
              Татарстан — пространство, где рядом живут разные народы, сохраняя язык, традиции и
              культурную память.
            </p>
          </div>

          <div className="info-card">
            <h3 className="info-card__title">Сохранение наследия</h3>
            <p className="info-card__text">
              Платформа собирает знания о народах региона в одном визуальном и удобном цифровом
              пространстве.
            </p>
          </div>

          <div className="info-card">
            <h3 className="info-card__title">Интересное изучение</h3>
            <p className="info-card__text">
              Карта, костюмы, мини-игры и комментарии делают знакомство с разнообразием живым и
              современным.
            </p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Возможности</p>
          <h2 className="section-heading__title">Что есть на платформе</h2>
        </div>

        <div className="features-section__grid">
          <div className="feature-card">
            <div className="feature-card__icon">🗺️</div>
            <h3 className="feature-card__title">Интерактивная карта</h3>
            <p className="feature-card__text">
              Россия с выделенным Татарстаном и переходом к народам региона.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card__icon">📍</div>
            <h3 className="feature-card__title">Карта расселения</h3>
            <p className="feature-card__text">
              Зоны компактного проживания каждого народа по Татарстану.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card__icon">👘</div>
            <h3 className="feature-card__title">Национальные костюмы</h3>
            <p className="feature-card__text">Визуальные профили с мужскими и женскими образами.</p>
          </div>

          <div className="feature-card">
            <div className="feature-card__icon">🎮</div>
            <h3 className="feature-card__title">Мини-игры</h3>
            <p className="feature-card__text">
              Угадай блюдо, праздник и орнамент через интерактивные задания.
            </p>
          </div>
        </div>
      </section>

      <section className="map-auth-section" id="map-auth">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Начать изучение</p>
          <h2 className="section-heading__title">Карта и вход на платформу</h2>
        </div>

        <div className="map-auth-section__map-card">
          <div className="home-map-wrapper">
            <RussiaMap isActive />
          </div>

          <div className="map-auth-section__auth-card">
            <h3 className="map-auth-section__auth-title">Войти или зарегистрироваться</h3>
            <p className="map-auth-section__auth-text">
              Авторизуйтесь, чтобы оставлять комментарии и сохранять активность.
            </p>

            <div className="map-auth-section__auth-actions">
              <Link
                to="/auth/login"
                className="map-auth-section__auth-button map-auth-section__auth-button--primary"
              >
                Войти
              </Link>

              <Link
                to="/auth/register"
                className="map-auth-section__auth-button map-auth-section__auth-button--secondary"
              >
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
