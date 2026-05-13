import { Game } from '@/client/api/nations';

type GameCardProps = {
  game: Game;
  icon: string;
  isAvailable: boolean;
  onClick: (game: Game) => void;
};

function GameCard({ game, icon, isAvailable, onClick }: GameCardProps) {
  return (
    <div className="game-card">
      <div className="game-card__icon">{icon}</div>

      <h3 className="game-card__title">{game.title}</h3>

      <p className="game-card__text">
        {game.description || 'Интерактивная игра по культуре народа'}
      </p>

      <button type="button" className="game-card__button" onClick={() => onClick(game)}>
        {isAvailable ? 'Играть' : 'Скоро'}
      </button>
    </div>
  );
}

export default GameCard;
