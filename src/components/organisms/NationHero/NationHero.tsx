import { NationInfo } from '@/client/api/nations';
import NationBadge from '@/components/moleculs/NationBadge/NationBadge';

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
        <NationBadge label="Язык" value={nationInfo.language} />
        <NationBadge label="Религия" value={nationInfo.religion} />
        <NationBadge label="Происхождение" value={nationInfo.origin} />
      </div>
    </section>
  );
}

export default NationHero;
