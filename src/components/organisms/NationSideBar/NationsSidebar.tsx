import { Nation } from '@/client/api/nations';

interface NationsSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  nations: Nation[];
  isLoading: boolean;
  selectedNationId: string | null;
  onSelectNation: (nationId: string) => void;
}

function NationsSidebar({
  search,
  onSearchChange,
  nations,
  isLoading,
  selectedNationId,
  onSelectNation,
}: NationsSidebarProps) {
  return (
    <aside className="nations-sidebar">
      <div className="nations-sidebar__header">
        <h2 className="nations-sidebar__title">Народы Татарстана</h2>
        <p className="nations-sidebar__subtitle">
          Выберите народ, чтобы изучить его визуальный профиль
        </p>
      </div>

      <div className="nations-sidebar__search">
        <input
          className="nations-sidebar__search-input"
          type="text"
          placeholder="Поиск народа..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="page-loading">Загрузка списка народов...</div>
      ) : (
        <div className="nations-sidebar__list">
          {nations.map((nation) => (
            <button
              key={nation.id}
              className={
                selectedNationId === nation.id
                  ? 'nations-sidebar__item nations-sidebar__item--active'
                  : 'nations-sidebar__item'
              }
              onClick={() => onSelectNation(nation.id)}
            >
              <span className="nations-sidebar__item-name">{nation.name}</span>
              <span className="nations-sidebar__item-meta">{nation.slug}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default NationsSidebar;
