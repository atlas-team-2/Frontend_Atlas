import { NationInfo } from '@/client/api/nations';

interface NationHeroProps {
  nation: {
    name: string;
  };
  nationInfo: NationInfo;
}

function NationHero({ nation, nationInfo }: NationHeroProps) {
  return (
    <section className="nation-profile__hero">
      <h1 className="nation-profile__title">{nation.name}</h1>
      <p className="nation-profile__subtitle">Самоназвание: {nationInfo.self_name || '—'}</p>

      <div className="nation-profile__badges">
        <div className="nation-badge">
          <span className="nation-badge__label">Язык</span>
          <span className="nation-badge__value">{nationInfo.language || '—'}</span>
        </div>

        <div className="nation-badge">
          <span className="nation-badge__label">Религия</span>
          <span className="nation-badge__value">{nationInfo.religion || '—'}</span>
        </div>

        <div className="nation-badge">
          <span className="nation-badge__label">Происхождение</span>
          <span className="nation-badge__value">{nationInfo.origin || '—'}</span>
        </div>
      </div>
    </section>
  );
}

export default NationHero;