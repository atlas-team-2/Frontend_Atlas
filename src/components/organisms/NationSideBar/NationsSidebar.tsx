import { Nation } from '@/client/api/nations';
import Loader from '@/components/atoms/Loader/Loader';
import NationSearch from '@/components/moleculs/NationSearch/NationSearch';
import NationListItem from '@/components/moleculs/NationListItem/NationListItem';

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

      <NationSearch value={search} onChange={onSearchChange} />

      {isLoading ? (
        <Loader text="Загрузка списка народов..." />
      ) : (
        <div className="nations-sidebar__list">
          {nations.map((nation) => (
            <NationListItem
              key={nation.id}
              nation={nation}
              isActive={selectedNationId === nation.id}
              onSelect={onSelectNation}
            />
          ))}
        </div>
      )}
    </aside>
  );
}

export default NationsSidebar;
