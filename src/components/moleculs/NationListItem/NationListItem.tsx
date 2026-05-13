import { Nation } from '@/client/api/nations';

type NationListItemProps = {
  nation: Nation;
  isActive: boolean;
  onSelect: (nationId: string) => void;
};

function NationListItem({ nation, isActive, onSelect }: NationListItemProps) {
  return (
    <button
      type="button"
      className={
        isActive ? 'nations-sidebar__item nations-sidebar__item--active' : 'nations-sidebar__item'
      }
      onClick={() => onSelect(nation.id)}
    >
      <span className="nations-sidebar__item-name">{nation.name}</span>
      <span className="nations-sidebar__item-meta">{nation.slug}</span>
    </button>
  );
}

export default NationListItem;
