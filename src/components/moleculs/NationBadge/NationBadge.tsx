type NationBadgeProps = {
  label: string;
  value?: string | null;
};

function NationBadge({ label, value }: NationBadgeProps) {
  return (
    <div className="nation-badge">
      <span className="nation-badge__label">{label}</span>
      <span className="nation-badge__value">{value || '—'}</span>
    </div>
  );
}

export default NationBadge;
