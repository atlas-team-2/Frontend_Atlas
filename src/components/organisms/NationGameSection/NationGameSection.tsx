import { useState } from 'react';
import { Game } from '@/client/api/nations';
import DishGame from '@/components/organisms/DishGame/DishGame';
import HolidayGame from '@/components/organisms/HolidayGame/HolidayGame';
import OrnamentGame from '@/components/organisms/OrnamentGame/OrnamentGame';
import GameCard from '@/components/moleculs/GameCard/GameCard';

interface NationGamesSectionProps {
  games: Game[];
}

type ActiveGameType = 'dish' | 'holiday' | 'ornament' | null;

function isSupportedGameType(type: string): type is Exclude<ActiveGameType, null> {
  return type === 'dish' || type === 'holiday' || type === 'ornament';
}

function getGameIcon(type: string) {
  if (type === 'dish') return '🍲';
  if (type === 'holiday') return '🎉';
  if (type === 'ornament') return '🪬';

  return '🎮';
}

function NationGamesSection({ games }: NationGamesSectionProps) {
  const [activeGameType, setActiveGameType] = useState<ActiveGameType>(null);
  const [notice, setNotice] = useState('');

  const handleGameClick = (game: Game) => {
    if (isSupportedGameType(game.type)) {
      setNotice('');
      setActiveGameType(game.type);
      return;
    }

    setNotice('Эта игра пока недоступна');
  };

  if (activeGameType) {
    return (
      <section className="nation-section">
        <div className="nation-section__header">
          <button
            type="button"
            className="game-card__button"
            onClick={() => {
              setNotice('');
              setActiveGameType(null);
            }}
          >
            ← Назад к играм
          </button>
        </div>

        <div className="nation-section__content">
          {activeGameType === 'dish' && <DishGame />}
          {activeGameType === 'holiday' && <HolidayGame />}
          {activeGameType === 'ornament' && <OrnamentGame />}
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
          {notice && <div className="game-notice">{notice}</div>}

          <div className="games-block__grid">
            {games.length > 0 ? (
              games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  icon={getGameIcon(game.type)}
                  isAvailable={isSupportedGameType(game.type)}
                  onClick={handleGameClick}
                />
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
