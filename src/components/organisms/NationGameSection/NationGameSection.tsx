import { Game } from '@/client/api/nations';

interface NationGamesSectionProps {
  games: Game[];
}

function NationGamesSection({ games }: NationGamesSectionProps) {
  return (
    <section className="nation-section">
      <div className="nation-section__header">
        <h2 className="nation-section__title">Мини-игры</h2>
      </div>

      <div className="nation-section__content">
        <div className="games-block">
          <div className="games-block__grid">
            {games.length > 0 ? (
              games.map((game) => (
                <div key={game.id} className="game-card">
                  <div className="game-card__icon">🎮</div>
                  <h3 className="game-card__title">{game.title}</h3>
                  <p className="game-card__text">
                    {game.description || 'Интерактивная игра по культуре народа'}
                  </p>
                  <button className="game-card__button">Играть</button>
                </div>
              ))
            ) : (
              <>
                <div className="game-card">
                  <div className="game-card__icon">🍲</div>
                  <h3 className="game-card__title">Угадай блюдо</h3>
                  <p className="game-card__text">Скоро будет доступно</p>
                  <button className="game-card__button" disabled>
                    Скоро
                  </button>
                </div>

                <div className="game-card">
                  <div className="game-card__icon">🎉</div>
                  <h3 className="game-card__title">Угадай праздник</h3>
                  <p className="game-card__text">Скоро будет доступно</p>
                  <button className="game-card__button" disabled>
                    Скоро
                  </button>
                </div>

                <div className="game-card">
                  <div className="game-card__icon">✳️</div>
                  <h3 className="game-card__title">Угадай орнамент</h3>
                  <p className="game-card__text">Скоро будет доступно</p>
                  <button className="game-card__button" disabled>
                    Скоро
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NationGamesSection;
