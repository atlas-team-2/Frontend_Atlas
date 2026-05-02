import { useState } from 'react';
import { Game } from '@/client/api/nations';
import OrnamentGame from '@/components/organisms/OrnamentGame/OrnamentGame';

interface NationGamesSectionProps {
  games: Game[];
}

function NationGamesSection({ games }: NationGamesSectionProps) {
  const [activeGameType, setActiveGameType] = useState<string | null>(null);

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
                  <div className="game-card__icon">
                    {game.type === 'dish' && '🍲'}
                    {game.type === 'holiday' && '🎉'}
                    {game.type === 'ornament' && '✳️'}
                  </div>

                  <h3 className="game-card__title">{game.title}</h3>

                  <p className="game-card__text">
                    {game.description || 'Интерактивная игра по культуре народа'}
                  </p>

                  <button
                    type="button"
                    className="game-card__button"
                    onClick={() => setActiveGameType(game.type)}
                  >
                    Играть
                  </button>
                </div>
              ))
            ) : (
              <p>Игры для этого народа пока не добавлены.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NationGamesSection;
