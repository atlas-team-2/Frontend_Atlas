type NationInfoCardProps = {
  label: string;
  value?: string | null;
  isWide?: boolean;
};

function NationInfoCard({ label, value, isWide = false }: NationInfoCardProps) {
  return (
    <div className={isWide ? 'nation-info__card nation-info__card--wide' : 'nation-info__card'}>
      <div className="nation-info__label">{label}</div>
      <div className="nation-info__value">{value || '—'}</div>
    </div>
  );
}

export default NationInfoCard;
