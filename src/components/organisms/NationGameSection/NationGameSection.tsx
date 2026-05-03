import { Game } from '@/client/api/nations';

interface NationGamesSectionProps {
  games: Game[];
}

function NationGamesSection({ games }: NationGamesSectionProps) {
<<<<<<< HEAD
=======
  const [activeGameType, setActiveGameType] = useState<string | null>(null);
  const [notice, setNotice] = useState('');

  const handleGameClick = (game: Game) => {
    if (game.type === 'ornament') {
      setNotice('');
      setActiveGameType('ornament');
      return;
    }

    setNotice('Функционал находится в разработке');
  };

  if (activeGameType === 'ornament') {
    return (
      <section className="nation-section">
        <div className="nation-section__header">
          <button
            type="button"
            className="game-card__button"
            onClick={() => setActiveGameType(null)}
          >
            ← Назад к играм
          </button>
        </div>

        <div className="nation-section__content">
          <OrnamentGame />
        </div>
      </section>
    );
  }

>>>>>>> f149402 (the text was aligned, the header was added, the ornament was adjusted, the ornament was played, the offset was removed)
  return (
    <section className="nation-section">
      <div className="nation-section__header">
        <h2 className="nation-section__title">Мини-игры</h2>
      </div>

      <div className="nation-section__content">
        <div className="games-block">
          {notice && <div className="game-notice">{notice}</div>}

          <div className="games-block__grid">
            {games.length > 0 ? (
              games.map((game) => (
                <div key={game.id} className="game-card">
<<<<<<< HEAD
                  <div className="game-card__icon">🎮</div>
=======
                  <div className="game-card__icon">
                    {game.type === 'dish' && '🍲'}
                    {game.type === 'holiday' && '🎉'}
                    {game.type === 'ornament' && '🪬'}
                  </div>

>>>>>>> f149402 (the text was aligned, the header was added, the ornament was adjusted, the ornament was played, the offset was removed)
                  <h3 className="game-card__title">{game.title}</h3>
                  <p className="game-card__text">
                    {game.description || 'Интерактивная игра по культуре народа'}
                  </p>
<<<<<<< HEAD
                  <button className="game-card__button">Играть</button>
=======

                  <button
                    type="button"
                    className="game-card__button"
                    onClick={() => handleGameClick(game)}
                  >
                    {game.type === 'ornament' ? 'Играть' : 'Скоро'}
                  </button>
>>>>>>> f149402 (the text was aligned, the header was added, the ornament was adjusted, the ornament was played, the offset was removed)
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
