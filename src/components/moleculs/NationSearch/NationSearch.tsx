type NationSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

function NationSearch({ value, onChange }: NationSearchProps) {
  return (
    <div className="nations-sidebar__search">
      <input
        className="nations-sidebar__search-input"
        type="text"
        placeholder="Поиск народа..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default NationSearch;
